/* ==========================================================================
   CHM COLLEGE PORTAL - MAIN APPLICATION CONTROLLER
   ========================================================================== */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initFontResizer();
    initLanguageToggle();
    initHeroSlider();
    initAcademicsTabs();
    initCampusHotspots();
    initMobileNav();
    initAnimatedCounters();
    initLibraryOpac();
    initGrievanceCell();
  });

  /* 1. Theme Toggle (Light / Dark) */
  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('chm-theme') || 'light';

    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (btn) btn.innerHTML = '☀️ Light';
    }

    btn?.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('chm-theme', 'light');
        btn.innerHTML = '🌙 Dark';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('chm-theme', 'dark');
        btn.innerHTML = '☀️ Light';
      }
    });
  }

  /* 2. Accessibility Font Resizer */
  function initFontResizer() {
    const btns = document.querySelectorAll('.acc-btn');
    const savedScale = localStorage.getItem('chm-font-scale') || 'md';
    document.documentElement.className = `font-scale-${savedScale}`;

    btns.forEach(btn => {
      if (btn.getAttribute('data-scale') === savedScale) {
        btn.classList.add('active');
      }
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const scale = btn.getAttribute('data-scale');
        document.documentElement.className = `font-scale-${scale}`;
        localStorage.setItem('chm-font-scale', scale);
      });
    });
  }

  /* 3. Hero Carousel Slider */
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    if (!slides.length) return;

    let current = 0;
    let timer = null;

    function showSlide(idx) {
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === idx);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
      current = idx;
    }

    function nextSlide() {
      showSlide((current + 1) % slides.length);
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        resetTimer();
      });
    });

    function startTimer() {
      timer = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
      clearInterval(timer);
      startTimer();
    }

    startTimer();
  }

  /* 4. Academics Program Tabs */
  function initAcademicsTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.style.display = 'none');

        tab.classList.add('active');
        const target = document.getElementById(tab.getAttribute('data-target'));
        if (target) {
          target.style.display = 'grid';
          target.style.animation = 'fadeIn 0.3s ease';
        }
      });
    });
  }

  /* 5. Mobile Navigation */
  function initMobileNav() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

    toggle?.addEventListener('click', () => {
      navMenu?.classList.toggle('open');
    });

    dropdownItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      link?.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          item.classList.toggle('open-sub');
        }
      });
    });
  }

  /* 6. Animated Metrics Counter */
  function initAnimatedCounters() {
    const counters = document.querySelectorAll('.metric-value');
    if (!counters.length) return;

    let animated = false;

    function countUp() {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1600;
        const start = 0;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const val = Math.floor(progress * target);
          counter.textContent = val.toLocaleString('en-IN') + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        }

        requestAnimationFrame(updateCount);
      });
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        countUp();
      }
    }, { threshold: 0.2 });

    const metricsEl = document.querySelector('.metrics-section');
    if (metricsEl) observer.observe(metricsEl);
  }

  /* 7. Central Library OPAC Simulator */
  function initLibraryOpac() {
    const searchBtn = document.getElementById('opac-search-btn');
    const input = document.getElementById('opac-search-input');
    const resultsArea = document.getElementById('opac-results-area');

    if (!searchBtn || !resultsArea) return;

    const BOOKS_CATALOG = [
      { title: 'Computer Networks and Internets', author: 'Douglas E. Comer', callNo: '004.6 COM', status: 'Available', shelf: 'Stack 4, Rack B' },
      { title: 'Database System Concepts (7th Ed)', author: 'Silberschatz, Korth, Sudarshan', callNo: '005.74 SIL', status: 'Available', shelf: 'Stack 2, Rack A' },
      { title: 'Modern Financial Accounting', author: 'Dr. M.N. Arora', callNo: '657 ARO', status: 'Borrowed (Due 22 June)', shelf: 'Commerce Wing' },
      { title: 'Principles of Marketing Management', author: 'Philip Kotler', callNo: '658.8 KOT', status: 'Available', shelf: 'Management Wing' },
      { title: 'Biotechnology: Expanding Horizons', author: 'B.D. Singh', callNo: '572.8 SIN', status: 'Available', shelf: 'Life Sciences Stack' },
      { title: 'Sindhi Sahit Jo Itihas', author: 'Murlidhar Jetley', callNo: '891.41 JET', status: 'Reference Section', shelf: 'Sindhi Heritage Room' }
    ];

    function runSearch() {
      const q = (input?.value || '').trim().toLowerCase();
      const matches = q
        ? BOOKS_CATALOG.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
        : BOOKS_CATALOG.slice(0, 3);

      resultsArea.innerHTML = `
        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 1rem;">
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Found <strong>${matches.length}</strong> matching records in CHM Central Library collection:
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${matches.map(b => `
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed var(--border-light); padding-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${b.title}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">Author: ${b.author} | Call No: <span style="font-family: monospace; color: var(--chm-emerald);">${b.callNo}</span></div>
                </div>
                <div style="text-align: right;">
                  <span class="ticker-tag ${b.status === 'Available' ? 'admissions' : 'urgent'}">${b.status}</span>
                  <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">📍 ${b.shelf}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    searchBtn.addEventListener('click', runSearch);
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') runSearch();
    });
  }

  /* 8. Grievance Redressal Token Generator */
  function initGrievanceCell() {
    window.submitGrievance = function (event) {
      if (event) event.preventDefault();

      const name = document.getElementById('grv-name')?.value || 'Anonymous';
      const category = document.getElementById('grv-category')?.value || 'General';
      const details = document.getElementById('grv-details')?.value || '';
      const display = document.getElementById('grv-status-display');

      if (!details.trim()) {
        alert('Please describe your grievance before submitting.');
        return;
      }

      const token = 'GRV-2026-' + Math.floor(1000 + Math.random() * 9000);
      if (display) {
        display.innerHTML = `
          <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 1.25rem; color: #1e3a8a; margin-top: 1rem;">
            <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.25rem;">✅ Grievance Registered Successfully</div>
            <p style="font-size: 0.88rem; margin-bottom: 0.5rem;">Your Tracking Token is: <strong style="font-family: monospace; font-size: 1.1rem; color: #1d4ed8;">${token}</strong></p>
            <p style="font-size: 0.82rem; color: #3b82f6; margin:0;">
              This grievance has been encrypted and routed confidentially to the <strong>CHM Grievance Redressal Committee & Principal's Cell</strong>. You will receive an update within 48 business hours.
            </p>
          </div>
        `;
      }
    };
  }

  /* 9. Marathi Regional Language Switcher */
  function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    if (!langBtns.length) return;

    const currentLang = localStorage.getItem('chm-lang') || 'en';
    applyLanguage(currentLang);

    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        applyLanguage(lang);
      });
    });

    function applyLanguage(lang) {
      langBtns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
      });
      localStorage.setItem('chm-lang', lang);

      const titleEl = document.querySelector('.college-title');
      const subtitleEl = document.querySelector('.college-subtitle');
      const boardEl = document.querySelector('.board-name');
      const heroTitleEl = document.querySelector('.hero-title');
      const heroDescEl = document.querySelector('.hero-desc');
      const principalTitleEl = document.querySelector('.principal-section .section-title');

      if (lang === 'mr') {
        if (titleEl) titleEl.textContent = 'श्रीमती चांदीबाई हिंमतमल मनसुखानी महाविद्यालय';
        if (subtitleEl) subtitleEl.textContent = "नॅक पुनर्मूल्यांकन 'अ' श्रेणी | मुंबई विद्यापीठाशी संलग्न | स्वायत्त वारसा संस्था";
        if (boardEl) boardEl.textContent = 'हैदराबाद (सिंध) नॅशनल कॉलेजिएट बोर्ड, मुंबई';
        if (heroTitleEl) heroTitleEl.innerHTML = 'ज्ञानातून सक्षमीकरण, <span>उज्ज्वल भविष्याची निर्मिती</span>';
        if (heroDescEl) heroDescEl.textContent = 'ठाणे जिल्ह्यातील अग्रगण्य बहुविद्याशाखीय शैक्षणिक संस्था. कनिष्ठ महाविद्यालयापासून ते विद्यापीठ मान्यताप्राप्त पीएच.डी. संशोधन केंद्रांपर्यंत जागतिक दर्जाचे शिक्षण.';
        if (principalTitleEl) principalTitleEl.textContent = 'प्राचार्यांच्या दालनातून';
      } else {
        if (titleEl) titleEl.textContent = 'Smt. Chandibhai Himathmal Mansukhani College';
        if (subtitleEl) subtitleEl.textContent = "Re-Accredited with 'A' Grade by NAAC | Affiliated to University of Mumbai | Autonomous Heritage Institution";
        if (boardEl) boardEl.textContent = 'Hyderabad (Sind) National Collegiate Board';
        if (heroTitleEl) heroTitleEl.innerHTML = 'Empowering Minds, <span>Inspiring Futures</span> at Smt. CHM College';
        if (heroDescEl) heroDescEl.textContent = 'Premier multi-faculty institution in Thane district under the iconic Hyderabad (Sind) National Collegiate Board. Delivering world-class education from Junior College to Ph.D. Research Centers.';
        if (principalTitleEl) principalTitleEl.textContent = "From The Principal's Desk";
      }
    }
  }

  /* 10. Interactive Campus Map Hotspot Explorer */
  function initCampusHotspots() {
    const pins = document.querySelectorAll('.map-hotspot-pin');
    const detailsContainer = document.getElementById('campus-hotspot-details');
    if (!pins.length || !detailsContainer) return;

    const HOTSPOTS_DATA = {
      'admin': {
        title: 'Heritage Administrative & Principal Wing',
        type: 'Ground & 1st Floor | Administrative Block',
        specs: ['Principal & Vice-Principals Secretariat', 'Central Student Accounts & Fee Counter', 'IQAC & NAAC Quality Assurance Room', 'Staff Room with 150+ Workstations'],
        img: 'assets/images/principal.jpg',
        desc: 'The historic heart of CHM College housing the executive leadership, student records cell, and administrative council chambers.'
      },
      'science': {
        title: 'Science & Advanced Research Labs',
        type: 'Floors 2 to 4 | North Wing',
        specs: ['Biotechnology & Microbiology Culture Lab', 'Advanced Organic & Analytical Chemistry Lab', 'Laser & Optics Physics Darkrooms', 'Recognized University Ph.D. Research Centers'],
        img: 'assets/images/slide-campus-3.jpg',
        desc: 'High-end scientific laboratories equipped with UV-Vis spectrophotometers, chromatography units, and incubation chambers.'
      },
      'library': {
        title: 'Central Knowledge Resource Center (Library)',
        type: 'Central Wing | 2nd & 3rd Floor',
        specs: ['60,000+ Printed Reference Books', 'Rare Sindhi Literature & Manuscript Archives', 'INFLIBNET N-LIST E-Journal Terminals', 'Spacious 250-Seat Air-Cooled Reading Hall'],
        img: 'assets/images/library.jpg',
        desc: 'Fully computerized OPAC catalogued library catering to faculty, undergraduate scholars, and doctoral researchers with quiet study carrels.'
      },
      'auditorium': {
        title: 'Principal K.M. Kundnani Auditorium',
        type: 'South Wing | Ground Level',
        specs: ['800-Seater Acoustic Auditorium', 'State-of-the-Art Stage Lighting & JBL Audio', 'Venue for National Conferences & CHANDI Fest', 'Green Rooms & VIP Reception Lounge'],
        img: 'assets/images/slide-campus-2.jpg',
        desc: 'Named after founding father Principal K.M. Kundnani, this prestigious hall hosts youth festivals, academic convocations, and cultural assemblies.'
      },
      'it-labs': {
        title: 'Computing Center & IT Software Labs',
        type: 'New Tech Wing | 3rd Floor',
        specs: ['4 Dedicated High-Speed Computer Labs', '200+ High-Performance Core i7 Desktops', 'Dedicated 1 Gbps Fiber Leased Line', 'Cloud Computing, AI & IoT Simulation Stations'],
        img: 'assets/images/slide-campus-4.jpg',
        desc: 'Specialized computing infrastructure supporting B.Sc IT, B.Sc Computer Science, and M.Sc IT software development and cybersecurity practicals.'
      },
      'sports': {
        title: 'Sports Pavilion & Gymkhana',
        type: 'East Ground | Campus Sports Complex',
        specs: ['Indoor Badminton & Table Tennis Arenas', 'Modern Fitness Center & Gymnasium', 'Thane District Championship Trophy Showcase', 'Yoga & Physical Wellness Studio'],
        img: 'assets/images/infrastructure.jpg',
        desc: 'Fostering champions in athletics, cricket, boxing, and chess with dedicated NIS coaches and student training support.'
      }
    };

    pins.forEach(pin => {
      pin.addEventListener('click', () => {
        pins.forEach(p => p.classList.remove('active'));
        pin.classList.add('active');

        const key = pin.getAttribute('data-spot');
        const data = HOTSPOTS_DATA[key];
        if (!data) return;

        detailsContainer.innerHTML = `
          <div style="animation: fadeIn 0.3s ease;">
            <span class="ticker-tag admissions" style="margin-bottom: 0.5rem; display:inline-block;">${data.type}</span>
            <h3 style="color: var(--text-primary); font-size: 1.4rem; margin: 0 0 0.5rem 0;">${data.title}</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">${data.desc}</p>
            
            <div style="margin-bottom: 1.25rem; border-radius: 10px; overflow: hidden; height: 170px;">
              <img src="${data.img}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <h4 style="font-size: 0.9rem; color: var(--chm-emerald); margin-bottom: 0.5rem;">Key Facilities & Features:</h4>
            <ul style="list-style: none; font-size: 0.82rem; display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.25rem;">
              ${data.specs.map(s => `<li>✓ <strong style="color: var(--text-primary);">${s}</strong></li>`).join('')}
            </ul>

            <button type="button" onclick="alert('Viewing Virtual 360 tour of ' + '${data.title}')" class="btn-primary" style="padding: 0.55rem 1.25rem; font-size: 0.85rem; width: 100%; justify-content: center;">
              🔭 Explore Virtual 360° Panorama
            </button>
          </div>
        `;
      });
    });
  }

  // PWA Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('CHM PWA Service Worker Registered:', reg.scope))
        .catch(err => console.log('Service Worker Registration notice:', err));
    });
  }
})();

