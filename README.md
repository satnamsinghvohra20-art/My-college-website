# Smt. Chandibhai Himathmal Mansukhani College (CHM College)
## Enterprise Web Portal & Campus Management Suite (Next-Gen Edition)

An enterprise-grade, high-performance web portal and self-service student ERP suite designed specifically for **Smt. Chandibhai Himathmal Mansukhani College (CHM College)**, Ulhasnagar, under the **Hyderabad (Sind) National Collegiate (HSNC) Board**, affiliated with the **University of Mumbai** and re-accredited with **'A' Grade by NAAC**.

---

### 🌟 Key Enterprise Features

1. **Authentic Institutional Branding**: High-resolution official crest, NAAC 'A' Grade CGPA 3.12 badge, HSNC Board roots, and address from Principal Dr. Kishori Bhagat.
2. **Dual Language Toggle (`English` / `मराठी`)**: 1-click switcher for regional language compliance (*मराठी भाषा संवर्धन*) as mandated by the Maharashtra Higher Education Department and University of Mumbai.
3. **Interactive Campus Hotspot Canvas**: Floor-by-floor blueprint map of the Ulhasnagar campus with clickable pins for Admin Block, Science Laboratories, Central Library, Kundnani Auditorium, IT & Cloud Labs, and Sports Pavilion.
4. **Voice-Enabled AI Campus Concierge ("ChandiBot")**: 
   - Speech Synthesis (Audio text-to-speech `🔊`)
   - Speech Recognition Microphone (`🎤`)
   - 24/7 intelligent answering for cutoffs, Sindhi minority 50% quota rules, admissions, fees, and syllabi.
5. **Interactive Cutoff & Merit Calculator**: Real-time qualification predictor benchmarking student marks against historical CHM merit lists.
6. **4-Step Paperless Online Admission Desk**: Complete student profile, academic records, document upload simulator, and instant printable acknowledgment slip (`CHM-2026-XXXX`).
7. **Smart Fee Payment & Verified E-Receipt**: Itemized fee breakdown with UPI QR code simulator and print-ready official receipt with verification QR code.
8. **Student & Faculty ERP Suite**:
   - Circular SVG Attendance Gauge (86.4% Good Standing)
   - 3D Flip Digital Student Smart ID Card with library barcode
   - Printable Semester Hall Ticket with timetable
   - Central Railway Student Concession & Bonafide Certificate Generator
   - Classroom Dynamic QR Attendance Projector HUD (Anti-proxy real-time check-in counter)
9. **Examination & Result Portal**: Instant PRN/Seat lookup for Semester Statements of Marks and downloadable exam timetables.
10. **Central Library OPAC**: Real-time search across 60,000+ catalog titles with shelf locations and availability.

---

### 📂 File Structure

```
├── index.html              # Master College Homepage & Comprehensive Portal
├── admission.html          # 4-Step Online Admission Wizard & Confirmation Slip
├── fee-payment.html        # Fee Payment Gateway Simulator & Print-Ready Receipt
├── portal.html             # Student & Faculty ERP Dashboard (ID Card, Hall Ticket, QR Projector)
├── exams.html              # Examination Results Search, Timetables & Marksheet
├── css/
│   ├── theme.css           # Institutional color tokens (Emerald, Gold, Dark Mode)
│   ├── components.css      # Reusable UI cards, tickers, modals, ChandiBot window
│   └── responsive.css      # Mobile, tablet, high-DPI desktop & print rules
├── js/
│   ├── app.js              # Theme switcher, accessibility scaler, sliders, OPAC, Marathi I18N
│   ├── ai-bot.js           # ChandiBot AI Campus Assistant with Web Speech Synthesis & Recognition
│   ├── admission.js        # Cutoff probability calculator & admission wizard
│   ├── fee-system.js       # Fee schedule calculator, UPI simulator, receipt generator
│   ├── student-portal.js   # Student ERP state, attendance chart, 3D card flip, bonafide & QR HUD
│   └── exam-portal.js      # Statement of grades & exam result search
└── assets/
    └── images/             # Authentic CHM logo, campus slides, facilities, and principal portrait
```

---

### 🚀 How to Run Locally

You can run this project using any local HTTP server:

#### Option A: Python
```bash
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

#### Option B: Node.js / npx serve
```bash
npx serve .
```

#### Option C: VS Code Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

### 📜 Licensing & Rights
Developed for commercial pitch and institutional adoption by Smt. Chandibhai Himathmal Mansukhani College & HSNC Board. All rights reserved © 2026.
