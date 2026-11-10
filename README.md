# Web Programming Practices

Sitio con mis prácticas de la materia de Programación Web (UPSIN, 2025).

## Contenido

- **Automóviles**: catálogo estático de autos Nissan, Toyota y Ford.
- **Automóviles dinámicos**: catálogo que se carga desde Firebase Realtime Database y se filtra por marca.
- **Administrador de carros**: CRUD (alta, consulta, actualización y baja) en Firebase, con subida de imágenes a Cloudinary.
- **Independencia de México**: página informativa.
- **Flexbox, media queries y diseño responsive.**
- **Formularios** (cotización y contacto).
- **Prácticas de JavaScript**: manipulación del DOM, tablas dinámicas y menú dinámico.

## Tecnologías

HTML5, CSS3, JavaScript (ES modules), Firebase Realtime Database y Cloudinary.

## Ejecutar

Las páginas estáticas se pueden abrir directamente desde `index.html`.

Las páginas que usan Firebase y Cloudinary necesitan configuración:

```bash
cp js/config.example.js js/config.js
# edita js/config.js con los datos de tus proyectos
python -m http.server 8000   # los ES modules necesitan un servidor local
```

`js/config.js` está en `.gitignore`, así que tus credenciales no se suben al repositorio.
