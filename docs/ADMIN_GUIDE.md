# Content Studio & Admin Guide

**Project:** Aman Maurya — Mechanical Design Engineering Portfolio  
**Interface:** Mechanical Design Studio CMS (`/admin.html`)

---

## 1. Accessing the Content Studio

You can access the Studio in two ways:
1. **Dedicated Fullscreen Studio:** Navigate to `admin.html` in your browser (e.g. `http://localhost:3000/admin.html` or `https://amanmaurya16.github.io/My-Portfolio/admin.html`).
2. **In-Page Studio Modal:** Click the **Content Manager** (`Sliders`) button in the website navbar or top toolbar.

---

## 2. Managing Content Sections

### A. Overview & Metrics
- Displays real-time counts calculated directly from your portfolio data (Projects, Qualifications, Competencies, Internships, Certifications, Gallery Items).
- Displays Schema Validation status (ensuring all mandatory fields, stable unique IDs, and valid arrays are maintained).

### B. Profile & About
- Edit your Full Name, Professional Title, Hero Bio, and About Me paragraphs.
- Select your Profile Portrait (`assets/aman-profile.jpg`) or 3D Engine Model (`assets/hero-engine.jpg`) using the visual **Asset Picker**.

### C. Education Timeline
- Manage records for CIPET IPT-Jaipur, Government Polytechnic College Nawa, Senior Secondary, and Secondary examinations.
- Preserve exact CGPA and percentage grades without alterations.
- Reorder entries up or down using the **Arrow** buttons.

### D. Technical Skills
- Organize skills into 4 engineering categories:
  - CAD Software & 3D Modeling (SolidWorks, AutoCAD)
  - Drafting & Engineering Standards (ASME Y14.5 GD&T)
  - Mechanical Concepts & Mechanisms (Geneva Drive, Linkages)
  - Industrial Practice & Workshop (Air Brake, CNC Wheel Lathe)
- Add, edit, or reorder competencies without fabricated percentage meters.

### E. Mechanical Projects Case Studies
- Manage detailed engineering records for Geneva Wheel Mechanism, Solar Tracking System, Machine Component Design, and Assembly Design.
- Support for **Duplicate Project** (1-click clone to rapidly create a new case study).
- Fill in: Title, Category, Engineering Objective, Mechanical Concept, CAD Tools, and Documented Outcomes.

### F. Industrial Internships
- Manage Indian Railways, CEG Jaipur, and MNIT Jaipur training records.
- Wire official certificate preview images with click-to-zoom.

### G. Awards & Certifications
- Manage professional CAD certificates (Digital CADD Solutions AutoCAD, SolidWorks) and academic honors (Best Student 9.34 CGPA, PRISMA TechFest awards).

### H. CAD Gallery Repository
- Inspect all 29 models and engineering drawings.
- Verified badges indicate whether a file is already committed under `public/assets/`.

### I. Settings & Contact
- Manage email, location, LinkedIn, and Formspree contact endpoint.
- *(Note: Phone number 91 9257766762 has been permanently removed per privacy instruction).*

---

## 3. Live Multi-Device Preview

Click the **Preview** button in the header at any time to open the Live Preview mode:
- **Desktop (100%):** View widescreen responsiveness.
- **Tablet (768px):** Verify card grids and timeline wrapping on iPad viewports.
- **Mobile (375px):** Test mobile hamburger menu, vertical timeline, and touch targets.
- Click **Return to Studio Editor** at any time without losing working edits.

---

## 4. Resetting & Safety
- **Discard Edits:** Discards in-memory changes and restores your last saved browser draft.
- **Reset to Canonical Data:** Clears all browser storage and reloads original repository content from `src/data/portfolio.json`.
