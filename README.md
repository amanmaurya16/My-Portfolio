# Aman Maurya — Mechanical Design Portfolio

> Production-ready, responsive, and accessible Mechanical Design Engineering Portfolio showcasing 2D AutoCAD drafting, SolidWorks 3D parametric modeling, machine mechanisms, ASME Y14.5 GD&T standards, and academic credentials.

[![Deploy to GitHub Pages](https://github.com/amanmaurya16/My-Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/amanmaurya16/My-Portfolio/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)](https://vitejs.dev/)

---

## 👤 Profile & Engineering Identity

- **Engineer:** Aman Maurya
- **Role:** Mechanical Engineering Student / Aspiring Mechanical Design Engineer
- **Current Institution:** Central Institute of Petrochemicals Engineering & Technology (CIPET), Jaipur (B.Tech Mechanical, 3rd Year — **CGPA: 7.35**)
- **Diploma:** Government Polytechnic College, Nawa (Didwana - Kuchaman) — **CGPA: 9.34** (*Best Student of Mechanical Engineering Award*)
- **Core Engineering Disciplines:**
  - SolidWorks 3D Parametric Part, Multi-body Assembly, Weldments, and Sheet Metal Modeling
  - AutoCAD 2D Engineering Drafting & Orthographic Sectional Blueprints
  - ASME Y14.5 Geometric Dimensioning & Tolerancing (GD&T)
  - Machine Mechanisms (6-Slot Geneva Wheel Mechanism, Solar Tracking Systems)
  - Industrial Railway Coach Maintenance & Air Brake / FIBA Systems (Indian Railways Training)

---

## 🛠️ Architecture & Tech Stack

This project is a high-performance, statically-deployable web application built for **GitHub Pages**:

- **Framework:** React 19 + TypeScript (Strict typing, zero `any`)
- **Build Tool:** Vite 8 (Output: Static HTML/CSS/JS in `./dist`)
- **Styling:** Tailwind CSS 4 with custom CAD engineering design tokens
- **Data Source of Truth:** `src/data/portfolio.json` (canonical repository data)
- **Data Access Boundary:** `src/services/portfolioRepository.ts` (draft management, runtime schema validation, import/export)
- **Asset Manager:** `src/services/localAssetManager.ts` & `public/assets/` (base-path resolution, format/size validation)
- **Hosting:** GitHub Pages (Static hosting — 0 server process required)
- **CI/CD:** Automated GitHub Actions pipeline ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))

---

## 🚀 Quickstart & Commands

```bash
# 1. Install dependencies reproducibly
npm ci

# 2. Start local development server
npm run dev

# 3. Run TypeScript type checks and linting
npm run lint

# 4. Compile optimized production static build
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 📚 Documentation & Guides

Comprehensive guides are available in the [`docs/`](docs/) directory:

- 📖 [**Admin Studio Guide**](docs/ADMIN_GUIDE.md): How to use the full visual Content Management Studio at `/admin.html`.
- 🚀 [**Publishing Workflow**](docs/CONTENT_PUBLISHING.md): Step-by-step guide on editing drafts, exporting JSON, and committing to Git.
- ⚙️ [**Deployment Guide**](docs/DEPLOYMENT.md): Detailed GitHub Pages configuration, GitHub Actions workflow, and custom domain setup.
- 🔒 [**Security Architecture**](docs/SECURITY.md): Transparent static security model, privacy policies, and zero-secret commitment.

---

## 🖥️ Content Management & Live Preview

Aman can manage all portfolio content through the built-in Content Studio without editing React code:
- **Standalone Studio:** Navigate to `/admin.html`
- **In-App Modal:** Click the **Content Manager** (`Sliders`) button in the navbar or top toolbar.
- **Features:** Full CRUD for Projects, Education, Competencies, Internships, Certifications, and Gallery; Reorder Up/Down; Live Multi-Device Preview (Desktop, Tablet 768px, Mobile 375px); Runtime Schema Validation; and 1-Click JSON Export.

---

## 📬 Contact & Verified Inquiries

- **Email:** [amanmauryaji16@gmail.com](mailto:amanmauryaji16@gmail.com)
- **LinkedIn:** [linkedin.com/in/aman-maurya-80700a301](https://www.linkedin.com/in/aman-maurya-80700a301/)
- **Location:** Jaipur, Rajasthan, India
- **Direct Web Inquiries:** Powered via Formspree with local backup persistence.
- *(Note: Per explicit privacy instruction, phone numbers have been permanently purged from all source files).*
