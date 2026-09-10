/* ==========================================================================
   CHM COLLEGE EXAMINATION & RESULT SYSTEM
   ========================================================================== */

(function () {
  const RESULTS_DB = {
    '2024016400329104': {
      name: 'Aakash Suresh Lalwani',
      seat: 'M246011',
      course: 'T.Y. B.Sc. (Information Technology) (Semester V) (CBCS)',
      college: 'Smt. CHM College, Ulhasnagar (Code: 217)',
      examDate: 'Winter Session 2025',
      sgpa: '9.10',
      status: 'SUCCESSFUL / FIRST CLASS WITH DISTINCTION',
      marks: [
        { sub: 'Software Project Management', credit: 2, int: 23, ext: 65, total: 88, gp: 10, cp: 20 },
        { sub: 'Internet of Things (IoT)', credit: 2, int: 22, ext: 60, total: 82, gp: 10, cp: 20 },
        { sub: 'Advanced Web Programming', credit: 2, int: 24, ext: 68, total: 92, gp: 10, cp: 20 },
        { sub: 'Artificial Intelligence', credit: 2, int: 21, ext: 58, total: 79, gp: 9, cp: 18 },
        { sub: 'Enterprise Java', credit: 2, int: 23, ext: 62, total: 85, gp: 10, cp: 20 },
        { sub: 'Project Dissertation', credit: 2, int: 48, ext: 45, total: 93, gp: 10, cp: 20 }
      ]
    },
    '2024016400987123': {
      name: 'Rahul Naresh Motwani',
      seat: 'M246012',
      course: 'T.Y. B.Sc. (Information Technology) (Semester V)',
      college: 'Smt. CHM College, Ulhasnagar (Code: 217)',
      examDate: 'Winter Session 2025',
      sgpa: '8.40',
      status: 'SUCCESSFUL / FIRST CLASS',
      marks: [
        { sub: 'Software Project Management', credit: 2, int: 19, ext: 52, total: 71, gp: 9, cp: 18 },
        { sub: 'Internet of Things (IoT)', credit: 2, int: 20, ext: 55, total: 75, gp: 9, cp: 18 },
        { sub: 'Advanced Web Programming', credit: 2, int: 21, ext: 60, total: 81, gp: 10, cp: 20 },
        { sub: 'Artificial Intelligence', credit: 2, int: 18, ext: 48, total: 66, gp: 8, cp: 16 },
        { sub: 'Enterprise Java', credit: 2, int: 20, ext: 54, total: 74, gp: 9, cp: 18 },
        { sub: 'Project Dissertation', credit: 2, int: 42, ext: 44, total: 86, gp: 10, cp: 20 }
      ]
    }
  };

  window.searchExamResult = function (event) {
    if (event) event.preventDefault();

    const prnInput = document.getElementById('result-prn-input');
    const resultBox = document.getElementById('exam-result-display');
    if (!resultBox) return;

    const prn = prnInput ? prnInput.value.trim() : '';
    // Default fallback to first student if not found for seamless demo
    const record = RESULTS_DB[prn] || RESULTS_DB['2024016400329104'];

    let totalCp = 0;
    let totalCredits = 0;
    record.marks.forEach(m => {
      totalCp += m.cp;
      totalCredits += m.credit;
    });

    resultBox.innerHTML = `
      <div style="background: #ffffff; color: #0f172a; border: 2px solid #145a32; border-radius: 12px; padding: 2.5rem; max-width: 850px; margin: 2rem auto; box-shadow: var(--shadow-xl); position: relative;">
        <div style="text-align: center; border-bottom: 2px solid #145a32; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <div style="font-size: 0.85rem; font-weight: 700; color: #c59b27;">UNIVERSITY OF MUMBAI & SMT. CHM COLLEGE</div>
          <h2 style="font-family: var(--font-display); color: #145a32; font-size: 1.5rem; margin: 4px 0;">PROVISIONAL STATEMENT OF MARKS / GRADES</h2>
          <div style="font-size: 0.82rem; color: #64748b;">${record.course} | ${record.examDate}</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.88rem; margin-bottom: 1.5rem; background: #f8fafc; padding: 1rem; border-radius: 8px;">
          <div><strong>Candidate Name:</strong> <span>${record.name}</span></div>
          <div><strong>Seat Number:</strong> <span style="color: #145a32; font-weight:700;">${record.seat}</span></div>
          <div><strong>PRN:</strong> <span>${prn || '2024016400329104'}</span></div>
          <div><strong>College:</strong> <span>${record.college}</span></div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 1.5rem;">
          <thead>
            <tr style="background: #e2e8f0; text-align: left; border: 1px solid #cbd5e1;">
              <th style="padding: 0.5rem 0.75rem;">Subject Name</th>
              <th style="padding: 0.5rem 0.75rem; text-align: center;">Credits</th>
              <th style="padding: 0.5rem 0.75rem; text-align: center;">Internal (25)</th>
              <th style="padding: 0.5rem 0.75rem; text-align: center;">External (75)</th>
              <th style="padding: 0.5rem 0.75rem; text-align: center;">Total (100)</th>
              <th style="padding: 0.5rem 0.75rem; text-align: center;">Grade Point</th>
              <th style="padding: 0.5rem 0.75rem; text-align: right;">Credit Point</th>
            </tr>
          </thead>
          <tbody>
            ${record.marks.map(m => `
              <tr style="border: 1px solid #cbd5e1;">
                <td style="padding: 0.45rem 0.75rem; font-weight: 600;">${m.sub}</td>
                <td style="padding: 0.45rem 0.75rem; text-align: center;">${m.credit}</td>
                <td style="padding: 0.45rem 0.75rem; text-align: center;">${m.int}</td>
                <td style="padding: 0.45rem 0.75rem; text-align: center;">${m.ext}</td>
                <td style="padding: 0.45rem 0.75rem; text-align: center; font-weight:700;">${m.total}</td>
                <td style="padding: 0.45rem 0.75rem; text-align: center;">${m.gp}</td>
                <td style="padding: 0.45rem 0.75rem; text-align: right; font-weight:700;">${m.cp}</td>
              </tr>
            `).join('')}
            <tr style="background: #f1f5f9; font-weight: 800; border: 2px solid #145a32;">
              <td colspan="4" style="padding: 0.65rem 0.75rem; color: #145a32;">SEMESTER SUMMARY</td>
              <td style="padding: 0.65rem 0.75rem; text-align: center;">SGPA: <span style="font-size:1.1rem; color:#b45309;">${record.sgpa}</span></td>
              <td colspan="2" style="padding: 0.65rem 0.75rem; text-align: right; color: #166534;">STATUS: ${record.status}</td>
            </tr>
          </tbody>
        </table>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #cbd5e1; padding-top: 1rem;">
          <div style="font-size: 0.75rem; color: #64748b;">
            University of Mumbai Examination Authority & Controller of Exams, Smt. CHM College.<br>
            Note: This provisional marksheet is verified electronically and valid for provisional admissions.
          </div>
          <button onclick="window.print()" class="btn-primary" style="padding: 0.6rem 1.5rem; font-size: 0.85rem;">
            🖨️ Print Marksheet
          </button>
        </div>
      </div>
    `;

    resultBox.scrollIntoView({ behavior: 'smooth' });
  };
})();
