# Universal Calculator — Multi-Disciplinary Engineering, Science, Math & Finance Suite

A minimalist, high-precision, WCAG-accessible universal calculator web application covering Electronics, Basic Math, Advanced Scientific functions, Physics mechanics & heat, Finance EMI, BMI health, Unit Conversions, and Chemistry, paired with a legally audited compliance and risk-mitigation framework.

Designed with clean, professional engineering aesthetics ("no vibe-coded fluff", zero tracking, high-contrast typography, and strict privacy-by-design) to protect site operators from legal liabilities, ADA accessibility lawsuits, and regulatory penalties.

---

## ⚡ Features

### 1. Resistor Calculator Engine
- **2 to 6 Band Support:**
  - **2 Bands:** Digit 1, Multiplier (20% tolerance or zero-ohm jumpers)
  - **3 Bands:** Digit 1, Digit 2, Multiplier (standard 20% tolerance)
  - **4 Bands:** Digit 1, Digit 2, Multiplier, Tolerance (standard 5% or 10%)
  - **5 Bands:** Digit 1, Digit 2, Digit 3, Multiplier, Tolerance (precision 1% or 2%)
  - **6 Bands:** Digit 1, Digit 2, Digit 3, Multiplier, Tolerance, Temperature Coefficient (ppm/K)
- **Interactive SVG Graphic:** Real-time visual feedback rendering cylindrical ceramic/metal film resistor body with true color bands, metallic wire leads, and 3D sheen highlights. Interactive bands can be clicked directly to focus controls.
- **Dual Mode Operation:**
  - **Forward Calculation (Color → Resistance):** Computes nominal ohms ($\Omega, k\Omega, M\Omega, G\Omega$), absolute tolerance range ($R_{\min} - R_{\max}$), temperature coefficient, and EIA standard decade series matching (E12 / E24 / E96).
  - **Reverse Calculation (Resistance → Color):** Converts target resistance values and tolerance into optimal IEC color bands.
- **IEC 60062 Color Code Reference Table:** Complete reference for digits, multipliers, tolerance grades, and temperature coefficients.

### 2. Legal, Regulatory & Risk Protection Suite
- **Privacy Policy (`privacy-policy.html`):** Fully compliant with EU GDPR (Articles 12-22), UK GDPR, California CCPA/CPRA, and CalOPPA. Formally discloses zero tracking, data minimization, and user data rights.
- **Terms & Conditions (`terms.html`):** Protects against physical/electrical liability. Contains critical engineering disclaimers ("AS-IS", theoretical reference only, instruction to verify values with a calibrated DMM before energizing circuits).
- **Cookie & Local Storage Policy (`cookie-policy.html`):** Exhaustive technical audit of all `localStorage` keys used. Fully explains the EU ePrivacy Directive (Directive 2002/58/EC) strictly-necessary exemption.
- **Cookie Consent Notice:** Non-intrusive banner informing visitors of functional local storage, with "Accept Necessary" controls and persistent access.
- **Refund & Service Policy (`refund-policy.html`):** Clarifies that the utility is 100% free with no charges, while establishing a 30-day satisfaction guarantee and EU 14-day statutory withdrawal framework for any future commercial extensions.
- **Accessible Contact Form with Consent (`contact.html`):** Form collects only essential fields (Name, Email, Message) with an explicit, unbundled GDPR consent checkbox and privacy-friendly honeypot spam protection (no tracking captchas).

### 3. Accessibility & UX Compliance (WCAG 2.1 AA/AAA)
- **Accessible Focus Indicators:** High-contrast 3px outline rings on all interactive elements via `:focus-visible`.
- **Screen Reader Friendly:** Semantic HTML5, live calculation updates via `aria-live="polite"`, labels explicitly tied to inputs via `for`/`id`.
- **Keyboard Navigation:** Full tab stops, arrow navigation, Enter/Space activation, and an accessible "Skip to main content" link.
- **Zero Third-Party Tracking Embeds:** No Google Fonts or CDNs (uses native OS system fonts to prevent German GDPR IP-transfer liability), no external tracking pixels, no advertising networks.
- **100% Original Assets:** Custom SVGs and clean CSS. Zero copyrighted stock photos or external graphics.

---

## 🚀 How to Run the Website

Because this application is built with vanilla HTML5, CSS3, and ES6 JavaScript with zero dependencies:

### Quick Launch
1. Double-click `index.html` to open directly in any modern browser (Chrome, Firefox, Safari, Edge).
2. Or run a lightweight local web server using Python or Node.js:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using npx serve
   npx serve .
   ```
3. Open `http://localhost:8000` in your web browser.

---

## 📁 File Structure

```
├── index.html            # Main Resistor Calculator and Reference Chart
├── privacy-policy.html   # GDPR / CCPA / CalOPPA Privacy Policy
├── terms.html            # Terms of Use with Electrical Engineering Disclaimers
├── cookie-policy.html    # Cookie and Technical Storage Audit Policy
├── refund-policy.html    # Free Tool Disclosure & Commercial Refund Terms
├── contact.html          # Accessible Contact Form with Explicit Consent
├── styles.css            # Minimalist, high-contrast WCAG-compliant styling
├── calculator.js         # IEC 60062 calculation engine & SVG generator
├── app.js                # Cookie banner, contact form validation & navigation
└── README.md             # Project documentation and specifications
```

---

## 📜 Standards Citation
- **IEC 60062:** Marking codes for resistors and capacitors.
- **EIA-RS-279:** Color code for resistor markings.
- **WCAG 2.1:** Web Content Accessibility Guidelines (Level AA/AAA).
- **GDPR (Regulation (EU) 2016/679) & CCPA/CPRA.**

