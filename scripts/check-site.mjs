import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const read = (name) => readFileSync(join(root, name), "utf8");
const html = read("index.html");
const privacy = read("politica-privacidad.html");
const js = read("main.js");
const css = read("styles.css");
const config = read("config.js");

const checks = [];
function check(name, fn) {
  fn();
  checks.push(name);
}

function localRefs(source) {
  return [...source.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((v) => v && !/^(?:[a-z]+:|#|\/\/)/i.test(v) && !v.startsWith("data:"))
    .map((v) => v.split(/[?#]/)[0])
    .filter(Boolean);
}

check("Todos los recursos locales de ambas páginas existen", () => {
  for (const ref of [...localRefs(html), ...localRefs(privacy)]) {
    assert.ok(statSync(join(root, decodeURIComponent(ref))).isFile(), `Falta recurso local: ${ref}`);
  }
});
check("IDs HTML únicos", () => {
  for (const source of [html, privacy]) {
    const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(ids.length, new Set(ids).size, "Hay IDs duplicados");
  }
});
check("No hay JavaScript inline ni manejadores HTML", () => {
  for (const source of [html, privacy]) {
    assert.doesNotMatch(source, /<script(?![^>]*\bsrc=)[^>]*>/i);
    assert.doesNotMatch(source, /\son[a-z]+\s*=/i);
  }
});
check("Política CSP presente y restringida", () => {
  for (const source of [html, privacy]) {
    assert.match(source, /Content-Security-Policy/);
    assert.match(source, /default-src 'self'/);
    assert.match(source, /object-src 'none'/);
    assert.match(source, /script-src 'self'/);
  }
});
check("Formulario pide contacto adulto y limita tamaños", () => {
  assert.match(html, /Nombre del padre, madre o tutor/);
  assert.match(html, /id="nombre"[^>]*maxlength="80"/);
  assert.match(html, /id="correo"[^>]*maxlength="120"/);
  assert.match(html, /id="mensaje"[^>]*maxlength="600"/);
  assert.match(html, /Los padres, madres o tutores deben gestionar el contacto/);
});
check("Validación de campos y lista permitida de cursos", () => {
  assert.match(js, /VALID_COURSES/);
  assert.match(js, /VALID_COURSES\.indexOf\(value\) === -1/);
  assert.match(js, /form\.noValidate = true/);
  assert.match(js, /encodeURIComponent\(mail\.subject\)/);
  assert.match(js, /encodeURIComponent\(mail\.body\)/);
});
check("Sin sumideros HTML peligrosos ni evaluación dinámica", () => {
  assert.doesNotMatch(js, /\b(?:eval\s*\(|new\s+Function\s*\(|document\.write\s*\(|innerHTML\s*=)/);
});
check("La página legal usa recursos externos locales", () => {
  assert.match(privacy, /href="styles\.css"/);
  assert.match(privacy, /src="config\.js"/);
  assert.match(privacy, /src="main\.js"/);
  assert.doesNotMatch(privacy, /<style>/i);
});
check("Correo y privacidad coinciden con la configuración", () => {
  const match = config.match(/ACADEMY_EMAIL\s*=\s*"([^"]+)"/);
  assert.ok(match, "No se encontró correo configurado");
  assert.ok(privacy.includes(match[1]), "La política no coincide con el correo de configuración");
});
check("No hay enlaces HTTP inseguros codificados", () => {
  assert.doesNotMatch(html + privacy + css + js, /http:\/\//i);
});

console.log(`ECHOTech Academy: ${checks.length}/${checks.length} comprobaciones superadas`);
for (const name of checks) console.log(`OK  ${name}`);
