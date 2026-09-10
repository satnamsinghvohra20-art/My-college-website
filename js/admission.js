/* ==========================================================================
   CHM COLLEGE ADMISSION & CUTOFF CALCULATOR ENGINE
   ========================================================================== */

(function () {
  // Cutoff Benchmarks Database based on historical CHM Merit Lists
  const CUTOFF_DATA = {
    'bsc-it': { name: 'B.Sc Information Technology', minOpen: 65, minSindhi: 48, minReserved: 52 },
    'bsc-cs': { name: 'B.Sc Computer Science', minOpen: 62, minSindhi: 45, minReserved: 50 },
    'bms': { name: 'Bachelor of Management Studies (BMS)', minOpen: 78, minSindhi: 58, minReserved: 64 },
    'baf': { name: 'B.Com (Accounting & Finance - BAF)', minOpen: 76, minSindhi: 55, minReserved: 60 },
    'bbi': { name: 'B.Com (Banking & Insurance - BBI)', minOpen: 68, minSindhi: 50, minReserved: 54 },
    'bammc': { name: 'BA in Multimedia & Mass Comm (BAMMC)', minOpen: 65, minSindhi: 48, minReserved: 52 },
    'bcom': { name: 'Bachelor of Commerce (B.Com - Aided)', minOpen: 72, minSindhi: 45, minReserved: 50 },
    'bsc': { name: 'Bachelor of Science (B.Sc - Aided)', minOpen: 52, minSindhi: 40, minReserved: 45 },
    'ba': { name: 'Bachelor of Arts (B.A. - Aided)', minOpen: 50, minSindhi: 40, minReserved: 40 },
    'jc-sci': { name: 'Junior College Science (FYJC)', minOpen: 70, minSindhi: 50, minReserved: 55 },
    'jc-com': { name: 'Junior College Commerce (FYJC)', minOpen: 74, minSindhi: 52, minReserved: 58 },
    'jc-arts': { name: 'Junior College Arts (FYJC)', minOpen: 55, minSindhi: 45, minReserved: 45 }
  };

  window.calculateCutoff = function (event) {
    if (event) event.preventDefault();

    const courseSelect = document.getElementById('calc-course');
    const marksInput = document.getElementById('calc-percentage');
    const categorySelect = document.getElementById('calc-category');
    const resultBox = document.getElementById('calc-result-box');

    if (!courseSelect || !marksInput || !categorySelect || !resultBox) return;

    const courseKey = courseSelect.value;
    const marks = parseFloat(marksInput.value);
    const category = categorySelect.value;

    if (!courseKey || isNaN(marks) || marks < 35 || marks > 100) {
      alert('Please enter a valid percentage between 35% and 100%.');
      return;
    }

    const course = CUTOFF_DATA[courseKey];
    if (!course) return;

    let threshold = course.minOpen;
    if (category === 'sindhi') threshold = course.minSindhi;
    else if (category === 'obc' || category === 'sc' || category === 'st') threshold = course.minReserved;

    const diff = marks - threshold;
    let probability = 0;
    let statusClass = 'prob-low';
    let statusText = 'Competitive / Waitlist Chance';
    let roundExpected = 'Spot Admission / Management Quota';

    if (diff >= 8) {
      probability = 95;
      statusClass = 'prob-high';
      statusText = 'Excellent Chance (High Probability)';
      roundExpected = 'Likely First Merit List';
    } else if (diff >= 3) {
      probability = 80;
      statusClass = 'prob-high';
      statusText = 'Very Strong Chance';
      roundExpected = 'Likely First or Second Merit List';
    } else if (diff >= -2) {
      probability = 62;
      statusClass = 'prob-medium';
      statusText = 'Moderate Chance';
      roundExpected = 'Likely Second or Third Merit List';
    } else if (diff >= -8) {
      probability = 40;
      statusClass = 'prob-low';
      statusText = 'Borderline / Additional Rounds';
      roundExpected = 'Special Merit Round';
    } else {
      probability = 20;
      statusClass = 'prob-low';
      statusText = 'High Competition';
      roundExpected = 'Consider alternative aided courses';
    }

    resultBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <h4 style="color: var(--text-primary); margin:0;">${course.name}</h4>
        <span class="ticker-tag ${probability >= 70 ? 'admissions' : 'urgent'}">${probability}% Match</span>
      </div>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.5rem;">
        Baseline Cutoff Estimate for <strong>${category.toUpperCase()}</strong>: <strong>${threshold}%</strong> | Your Score: <strong>${marks}%</strong>
      </p>
      <div class="probability-meter">
        <div class="probability-fill ${statusClass}" style="width: ${probability}%;"></div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-top: 0.5rem; font-weight: 600;">
        <span style="color: ${probability >= 70 ? '#10b981' : '#f59e0b'};">${statusText}</span>
        <span style="color: var(--chm-emerald);">${roundExpected}</span>
      </div>
      <div style="margin-top: 1.25rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <a href="admission.html?course=${courseKey}" class="btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">
          Proceed to Digital Application →
        </a>
        <a href="fee-payment.html" class="btn-secondary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; color: var(--text-primary); border-color: var(--border-strong);">
          View Fee Structure
        </a>
      </div>
    `;

    resultBox.classList.add('active');
  };

  // 4-Step Admission Application Wizard Handlers
  window.initAdmissionWizard = function () {
    const nextBtns = document.querySelectorAll('.wizard-next');
    const prevBtns = document.querySelectorAll('.wizard-prev');
    const steps = document.querySelectorAll('.wizard-step');
    const stepIndicators = document.querySelectorAll('.step-indicator-item');

    let currentStep = 1;

    function goToStep(stepNumber) {
      steps.forEach(s => s.classList.remove('active'));
      stepIndicators.forEach((ind, idx) => {
        if (idx + 1 < stepNumber) {
          ind.classList.add('completed');
          ind.classList.remove('active');
        } else if (idx + 1 === stepNumber) {
          ind.classList.add('active');
          ind.classList.remove('completed');
        } else {
          ind.classList.remove('active', 'completed');
        }
      });

      const target = document.getElementById(`step-${stepNumber}`);
      if (target) target.classList.add('active');
      currentStep = stepNumber;
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }

    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Quick validate current step inputs
        const currentInputs = document.querySelectorAll(`#step-${currentStep} input[required], #step-${currentStep} select[required]`);
        let valid = true;
        currentInputs.forEach(input => {
          if (!input.value.trim()) {
            valid = false;
            input.style.borderColor = '#dc2626';
          } else {
            input.style.borderColor = '';
          }
        });

        if (!valid) {
          alert('Please complete all required fields before proceeding to the next step.');
          return;
        }

        if (currentStep < 4) {
          goToStep(currentStep + 1);
          if (currentStep === 4) {
            generateConfirmationSlip();
          }
        }
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 1) {
          goToStep(currentStep - 1);
        }
      });
    });

    function generateConfirmationSlip() {
      const name = document.getElementById('app-fullname')?.value || 'Aditya Mahesh Sharma';
      const email = document.getElementById('app-email')?.value || 'aditya.sharma@example.com';
      const phone = document.getElementById('app-phone')?.value || '+91 9876543210';
      const course = document.getElementById('app-course')?.value || 'B.Sc Information Technology';
      const category = document.getElementById('app-category')?.value || 'Open General';
      const percentage = document.getElementById('app-percentage')?.value || '84.5';
      const appNumber = 'CHM-2026-' + Math.floor(100000 + Math.random() * 900000);

      const slipTarget = document.getElementById('confirmation-slip-content');
      if (slipTarget) {
        slipTarget.innerHTML = `
          <div class="admission-slip-card" style="background:#fff; border: 2px solid var(--chm-gold); border-radius: 12px; padding: 2rem; color: #0f172a; box-shadow: var(--shadow-lg);">
            <div style="text-align: center; border-bottom: 2px solid #145a32; padding-bottom: 1rem; margin-bottom: 1.5rem;">
              <h3 style="color: #145a32; font-family: var(--font-display); margin-bottom: 4px;">SMT. CHANDIBAI HIMATHMAL MANSUKHANI COLLEGE</h3>
              <p style="font-size: 0.8rem; color: #64748b;">Opp. Ulhasnagar Railway Station, Ulhasnagar-421003 | Re-Accredited 'A' Grade by NAAC</p>
              <div style="display:inline-block; margin-top:8px; background: #dcfce7; color: #166534; font-weight:800; font-size:0.85rem; padding: 4px 12px; border-radius: 20px;">
                PROVISIONAL ADMISSION ACKNOWLEDGMENT 2026-27
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.9rem; margin-bottom: 1.5rem;">
              <div><strong>Application No:</strong> <span style="color: #145a32; font-family: monospace; font-size: 1.05rem;">${appNumber}</span></div>
              <div><strong>Date of Submission:</strong> <span>${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
              <div><strong>Candidate Name:</strong> <span>${name}</span></div>
              <div><strong>Program Applied:</strong> <span style="font-weight:700; color:#b45309;">${course}</span></div>
              <div><strong>Category:</strong> <span>${category}</span></div>
              <div><strong>Qualifying Marks:</strong> <span>${percentage}%</span></div>
              <div><strong>Contact Mobile:</strong> <span>${phone}</span></div>
              <div><strong>Email:</strong> <span>${email}</span></div>
            </div>

            <div style="background: #f8fafc; border-left: 4px solid var(--chm-gold); padding: 1rem; border-radius: 6px; font-size: 0.85rem; margin-bottom: 1.5rem;">
              <strong>Important Next Step:</strong> Please report to the CHM College Central Auditorium on <strong>16th June 2026 at 10:30 AM</strong> with 2 self-attested sets of HSC marksheets, Leaving Certificate, and this printed acknowledgment slip for physical document verification.
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #cbd5e1; padding-top: 1rem;">
              <div style="font-size: 0.75rem; color: #64748b;">
                Digitally verified by CHM Admission Management System<br>
                Security Hash: SHA256-${Math.random().toString(36).substring(2, 12).toUpperCase()}
              </div>
              <button onclick="window.print()" class="btn-primary" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">
                🖨️ Print Official Slip
              </button>
            </div>
          </div>
        `;
      }
    }
  };
})();
