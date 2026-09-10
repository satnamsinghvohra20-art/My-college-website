/* ==========================================================================
   CHM COLLEGE SMART FEE PAYMENT & RECEIPT SYSTEM
   ========================================================================== */

(function () {
  const FEE_SCHEDULE = {
    'fyba': { name: 'FYBA (Bachelor of Arts - Aided)', tuition: 3000, lab: 0, library: 800, gymkhana: 600, exam: 1400, other: 700, total: 6500 },
    'fybcom': { name: 'FYBCom (Bachelor of Commerce - Aided)', tuition: 3000, lab: 0, library: 800, gymkhana: 600, exam: 1400, other: 900, total: 6700 },
    'fybsc': { name: 'FYBSc (Bachelor of Science - Aided)', tuition: 3000, lab: 2200, library: 800, gymkhana: 600, exam: 1400, other: 800, total: 8800 },
    'fybsc-it': { name: 'FY B.Sc (Information Technology - SFC)', tuition: 14000, lab: 6500, library: 1200, gymkhana: 800, exam: 2200, other: 1800, total: 26500 },
    'fybms': { name: 'FY Bachelor of Management Studies (BMS - SFC)', tuition: 12500, lab: 2500, library: 1200, gymkhana: 800, exam: 2200, other: 2300, total: 21500 },
    'fybaf': { name: 'FY B.Com (Accounting & Finance - BAF)', tuition: 12000, lab: 2000, library: 1200, gymkhana: 800, exam: 2200, other: 2100, total: 20300 },
    'fybammc': { name: 'FY BA in Multimedia & Mass Comm (BAMMC)', tuition: 12000, lab: 3500, library: 1200, gymkhana: 800, exam: 2200, other: 1800, total: 21500 },
    'msc-it': { name: 'M.Sc (Information Technology - Part I)', tuition: 18000, lab: 12000, library: 1500, gymkhana: 800, exam: 2800, other: 2900, total: 38000 },
    'fyjc-sci': { name: 'FYJC XI Science (Junior College)', tuition: 1200, lab: 900, library: 400, gymkhana: 400, exam: 600, other: 500, total: 4000 },
    'fyjc-com': { name: 'FYJC XI Commerce (Junior College)', tuition: 1200, lab: 0, library: 400, gymkhana: 400, exam: 600, other: 400, total: 3000 }
  };

  // Demo Students database for instant lookup
  const STUDENT_RECORDS = {
    '20240101': { name: 'Rahul Naresh Motwani', course: 'fybsc-it', roll: 'IT-042', prn: '2024016400987123', status: 'Pending' },
    '20240102': { name: 'Pooja Suresh Ahuja', course: 'fybms', roll: 'BMS-018', prn: '2024016400987124', status: 'Pending' },
    '20240103': { name: 'Kunal Rajesh Kothari', course: 'fybcom', roll: 'BC-204', prn: '2024016400987125', status: 'Paid' }
  };

  window.lookupStudentFee = function (event) {
    if (event) event.preventDefault();

    const idInput = document.getElementById('fee-student-id');
    const courseSelect = document.getElementById('fee-course-select');
    const feeDisplay = document.getElementById('fee-details-card');

    if (!feeDisplay) return;

    let student = null;
    let selectedCourseKey = courseSelect ? courseSelect.value : null;

    if (idInput && idInput.value.trim()) {
      const q = idInput.value.trim();
      student = STUDENT_RECORDS[q];
      if (student) {
        selectedCourseKey = student.course;
      }
    }

    if (!selectedCourseKey) selectedCourseKey = 'fybsc-it';

    const fee = FEE_SCHEDULE[selectedCourseKey];
    if (!fee) return;

    const studentName = student ? student.name : 'Simulated Student Applicant';
    const rollNo = student ? student.roll : 'ADM-PROV-2026';
    const prn = student ? student.prn : '2026016400' + Math.floor(100000 + Math.random() * 900000);

    // Render detailed fee breakdown
    feeDisplay.innerHTML = `
      <div class="fee-card-header" style="background: var(--bg-surface-elevated); border: 2px solid var(--chm-gold); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-lg);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
          <div>
            <span class="ticker-tag admissions" style="margin-bottom: 0.5rem; display: inline-block;">Fee Voucher 2026-27</span>
            <h3 style="color: var(--text-primary); margin:0;">${fee.name}</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">Student: <strong>${studentName}</strong> | Roll: <strong>${rollNo}</strong> | PRN: <strong>${prn}</strong></p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; color: var(--text-muted);">Total Payable Amount</div>
            <div style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--chm-emerald);">₹${fee.total.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-bottom: 2rem;">
          <thead>
            <tr style="background: var(--bg-alt); text-align: left; border-bottom: 2px solid var(--border-strong);">
              <th style="padding: 0.75rem 1rem;">Particulars / Fee Head</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-light);"><td style="padding: 0.65rem 1rem;">Tuition Fees</td><td style="padding: 0.65rem 1rem; text-align: right;">₹${fee.tuition.toLocaleString('en-IN')}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-light);"><td style="padding: 0.65rem 1rem;">Laboratory & Computer Practical Fees</td><td style="padding: 0.65rem 1rem; text-align: right;">₹${fee.lab.toLocaleString('en-IN')}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-light);"><td style="padding: 0.65rem 1rem;">Library Caution Deposit & Access</td><td style="padding: 0.65rem 1rem; text-align: right;">₹${fee.library.toLocaleString('en-IN')}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-light);"><td style="padding: 0.65rem 1rem;">Gymkhana & Sports Activity Fund</td><td style="padding: 0.65rem 1rem; text-align: right;">₹${fee.gymkhana.toLocaleString('en-IN')}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-light);"><td style="padding: 0.65rem 1rem;">Semester Examination & Marks Sheet Fee</td><td style="padding: 0.65rem 1rem; text-align: right;">₹${fee.exam.toLocaleString('en-IN')}</td></tr>
            <tr style="border-bottom: 1px solid var(--border-light);"><td style="padding: 0.65rem 1rem;">University Welfare & Disaster Management Fund</td><td style="padding: 0.65rem 1rem; text-align: right;">₹${fee.other.toLocaleString('en-IN')}</td></tr>
            <tr style="font-weight: 800; background: var(--bg-alt);"><td style="padding: 0.85rem 1rem; color: var(--text-primary);">Total Academic Fees Payable</td><td style="padding: 0.85rem 1rem; text-align: right; color: var(--chm-emerald); font-size: 1.1rem;">₹${fee.total.toLocaleString('en-IN')}</td></tr>
          </tbody>
        </table>

        <!-- Payment Mode Selector -->
        <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem; font-size: 1rem;">Select Payment Method</h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
            <label style="display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; background: var(--bg-surface); padding: 0.75rem 1.25rem; border-radius: 8px; border: 1px solid var(--border-strong);">
              <input type="radio" name="pay-method" value="upi" checked> 📱 Instant UPI (GPay/PhonePe/Paytm)
            </label>
            <label style="display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; background: var(--bg-surface); padding: 0.75rem 1.25rem; border-radius: 8px; border: 1px solid var(--border-strong);">
              <input type="radio" name="pay-method" value="card"> 💳 Debit / Credit Card
            </label>
            <label style="display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; background: var(--bg-surface); padding: 0.75rem 1.25rem; border-radius: 8px; border: 1px solid var(--border-strong);">
              <input type="radio" name="pay-method" value="netbanking"> 🏦 Net Banking (All Indian Banks)
            </label>
          </div>

          <div id="upi-qr-box" style="text-align: center; padding: 1rem; background: #ffffff; border-radius: 8px; max-width: 300px; margin: 0 auto; color: #000; box-shadow: var(--shadow-sm);">
            <div style="font-size: 0.85rem; font-weight: 700; color: #145a32; margin-bottom: 0.5rem;">Scan & Pay with any UPI App</div>
            <svg style="width: 170px; height: 170px; margin: 0 auto; display:block;" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="#ffffff" />
              <!-- QR Patterns -->
              <rect x="10" y="10" width="25" height="25" fill="#000" />
              <rect x="15" y="15" width="15" height="15" fill="#fff" />
              <rect x="18" y="18" width="9" height="9" fill="#000" />
              
              <rect x="65" y="10" width="25" height="25" fill="#000" />
              <rect x="70" y="15" width="15" height="15" fill="#fff" />
              <rect x="73" y="18" width="9" height="9" fill="#000" />

              <rect x="10" y="65" width="25" height="25" fill="#000" />
              <rect x="15" y="70" width="15" height="15" fill="#fff" />
              <rect x="18" y="73" width="9" height="9" fill="#000" />

              <rect x="45" y="15" width="10" height="10" fill="#000" />
              <rect x="42" y="35" width="16" height="30" fill="#145a32" />
              <rect x="65" y="55" width="20" height="35" fill="#000" />
              <rect x="25" y="45" width="12" height="12" fill="#000" />
            </svg>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">UPI ID: chmcollege.hsnc@sbi</div>
          </div>
        </div>

        <div style="text-align: center;">
          <button onclick="simulatePaymentSuccess('${studentName}', '${fee.name}', ${fee.total}, '${rollNo}', '${prn}')" class="btn-primary" style="padding: 1rem 2.5rem; font-size: 1.05rem;">
            Simulate Instant Payment & Generate Official Receipt 🚀
          </button>
        </div>
      </div>
    `;

    feeDisplay.scrollIntoView({ behavior: 'smooth' });
  };

  window.simulatePaymentSuccess = function (studentName, courseName, totalAmount, rollNo, prn) {
    const feeDisplay = document.getElementById('fee-details-card');
    const receiptId = 'CHM-REC-' + Math.floor(100000 + Math.random() * 900000);
    const txnId = 'TXN' + Date.now().toString().substring(3);
    const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    feeDisplay.innerHTML = `
      <div style="animation: fadeIn 0.5s ease;">
        <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 2rem;">✅</span>
            <div>
              <h4 style="color: #065f46; margin:0;">Payment Confirmed Successfully!</h4>
              <p style="color: #047857; font-size: 0.85rem; margin:0;">Txn ID: <strong>${txnId}</strong> | Bank Ref: SBI-INB-${Math.floor(1000000000 + Math.random()*9000000000)}</p>
            </div>
          </div>
          <button onclick="window.print()" class="btn-primary" style="background: #059669; color: #fff; padding: 0.5rem 1.25rem;">
            🖨️ Print Receipt
          </button>
        </div>

        <!-- PRINT READY OFFICIAL RECEIPT -->
        <div id="printable-receipt" style="background: #ffffff; color: #0f172a; border: 3px double #145a32; border-radius: 12px; padding: 2.5rem; max-width: 800px; margin: 0 auto; box-shadow: var(--shadow-xl); position: relative;">
          
          <!-- Watermark Background -->
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 5rem; font-weight: 900; color: rgba(20, 90, 50, 0.04); pointer-events: none; white-space: nowrap; font-family: var(--font-display);">
            CHM COLLEGE PAID
          </div>

          <div style="text-align: center; border-bottom: 2px solid #145a32; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #c59b27; letter-spacing: 0.08em; text-transform: uppercase;">
              HYDERABAD (SIND) NATIONAL COLLEGIATE BOARD
            </div>
            <h2 style="font-family: var(--font-display); color: #145a32; font-size: 1.6rem; margin: 0.25rem 0;">
              SMT. CHANDIBAI HIMATHMAL MANSUKHANI COLLEGE
            </h2>
            <p style="font-size: 0.8rem; color: #64748b; margin: 0;">
              Opposite Ulhasnagar Railway Station, Ulhasnagar - 421003, Maharashtra<br>
              Re-Accredited with 'A' Grade by NAAC | Affiliated to University of Mumbai
            </p>
            <div style="display: inline-block; margin-top: 0.5rem; background: #145a32; color: #ffffff; font-size: 0.82rem; font-weight: 700; padding: 3px 15px; border-radius: 20px;">
              OFFICIAL FEE PAYMENT RECEIPT (ACADEMIC YEAR 2026-27)
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.88rem; margin-bottom: 1.5rem; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1rem;">
            <div><strong>Receipt No:</strong> <span style="color: #145a32; font-family: monospace;">${receiptId}</span></div>
            <div><strong>Date & Time:</strong> <span>${dateStr}</span></div>
            <div><strong>Student Name:</strong> <span>${studentName}</span></div>
            <div><strong>Course / Class:</strong> <span style="font-weight:700;">${courseName}</span></div>
            <div><strong>Roll / Form No:</strong> <span>${rollNo}</span></div>
            <div><strong>PRN:</strong> <span>${prn}</span></div>
            <div><strong>Payment Mode:</strong> <span>Online UPI / IMPS</span></div>
            <div><strong>Transaction Reference:</strong> <span style="font-family: monospace;">${txnId}</span></div>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; margin-bottom: 1.5rem;">
            <thead>
              <tr style="background: #f1f5f9; text-align: left; border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1;">
                <th style="padding: 0.5rem 0.75rem;">Sr.</th>
                <th style="padding: 0.5rem 0.75rem;">Fee Component</th>
                <th style="padding: 0.5rem 0.75rem; text-align: right;">Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 0.4rem 0.75rem;">1.</td><td style="padding: 0.4rem 0.75rem;">Tuition & Academic Term Fee</td><td style="padding: 0.4rem 0.75rem; text-align: right;">₹${Math.round(totalAmount * 0.55).toLocaleString('en-IN')}</td></tr>
              <tr><td style="padding: 0.4rem 0.75rem;">2.</td><td style="padding: 0.4rem 0.75rem;">Laboratory, IT Infrastructure & Internet Access</td><td style="padding: 0.4rem 0.75rem; text-align: right;">₹${Math.round(totalAmount * 0.25).toLocaleString('en-IN')}</td></tr>
              <tr><td style="padding: 0.4rem 0.75rem;">3.</td><td style="padding: 0.4rem 0.75rem;">Library Deposit & E-Resource Access</td><td style="padding: 0.4rem 0.75rem; text-align: right;">₹${Math.round(totalAmount * 0.08).toLocaleString('en-IN')}</td></tr>
              <tr><td style="padding: 0.4rem 0.75rem;">4.</td><td style="padding: 0.4rem 0.75rem;">Gymkhana, Extracurricular & Cultural Activities</td><td style="padding: 0.4rem 0.75rem; text-align: right;">₹${Math.round(totalAmount * 0.05).toLocaleString('en-IN')}</td></tr>
              <tr><td style="padding: 0.4rem 0.75rem;">5.</td><td style="padding: 0.4rem 0.75rem;">Examination & University Contribution</td><td style="padding: 0.4rem 0.75rem; text-align: right;">₹${(totalAmount - Math.round(totalAmount*0.55) - Math.round(totalAmount*0.25) - Math.round(totalAmount*0.08) - Math.round(totalAmount*0.05)).toLocaleString('en-IN')}</td></tr>
              <tr style="background: #f8fafc; font-weight: 800; border-top: 2px solid #145a32; border-bottom: 2px solid #145a32;">
                <td colspan="2" style="padding: 0.75rem; font-size: 1rem; color: #145a32;">NET AMOUNT RECEIVED (IN WORDS: RUPEES PAID IN FULL)</td>
                <td style="padding: 0.75rem; text-align: right; color: #145a32; font-size: 1.15rem;">₹${totalAmount.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px dashed #cbd5e1;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 70px; height: 70px; border: 1px solid #000; padding: 3px;">
                <svg viewBox="0 0 100 100" style="width:100%; height:100%;">
                  <rect width="100" height="100" fill="#fff" />
                  <rect x="5" y="5" width="30" height="30" fill="#000" />
                  <rect x="65" y="5" width="30" height="30" fill="#000" />
                  <rect x="5" y="65" width="30" height="30" fill="#000" />
                  <circle cx="50" cy="50" r="15" fill="#145a32" />
                </svg>
              </div>
              <div style="font-size: 0.72rem; color: #64748b;">
                Computer generated e-receipt.<br>
                Valid without physical signature.<br>
                Scan QR to verify on CHM portal.
              </div>
            </div>

            <div style="text-align: center;">
              <div style="font-family: 'Brush Script MT', cursive; font-size: 1.4rem; color: #145a32;">Dr. Kishori Bhagat</div>
              <div style="border-top: 1px solid #94a3b8; padding-top: 2px; font-size: 0.75rem; font-weight: 700; color: #334155;">
                Principal & Accounts Officer<br>Smt. CHM College, Ulhasnagar
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    feeDisplay.scrollIntoView({ behavior: 'smooth' });
  };
})();
