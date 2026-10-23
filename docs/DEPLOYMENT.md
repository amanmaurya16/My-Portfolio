# GitHub Pages Deployment & CI/CD Guide

**Project:** Aman Maurya — Mechanical Design Engineering Portfolio  
**Target:** Static Site Deployment on GitHub Pages (`base: './'`)  
**CI/CD Engine:** GitHub Actions (`.github/workflows/deploy.yml`)

---

## 1. Architecture Overview

The portfolio is architected as a pure static Single Page Application (SPA) built with React 19, TypeScript, and Vite. It contains zero server-side runtime dependencies (no Express, Firebase, or Node server required in production).

- **Source Code Repository:** `https://github.com/amanmaurya16/My-Portfolio`
- **Deployment Destination:** `https://amanmaurya16.github.io/My-Portfolio/`
- **Output Directory:** `dist/`

---

## 2. GitHub Actions Deployment Pipeline

The workflow defined in [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) automatically triggers on every push to the `main` branch or via manual trigger (`workflow_dispatch`).

### Workflow Steps:
1. **Checkout:** Clones the repository using `actions/checkout@v4`.
2. **Setup Node:** Sets up Node.js 20 with npm caching via `actions/setup-node@v4`.
3. **Clean Install:** Runs `npm ci` for deterministic dependency resolution.
4. **Code Validation:** Runs `npm run lint` (`tsc --noEmit`) to verify zero TypeScript errors.
5. **Static Build:** Executes `npm run build` (`vite build`) outputting optimized assets to `./dist`.
6. **Artifact Upload:** Packs the static artifact using `actions/upload-pages-artifact@v4`.
7. **Deployment:** Deploys artifact to GitHub Pages with `actions/deploy-pages@v4`.

---

## 3. GitHub Pages Repository Settings Configuration

To ensure GitHub Actions can deploy the site, verify the repository settings:

1. Navigate to your repository on GitHub: `https://github.com/amanmaurya16/My-Portfolio/settings/pages`.
2. Under **Build and deployment > Source**, select:
   - **GitHub Actions** (Do NOT choose "Deploy from a branch").
3. Ensure Workflow permissions are configured:
   - Go to **Settings > Actions > General > Workflow permissions**.
   - Select **Read and write permissions** (or ensure `pages: write` and `id-token: write` are permitted).

---

## 4. Custom Domain Setup (Optional)

If you configure a custom domain (e.g. `amanmaurya.com`):
1. In `public/CNAME`, add your custom domain.
2. In GitHub repository settings under **Pages > Custom domain**, enter `amanmaurya.com`.
3. Because Vite uses `base: './'`, asset URLs are relative and work seamlessly on both subpaths (`/My-Portfolio/`) and root domains (`/`).

---

## 5. Rollback Procedure

If a deployed update contains an unintended mistake:
```bash
# 1. Inspect recent commits
git log --oneline -5

# 2. Revert the last commit
git revert HEAD

# 3. Push to main branch (GitHub Actions will rebuild and deploy the previous state)
git push origin main
```
