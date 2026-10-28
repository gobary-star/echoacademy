/*
 * ECHOTech Academy – JavaScript principal
 * ------------------------------------------------------------
 * Cada función hace una sola cosa. Al final del archivo se
 * llaman todas cuando la página está lista.
 *
 * Requiere js/config.js (define la constante ACADEMY_EMAIL).
 */
(function () {
  "use strict";

  /* ---------- Utilidades ---------- */
  var PLACEHOLDER_EMAIL = "TU_CORREO_AQUI";
  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* Devuelve el correo configurado, o "" si aún no se ha completado. */
  function getAcademyEmail() {
    var email = typeof ACADEMY_EMAIL === "string" ? ACADEMY_EMAIL.trim() : "";
    if (email === "" || email === PLACEHOLDER_EMAIL || !EMAIL_REGEX.test(email)) {
      return "";
    }
    return email;
  }

  /* ---------- Menú móvil ---------- */
  function initNav() {
    var toggle = qs("#nav-toggle");
    var menu = qs("#nav-menu");
    var header = qs("#site-header");
    if (!toggle || !menu) return;

    var label = qs(".sr-only", toggle);
    var desktop = window.matchMedia("(min-width: 900px)");

    function setOpen(open) {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Cerrar menú" : "Abrir menú";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Cerrar al elegir una opción
    qsa("a", menu).forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    // Cerrar con Escape (y devolver el foco al botón)
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Cerrar al tocar fuera del encabezado
    document.addEventListener("click", function (event) {
      if (header && !header.contains(event.target)) setOpen(false);
    });

    // Cerrar si la pantalla pasa a modo escritorio
    var onChange = function () {
      if (desktop.matches) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);

    // Sombra del encabezado al desplazarse
    function onScroll() {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Aparición suave de secciones ---------- */
  function initReveal() {
    var items = qsa(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Preguntas frecuentes (acordeón) ---------- */
  function initAccordion() {
    var buttons = qsa(".faq-q");
    if (!buttons.length) return;

    function toggleItem(button) {
      var item = button.closest(".faq-item");
      var open = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(open));
      if (item) item.classList.toggle("is-open", open);
    }

    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () { toggleItem(button); });

      // Flechas arriba/abajo, Inicio y Fin para moverse entre preguntas
      button.addEventListener("keydown", function (event) {
        var target = null;
        if (event.key === "ArrowDown") target = buttons[(index + 1) % buttons.length];
        if (event.key === "ArrowUp") target = buttons[(index - 1 + buttons.length) % buttons.length];
        if (event.key === "Home") target = buttons[0];
        if (event.key === "End") target = buttons[buttons.length - 1];
        if (target) {
          event.preventDefault();
          target.focus();
        }
      });
    });
  }

  /* ---------- Botones «Consultar este curso» ---------- */
  function initCourseButtons() {
    var select = qs("#curso");
    var status = qs("#curso-status");
    if (!select) return;

    var highlightTimer = null;

    qsa("[data-curso]").forEach(function (link) {
      link.addEventListener("click", function () {
        var value = link.getAttribute("data-curso");
        var option = qs('option[value="' + value + '"]', select);
        if (!option) return;

        select.value = value;
        clearError("curso");
        if (status) status.textContent = "Curso seleccionado: " + option.textContent;

        // Confirmación visual
        select.classList.remove("is-highlighted");
        void select.offsetWidth; // reinicia la animación
        select.classList.add("is-highlighted");
        window.clearTimeout(highlightTimer);
        highlightTimer = window.setTimeout(function () {
          select.classList.remove("is-highlighted");
        }, 1800);

        // Lleva el foco al formulario una vez llegado a la sección
        window.setTimeout(function () {
          select.focus({ preventScroll: true });
        }, prefersReducedMotion() ? 50 : 600);
      });
    });

    select.addEventListener("change", function () {
      if (status) status.textContent = "";
    });
  }

  /* ---------- Formulario de contacto ---------- */
  var FIELDS = ["nombre", "correo", "curso", "mensaje"];

  function setError(id, message) {
    var field = qs("#" + id);
    var error = qs("#" + id + "-error");
    if (field) field.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  }

  function clearError(id) {
    var field = qs("#" + id);
    var error = qs("#" + id + "-error");
    if (field) field.removeAttribute("aria-invalid");
    if (error) error.textContent = "";
  }

  /* Devuelve un texto de error, o "" si el campo es válido. */
  function validateField(id) {
    var el = qs("#" + id);
    if (!el) return "";
    var value = el.value.trim();

    if (id === "nombre") {
      if (value === "") return "Escribe el nombre del padre, madre o tutor.";
      if (value.length < 2) return "El nombre es demasiado corto.";
    }
    if (id === "correo") {
      if (value === "") return "Escribe un correo electrónico de contacto.";
      if (!EMAIL_REGEX.test(value)) return "El correo no parece válido. Ejemplo: nombre@ejemplo.com";
    }
    if (id === "curso") {
      if (value === "") return "Elige un curso o «Consulta general».";
    }
    if (id === "mensaje") {
      if (value === "") return "Escribe tu mensaje.";
      if (value.length < 10) return "Cuéntanos un poco más (mínimo 10 caracteres).";
    }
    return "";
  }

  function validateAll() {
    var firstInvalid = null;
    FIELDS.forEach(function (id) {
      var message = validateField(id);
      if (message) {
        setError(id, message);
        if (!firstInvalid) firstInvalid = qs("#" + id);
      } else {
        clearError(id);
      }
    });
    return firstInvalid;
  }

  function showStatus(type, text) {
    var box = qs("#form-status");
    if (!box) return;
    box.className = "form-status is-" + type;
    box.textContent = text;
  }

  /* Arma el asunto y el cuerpo del correo con los datos del formulario. */
  function buildMessage() {
    var select = qs("#curso");
    var courseLabel = select.options[select.selectedIndex].textContent;
    var name = qs("#nombre").value.trim();
    var reply = qs("#correo").value.trim();
    var message = qs("#mensaje").value.trim();

    var subject = "Consulta sobre " + courseLabel + " - ECHOTech Academy";
    var body =
      "Hola, ECHOTech Academy:\n\n" +
      "Curso de interés: " + courseLabel + "\n" +
      "Nombre del padre, madre o tutor: " + name + "\n" +
      "Correo de contacto: " + reply + "\n\n" +
      "Mensaje:\n" + message + "\n";
    return { subject: subject, body: body };
  }

  function showFallback(email, mail) {
    var details = qs("#fallback");
    if (!details) return;
    qs("#fallback-address").textContent = email;
    qs("#fallback-text").value = "Asunto: " + mail.subject + "\n\n" + mail.body;
    details.hidden = false;
  }

  function initCopyButton() {
    var button = qs("#copy-btn");
    var area = qs("#fallback-text");
    if (!button || !area) return;

    button.addEventListener("click", function () {
      var text = qs("#fallback-address").textContent + "\n" + area.value;
      function manual() {
        area.focus();
        area.select();
        showStatus("warn", "No se pudo copiar automáticamente. El texto quedó seleccionado: cópialo con Ctrl+C (o mantén pulsado en el móvil).");
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showStatus("info", "Mensaje copiado. Pégalo en un correo nuevo y envíalo tú.");
        }, manual);
      } else {
        manual();
      }
    });
  }

  function initContactForm() {
    var form = qs("#contact-form");
    if (!form) return;

    // Aviso para el administrador si falta configurar el correo
    var notice = qs("#admin-notice");
    if (notice && !getAcademyEmail()) notice.hidden = false;

    // Contador de caracteres del mensaje
    var textarea = qs("#mensaje");
    var counter = qs("#mensaje-count");
    if (textarea && counter) {
      textarea.addEventListener("input", function () {
        counter.textContent = String(textarea.value.length);
      });
    }

    // Corrección en vivo: los errores solo se MUESTRAN al enviar, pero un campo
    // marcado como inválido se re-evalúa mientras se escribe, y su error
    // desaparece en cuanto el valor es correcto. (No se valida al salir del
    // campo: si el error desapareciera justo al pulsar el botón, el botón
    // se movería y se perdería el clic.)
    FIELDS.forEach(function (id) {
      var el = qs("#" + id);
      if (!el) return;
      var evt = id === "curso" ? "change" : "input";
      el.addEventListener(evt, function () {
        if (el.getAttribute("aria-invalid") !== "true") return;
        var message = validateField(id);
        if (message) setError(id, message); else clearError(id);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var firstInvalid = validateAll();
      if (firstInvalid) {
        showStatus("error", "Revisa los campos marcados antes de continuar.");
        firstInvalid.focus();
        return;
      }

      var email = getAcademyEmail();
      if (!email) {
        showStatus("warn", "El correo de la academia aún no está configurado, por eso no se puede preparar el mensaje. Tu mensaje NO se ha enviado.");
        if (notice) notice.hidden = false;
        return;
      }

      var mail = buildMessage();
      var url = "mailto:" + email +
        "?subject=" + encodeURIComponent(mail.subject) +
        "&body=" + encodeURIComponent(mail.body);

      showFallback(email, mail);
      showStatus("info", "Preparamos tu mensaje en tu aplicación de correo. Todavía NO se ha enviado: revísalo y pulsa «Enviar» allí.");
      window.location.href = url;
    });
  }

  /* ---------- Año del pie de página ---------- */
  function initYear() {
    var el = qs("#year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Inicio ---------- */
  initNav();
  initReveal();
  initAccordion();
  initCourseButtons();
  initContactForm();
  initCopyButton();
  initYear();
})();
