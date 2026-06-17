# Premier OSM League 25/26 - versión separada

Archivos incluidos:

- `index.html`: estructura HTML limpia, enlazando a CSS y JS externos.
- `css/styles.css`: estilos separados desde el `<style>` original.
- `js/script-01.js`, `js/script-02.js`, etc.: scripts separados manteniendo el orden, la posición y atributos originales como `type="module"`.

Mejoras aplicadas sin cambiar la funcionalidad:

- CSS externo para caché del navegador y HTML más ligero.
- JavaScript externo separado por bloques, conservando el comportamiento original.
- Se mantienen textos, IDs, clases, funciones, URLs externas, Firebase, localStorage, galerías, likes, comentarios, perfil, música y notificaciones.
- Se añade preconnect/dns-prefetch a `res.cloudinary.com` para mejorar carga de audio/vídeo.

Uso: sube todo el contenido del ZIP respetando las carpetas `css/` y `js/` junto al `index.html`.
