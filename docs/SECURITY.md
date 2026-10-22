# Security Architecture & Integrity Policy

**Project:** Aman Maurya — Mechanical Design Engineering Portfolio  
**Hosting Target:** GitHub Pages Static Hosting

---

## 1. Static Security Model (No Fake Authentication)

A common anti-pattern in static web applications is embedding a hardcoded password in frontend JavaScript and claiming it provides "secure admin login". In a static site, any user can inspect client JavaScript files or network bundles and extract embedded passwords or API keys.

**Our Policy:**
1. **Zero Hardcoded Secrets:** There are no passwords, personal access tokens, private keys, or API credentials embedded in the client code, JSON files, or localStorage.
2. **Transparent Studio Mode:** The Admin interface is explicitly documented and labeled as a local browser-based Content Management Studio.
3. **Read-Only Public Hosting:** The deployed website on GitHub Pages is strictly read-only. Edits made in the browser remain in the local browser's `localStorage` and cannot modify the public production site without an authenticated Git commit by the repository owner.
4. **Git-Gated Publishing:** Only authorized collaborators with write access to the GitHub repository can commit changes to the `main` branch and trigger the GitHub Actions deployment pipeline.

---

## 2. Privacy & Personal Information Protections

- **Phone Number Removal:** Per explicit user instruction, the phone number `91 9257766762` has been permanently purged from all source files, schemas, and public assets.
- **Verified Communication Channels:** Contact interactions are routed through verified professional channels:
  - Direct Email: `amanmauryaji16@gmail.com`
  - Formspree Contact Endpoint: `https://formspree.io/f/meaqjjan` (with local backup log in browser storage)
  - Verified LinkedIn: `https://www.linkedin.com/in/aman-maurya-80700a301/`

---

## 3. Data Integrity & Validation

- **Runtime Schema Validation:** All incoming data (via file imports or form submissions) is validated by [`src/services/portfolioRepository.ts`](../src/services/portfolioRepository.ts).
- **ID Uniqueness:** Arrays of projects, education items, internships, and gallery entries are checked for duplicate IDs to prevent key collisions.
- **Malicious Payload Mitigation:** Imported JSON is parsed with safe error handling preventing script injection or site crashes from corrupt payloads.
- **Safe External Links:** All external links use `target="_blank"` and `rel="noopener noreferrer"` to prevent tab-nabbing vulnerabilities.

---

## 4. Future Server-Side Publishing Options (Optional)

If a future requirement demands direct web-based publishing without using local Git commands:
1. Deploy a small backend microservice or serverless API (e.g. Cloudflare Worker or AWS Lambda) using secure OAuth 2.0 or GitHub App authentication.
2. Store the GitHub App private key strictly in encrypted server-side environment secrets.
3. Have the backend sign commits to GitHub on behalf of authenticated users.
4. **Never** attempt to achieve this by embedding a GitHub Personal Access Token in frontend client code.
