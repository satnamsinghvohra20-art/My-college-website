/**
 * Smt. CHM College Multilingual Localization Engine (i18n)
 * Provides dynamic real-time language translation between:
 * English (Default) | Marathi (मराठी - Maharashtra) | Sindhi (سنڌي / देवनागरी - HSNC Heritage)
 * Synchronized with CHMStore across all 36 campus pages.
 */

(function (window, document) {
  'use strict';

  const TRANSLATIONS = {
    en: {
      brand_sub: 'University of Mumbai | NAAC Re-Accredited "A" Grade',
      nav_home: 'Home',
      nav_about: 'About CHM',
      nav_academics: 'Academics & NEP',
      nav_admissions: 'Admissions 2026',
      nav_examinations: 'Examinations',
      nav_student_life: 'Student Life',
      nav_research: 'Research & IQAC',
      nav_placements: 'Placements',
      nav_portal: 'Student ERP',
      cta_apply: 'Apply Online',
      cta_verify: 'Verify Credentials',
      search_placeholder: 'Search programs, faculty, circulars...',
      quick_links: 'Quick Campus Links',
      defaulter_notice: 'Mumbai University Ordinance 0.119 Attendance Watchdog',
      rights_reserved: 'All Rights Reserved | Smt. CHM College, Ulhasnagar'
    },
    mr: {
      brand_sub: 'मुंबई विद्यापीठ संलग्नित | नॅक पुनर्मूल्यांकन "A" श्रेणी',
      nav_home: 'मुख्यपृष्ठ',
      nav_about: 'महाविद्यालयाबद्दल',
      nav_academics: 'शैक्षणिक व एनईपी',
      nav_admissions: 'प्रवेश २०२६',
      nav_examinations: 'परीक्षा विभाग',
      nav_student_life: 'विद्यार्थी जीवन',
      nav_research: 'संशोधन व आयक्यूएसी',
      nav_placements: 'प्लेसमेंट सेल',
      nav_portal: 'विद्यार्थी ईआरपी',
      cta_apply: 'ऑनलाइन अर्ज करा',
      cta_verify: 'प्रमाणपत्र पडताळणी',
      search_placeholder: 'अभ्यासक्रम, प्राध्यापक, परिपत्रके शोधा...',
      quick_links: 'महत्त्वाच्या लिंक्स',
      defaulter_notice: 'मुंबई विद्यापीठ अध्यादेश ०.११९ उपस्थिती दक्षता',
      rights_reserved: 'सर्व हक्क राखीव | श्रीमती सी. एच. एम. महाविद्यालय, उल्हासनगर'
    },
    sd: {
      brand_sub: 'ممبئي يونيورسٽي سان وابسته | نئڪ پاران "A" گريڊ (سنڌي اقليتي ادارو)',
      nav_home: 'شروعاتي صفحو',
      nav_about: 'اسان بابت',
      nav_academics: 'تعليم ۽ اين اي پي',
      nav_admissions: 'داخلا ۲۰۲۶',
      nav_examinations: 'امتحان ڊيسڪ',
      nav_student_life: 'شاگرد سرگرميون',
      nav_research: 'تحقيق ۽ معيار',
      nav_placements: 'ملازمت ۽ ڪيريئر',
      nav_portal: 'شاگرد پورٽل',
      cta_apply: 'آن لائن درخواست',
      cta_verify: 'سرٽيفڪيٽ تصديق',
      search_placeholder: 'ڪورس، استاد، هدايتون ڳوليو...',
      quick_links: 'اهم لنڪس',
      defaulter_notice: 'ممبئي يونيورسٽي آرڊيننس ۰.۱۱۹ حاضري ڊفالٽر الرٽ',
      rights_reserved: 'سمورا حق محفوظ | محترمه سي. ايڇ. ايم. ڪاليج، الهاس نگر'
    }
  };

  class I18nEngine {
    constructor() {
      this.currentLang = 'en';
      if (window.CHMStore) {
        const saved = window.CHMStore.getState()?.settings?.language;
        if (saved && TRANSLATIONS[saved]) {
          this.currentLang = saved;
        }
      }
      this.initSelectorUI();
      this.applyTranslations(this.currentLang);
    }

    initSelectorUI() {
      // Find utility bar or header to inject language switcher button
      const utilityRight = document.querySelector('.utility-right') || document.querySelector('.top-brand-bar');
      if (!utilityRight || document.getElementById('chm-lang-picker')) return;

      const picker = document.createElement('div');
      picker.id = 'chm-lang-picker';
      picker.className = 'chm-lang-picker';
      picker.style.display = 'inline-flex';
      picker.style.alignItems = 'center';
      picker.style.gap = '4px';
      picker.style.marginLeft = '10px';
      picker.style.fontSize = '0.78rem';

      picker.innerHTML = `
        <i class="fa fa-globe" style="color: var(--chm-gold); font-size: 0.9rem;"></i>
        <select id="chm-lang-select" aria-label="Select Interface Language" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(212,175,55,0.4); color: #fff; border-radius: 6px; padding: 2px 6px; font-size: 0.78rem; cursor: pointer; outline: none;">
          <option value="en" ${this.currentLang === 'en' ? 'selected' : ''} style="background:#071529;color:#fff;">English</option>
          <option value="mr" ${this.currentLang === 'mr' ? 'selected' : ''} style="background:#071529;color:#fff;">मराठी (Marathi)</option>
          <option value="sd" ${this.currentLang === 'sd' ? 'selected' : ''} style="background:#071529;color:#fff;">سنڌي (Sindhi)</option>
        </select>
      `;

      utilityRight.appendChild(picker);

      const select = picker.querySelector('#chm-lang-select');
      select.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
      });
    }

    setLanguage(lang) {
      if (!TRANSLATIONS[lang]) return;
      this.currentLang = lang;

      if (window.CHMStore) {
        window.CHMStore.setState(s => {
          s.settings.language = lang;
        });
      }

      if (window.CHMAudio) window.CHMAudio.playClick();
      this.applyTranslations(lang);
    }

    applyTranslations(lang) {
      const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

      // Update explicit data-i18n elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = dict[key];
          } else {
            el.innerHTML = dict[key];
          }
        }
      });

      // Update document direction if Sindhi Arabic script
      if (lang === 'sd') {
        document.documentElement.setAttribute('lang', 'sd');
      } else {
        document.documentElement.setAttribute('lang', lang);
      }
    }
  }

  // Self-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { window.CHMI18n = new I18nEngine(); });
  } else {
    window.CHMI18n = new I18nEngine();
  }

})(window, document);
