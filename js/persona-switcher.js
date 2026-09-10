/**
 * CHM NextGen Digital Transformation Suite
 * Live Executive Persona Switcher & Commercial Pitch HUD
 * Designed for Dr. Kishori Bhagat, HSNC Board of Trustees & Stakeholder Walkthroughs
 */

(function () {
  'use strict';

  // Prevent multiple injections
  if (document.getElementById('chm-persona-hud')) return;

  const PERSONAS = [
    {
      id: 'principal',
      role: 'Principal & Trustee',
      name: 'Dr. Kishori Bhagat',
      badge: 'HSNC Executive',
      icon: 'fa-university',
      color: '#d4af37',
      primaryTarget: 'pitch-deck.html',
      description: 'Executive Boardroom view: Institutional metrics, ₹18.5L budget savings, statutory governance, and NAAC A++ roadmap.',
      links: [
        { label: '📊 Board Pitch Deck', url: 'pitch-deck.html' },
        { label: '📄 Commercial Proposal', url: 'PROPOSAL.md' },
        { label: '🎯 NEP 2020 Matrix', url: 'curriculum-planner.html' },
        { label: '⚖️ SGRC & Grievance', url: 'grievance.html' },
        { label: '🏛️ Sindhi Heritage Archive', url: 'sindhi-heritage.html' },
        { label: '📈 NAAC IQAC Radar', url: 'naac-iqac.html' }
      ]
    },
    {
      id: 'student',
      role: 'Undergraduate Student',
      name: 'Satnam Singh',
      badge: 'TY B.Sc. IT (Roll 4022)',
      icon: 'fa-user-graduate',
      color: '#00d2ff',
      primaryTarget: 'portal.html',
      description: 'Full student lifecycle: 86.4% attendance gauge, 3D flip smart ID, NEP timetable matrix, and digital railway pass.',
      links: [
        { label: '🎓 Student Portal ERP', url: 'portal.html' },
        { label: '📚 RFID Library Kiosk', url: 'library-kiosk.html' },
        { label: '🏃 Sports & Gymkhana Hub', url: 'gymkhana.html' },
        { label: '🚆 Central Railway Pass', url: 'railway-concession.html' },
        { label: '💳 Dynamic UPI Fees', url: 'fee-payment.html' },
        { label: '📝 Semester Exams & Marks', url: 'exams.html' }
      ]
    },
    {
      id: 'parent',
      role: 'Guardian (Defaulter Case)',
      name: 'Mr. Suresh Lalwani',
      badge: 'Parent of Aryan (FYBMS)',
      icon: 'fa-user-friends',
      color: '#ff416c',
      primaryTarget: 'parent-portal.html',
      description: 'Mumbai University Ordinance 0.119 watchdog: 64.2% attendance alert, 2FA OTP simulation, and PTA teacher booking.',
      links: [
        { label: '👪 Parent ERP Desk', url: 'parent-portal.html' },
        { label: '⚠️ Ordinance 0.119 Defaulter', url: 'parent-portal.html#defaulterSection' },
        { label: '🗓️ Book Mentor Meeting', url: 'parent-portal.html#pta-modal' },
        { label: '⚖️ SGRC Grievance Desk', url: 'grievance.html' }
      ]
    },
    {
      id: 'faculty',
      role: 'HOD & Associate Professor',
      name: 'Dr. V. S. Acharya',
      badge: 'Dept. of Chemistry',
      icon: 'fa-chalkboard-teacher',
      color: '#00f5a0',
      primaryTarget: 'portal.html',
      description: 'Smartboard Rotating QR Projector HUD (zero proxies), NEP 2020 Bloom question generator, and Ph.D. research desk.',
      links: [
        { label: '📱 Smartboard QR Projector', url: 'portal.html#qr-attendance-hud' },
        { label: '📋 NEP Credit Architecture', url: 'curriculum-planner.html' },
        { label: '🧠 Bloom CO-PO Generator', url: 'assessment-tools.html' },
        { label: '🔬 Research & Patents', url: 'research.html' },
        { label: '👨‍🏫 Faculty Directory', url: 'faculty.html' }
      ]
    },
    {
      id: 'naac',
      role: 'NAAC Peer Reviewer',
      name: 'External Peer Team Member',
      badge: 'Assessor (Criterion 1-7)',
      icon: 'fa-award',
      color: '#a855f7',
      primaryTarget: 'naac-iqac.html',
      description: 'Autonomous SSR data compliance, 150 kW Solar Telemetry, SSS satisfaction metrics, and Green Campus ISO 14001 audits.',
      links: [
        { label: '🏆 NAAC 7-Criteria Radar', url: 'naac-iqac.html' },
        { label: '🌱 Green Campus Telemetry', url: 'green-campus.html' },
        { label: '🤝 Extension NSS/NCC', url: 'clubs.html' },
        { label: '📋 Statutory Grievance RTI', url: 'governance.html' }
      ]
    },
    {
      id: 'recruiter',
      role: 'Corporate Talent Partner',
      name: 'Deloitte / TCS Campus Scout',
      badge: 'Talent Acquisition',
      icon: 'fa-briefcase',
      color: '#38bdf8',
      primaryTarget: 'placement.html',
      description: 'Campus hiring hub: ₹12.5 LPA package metrics, student skill verification, alumni job referral exchange, and interview drive booking.',
      links: [
        { label: '💼 Corporate Placement Hub', url: 'placement.html' },
        { label: '🤝 Alumni Job Referral Board', url: 'alumni-jobs.html' },
        { label: '🌟 Alumni Wall of Fame', url: 'alumni.html' }
      ]
    }
  ];

  // Retrieve or default persona
  let activePersonaId = localStorage.getItem('chm_active_persona') || 'principal';

  // Inject Styles
  const style = document.createElement('style');
  style.id = 'chm-persona-hud-styles';
  style.textContent = `
    #chm-persona-hud {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      user-select: none;
    }

    .chm-hud-toggle-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #071529 0%, #0f233d 100%);
      color: #ffffff;
      border: 1.5px solid rgba(212, 175, 55, 0.5);
      border-radius: 50px;
      padding: 10px 18px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.3);
      cursor: pointer;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.3px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .chm-hud-toggle-btn:hover {
      transform: translateY(-3px) scale(1.02);
      border-color: #d4af37;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(212, 175, 55, 0.5);
    }

    .chm-hud-pulse-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #00f5a0;
      box-shadow: 0 0 10px #00f5a0;
      animation: chmHudPulse 1.8s infinite;
    }

    @keyframes chmHudPulse {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.25); opacity: 1; box-shadow: 0 0 15px #00f5a0; }
      100% { transform: scale(0.95); opacity: 0.8; }
    }

    /* Expanded Drawer Modal */
    .chm-hud-drawer {
      position: absolute;
      bottom: 60px;
      right: 0;
      width: 440px;
      max-width: calc(100vw - 32px);
      background: rgba(7, 21, 41, 0.96);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 20px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.2);
      padding: 20px;
      color: #f8fafc;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .chm-hud-drawer.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    .chm-hud-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 12px;
    }

    .chm-hud-title {
      font-size: 14px;
      font-weight: 800;
      color: #d4af37;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .chm-hud-close-btn {
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 16px;
      cursor: pointer;
      padding: 4px;
      transition: color 0.2s;
    }

    .chm-hud-close-btn:hover {
      color: #ffffff;
    }

    .chm-personas-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .chm-persona-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 10px 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 10px;
      text-align: left;
    }

    .chm-persona-card:hover {
      background: rgba(212, 175, 55, 0.1);
      border-color: rgba(212, 175, 55, 0.4);
      transform: translateY(-2px);
    }

    .chm-persona-card.active {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(15, 35, 61, 0.8) 100%);
      border-color: #d4af37;
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.25);
    }

    .chm-persona-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
    }

    .chm-persona-meta {
      overflow: hidden;
    }

    .chm-persona-name {
      font-size: 12px;
      font-weight: 700;
      color: #ffffff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .chm-persona-badge {
      font-size: 10px;
      color: #94a3b8;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    /* Active Details Container */
    .chm-hud-detail-box {
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 12px;
    }

    .chm-hud-desc {
      font-size: 11.5px;
      color: #cbd5e1;
      line-height: 1.5;
      margin-bottom: 12px;
    }

    .chm-hud-links {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chm-hud-link {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #f8fafc;
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .chm-hud-link:hover {
      background: #d4af37;
      color: #071529;
      border-color: #d4af37;
    }

    /* Quick Launch Bar */
    .chm-hud-quick-bar {
      display: flex;
      gap: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 12px;
    }

    .chm-hud-quick-btn {
      flex: 1;
      padding: 8px;
      border-radius: 8px;
      font-size: 11.5px;
      font-weight: 700;
      text-align: center;
      text-decoration: none;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .btn-gold-action {
      background: linear-gradient(135deg, #fce089 0%, #d4af37 100%);
      color: #071529;
    }

    .btn-gold-action:hover {
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
      transform: translateY(-1px);
    }

    .btn-outline-action {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #e2e8f0;
    }

    .btn-outline-action:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
    }
  `;
  document.head.appendChild(style);

  // Build HUD DOM
  const container = document.createElement('div');
  container.id = 'chm-persona-hud';
  container.innerHTML = `
    <!-- Floating Trigger -->
    <div class="chm-hud-toggle-btn" id="chmHudToggle">
      <div class="chm-hud-pulse-dot"></div>
      <span><i class="fas fa-user-tag text-warning"></i> Persona Simulator</span>
      <span id="chmCurrentPersonaName" style="color: #d4af37; font-weight: 800;">Principal</span>
    </div>

    <!-- Dropdown / Drawer Modal -->
    <div class="chm-hud-drawer" id="chmHudDrawer">
      <div class="chm-hud-header">
        <div class="chm-hud-title">
          <i class="fas fa-crown"></i> Boardroom Persona Switcher
        </div>
        <button class="chm-hud-close-btn" id="chmHudClose"><i class="fas fa-times"></i></button>
      </div>

      <!-- Personas Grid -->
      <div class="chm-personas-grid" id="chmPersonasGrid"></div>

      <!-- Detail Box -->
      <div class="chm-hud-detail-box" id="chmDetailBox">
        <div class="chm-hud-desc" id="chmPersonaDesc"></div>
        <div class="chm-hud-links" id="chmPersonaLinks"></div>
      </div>

      <!-- Quick Launch Bar -->
      <div class="chm-hud-quick-bar">
        <a href="pitch-deck.html" class="chm-hud-quick-btn btn-gold-action">
          <i class="fas fa-presentation"></i> Boardroom Deck
        </a>
        <a href="PROPOSAL.md" class="chm-hud-quick-btn btn-outline-action" target="_blank">
          <i class="fas fa-file-contract"></i> Proposal (ROI)
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Render Personas
  const grid = document.getElementById('chmPersonasGrid');
  const descEl = document.getElementById('chmPersonaDesc');
  const linksEl = document.getElementById('chmPersonaLinks');
  const toggleBtn = document.getElementById('chmHudToggle');
  const drawer = document.getElementById('chmHudDrawer');
  const closeBtn = document.getElementById('chmHudClose');
  const currentPersonaLabel = document.getElementById('chmCurrentPersonaName');

  function renderPersonas() {
    grid.innerHTML = '';
    const active = PERSONAS.find(p => p.id === activePersonaId) || PERSONAS[0];
    currentPersonaLabel.textContent = active.role.split(' ')[0];

    PERSONAS.forEach(p => {
      const isSelected = p.id === active.id;
      const card = document.createElement('div');
      card.className = `chm-persona-card ${isSelected ? 'active' : ''}`;
      card.innerHTML = `
        <div class="chm-persona-icon" style="color: ${p.color};">
          <i class="fas ${p.icon}"></i>
        </div>
        <div class="chm-persona-meta">
          <div class="chm-persona-name">${p.role}</div>
          <div class="chm-persona-badge">${p.name}</div>
        </div>
      `;
      card.addEventListener('click', () => selectPersona(p.id));
      grid.appendChild(card);
    });

    // Update Detail Box
    descEl.textContent = active.description;
    linksEl.innerHTML = '';
    active.links.forEach(link => {
      const a = document.createElement('a');
      a.className = 'chm-hud-link';
      a.href = link.url;
      a.textContent = link.label;
      linksEl.appendChild(a);
    });
  }

  function selectPersona(id) {
    activePersonaId = id;
    localStorage.setItem('chm_active_persona', id);
    renderPersonas();
  }

  // Toggle Handlers
  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    drawer.classList.remove('open');
  });

  // Close when clicked outside
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      drawer.classList.remove('open');
    }
  });

  // Initial Render
  renderPersonas();
})();
