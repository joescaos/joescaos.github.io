# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at http://localhost:5173
npm run build     # TypeScript check + Vite production build → dist/
npm run preview   # serve the dist/ build locally
npm run lint      # ESLint
```

## Deploy

Push to `main` — GitHub Actions builds and deploys to the `gh-pages` branch automatically. Never commit to `gh-pages` directly. Workflow: `.github/workflows/deploy.yml`.

## Architecture

Single-page portfolio served statically on GitHub Pages (joescaos.github.io). React 18 + Vite + TypeScript + Tailwind CSS v3. Always-dark theme (`class="dark"` on `<html>`).

**Data layer** — `src/data/portfolio.ts` exports `getPortfolioData()` (a plain function, not a hook). All CV content lives here. Translatable strings store i18n keys as values; raw strings (company names, tech stacks, contact info) are stored literally. When a backend is added later, this function becomes `async` and components switch to `useQuery` — no structural refactoring needed.

**i18n** — `react-i18next` initialized in `src/i18n/index.ts`, imported once in `src/main.tsx`. Translations in `src/i18n/locales/en.json` and `es.json`. Language persists via `localStorage` key `portfolio_lang`. Toggle rendered in the Navbar via `LanguageToggle`.

**Sections** scroll order: Hero → About → Experience → Education → Skills → Certifications → Projects → Contact. Each section is a component in `src/components/sections/` wrapped with `SectionWrapper` (handles the fade-in-on-scroll animation via `IntersectionObserver`).

**Navbar** — fixed, uses `useActiveSection` hook (`src/hooks/useActiveSection.ts`) to highlight the current section via `IntersectionObserver` on all section IDs.

**Tailwind custom tokens** (defined in `tailwind.config.js`):
- `surface-base / elevated / subtle / border` — background layers
- `ink-primary / secondary / muted` — text hierarchy
- `accent / accent-hover / accent-dim` — interactive elements (`#58A6FF` blue)

**Adding content**: edit `src/data/portfolio.ts` and add matching keys to both `en.json` and `es.json`.
