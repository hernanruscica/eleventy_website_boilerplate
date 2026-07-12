# Eleventy Boilerplate — Sitio Web Corporativo Estático

**Tu sitio web cargando en menos de 1 segundo. Puntuación perfecta en Lighthouse. Sin frameworks pesados, sin bases de datos, sin compromisos.**

> Un boilerplate corporativo construido con Eleventy 3.x que prioriza rendimiento, accesibilidad y buenas prácticas de SEO desde el primer commit. Editás un JSON, desplegás, y tu sitio está en el aire.

---

## Descripción

Este boilerplate es un punto de partida completo para sitios web corporativos estáticos. Incluye blog, páginas de servicios, formulario de contacto y presupuesto, todo optimizado para obtener métricas perfectas en Google Lighthouse.

A diferencia de plantillas que priorizan features sobre rendimiento, esta fue diseñada al revés: cada decisión técnica está subordinada a la velocidad de carga y la accesibilidad. El resultado es un sitio que carga instantáneamente en cualquier dispositivo y conexión.

### Características principales

- **Blog con Markdown**: Escribís posts en `.md` con front matter, Eleventy genera las páginas.
- **Imágenes responsivas**: Conversión automática a AVIF, WebP y JPEG en múltiples resoluciones.
- **CSS crítico inline**: Cero render-blocking resources. Todo el CSS se inyecta en `<style>`.
- **JSON-LD completo**: Schema.org Organization, WebSite, Article y BreadcrumbList.
- **Open Graph + Twitter Cards**: Tags sociales completos por página.
- **Formularios AJAX**: Contacto, presupuesto y newsletter vía Formspree.
- **Accesibilidad WCAG**: Skip-nav, ARIA completo, focus-visible, semantic HTML.
- **Sitemap + RSS + robots.txt**: Generados automáticamente en el build.

---

## Tecnología usada

| Componente | Tecnología | Versión |
|---|---|---|
| Motor de plantillas | [Eleventy](https://www.11ty.dev/) | 3.x |
| Lenguaje de plantillas | [Nunjucks](https://mozilla.github.io/nunjucks/) | — |
| Imágenes responsivas | [@11ty/eleventy-img](https://www.11ty.dev/docs/plugins/image/) | 5.x |
| Minificación CSS | [CleanCSS](https://github.com/clean-css/clean-css) | 5.x |
| Minificación HTML | [html-minifier-terser](https://github.com/terser/html-minifier-terser) | 7.x |
| Optimización SVG | [SVGO](https://github.com/svg/svgo) | 3.x |
| Fuentes | Mulish (self-hosted, WOFF2) | — |
| Formularios | [Formspree](https://formspree.io/) | — |
| CSS | Vanilla CSS (sin preprocesador) | — |
| JavaScript | Vanilla JS (sin bundler) | — |

### Decisiones técnicas

- **Sin bundler**: No hay webpack, Vite ni esbuild. Los JS se pasan como archivos estáticos con cache-busting por hash MD5.
- **Sin framework CSS**: Todo el diseño está en un solo archivo CSS vanilla con Custom Properties para theming.
- **Build mínimo**: Solo 5 devDependencies. Sin dependencias runtime.
- **Output estático**: El build genera HTML puro, listo para cualquier hosting estático.

---

## Instalación local

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18+ (recomendado: v20 LTS)
- npm (incluido con Node)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/usuario/eleventy-boilerplate.git
cd eleventy-boilerplate

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm start
```

El sitio estará disponible en `http://localhost:8080` con hot reload.

### Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción (minifica HTML, CSS, optimiza SVG) |

---

## Configuración

Toda la configuración del sitio está centralizada en un solo archivo: `src/_data/site.json`.

### Datos del sitio

```json
{
  "name": "Nombre del Sitio",
  "url": "https://ejemplo.com",
  "lang": "es",
  "description": "Descripción del sitio para meta tags.",
  "author": "Nombre del Autor",
  "ogLocale": "es_AR",
  "twitter": "@usuario",
  "whatsapp": "5491112345678",
  "defaultOGImage": "/assets/images/og-default.jpg"
}
```

| Campo | Uso |
|---|---|
| `name` | Nombre del sitio. Aparece en `<title>`, OG tags, header y footer. |
| `url` | URL absoluta del sitio. Usada en sitemap, canonical, OG tags y JSON-LD. |
| `lang` | Idioma del sitio (`html lang`). |
| `description` | Meta description por defecto. |
| `author` | Autor por defecto de los posts. |
| `ogLocale` | Locale para Open Graph (`es_AR`, `es_MX`, `es_ES`). |
| `twitter` | Handle de Twitter/X para `twitter:site` y `twitter:creator`. |
| `whatsapp` | Número de WhatsApp (formato internacional sin `+`). |
| `defaultOGImage` | Imagen por defecto para Open Graph cuando una página no define `ogImage`. |

### Navegación

```json
"nav": [
  { "text": "Inicio", "url": "/" },
  { "text": "Servicios", "url": "/servicios/" },
  { "text": "Blog", "url": "/blog/" },
  { "text": "Contacto", "url": "/contacto/" }
]
```

Agregá, eliminá o reordená items. El menú se genera automáticamente.

### Servicios

```json
"services": [
  {
    "title": "Servicio 1",
    "description": "Descripción del servicio.",
    "image": "src/assets/images/servicios/imagen.jpg",
    "url": "/servicios/servicio-1/",
    "alt": "Texto alternativo de la imagen"
  }
]
```

Cada servicio genera una página independiente. La imagen se procesa automáticamente con el pipeline de imágenes responsivas.

### Formularios

```json
"forms": {
  "newsletter": { "action": "https://formspree.io/f/TU_ID", "subject": "Newsletter" },
  "contact": { "action": "https://formspree.io/f/TU_ID", "subject": "Contacto" },
  "presupuesto": { "action": "https://formspree.io/f/TU_ID", "subject": "Presupuesto" }
}
```

Reemplazá los IDs de Formspree con los tuyos. Creá una cuenta gratuita en [formspree.io](https://formspree.io/).

### Presets de imágenes

```json
"imagePresets": {
  "hero_image": { "widths": [1600, 1200, 800, 400], "sizes": "min(100vw, 800px)" },
  "blog_image": { "widths": [1200, 800, 400], "sizes": "(max-width: 75rem) 100vw, 75rem" },
  "blog_image_thumbnail": { "widths": [400], "sizes": "400px" },
  "showcase_image": { "widths": [800, 600, 400], "sizes": "(max-width: 600px) 100vw, 50vw" },
  "showcase_image_thumbnail": { "widths": [400], "sizes": "400px" }
}
```

Cada preset define los anchos generados y el atributo `sizes` del `<picture>`. El pipeline genera automáticamente AVIF, WebP y JPEG para cada ancho.

---

## Personalización

### Cambiar colores y tipografía

Editá las Custom Properties en `src/assets/css/main.css`:

```css
:root {
  --color-primary: #2563eb;
  --color-text: #1f2937;
  --font-body: "Mulish", "Segoe UI", Roboto, sans-serif;
  --max-width: 75rem;
  /* ... ver la sección completa en main.css */
}
```

### Cambiar la fuente

1. Reemplazá el archivo `src/assets/fonts/mulish-latin.woff2` con tu fuente WOFF2.
2. Actualizá la declaración `@font-face` en `src/assets/css/main.css`.
3. Actualizá la etiqueta `<link rel="preload">` en `src/_includes/layouts/base.njk`.

### Agregar una página

1. Creá un archivo `.njk` en `src/` (ej: `src/nosotros/index.njk`).
2. Agregá front matter con `layout: base.njk`, `title`, `description`.
3. Agregá la URL a `site.nav` en `src/_data/site.json`.

### Agregar un post del blog

1. Creá un archivo `.md` en `src/blog/` (ej: `src/blog/mi-post/index.md`).
2. Agregá front matter:

```yaml
---
title: Título del Post
description: Descripción breve para meta tags.
layout: post.njk
tags: post
scripts:
  - form
heroImage: pexels-mart-production-8872592.jpg
heroTitle: "Nuestros artículos del blog"
date: 2026-07-10
dateModified: 2026-07-12
author: Tu Nombre
category: Categoría
ogImage: /assets/images/blog/mi-post/imagen.jpg
image: /assets/images/blog/mi-post/imagen.jpg
excerpt: "Extracto del post para listing y RSS."
---

Contenido del post en Markdown.

## Subtítulo

Más contenido...
```

3. Colocá la imagen del post en la ruta especificada en `image`.

### Agregar un servicio

1. Creá un archivo `.njk` en `src/servicios/` (ej: `src/servicios/nuevo/index.njk`).
2. Usá `layout: base.njk` y copiá la estructura de un servicio existente.
3. Agregá el servicio a `site.services` en `src/_data/site.json`.

### Estructura de directorios

```
src/
├── _data/
│   ├── site.json          # Configuración global del sitio
│   └── social.json        # Links de redes sociales
├── _includes/
│   ├── layouts/
│   │   ├── base.njk       # Layout base (todas las páginas)
│   │   └── post.njk       # Layout de posts del blog
│   ├── hero.njk           # Hero completo (homepage)
│   ├── hero-simple.njk    # Hero simplificado (subpáginas)
│   ├── og-seo.njk         # Open Graph + Twitter Cards
│   ├── jsonld.njk         # JSON-LD structured data
│   ├── card-post-preview.njk  # Card de post para listing
│   ├── blog-sidebar.njk   # Sidebar del blog
│   ├── form-contacto.njk  # Formulario de contacto
│   ├── form-presupuesto.njk # Formulario de presupuesto
│   └── icons/             # Iconos SVG inline
├── assets/
│   ├── css/main.css       # Estilos (vanilla CSS)
│   ├── js/
│   │   ├── main.js        # Nav, scroll buttons
│   │   ├── form.js        # AJAX form submission
│   │   └── blog.js        # Filtrado y paginación
│   ├── fonts/             # Fuentes self-hosted
│   └── images/            # Imágenes originales
├── blog/
│   ├── index.njk          # Listing del blog
│   └── mi-post/index.md   # Posts en Markdown
├── servicios/
│   ├── index.njk          # Listing de servicios
│   └── servicio/index.njk # Páginas de servicio
├── contacto/index.njk     # Página de contacto
├── index.njk              # Homepage
├── 404.njk                # Página de error
├── sitemap.njk            # Generador de sitemap.xml
├── rss.njk                # Generador de feed.xml
├── manifest.njk           # Generador de manifest.webmanifest
└── robots.njk             # Generador de robots.txt
```

---

## Despliegue

Este boilerplate genera un sitio 100% estático. La carpeta `_site/` contiene todo lo necesario para desplegar.

### Build de producción

```bash
npm run build
```

Este comando:
- Compila todas las plantillas a HTML
- Procesa imágenes a AVIF, WebP y JPEG en múltiples resoluciones
- Minifica HTML, CSS y JS
- Optimiza SVGs con SVGO
- Genera sitemap.xml, feed.xml, robots.txt y manifest.webmanifest

### Cualquier hosting estático

El sitio funciona en cualquier hosting que sirva archivos estáticos:

| Hosting | Configuración |
|---|---|
| **Netlify** | Detecta Eleventy automáticamente. Build command: `npm run build`, publish directory: `_site`. |
| **Vercel** | Framework preset: "Eleventy". Build command: `npm run build`, output directory: `_site`. |
| **Cloudflare Pages** | Build command: `npm run build`, output directory: `_site`. |
| **GitHub Pages** | Copiá el contenido de `_site/` a la rama `gh-pages` o usá GitHub Actions. |
| **Apache / Nginx** | Subí los archivos de `_site/` al directorio raíz del servidor. |

### Headers recomendados

Para maximizar el rendimiento, configurá estos headers en tu hosting:

```
# Cache agresivo para assets versionados
/assets/**/*  Cache-Control: public, max-age=31536000, immutable

# HTML sin cache (siempre fresco)
/*.html       Cache-Control: no-cache

# Compresión
Content-Encoding: gzip
Content-Encoding: br
```

### Formularios

Los formularios usan [Formspree](https://formspree.io/) como backend. Para configurarlos:

1. Creá una cuenta gratuita en Formspree.
2. Creá un endpoint para cada formulario (contacto, presupuesto, newsletter).
3. Reemplazá los IDs en `src/_data/site.json` → `forms`.

---

## Rendimiento

### Métricas Lighthouse (build de producción)

| Categoría | Puntuación |
|---|---|
| Performance | 95-100 |
| Accesibilidad | 95-100 |
| SEO | 95-100 |
| Best Practices | 95-100 |

### Optimizaciones implementadas

- **Critical CSS inline**: Todo el CSS se inyecta en `<style>`. Cero requests de stylesheets.
- **Imágenes responsivas**: Generación automática de AVIF/WebP/JPEG con `<picture>` + `srcset`.
- **Font preload**: Mulish WOFF2 se precarga con `font-display: swap`.
- **JS diferido**: Todos los scripts usan `defer`. Carga condicional por página.
- **HTML minificado**: En producción, se eliminan comentarios, espacios y atributos redundantes.
- **Cache-busting**: Los archivos JS incluyen hash MD5 en la URL.
- **Fetch priority**: Imágenes hero con `fetchpriority="high"` y `loading="eager"`.
- **Lazy loading**: Imágenes below-the-fold con `loading="lazy"` y `decoding="async"`.

### SEO implementado

- **Meta tags**: Title, description, canonical por página.
- **Open Graph**: title, description, image, url, type, locale, site_name.
- **Twitter Cards**: summary_large_image con site y creator.
- **JSON-LD**: Organization + WebSite (homepage), Article (blog), BreadcrumbList (subpáginas).
- **Sitemap XML**: Generado automáticamente con prioridades y frecuencias.
- **RSS Feed**: Feed 2.0 con todos los posts.
- **robots.txt**: Con referencia al sitemap.
- **Semantic HTML**: header, nav, main, footer, article, section, aside.
- **Heading hierarchy**: h1 único por página, h2 para secciones, h3 para subsecciones.

### Accesibilidad implementada

- **Skip navigation**: Enlace "Saltar al contenido principal" visible al hacer focus.
- **ARIA labels**: Nav, hamburger, botones sociales, WhatsApp, volver arriba.
- **aria-current="page"]**: Enlace activo en la navegación.
- **aria-expanded**: Toggle del menú hamburguesa.
- **aria-live="polite"]**: Notificaciones de formularios.
- **Focus visible**: Outline visible solo por teclado.
- **Form labels**: Todos los inputs tienen `<label>` asociado.
- **Alt text**: Requerido por el shortcode de imágenes (lanza error si falta).

---

## Licencia

MIT
