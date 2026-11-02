# ECHOTech Academy

Sitio web estático de ECHOTech Academy, una propuesta de clases presenciales de tecnología para niños en Panamá.

## Información publicada

- Electrónica
- Informática básica
- Diseño 3D
- Arduino y ESP32
- Clases presenciales de 90 minutos
- Precio indicado: B/. 7 por clase
- Pago presencial
- Consultas por correo electrónico

Los horarios, cupos, ubicación exacta, materiales y condiciones de inscripción no se publican porque todavía deben confirmarse.

## Archivos

```
.
├── index.html                 Página principal
├── styles.css                 Estilos y diseño adaptable
├── main.js                    Menú, FAQ, formulario y animaciones
├── config.js                  Correo de contacto
├── politica-privacidad.html   Política de privacidad
├── favicon.svg
├── apple-touch-icon.png
├── hero-illustration.svg
├── logo-dark.svg
├── logo-light.svg
├── logo-mark-dark.svg
├── logo-mark-light.svg
└── README.md
```

## Configurar el correo

El correo de contacto se define en `config.js`:

```js
const ACADEMY_EMAIL = "tu-correo@ejemplo.com";
```

El correo queda visible en el código público del sitio. Conviene utilizar una dirección dedicada a la academia.

El formulario valida los campos y prepara un mensaje mediante `mailto:`. No envía el mensaje por sí solo ni almacena los datos. La persona debe revisar y enviar el correo desde su propia aplicación. Si no tiene una aplicación de correo configurada, puede copiar el texto preparado.

## Probar localmente

Abre `index.html` directamente o ejecuta desde esta carpeta:

```bash
python -m http.server 8000
```

Luego visita http://localhost:8000.

## Publicación

El proyecto no necesita compilación, dependencias ni servidor: basta con publicar los archivos manteniendo esta estructura.

Antes de elegir alojamiento, revisa las condiciones del proveedor. En particular, consulta las limitaciones y términos de uso de GitHub Pages para sitios que promocionan actividades comerciales. No se debe asumir que cualquier uso comercial está permitido en el plan gratuito.

## Pendiente de confirmar antes de anunciar inscripciones

- Horarios y disponibilidad.
- Ubicación y condiciones del espacio presencial.
- Cupos por grupo.
- Materiales incluidos y materiales que debe llevar el estudiante.
- Requisitos o edades recomendadas para cada curso.
- Procedimiento de inscripción y contacto con padres o tutores.
- Revisar la política de privacidad si cambia el funcionamiento del formulario o se añaden servicios externos.

## Privacidad y accesibilidad

La página no incorpora una base de datos, cuentas, pagos en línea, analítica ni rastreadores propios. El proveedor de alojamiento puede recopilar registros técnicos según sus condiciones.

Se utilizan HTML semántico, etiquetas de formulario, estados accesibles, navegación por teclado y una preferencia de movimiento reducido. Esto no equivale a una auditoría formal ni a una certificación de accesibilidad.

## Mantenimiento

- Mantén las rutas de los archivos en la raíz, salvo que actualices también las referencias en HTML.
- Si cambias el correo, actualiza `config.js` y revisa la política de privacidad.
- Si cambias precio, duración o modalidad, actualiza todas sus apariciones en `index.html`.
