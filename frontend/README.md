# Portfolio Frontend (React + Vite)

Static React frontend for ronnie-legaspi.vercel.app — no backend calls yet.
All content comes from `src/content.json` and `src/content.js`; interactive
features show an "under construction — backend implementing soon" modal until
the Laravel API in `../app` is ready.

```bash
npm install
npm run dev       # dev server
npm run build     # production build (dist/)
npm run preview   # serve the production build locally
```

- Routing: React Router (`/`, `/gallery`, `/pricing`, `/blog`, `/blog/:slug`)
- Styling: Tailwind (CDN, dark mode via `class`)
- SBIRS screenshots: drop images into `src/assets/projects/sbirs/` and rebuild —
  they show as an auto-looping slideshow on the project card
- Vercel: root directory `frontend`, framework preset Vite; `vercel.json`
  rewrites all routes to `index.html`
