# Content Publishing & Git Workflow Guide

**Project:** Aman Maurya — Mechanical Design Engineering Portfolio  
**Philosophy:** Transparent, Git-based static content management without hardcoded secrets or fake credentials.

---

## 1. The Publishing Flow

Because this website runs as a static site hosted on GitHub Pages, browser applications cannot silently rewrite files on disk or commit to Git directly without exposing private personal access tokens.

Instead, the website uses a **Safe, Verified Publishing Lifecycle**:

```text
Edit in Studio CMS → Local Draft (Browser) → Schema Validation → Live Multi-Device Preview → Export JSON → Copy to Repository → Git Commit & Push → GitHub Actions Build & Deploy
```

---

## 2. Step-by-Step Content Publishing Workflow

### Step 1: Edit in Content Studio
- Access the Studio via `/admin.html` or by clicking the **Content Studio** icon in the website navbar.
- Make changes to your projects, education records, CAD gallery, or bio paragraphs.
- Changes are preserved as a local draft in your browser's `localStorage`.

### Step 2: Validate & Preview
- Use **Live Preview** to inspect how the changes render across:
  - **Desktop** (100% full width)
  - **Tablet** (768px frame)
  - **Mobile** (375px frame)
- Check the **Runtime Schema Validation** card in the Overview tab to ensure 0 errors.

### Step 3: Export Validated JSON
- In the Studio header or **Import & Export** tab, click **Export portfolio.json**.
- Save the downloaded file (`Aman_Maurya_Mechanical_Portfolio_YYYY-MM-DD.json`).

### Step 4: Apply to Your Local Repository
- Copy the exported file to:
  ```text
  src/data/portfolio.json
  ```
  *(Overwriting the existing `portfolio.json` file).*
- If you added new CAD project photographs or certificates, copy the files into:
  ```text
  public/assets/
  ```

### Step 5: Test Locally (Pre-Flight Check)
Run the automated check commands in your terminal:
```bash
# Verify TypeScript types and schema
npm run lint

# Verify production Vite build
npm run build
```

### Step 6: Commit and Push to Deploy
```bash
git add src/data/portfolio.json public/assets/
git commit -m "Update mechanical portfolio content"
git push origin main
```
GitHub Actions will automatically pick up the commit, compile the production bundle, and publish it to GitHub Pages within 1–2 minutes!
