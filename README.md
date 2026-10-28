# ECHOTech Academy – Sitio web

Página de aterrizaje estática (HTML + CSS + JavaScript, sin dependencias, sin base de datos, sin servidor) para **ECHOTech Academy**: clases presenciales de tecnología para niños en Panamá, B/. 7 por clase de 1 h 30 min.

**Por qué una arquitectura estática:** el objetivo es informar y recibir consultas por correo. No necesita React, Next.js ni backend, es gratis de mantener y fácil de editar mientras aprendes. Funciona abriendo `index.html` o publicada en cualquier alojamiento estático.

## Estructura

```
echotech-academy/
├── index.html              Contenido de toda la página
├── politica-privacidad.html  Política de privacidad
├── css/styles.css          Estilos (colores en :root, al inicio)
├── js/
│   ├── config.js           ← AQUÍ pones el correo de la academia
│   └── main.js             Menú, acordeón, formulario, animaciones
├── assets/
│   ├── images/             Logotipos SVG (claro/oscuro) e ilustración del hero
│   └── icons/              favicon.svg y apple-touch-icon.png (ícono para iPhone)
└── README.md
```

## 1. Correo de la academia

Ya está configurado en `js/config.js`:

```js
const ACADEMY_EMAIL = "jeanvillartch09@proton.me";
```

Para cambiarlo, reemplaza el texto entre comillas. Si lo dejas como `TU_CORREO_AQUI`, la página muestra un aviso visible al administrador y el formulario no prepara mensajes.

**Ojo:** ese correo queda dentro del código público de la página, así que cualquiera puede verlo y puede recibir correo no deseado. Si te molesta, usa un correo exclusivo para la academia.

**Pago:** la página indica que el pago se realiza de forma presencial (en la tarjeta de precio, la sección de información, las preguntas frecuentes y el pie). No dice nada sobre métodos de pago porque no se han definido.

**Cómo funciona el formulario:** valida los campos y abre la aplicación de correo del visitante con el mensaje ya redactado (`mailto:`). La web **no envía nada por sí misma** y no lo afirma: avisa que el mensaje aún no se ha enviado. Si el visitante no tiene aplicación de correo configurada (frecuente si usa Gmail en el navegador), aparece un panel «¿No se abrió tu correo?» con el texto para copiar.

**Backend opcional (no incluido):** si más adelante quieres recibir mensajes sin depender del correo del visitante, existen servicios de formularios (por ejemplo Formspree o Web3Forms). No los incluí porque implican enviar datos de contacto a un tercero y tienen límites gratuitos que debes revisar en su sitio. Si lo añades, actualiza el texto de privacidad del formulario.

## 2. Probar en tu computadora

Opción simple: haz doble clic en `index.html`. Opción recomendada (se parece más a la publicación real), desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

y abre <http://localhost:8000>.

## 3. Publicar gratis

### Antes de elegir plataforma: términos de uso

La recomendación habitual es **GitHub Pages**, y es técnicamente compatible con este proyecto. Pero según su documentación oficial, GitHub Pages [no está pensado ni permitido como alojamiento gratuito para negocios en línea, comercio electrónico o SaaS comerciales](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). Una web informativa de una academia que cobra por clases es una zona gris: no vende en línea ni cobra en la web, pero sí promociona un negocio. **Lee esa página y decide tú.** Alternativas de alojamiento estático gratuito, cuyas condiciones debes revisar igualmente antes de usarlas: Cloudflare Pages y Netlify. Los pasos son similares: subir la carpeta y obtener una URL pública.

### Pasos con GitHub Pages

1. Crea una cuenta gratuita en <https://github.com>.
2. Crea un repositorio **público** nuevo (los repositorios privados no pueden usar Pages en el plan gratuito) llamado, por ejemplo, `echotech-academy`.
3. Sube **el contenido** de la carpeta (`index.html`, `css/`, `js/`, `assets/`, `README.md`) con «Add file → Upload files», y confirma el cambio («Commit»). `index.html` debe quedar en la raíz del repositorio.
4. Ve a **Settings → Pages**. En «Build and deployment» elige *Deploy from a branch*, rama `main`, carpeta `/ (root)` y guarda.
5. Espera uno o dos minutos. La URL pública aparece en esa misma pantalla y tiene la forma `https://TU_USUARIO.github.io/echotech-academy/`.
6. Para **actualizar**: edita o vuelve a subir los archivos cambiados; la página se republica sola.

La web sigue funcionando aunque tu computadora esté apagada.

### Límites del plan gratuito de GitHub Pages (verificados en su documentación)

- Sitio publicado: hasta 1 GB. Ancho de banda: límite flexible de 100 GB al mes. Compilaciones: límite flexible de 10 por hora.
- Solo repositorios públicos (el código será visible para cualquiera).
- No incluye servidor ni backend, ni formularios que envíen datos.
- Dominio propio: no es necesario para empezar. Lo necesitarás si quieres una dirección tipo `echotech.com`; se compra aparte y no se activa nada de pago automáticamente.

### Después de publicar

En `index.html`, descomenta y completa las líneas `canonical` y `og:url` con tu URL real. Para que al compartir el enlace aparezca una imagen, crea una imagen PNG de 1200×630 px, súbela y añade una etiqueta `og:image` con su URL completa (las redes sociales no aceptan SVG). No incluí `robots.txt` ni sitemap: en un sitio de proyecto de GitHub Pages (`usuario.github.io/proyecto/`) esos archivos deben estar en la raíz del dominio y no aplican.

## 4. Datos que debes completar

- [x] Correo de la academia (`js/config.js`): ya configurado.
- [ ] Lugar y horarios de las clases (hoy la web remite a consultar por correo).
- [ ] Qué materiales debe llevar el estudiante y si se requieren conocimientos previos (hoy dice «consulta por correo»).
- [ ] Sección «Responsable de la academia» (en `index.html`, con atributo `hidden`; actívala solo con información real y autorización).
- [x] Política de privacidad (`politica-privacidad.html`, enlazada en el pie): describe lo que la web hace hoy. Revísala y actualízala si añades analítica, un formulario con servidor o cualquier otro servicio. No es asesoramiento jurídico.
- [ ] URL pública (`canonical`, `og:url`) e imagen para compartir (`og:image`).
- [ ] Redes sociales o WhatsApp: no hay iconos ni enlaces; añádelos solo cuando existan las cuentas.

## 5. Personalizar

- **Colores:** variables al inicio de `css/styles.css` (`:root`).
- **Textos, cursos y preguntas frecuentes:** directamente en `index.html`; cada sección está comentada.
- **Precio:** aparece en el hero, la tarjeta de «Información», la pregunta «¿Cuál es el precio?» y el pie. Búscalo con `B/. 7`.
- **Logotipo:** `assets/images/logo-mark-*.svg` (símbolo) y `logo-*.svg` (horizontal; su texto usa fuentes del sistema). Versión `dark` para fondos oscuros y `light` para fondos claros.
- **Ampliaciones futuras** (no implementadas a propósito para mantener el lanzamiento simple): páginas por curso, calendario, galería de proyectos, formulario con backend, inscripción en línea.

## 6. Privacidad y accesibilidad

- No hay cookies propias, analítica, rastreadores ni fuentes ni scripts externos. Todo se carga desde los archivos del proyecto. (Tu proveedor de alojamiento puede registrar visitas por su cuenta.)
- El formulario pide solo: nombre del padre/madre/tutor, correo, curso y mensaje. No pide datos del menor y lo advierte.
- Se aplicaron prácticas de accesibilidad (HTML semántico, foco visible, menú y acordeones operables con teclado, etiquetas y errores asociados, `prefers-reduced-motion`). **No** se ha realizado una auditoría formal ni existe certificación WCAG.

## 7. Pruebas

### Ejecutadas de verdad (Chromium 153 automatizado con Playwright, servidor local)

54 comprobaciones, todas aprobadas tras corregir dos errores encontrados durante las pruebas (ver abajo). Los casos «sin correo configurado» se simulan sustituyendo `config.js` solo dentro de la prueba:

- Consola sin errores ni avisos; todos los recursos cargan sin 4xx/5xx.
- Los 7 enlaces internos tienen destino; IDs únicos; referencias ARIA válidas; un solo `h1`.
- El encabezado fijo no tapa los títulos de las 5 secciones al navegar.
- Los 4 botones «Consultar este curso» seleccionan el curso correcto y lo anuncian.
- Formulario: 4 errores con campos vacíos; correo inválido y mensaje corto detectados; el foco va al primer campo inválido; sin correo configurado muestra aviso y **no** afirma haber enviado; con correo configurado (simulado solo en la prueba) prepara asunto y cuerpo correctos y dice «todavía NO se ha enviado».
- Menú móvil (375 px): abre, cierra con Escape (devuelve el foco), al elegir un enlace y al tocar fuera. En escritorio: barra horizontal.
- Acordeón: abre/cierra con clic, Enter y Espacio; flechas mueven entre preguntas.
- Sin desbordamiento horizontal a 320, 375, 768, 1280 y 1920 px; botones y enlaces con altura ≥ 40 px.
- Con `prefers-reduced-motion` el contenido se ve sin animar. Con JavaScript desactivado, cursos, FAQ y menú siguen visibles.
- Contrastes calculados: todo el texto cumple ≥ 4,5:1; el icono de Electrónica sobre su fondo es 4,3:1 (decorativo, cumple el mínimo de 3:1 para gráficos).
- Revisión visual de capturas a 375 px y 1280 px.

### Errores encontrados y corregidos durante las pruebas

1. El título del hero se veía azul oscuro sobre fondo oscuro (faltaba el color de texto). Corregido.
2. En el formulario, el error del campo «Mensaje» desaparecía al salir del campo; eso movía el botón y se perdía el primer clic. Ahora los errores se limpian mientras se escribe.

### NO ejecutado

- **Firefox, Edge y Safari:** no estaban disponibles; solo se probó Chromium. Pruébalo tú en tu navegador y en un celular real.
- **Lighthouse:** no se ejecutó, por lo que no hay puntuaciones. Para medirlo: abre la página en Chrome, `F12` → pestaña *Lighthouse* → *Analyze page load*.
- **Apertura real del cliente de correo (`mailto:`):** el entorno de pruebas no tiene aplicación de correo. Se verificó la preparación del mensaje, no la apertura. Pruébalo con tu correo ya configurado en `js/config.js`.
- Lectores de pantalla reales y pruebas en dispositivos táctiles físicos.

## Limitaciones conocidas

- El formulario depende de que el visitante tenga un cliente de correo; por eso existe el panel para copiar el mensaje.
- El mensaje está limitado a 600 caracteres para que el enlace `mailto:` no resulte demasiado largo.
- El logotipo horizontal en SVG usa fuentes del sistema, así que el texto puede variar ligeramente entre dispositivos.
