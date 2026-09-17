/**
 * Smt. CHM College Universal Spotlight Command Palette (Ctrl + K)
 * High-performance keyboard-driven search & quick-action HUD.
 * Indexing all 36 campus pages, student tools, faculty directory, and executive personas.
 */

(function (window, document) {
  'use strict';

  if (document.getElementById('chm-command-palette-root')) return;

  function getResolvedUrl(url) {
    if (!url || url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) return url;
    const isSubpage = window.location.pathname.includes('/pages/');
    const isTargetHome = url.startsWith('index.html');

    if (isSubpage) {
      if (isTargetHome) return '../' + url;
      return url.replace(/^pages\//, '');
    } else {
      if (isTargetHome) return url;
      if (url.startsWith('pages/')) return url;
      return 'pages/' + url;
    }
  }

  const CATALOG = [
    // Core Portals
    { title: 'Student Unified ERP Portal', category: 'Portals', icon: 'fa-user-graduate', url: 'portal.html', keywords: 'student dashboard erp attendance id card hall ticket roll number' },
    { title: 'Parent Portal & Defaulter Watchdog', category: 'Portals', icon: 'fa-user-friends', url: 'parent-portal.html', keywords: 'parent guardian defaulter ordinance 0.119 pta attendance alert' },
    { title: 'Faculty & HOD Academic Hub', category: 'Portals', icon: 'fa-chalkboard-teacher', url: 'portal.html#facultySection', keywords: 'faculty professor teacher smartboard qr projector attendance bloom co po' },
    { title: 'Executive Board Pitch Deck & ROI', category: 'Governance', icon: 'fa-chart-pie', url: 'pitch-deck.html', keywords: 'principal hsnc board trustees roi budget savings naac presentation' },
    { title: 'Public Credential Verification Portal', category: 'Verification', icon: 'fa-shield-alt', url: 'verify.html', keywords: 'verify certificate qr authentic sha256 hall ticket grace marks railway' },
    
    // Academic & Examination Tools
    { title: 'AI Exam Hall Seating & Checkerboard Allocator', category: 'Examinations', icon: 'fa-th', url: 'exam-seating.html', keywords: 'exam seating arrangement anti cheating algorithm room floorplan' },
    { title: 'Examinations Desk & Statement of Marks', category: 'Examinations', icon: 'fa-file-alt', url: 'exams.html', keywords: 'exam timetable results marksheet hall ticket atkt mumbai university' },
    { title: 'NEP 2020 Multi-Disciplinary Curriculum Planner', category: 'Academics', icon: 'fa-compass', url: 'curriculum-planner.html', keywords: 'nep 2020 major minor credit matrix apaar abc digilocker' },
    { title: 'Question Bank & Bloom Taxonomy Matrix', category: 'Academics', icon: 'fa-brain', url: 'question-bank.html', keywords: 'pyq question bank bloom co po papers previous year' },
    { title: 'Academic Assessment & CO-PO Tools', category: 'Academics', icon: 'fa-calculator', url: 'assessment-tools.html', keywords: 'assessment co po attainment rubrics bloom taxonomy' },

    // Campus Services & High-Value Modules
    { title: 'Central Library RFID Self-Checkout Kiosk', category: 'Services', icon: 'fa-book-reader', url: 'library-kiosk.html', keywords: 'library kiosk rfid book issue return shelf pathfinder opac' },
    { title: 'Central Railway Form 129-B Concession Desk', category: 'Services', icon: 'fa-train', url: 'railway-concession.html', keywords: 'railway pass train concession ticket 129-b local suburban' },
    { title: 'Dynamic UPI & RuPay Fee Payment Desk', category: 'Services', icon: 'fa-credit-card', url: 'fee-payment.html', keywords: 'fee payment upi qr receipt challan tuition aided self financing' },
    { title: 'Sports & Gymkhana Hub (Ordinance 0.229)', category: 'Sports', icon: 'fa-running', url: 'gymkhana.html', keywords: 'sports gymkhana aakash grace marks ordinance 0.229 tournament pass' },
    { title: 'Sindhi Cultural Heritage & Partition Archive', category: 'Heritage', icon: 'fa-landmark', url: 'sindhi-heritage.html', keywords: 'sindhi heritage shah jo risalo partition kundnani advani fellowship' },
    { title: 'Data Science & Predictive AI Analytics Hub', category: 'Analytics', icon: 'fa-chart-line', url: 'analytics.html', keywords: 'analytics machine learning defaulter predictive ctc model early warning' },
    { title: 'Statutory Grievance, Anti-Ragging & POSH Desk', category: 'Statutory', icon: 'fa-balance-scale', url: 'grievance.html', keywords: 'grievance complaint sgrc anti ragging posh icc whistleblower' },
    { title: 'Online Admissions & Merit Calculator 2026', category: 'Admissions', icon: 'fa-file-signature', url: 'admission.html', keywords: 'admission merit list apply cut off fyba fybcom fybsc bsc it bms' },
    { title: 'Campus Placements & Corporate Progression', category: 'Career', icon: 'fa-briefcase', url: 'placement.html', keywords: 'placement jobs recruiters packages tcs deloitte infosys salary' },
    { title: 'Alumni Network & Job Referral Board', category: 'Alumni', icon: 'fa-users', url: 'alumni-jobs.html', keywords: 'alumni mentorship jobs referrals hsnc global network' },
    { title: 'Green Campus & 150 kW Solar Telemetry', category: 'Campus', icon: 'fa-leaf', url: 'green-campus.html', keywords: 'green campus solar energy rainwater harvesting sustainability naac 7.1' },
    { title: '360° Virtual Campus Tour & Landmarks', category: 'Campus', icon: 'fa-video', url: 'campus-tour.html', keywords: 'campus tour 3d buildings map labs ground auditorium' },
    { title: 'NAAC IQAC Quality Assurance Radar', category: 'Governance', icon: 'fa-award', url: 'naac-iqac.html', keywords: 'naac iqac aqar criteria grade 3.12 cgpa a grade' },
    { title: 'Faculty & Research Directory', category: 'Faculty', icon: 'fa-id-badge', url: 'faculty.html', keywords: 'faculty teachers hod ph.d research papers contact email' }
  ];

  class CommandPalette {
    constructor() {
      this.isOpen = false;
      this.selectedIndex = 0;
      this.filteredItems = [...CATALOG];
      this.buildDOM();
      this.bindEvents();
    }

    buildDOM() {
      // Floating quick-access badge in bottom-left
      const triggerBtn = document.createElement('button');
      triggerBtn.id = 'chm-cmd-trigger-btn';
      triggerBtn.className = 'chm-cmd-floating-btn';
      triggerBtn.setAttribute('aria-label', 'Open Command Palette (Ctrl+K)');
      triggerBtn.setAttribute('title', 'Quick Search & Commands (Ctrl + K)');
      triggerBtn.innerHTML = `
        <i class="fa fa-search"></i>
        <span class="cmd-badge-text">Ctrl K</span>
      `;

      // Modal container
      const overlay = document.createElement('div');
      overlay.id = 'chm-command-palette-root';
      overlay.className = 'chm-cmd-overlay';
      overlay.style.display = 'none';

      overlay.innerHTML = `
        <div class="chm-cmd-dialog" role="dialog" aria-modal="true" aria-label="Campus Command Center">
          <div class="chm-cmd-header">
            <i class="fa fa-search chm-cmd-search-icon"></i>
            <input type="text" id="chm-cmd-input" class="chm-cmd-input" placeholder="Search pages, tools, services, or press Enter..." autocomplete="off" spellcheck="false">
            <kbd class="chm-cmd-esc-badge" id="chm-cmd-close-btn">ESC</kbd>
          </div>
          <div class="chm-cmd-results" id="chm-cmd-results-list" role="listbox"></div>
          <div class="chm-cmd-footer">
            <div class="cmd-hints">
              <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> Select</span>
              <span><kbd>ESC</kbd> Close</span>
            </div>
            <div class="cmd-brand">
              <i class="fa fa-university"></i> Smt. CHM Smart Campus OS
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(triggerBtn);
      document.body.appendChild(overlay);

      this.overlay = overlay;
      this.input = overlay.querySelector('#chm-cmd-input');
      this.resultsList = overlay.querySelector('#chm-cmd-results-list');
      this.triggerBtn = triggerBtn;

      this.renderResults();
    }

    bindEvents() {
      // Keyboard shortcut listener: Ctrl+K or Cmd+K
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          this.toggle();
        } else if (e.key === 'Escape' && this.isOpen) {
          this.close();
        } else if (this.isOpen) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigate(1);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigate(-1);
          } else if (e.key === 'Enter') {
            e.preventDefault();
            this.executeSelected();
          }
        }
      });

      // Click trigger
      this.triggerBtn.addEventListener('click', () => this.open());

      // Close on background click
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });

      const closeBtn = this.overlay.querySelector('#chm-cmd-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => this.close());

      // Input change filtering
      this.input.addEventListener('input', (e) => {
        this.filter(e.target.value.trim().toLowerCase());
      });
    }

    open() {
      this.isOpen = true;
      this.overlay.style.display = 'flex';
      this.input.value = '';
      this.filteredItems = [...CATALOG];
      this.selectedIndex = 0;
      this.renderResults();
      setTimeout(() => this.input.focus(), 50);
      if (window.CHMAudio) window.CHMAudio.playClick();
    }

    close() {
      this.isOpen = false;
      this.overlay.style.display = 'none';
      if (window.CHMAudio) window.CHMAudio.playClick();
    }

    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    }

    filter(query) {
      if (!query) {
        this.filteredItems = [...CATALOG];
      } else {
        const terms = query.split(/\s+/);
        this.filteredItems = CATALOG.filter(item => {
          const haystack = `${item.title} ${item.category} ${item.keywords}`.toLowerCase();
          return terms.every(term => haystack.includes(term));
        });
      }
      this.selectedIndex = 0;
      this.renderResults();
    }

    navigate(direction) {
      if (this.filteredItems.length === 0) return;
      this.selectedIndex = (this.selectedIndex + direction + this.filteredItems.length) % this.filteredItems.length;
      this.updateSelectionUI();
      if (window.CHMAudio) window.CHMAudio.playClick();
    }

    updateSelectionUI() {
      const items = this.resultsList.querySelectorAll('.chm-cmd-item');
      items.forEach((el, idx) => {
        if (idx === this.selectedIndex) {
          el.classList.add('selected');
          el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
          el.classList.remove('selected');
        }
      });
    }

    executeSelected() {
      if (this.filteredItems.length === 0) return;
      const target = this.filteredItems[this.selectedIndex];
      if (target) {
        if (window.CHMAudio) window.CHMAudio.playSuccess();
        const resolved = getResolvedUrl(target.url);
        window.location.href = resolved;
      }
    }

    renderResults() {
      if (this.filteredItems.length === 0) {
        this.resultsList.innerHTML = `
          <div class="cmd-no-results">
            <i class="fa fa-exclamation-circle"></i>
            <p>No matching campus portals or tools found.</p>
            <small>Try searching for "attendance", "fees", "library", "seating", or "railway".</small>
          </div>
        `;
        return;
      }

      this.resultsList.innerHTML = this.filteredItems.map((item, idx) => `
        <div class="chm-cmd-item ${idx === this.selectedIndex ? 'selected' : ''}" data-index="${idx}">
          <div class="cmd-item-icon">
            <i class="fa ${item.icon}"></i>
          </div>
          <div class="cmd-item-details">
            <span class="cmd-item-title">${item.title}</span>
            <span class="cmd-item-cat">${item.category}</span>
          </div>
          <i class="fa fa-arrow-right cmd-item-arrow"></i>
        </div>
      `).join('');

      // Add click listeners to items
      this.resultsList.querySelectorAll('.chm-cmd-item').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.getAttribute('data-index'), 10);
          this.selectedIndex = idx;
          this.executeSelected();
        });
        el.addEventListener('mouseenter', () => {
          const idx = parseInt(el.getAttribute('data-index'), 10);
          this.selectedIndex = idx;
          this.updateSelectionUI();
        });
      });
    }
  }

  // Self-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { window.CHMCommandPalette = new CommandPalette(); });
  } else {
    window.CHMCommandPalette = new CommandPalette();
  }

})(window, document);
