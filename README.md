# Harish Battula — AI/ML Researcher Portfolio

An editorial, chapter-based scientific portfolio built around a 10-chapter **Curiosity Arc** for **Harish Battula** (AI/ML Researcher at TCS Research).

- **Live Site:** https://thenovember22.github.io/harish-battula-portfolio/
- **Tech Stack:** React 18, TypeScript + `src/data/profile.js`, Vite, Tailwind CSS v4, `react-router-dom` (`HashRouter`), Lucide Icons.

---

## Local Development

Requires **Node.js 20+**:

```bash
npm install
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

---

## Editing Content

All copy, chapters, publication records, skills, career milestones, and `TODO` placeholder links live in one file:

```text
src/data/profile.js
```

Edit text, add PDF/code links, or update CV paths directly in `profile.js` without modifying any React components.

### Placeholders & Assets
1. **Portrait photo:** Bundled at `public/images/harish.jpg` (swap with a new photo using the same path if desired).
2. **Paper PDFs & Code Links:** Fill `EUSIPCO_2026_PDF`, `EUSIPCO_2026_CODE`, `INTERSPEECH_2025_PDF`, `EUSIPCO_2024_PDF`, and `IEEE_IAS_2023_PDF` in the `TODO` block inside `src/data/profile.js`.
3. **CV PDF:** Currently bundled at `public/Harish_Battula_CV.pdf` — replace with newer versions using the same filename.
4. **Open Graph Image:** Currently uses `public/og-image.svg` — swap to a `1200×630` PNG (`public/og-image.png`) and update `index.html` if social platforms require raster OG previews.

---

## Deploying to GitHub Pages

The repository includes `.github/workflows/deploy.yml`, which automatically runs `npm ci && npm run build` and publishes `./dist` to GitHub Pages on every push to `main`.

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```
