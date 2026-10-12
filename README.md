# underctrl.es · web corporativa de UnderControl

React 19 + Vite 8. Sin cookies ni servicios externos (las fuentes IBM Plex van incluidas).
Diseño basado en la skill `ui-ux-pro-max` (instalada en `../.claude/skills/ui-ux-pro-max`).

## Desarrollo

```bash
cd web
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/
npm run preview    # sirve dist/ en local
```

## Antes de publicar

1. **Datos legales**: rellena los campos `[COMPLETAR]` de `src/config.js` (titular, NIF, domicilio).
   Salen en el Aviso legal y en la Política de privacidad, y la LSSI obliga a mostrarlos.
2. **Email del formulario**: en hPanel → Emails, crea `info@underctrl.es` (recibe los mensajes)
   y `no-reply@underctrl.es` (remitente). Si usas otros, cámbialos arriba de `public/contact.php`.

## Subir a Hostinger

1. `npm run build`
2. hPanel → Sitios web → underctrl.es → **Administrador de archivos** → `public_html`.
3. Borra el `default.php` de Hostinger, si existe, y sube **el contenido** de `dist/`
   (no la carpeta). Lo más rápido es subir `underctrl-dist.zip` y usar «Extraer».
   Comprueba que `.htaccess` está (es un archivo oculto).
4. hPanel → Seguridad → **SSL**: activa el certificado gratuito. El `.htaccess` ya redirige
   a `https://underctrl.es` (sin www).
5. Prueba el formulario de contacto. `contact.php` necesita PHP 8.1 o superior
   (hPanel → Avanzado → Configuración de PHP).

Para generar el ZIP: `npm run build && cd dist && zip -r ../underctrl-dist.zip . && cd ..`

## Idiomas

La web está en español (`/`), inglés (`/en`), portugués (`/pt`) y catalán (`/ca`). El selector del menú
lleva a la misma página en el otro idioma, y cada página declara sus alternativas `hreflang` para Google.

- Textos: `src/i18n/es.js`, `en.js`, `pt.js` y `ca.js` (misma estructura; el español es la referencia).
- Rutas traducidas de las páginas legales: `SLUGS` en `src/i18n/index.jsx`.
- Para añadir un idioma: copia `en.js`, tradúcelo, regístralo en `LANGS`, `SLUGS` y `dicts` de `index.jsx`
  y añade sus URL a `public/sitemap.xml`.

## Movimiento

Criterios de la skill `design-motion-principles` (instalada en `../.claude/skills/`).
Contexto: web corporativa → Jakub (pulido invisible) como lente principal, Jhey secundario y Emil para menús y formularios.

- **Solo animan al aparecer tres momentos con intención**: la maqueta del hero (opacity + translateY + blur),
  el ticket del 303 que se «imprime» al verlo (clip-path, una vez) y el resultado del formulario.
- **El texto nunca se anima**: titulares, párrafos y tarjetas están quietos para leerse al instante.
- **Interacción**: pulsar un botón escala a 0,97 (120 ms); hover 160 ms; menús 180 ms al abrir y más rápido al cerrar;
  el selector de idioma nace del botón (`transform-origin`).
- **Curvas propias** (`--ease-out`, `--ease-in`, `--ease-reveal` en `global.css`), nunca `ease` a secas.
  Solo se anima `transform`, `opacity`, `filter` y `clip-path`.
- **`prefers-reduced-motion`**: todo queda en su estado final, sin desplazamientos.

## Qué hay dentro

| Ruta | Contenido |
|------|-----------|
| `/` | Inicio: hero, integraciones, áreas, cómo funciona, autónomos, funciones, público, seguridad, FAQ y contacto |
| `/aviso-legal`, `/privacidad`, `/cookies` | Páginas legales (y sus versiones en `/en`, `/pt`, `/ca`) |
| `public/.htaccess` | HTTPS, rutas de React (SPA), cabeceras de seguridad y caché |
| `public/contact.php` | Envío del formulario por email (honeypot y límite por IP) |
| `public/sitemap.xml`, `robots.txt`, `og-image.png` | SEO y vista previa al compartir |

Los textos están en `src/pages/Home.jsx` y los estilos (tokens de color y tipografía) en `src/styles/global.css`.
