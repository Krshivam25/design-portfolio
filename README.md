# Neha Nayak — Interior Design Portfolio

Responsive portfolio website for Neha Nayak, an interior designer based in Dubai, UAE — featuring seven projects spanning architectural concept design, landscape design & execution, residential renovation, and commercial interiors.

Built as a fully static site: plain HTML, CSS, and vanilla JavaScript. No build step, no dependencies.

## Structure

- `index.html` — landing page (hero, about, project grid, contact)
- `projects/` — one detail page per project with plans, elevations, mood boards, and renders
- `css/style.css` — shared design system (responsive, mobile-first)
- `js/main.js` — mobile nav, lightbox gallery, scroll-reveal
- `assets/img/` — web-optimized WebP imagery

## View locally

Open `index.html` directly in a browser, or serve it:

```sh
python3 -m http.server
# then visit http://localhost:8000
```

## Hosting

Any static host works (GitHub Pages, Netlify, Vercel). For GitHub Pages: Settings → Pages → deploy from the `main` branch.
