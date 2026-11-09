# ⚡ Universal Calculator

> **Multi-Disciplinary Engineering, Science, Mathematics & Finance Suite**  
> *A high-precision, 100% client-side web application built with vanilla HTML5, modern CSS3, and ES6 JavaScript. Zero tracking, zero telemetry, fully WCAG AA/AAA accessible, and hardened against OWASP vulnerabilities.*

---

## 🌐 Live Web Application Links

* 🚀 **Live on GitHub Pages:**  
  👉 **[https://jestes2058-coder.github.io/Universal-Calculator/](https://jestes2058-coder.github.io/Universal-Calculator/)**

* ⚡ **Live on Vercel:**  
  👉 **[Open on Vercel](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2Fjestes2058-coder%2FUniversal-Calculator)** *(One-click instant import & deployment)*

* 💻 **GitHub Repository:**  
  👉 **[https://github.com/jestes2058-coder/Universal-Calculator](https://github.com/jestes2058-coder/Universal-Calculator)**

---

## 📱 Full-Screen Modern Web Architecture

* **100% Responsive Edge-to-Edge Design:** Fills standard, widescreen, and ultrawide desktop monitors seamlessly without floating margins or tiny boxes.
* **Large High-Precision Digital LCD:** Massive 52px calculation display with real-time multi-step formula lines and metric summaries.
* **Zero External Runtime Dependencies:** Operates 100% offline inside any browser engine without requiring Node.js, databases, or cloud servers.
* **Zero Telemetry & Privacy-by-Design:** No Google Analytics, no tracking cookies, no external fonts, no third-party CDNs. Full compliance with EU GDPR (Articles 12–22) and California CCPA/CPRA.

---

## 🛠️ Complete Feature Suite (8 Core Disciplines)

### 1. ⚡ Electronics Suite
* **📷 AI Resistor Camera & Vision Scanner:** Point your webcam or smartphone camera at any physical through-hole resistor to identify its color bands and compute its resistance on the spot. Features live auto-scanning, HUD targeting reticle, optical pixel slice color clustering, interactive band fine-tuning, photo upload support, and an optional Neural AI Vision Agent for deep multimodal image reasoning.
* **Resistor Color Code (2 to 6 Bands):** Forward (Color → Resistance) and Reverse (Resistance → Color) calculations conforming to IEC 60062 / EIA-RS-279 with live scalable SVG resistor graphic.
* **Capacitor Code Decoder:** Decode 3-digit EIA codes (e.g. `104` = 100 nF), ceramic/tantalum tolerance codes, and compute stored charge ($Q = CV$) and electrostatic energy ($E = \frac{1}{2}CV^2$).
* **Diode & Zener Voltage Drop:** Models Silicon, Schottky, Germanium, and LEDs with forward current, dynamic resistance, and Zener reverse breakdown voltage regulation.
* **Transistor (BJT & MOSFET) Bias:** Calculates collector/drain currents, base/gate bias, saturation state, transconductance, and thermal dissipation warnings.
* **Circuit & LED Simulator:** Real-time LED series resistor calculations, current limiting, voltage rails, and component burnout protection warnings.
* **Parallel & Series Solvers:** Compute equivalent resistance, conductance, and voltage division for complex multi-resistor networks.
* **Conductor Resistivity:** Computes exact copper, aluminum, and wire gauge (AWG) resistance based on length, cross-sectional area, and temperature coefficients.
* **IEC 60062 Reference Table:** Built-in searchable table of multiplier bands, tolerance ratings, and temperature coefficients.

### 2. 🔢 Mathematics (Standard & Scientific)
* **Unified Math Mode:** Seamless instant toggle between **Normal (Standard)** and **Scientific** keypads.
* **Zero-Eval Mathematical Parser:** Built using a secure Shunting-Yard tokenized parser that satisfies strict Content Security Policies (`script-src 'self'`) without `eval()` or `Function()`.
* **Scientific Capabilities:** Trigonometric functions ($\sin, \cos, \tan, \arcsin, \arccos, \arctan$ in DEG/RAD), logarithms ($\log_{10}, \ln$), powers ($x^y, x^2, \sqrt{x}$), factorials ($n!$), constants ($\pi, e$), and full memory register ($MC, MR, M+, M-$).

### 3. ⚛️ Physics Suite
* **Kinematics:** Constant acceleration formulas ($v = v_0 + at$, $d = v_0t + \frac{1}{2}at^2$, $v^2 = v_0^2 + 2ad$).
* **Newton's 2nd Law & Momentum:** Force, mass, acceleration ($F = ma$), momentum ($p = mv$), and impulse calculations.
* **Work & Kinetic Energy:** Work ($W = F \cdot d$), kinetic energy ($E_k = \frac{1}{2}mv^2$), and gravitational potential energy ($E_p = mgh$).
* **Fluid Hydrostatic Pressure:** Computes fluid column pressure ($P = \rho gh$) in kPa, psi, and atmospheres.
* **Ohm's & Joule's Law:** Full electrical power triangle ($V = IR$, $P = VI = I^2R = \frac{V^2}{R}$).
* **Wave Mechanics:** Frequency, wavelength, and wave velocity ($v = f\lambda$).
* **Thermal Specific Heat:** Heat energy transfer ($Q = mc\Delta T$).

### 4. 💰 Financial Suite
* **EMI Loan & Mortgage Calculator:** Calculates monthly installment, total interest paid, total payment, and principal-to-interest ratio progress visualization.

### 5. 🏃 Fitness & Health Suite
* **BMI (Body Mass Index) Calculator:** Metric and Imperial BMI with visual color-coded WHO/CDC health category indicator (Underweight, Normal, Overweight, Obese).

### 6. 🔄 Unit Converter
* **Two-Way Interactive Converter:** Supports Length, Mass/Weight, Volume, Temperature (Celsius, Fahrenheit, Kelvin), Pressure, Energy, Power, and Digital Data Storage.

### 7. 🧪 Chemistry Suite
* **Molar Mass Calculator:** Chemical formula weight analysis.
* **Ideal Gas Law:** Computes pressure, volume, moles, or temperature ($PV = nRT$).
* **Solution Molarity:** Calculates concentration, solute moles, and solution volume ($M = \frac{n}{V}$).

---

## 🔒 Security Hardening & Compliance

* **Content Security Policy (CSP):** `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-ancestors 'none';`
* **HTTP Security Headers:** Enforces `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
* **Zero Dynamic Code Execution:** Zero `eval()`, zero `Function()`, zero `innerHTML` string injection on user inputs (uses safe DOM tree node construction).
* **Path Traversal Protection:** Hardened local `server.js` using canonical root resolution to prevent CWE-22 attacks.

---

## 🚀 How to Run Locally

### Option 1: Direct File Launch (No software needed)
Simply open `index.html` in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local Hardened Node.js Server
```bash
node server.js
```
Then visit: **`http://localhost:3000/`**

---

## 📄 License
This project is open-source under the MIT License.
