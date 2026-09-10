/* ==========================================================================
   CHM COLLEGE UNIFIED ERP & STUDENT DASHBOARD SUITE
   ========================================================================== */

(function () {
  // Demo Student ERP State
  const CURRENT_STUDENT = {
    name: 'Aakash Suresh Lalwani',
    id: 'CHM-2024-8841',
    roll: 'TYIT-028',
    prn: '2024016400329104',
    course: 'B.Sc (Information Technology)',
    year: 'Third Year (Sem VI)',
    batch: '2023 - 2026',
    division: 'A',
    overallAttendance: 86.4,
    cgpa: '8.92',
    subjects: [
      { code: 'USIT601', name: 'Software Quality Assurance', attendance: 88, internal: 22, maxInternal: 25 },
      { code: 'USIT602', name: 'Security in Computing', attendance: 84, internal: 20, maxInternal: 25 },
      { code: 'USIT603', name: 'Business Intelligence & Cloud', attendance: 90, internal: 24, maxInternal: 25 },
      { code: 'USIT604', name: 'Principles of Geographic Info Systems', attendance: 82, internal: 21, maxInternal: 25 },
      { code: 'USIT605', name: 'Enterprise Java & Microservices', attendance: 89, internal: 23, maxInternal: 25 }
    ]
  };

  window.initStudentPortal = function () {
    renderAttendanceChart();
    renderSubjectsTable();
    initIdCardFlip();
  };

  function renderAttendanceChart() {
    const gauge = document.getElementById('attendance-gauge');
    if (!gauge) return;

    gauge.innerHTML = `
      <div style="position: relative; width: 150px; height: 150px; margin: 0 auto;">
        <svg viewBox="0 0 36 36" style="width: 100%; height: 100%; transform: rotate(-90deg);">
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="3.5" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#d4af37" stroke-dasharray="${CURRENT_STUDENT.overallAttendance}, 100" stroke-width="3.5" stroke-linecap="round" />
        </svg>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
          <div style="font-size: 1.6rem; font-weight: 800; color: #fff; line-height: 1;">${CURRENT_STUDENT.overallAttendance}%</div>
          <div style="font-size: 0.68rem; color: #a7f3d0; font-weight: 700; text-transform: uppercase;">Good Standing</div>
        </div>
      </div>
    `;
  }

  function renderSubjectsTable() {
    const tableBody = document.getElementById('student-subjects-body');
    if (!tableBody) return;

    tableBody.innerHTML = CURRENT_STUDENT.subjects.map(s => `
      <tr style="border-bottom: 1px solid var(--border-light);">
        <td style="padding: 0.75rem 1rem; font-family: monospace; font-size: 0.85rem; color: var(--chm-emerald);">${s.code}</td>
        <td style="padding: 0.75rem 1rem; font-weight: 600; color: var(--text-primary);">${s.name}</td>
        <td style="padding: 0.75rem 1rem; text-align: center;">
          <span style="font-weight: 700; color: ${s.attendance >= 75 ? '#10b981' : '#ef4444'};">${s.attendance}%</span>
        </td>
        <td style="padding: 0.75rem 1rem; text-align: right; font-weight: 700; color: var(--text-primary);">${s.internal} / ${s.maxInternal}</td>
      </tr>
    `).join('');
  }

  function initIdCardFlip() {
    const card = document.getElementById('student-digital-id-card');
    if (!card) return;

    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  }

  // Live Hall Ticket Generator
  window.generateHallTicketModal = function () {
    const modal = document.getElementById('hall-ticket-modal');
    if (!modal) return;
    modal.style.display = 'flex';
  };

  window.closeHallTicketModal = function () {
    const modal = document.getElementById('hall-ticket-modal');
    if (!modal) return;
    modal.style.display = 'none';
  };

  // Faculty Broadcast Simulation
  window.broadcastNotice = function (event) {
    if (event) event.preventDefault();

    const titleInput = document.getElementById('faculty-notice-title');
    const catSelect = document.getElementById('faculty-notice-cat');
    const descInput = document.getElementById('faculty-notice-desc');
    const list = document.getElementById('live-notices-feed');

    if (!titleInput || !descInput || !list) return;

    const title = titleInput.value.trim();
    const cat = catSelect ? catSelect.value : 'urgent';
    const desc = descInput.value.trim();

    if (!title) {
      alert('Please enter a notice title.');
      return;
    }

    const item = document.createElement('div');
    item.className = 'notice-card-item';
    item.style.cssText = 'background: var(--bg-surface); border-left: 4px solid var(--chm-gold); border-radius: 8px; padding: 1rem; margin-bottom: 0.85rem; box-shadow: var(--shadow-sm); animation: fadeIn 0.4s ease;';
    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
        <span class="ticker-tag ${cat}">${cat.toUpperCase()}</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">Just Now</span>
      </div>
      <h4 style="font-size: 1rem; margin-bottom: 0.25rem; color: var(--text-primary);">${title}</h4>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">${desc}</p>
    `;

    list.prepend(item);
    titleInput.value = '';
    descInput.value = '';
    alert('Notice broadcasted live to all students across the portal!');
  };

  // 1. Digital Bonafide Certificate Generator
  window.generateBonafideModal = function (type) {
    const modal = document.getElementById('bonafide-modal');
    const content = document.getElementById('bonafide-modal-content');
    if (!modal || !content) return;

    const isRailway = type === 'railway';
    const certNumber = 'CHM/CERT/' + (isRailway ? 'RLY/' : 'GEN/') + Math.floor(10000 + Math.random() * 90000);
    const issueDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    content.innerHTML = `
      <div style="background: #ffffff; color: #0f172a; border: 3px double #145a32; border-radius: 12px; padding: 2.5rem; max-width: 800px; margin: 0 auto; box-shadow: var(--shadow-xl); position: relative;">
        
        <div style="text-align: center; border-bottom: 2px solid #145a32; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
          <div style="font-size: 0.78rem; font-weight: 700; color: #c59b27; text-transform: uppercase;">
            HYDERABAD (SIND) NATIONAL COLLEGIATE BOARD
          </div>
          <h2 style="font-family: var(--font-display); color: #145a32; font-size: 1.6rem; margin: 4px 0;">
            SMT. CHANDIBAI HIMATHMAL MANSUKHANI COLLEGE
          </h2>
          <p style="font-size: 0.8rem; color: #64748b; margin: 0;">
            Opp. Ulhasnagar Railway Station, Ulhasnagar - 421003, Dist. Thane (Maharashtra)<br>
            Affiliated to University of Mumbai | NAAC Re-Accredited with 'A' Grade
          </p>
          <div style="display: inline-block; margin-top: 0.5rem; background: #145a32; color: #ffffff; font-size: 0.82rem; font-weight: 700; padding: 3px 18px; border-radius: 20px;">
            ${isRailway ? 'CENTRAL RAILWAY STUDENT CONCESSION BONAFIDE CERTIFICATE' : 'OFFICIAL INSTITUTIONAL BONAFIDE CERTIFICATE'}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 1.5rem;">
          <div><strong>Certificate Ref No:</strong> <span style="font-family: monospace; color: #145a32;">${certNumber}</span></div>
          <div><strong>Date of Issue:</strong> <span>${issueDate}</span></div>
        </div>

        <div style="font-size: 0.95rem; line-height: 2; color: #1e293b; margin-bottom: 2rem; text-align: justify;">
          This is to certify that Mr./Ms. <strong><u>Aakash Suresh Lalwani</u></strong> (PRN: <strong>2024016400329104</strong>, Roll No: <strong>TYIT-028</strong>) is a bonafide student of this college studying in the <strong><u>T.Y. B.Sc. (Information Technology)</u></strong> class during the Academic Year <strong>2026-27</strong>.
          <br><br>
          ${isRailway ? `
            As per Central Railway Suburban Concession Rules, this certificate entitles the student to a quarterly / monthly student travel concession season ticket between <strong><u>Ulhasnagar (Station Code: UL)</u></strong> and <strong><u>Chhatrapati Shivaji Maharaj Terminus (CSMT) / Dadar / Thane</u></strong>.
          ` : `
            To the best of our knowledge and college records, he/she bears a good moral character and conduct. This certificate is issued on his/her application for the purpose of <strong><u>Higher Studies / Passport Verification / Education Loan Support</u></strong>.
          `}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 75px; height: 75px; border: 1px solid #000; padding: 3px;">
              <svg viewBox="0 0 100 100" style="width:100%; height:100%;">
                <rect width="100" height="100" fill="#fff" />
                <rect x="5" y="5" width="25" height="25" fill="#000" />
                <rect x="70" y="5" width="25" height="25" fill="#000" />
                <rect x="5" y="70" width="25" height="25" fill="#000" />
                <circle cx="50" cy="50" r="14" fill="#145a32" />
              </svg>
            </div>
            <div style="font-size: 0.72rem; color: #64748b;">
              Digitally verified via CHM ERP.<br>
              Valid for Academic Session 2026-27.
            </div>
          </div>

          <div style="text-align: center;">
            <div style="font-family: 'Brush Script MT', cursive; font-size: 1.5rem; color: #145a32;">Dr. Kishori Bhagat</div>
            <div style="border-top: 1px solid #94a3b8; padding-top: 2px; font-size: 0.78rem; font-weight: 700; color: #334155;">
              Principal & Head of Institution<br>Smt. CHM College, Ulhasnagar
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 1.5rem; border-top: 1px solid #e2e8f0; padding-top: 1rem;">
          <button type="button" onclick="closeBonafideModal()" class="btn-secondary" style="color:#0f172a; border-color:#cbd5e1;">
            ✕ Close
          </button>
          <button type="button" onclick="window.print()" class="btn-primary" style="padding: 0.6rem 1.5rem;">
            🖨️ Print Verified Bonafide Certificate
          </button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
  };

  window.closeBonafideModal = function () {
    const modal = document.getElementById('bonafide-modal');
    if (modal) modal.style.display = 'none';
  };

  // 2. Dynamic QR Classroom Projector Simulation
  let qrInterval = null;
  let checkinCount = 42;

  window.launchProjectorAttendance = function () {
    const hud = document.getElementById('qr-attendance-hud');
    if (!hud) return;

    hud.style.display = 'block';
    hud.scrollIntoView({ behavior: 'smooth' });

    if (qrInterval) clearInterval(qrInterval);

    function refreshQR() {
      const qrToken = 'CHM-' + Date.now().toString().slice(-6) + '-' + Math.floor(100 + Math.random() * 900);
      const tokenDisplay = document.getElementById('live-qr-token');
      const counterEl = document.getElementById('live-checkin-count');

      if (tokenDisplay) tokenDisplay.textContent = qrToken;
      if (counterEl) {
        checkinCount += Math.floor(Math.random() * 2);
        counterEl.textContent = checkinCount;
      }
    }

    refreshQR();
    qrInterval = setInterval(refreshQR, 10000);
  };

    // 3. Dynamic NEP 2020 Lecture Timetable Switcher
    const TIMETABLE_DATA = {
      bsit: {
        streamName: 'B.Sc. Information Technology',
        schedule: [
          { time: '07:15 AM - 08:05 AM', code: 'USIT601', subject: 'Software Quality Assurance', faculty: 'Prof. Sunil K. Makhija', room: 'Room 402 (Science Wing)', credits: '2.0', status: 'COMPLETED', statusBg: '#dcfce7', statusCol: '#15803d' },
          { time: '08:05 AM - 08:55 AM', code: 'USIT602', subject: 'Security in Computing', faculty: 'Dr. V. S. Acharya', room: 'Room 402 (Science Wing)', credits: '2.0', status: 'COMPLETED', statusBg: '#dcfce7', statusCol: '#15803d' },
          { recess: true, text: '☕ 08:55 AM - 09:15 AM — Morning Academic Recess (Canteen & Central Lawn)' },
          { time: '09:15 AM - 10:05 AM', code: 'USIT603', subject: 'Business Intelligence & Cloud', faculty: 'Prof. R. Vazirani', room: 'Room 402 (Science Wing)', credits: '2.0', status: 'IN SESSION', statusBg: '#fee2e2', statusCol: '#b91c1c' },
          { time: '10:05 AM - 10:55 AM', code: 'USIT604', subject: 'Principles of GIS', faculty: 'Dr. Pratibha Deshpande', room: 'Room 402 (Science Wing)', credits: '2.0', status: 'UPCOMING', statusBg: '#e0f2fe', statusCol: '#0369a1' },
          { time: '11:05 AM - 01:05 PM', code: 'USIT6P1', subject: 'Advanced Practical Batch A / B', faculty: 'Prof. S. Makhija & Lab Staff', room: 'IT Lab 3 (3rd Floor)', credits: '2.0', status: 'UPCOMING', statusBg: '#e0f2fe', statusCol: '#0369a1' }
        ]
      },
      bscs: {
        streamName: 'B.Sc. Computer Science',
        schedule: [
          { time: '07:15 AM - 08:05 AM', code: 'USCS601', subject: 'Cloud Computing & Distributed Systems', faculty: 'Dr. R. M. Sharma', room: 'CS Lab 2', credits: '2.0', status: 'COMPLETED', statusBg: '#dcfce7', statusCol: '#15803d' },
          { time: '08:05 AM - 08:55 AM', code: 'USCS602', subject: 'Cyber Forensics & Information Security', faculty: 'Prof. Anjali Advani', room: 'CS Lab 2', credits: '2.0', status: 'COMPLETED', statusBg: '#dcfce7', statusCol: '#15803d' },
          { recess: true, text: '☕ 08:55 AM - 09:15 AM — Morning Academic Recess' },
          { time: '09:15 AM - 10:05 AM', code: 'USCS603', subject: 'Information Retrieval & NLP', faculty: 'Prof. Sunil Makhija', room: 'CS Lab 2', credits: '2.0', status: 'IN SESSION', statusBg: '#fee2e2', statusCol: '#b91c1c' },
          { time: '10:05 AM - 10:55 AM', code: 'USCS604', subject: 'Data Science with Python', faculty: 'Dr. Sandeep Nemade', room: 'CS Lab 1', credits: '2.0', status: 'UPCOMING', statusBg: '#e0f2fe', statusCol: '#0369a1' },
          { time: '11:05 AM - 01:05 PM', code: 'USCSP6', subject: 'Capstone Project Implementation', faculty: 'Dept Guides', room: 'CS Project Lab', credits: '2.0', status: 'UPCOMING', statusBg: '#e0f2fe', statusCol: '#0369a1' }
        ]
      },
      bcom: {
        streamName: 'B.Com (Commerce)',
        schedule: [
          { time: '07:15 AM - 08:05 AM', code: 'UBCOM601', subject: 'Financial Accounting & Auditing IX', faculty: 'Prof. Rajesh Vazirani', room: 'Room 105 (Main Wing)', credits: '3.0', status: 'COMPLETED', statusBg: '#dcfce7', statusCol: '#15803d' },
          { time: '08:05 AM - 08:55 AM', code: 'UBCOM602', subject: 'Cost Accounting & Management X', faculty: 'Dr. Kishori Bhagat', room: 'Room 105 (Main Wing)', credits: '3.0', status: 'COMPLETED', statusBg: '#dcfce7', statusCol: '#15803d' },
          { recess: true, text: '☕ 08:55 AM - 09:15 AM — Morning Academic Recess' },
          { time: '09:15 AM - 10:05 AM', code: 'UBCOM603', subject: 'Business Economics VI (International Trade)', faculty: 'Dr. M. G. Chhabria', room: 'Room 105 (Main Wing)', credits: '3.0', status: 'IN SESSION', statusBg: '#fee2e2', statusCol: '#b91c1c' },
          { time: '10:05 AM - 10:55 AM', code: 'UBCOM604', subject: 'Direct & Indirect Taxes (GST)', faculty: 'Prof. Sanjay Tekchandani', room: 'Room 105 (Main Wing)', credits: '3.0', status: 'UPCOMING', statusBg: '#e0f2fe', statusCol: '#0369a1' }
        ]
      },
      bms: {
        streamName: 'B.M.S. (Management Studies)',
        schedule: [
          { time: '07:15 AM - 08:05 AM', code: 'UBMS601', subject: 'Strategic Financial Management', faculty: 'Dr. Meenakshi Lalwani', room: 'Mgmt Hall A', credits: '3.0', status: 'COMPLETED', statusBg: '#dcfce7', statusCol: '#15803d' },
          { time: '08:05 AM - 08:55 AM', code: 'UBMS602', subject: 'International Marketing & Retail', faculty: 'Prof. Deepa Hingorani', room: 'Mgmt Hall A', credits: '3.0', status: 'COMPLETED', statusBg: '#dcfce7', statusCol: '#15803d' },
          { recess: true, text: '☕ 08:55 AM - 09:15 AM — Morning Academic Recess' },
          { time: '09:15 AM - 10:05 AM', code: 'UBMS603', subject: 'Organizational Development & Change', faculty: 'Dr. Meenakshi Lalwani', room: 'Mgmt Hall A', credits: '3.0', status: 'IN SESSION', statusBg: '#fee2e2', statusCol: '#b91c1c' },
          { time: '10:05 AM - 10:55 AM', code: 'UBMS604', subject: 'Media Planning & Management', faculty: 'Guest Corporate Expert', room: 'Mgmt Hall A', credits: '3.0', status: 'UPCOMING', statusBg: '#e0f2fe', statusCol: '#0369a1' }
        ]
      },
      bschem: {
        streamName: 'B.Sc. Chemistry',
        schedule: [
          { time: '07:15 AM - 08:05 AM', code: 'USCH601', subject: 'Physical Chemistry & Quantum Mech', faculty: 'Dr. V. S. Acharya', room: 'Chem Hall 204', credits: '2.5', status: 'COMPLETED', statusBg: '#dcfce7', statusCol: '#15803d' },
          { time: '08:05 AM - 08:55 AM', code: 'USCH602', subject: 'Inorganic Chemistry & Coordination', faculty: 'Dr. R. M. Patil', room: 'Chem Hall 204', credits: '2.5', status: 'COMPLETED', statusBg: '#dcfce7', statusCol: '#15803d' },
          { recess: true, text: '☕ 08:55 AM - 09:15 AM — Morning Academic Recess' },
          { time: '09:15 AM - 10:05 AM', code: 'USCH603', subject: 'Organic Chemistry & Stereochemistry', faculty: 'Dr. S. N. Sharma', room: 'Chem Hall 204', credits: '2.5', status: 'IN SESSION', statusBg: '#fee2e2', statusCol: '#b91c1c' },
          { time: '10:15 AM - 01:15 PM', code: 'USCHP6', subject: 'Analytical & Gravimetric Lab', faculty: 'Faculty & Lab Supervisors', room: 'Physical Chemistry Lab', credits: '3.0', status: 'UPCOMING', statusBg: '#e0f2fe', statusCol: '#0369a1' }
        ]
      }
    };

    window.updateTimetableGrid = function () {
      const streamSelect = document.getElementById('tt-stream');
      const tbody = document.getElementById('timetable-tbody');
      if (!streamSelect || !tbody) return;

      const streamKey = streamSelect.value || 'bsit';
      const streamData = TIMETABLE_DATA[streamKey] || TIMETABLE_DATA['bsit'];

      tbody.innerHTML = streamData.schedule.map(item => {
        if (item.recess) {
          return `
            <tr style="background: var(--bg-alt); border-bottom: 1px solid var(--border-color); font-style: italic;">
              <td style="padding: 0.5rem 1rem; font-weight: 600; color: var(--text-muted);" colspan="6">
                ${item.text}
              </td>
            </tr>
          `;
        }
        return `
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--chm-emerald);">${item.time}</td>
            <td style="padding: 0.75rem 1rem;"><strong>${item.code}:</strong> ${item.subject}</td>
            <td style="padding: 0.75rem 1rem;">${item.faculty}</td>
            <td style="padding: 0.75rem 1rem;">${item.room}</td>
            <td style="padding: 0.75rem 1rem;">${item.credits}</td>
            <td style="padding: 0.75rem 1rem;"><span class="ticker-tag" style="background:${item.statusBg}; color:${item.statusCol};">${item.status}</span></td>
          </tr>
        `;
      }).join('');
    };
  };
})();


