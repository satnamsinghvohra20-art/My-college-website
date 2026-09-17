/* ==========================================================================
   CHANDIBOT - CHM COLLEGE AI CAMPUS ASSISTANT (v3.0 - Global Self-Injecting)
   Trained on CHM College policies, admissions, exams, syllabi, RFID library kiosk,
   Sindhi cultural heritage, sports gymkhana, and NEP 2020 multi-disciplinary matrix.
   ========================================================================== */

(function () {
  'use strict';

  const KNOWLEDGE_BASE = [
    {
      keywords: ['library', 'kiosk', 'rfid', 'book', 'borrow', 'return', 'fine', 'shelf', 'opac', 'reading room'],
      response: "📚 <strong>Central Library & RFID Kiosk:</strong><br>• CHM Central Library houses 1,25,000+ volumes, rare Sindhi manuscripts, and 1,99,500+ e-books via INFLIBNET N-LIST.<br>• Use our touchless <strong><a href='library-kiosk.html' style='color:#d4af37;text-decoration:underline;'>Library RFID Self-Checkout Kiosk</a></strong> for instant book issuing, smart drop-box returns, and 2D shelf waypoint pathfinding.<br>• Standard student loan duration is 14 days. Overdue fines (₹2.00/day) can be settled instantly via dynamic UPI QR code."
    },
    {
      keywords: ['sindhi', 'heritage', 'kundnani', 'advani', 'shah jo risalo', 'partition', 'fellowship', 'minority'],
      response: "🏛️ <strong>Sindhi Cultural Heritage & Legacy:</strong><br>• Smt. CHM College was founded in 1954 in Ulhasnagar by visionary educationists <strong>Principal K. M. Kundnani</strong> and <strong>Barrister H. G. Advani</strong> under the HSNC Board to rehabilitate and educate the post-Partition Sindhi diaspora.<br>• Explore our digitized <strong><a href='sindhi-heritage.html' style='color:#d4af37;text-decoration:underline;'>Sindhi Cultural Heritage & Partition Archive</a></strong> featuring classical manuscripts of <em>Shah Jo Risalo</em>, <em>Sami-a-ja Salok</em>, oral history recordings, and the ₹25,000 HSNC Board Sindhi Youth Cultural Fellowship."
    },
    {
      keywords: ['sports', 'gymkhana', 'aakash', 'grace mark', 'ordinance 0.229', 'tournament', 'cricket', 'chess', 'badminton'],
      response: "🏃 <strong>Sports & Gymkhana Hub:</strong><br>• CHM hosts the prestigious annual <strong>Aakash Sports Meet</strong> featuring 64+ colleges across Mumbai & Thane.<br>• Under <strong>Mumbai University Ordinance 0.229</strong>, students representing the college at Inter-Collegiate, State, or National levels are entitled to up to <strong>10 Academic Grace Marks</strong>.<br>• Visit the <strong><a href='gymkhana.html' style='color:#d4af37;text-decoration:underline;'>Sports & Gymkhana Hub</a></strong> to generate your authenticated Ordinance 0.229 certificate and access your digital gymkhana pass."
    },
    {
      keywords: ['railway', 'concession', 'pass', 'train', 'local', 'ticket', '129-b', 'central railway', 'ulhasnagar'],
      response: "🚆 <strong>Central Railway Concession Desk:</strong><br>• Eligible bona-fide students residing along Central Railway can claim <strong>75% subsidy (Second Class)</strong> or <strong>50% subsidy (First Class)</strong> for Monthly (MST) and Quarterly (QST) season passes originating from Ulhasnagar (`ULNR`).<br>• Validated against Mumbai University Ordinance 0.119 (>75% attendance).<br>• Generate your official <strong><a href='railway-concession.html' style='color:#d4af37;text-decoration:underline;'>Central Railway Form 129-B Concession Certificate</a></strong> with digital signature of Principal Dr. Kishori Bhagat."
    },
    {
      keywords: ['nep', 'curriculum', 'apaar', 'abc', 'major', 'minor', 'credit', 'degree planner'],
      response: "🎯 <strong>NEP 2020 Multi-Disciplinary Degree Matrix:</strong><br>• CHM College offers 4-Year Undergraduate Degree Pathways with multiple entry/exit options per Mumbai University guidelines.<br>• Customize your Major, Minor, Open Elective, Vocational Skill Course (VSC), and Indian Knowledge System (IKS) subjects.<br>• Generate your DigiLocker-linked APAAR Academic Bank of Credits (ABC) ID card on the <strong><a href='curriculum-planner.html' style='color:#d4af37;text-decoration:underline;'>NEP Degree Planner</a></strong>."
    },
    {
      keywords: ['grievance', 'complaint', 'anti-ragging', 'ragging', 'posh', 'harassment', 'sgrc', 'icc'],
      response: "⚖️ <strong>Statutory Grievance & POSH Portal:</strong><br>• CHM enforces zero tolerance towards ragging and harassment in compliance with UGC Regulations 2023 and POSH Act 2013.<br>• Features 4 statutory channels (SGRC, Anti-Ragging Squad, ICC POSH, Equal Opportunity Cell), an <strong>Anonymous Whistleblower Mode</strong>, and a real-time 15-Day UGC Resolution Countdown Watchdog on our <strong><a href='grievance.html' style='color:#d4af37;text-decoration:underline;'>Grievance Portal</a></strong>."
    },
    {
      keywords: ['admission', 'apply', 'form', 'registration', 'eligibility', 'process'],
      response: "📝 <strong>Admissions 2026-27:</strong><br>Admissions are open! You can apply online through our <strong><a href='admission.html' style='color:#d4af37;text-decoration:underline;'>Digitized Admission Portal</a></strong>. Degree programs (FYBA, FYBCom, FYBSc, BSc-IT, BMS, BAF, BAMMC) require Mumbai University pre-admission enrollment followed by the CHM online merit application."
    },
    {
      keywords: ['fee', 'fees', 'cost', 'payment', 'structure', 'refund', 'upi'],
      response: "💳 <strong>Fee Payment & Receipts:</strong><br>Aided programs range from ₹6,500 to ₹9,200/year, while Self-Financing programs (B.Sc IT, BMS, BAF, BAMMC) range between ₹18,500 to ₹32,000/year. Pay via dynamic UPI QR code or net banking and download verified digital receipts on our <strong><a href='fee-payment.html' style='color:#d4af37;text-decoration:underline;'>Fee Payment Desk</a></strong>."
    },
    {
      keywords: ['cutoff', 'cut off', 'merit list', 'percentage', 'marks'],
      response: "📊 <strong>Degree College Cutoff Estimates:</strong><br>• <strong>B.Sc IT:</strong> Open 68%+, Sindhi Minority 52%+<br>• <strong>BMS:</strong> Commerce 82%+, Science 75%+, Sindhi 65%+<br>• <strong>BAF:</strong> Open 80%+, Sindhi 60%+<br>• <strong>B.Com:</strong> Open 74%+, Sindhi 50%+<br>Use our interactive <em>Smart Cutoff Predictor</em> on the <a href='index.html#calculator' style='color:#d4af37;text-decoration:underline;'>Homepage</a> to calculate your admission chances."
    },
    {
      keywords: ['exam', 'examination', 'hall ticket', 'timetable', 'atkt', 'result', 'marksheet'],
      response: "📋 <strong>Examinations & Marks Statement:</strong><br>View Mumbai University semester examination schedules, download digital Hall Tickets, and print authenticated Statement of Marks using your 7-digit Seat / PRN number on the <strong><a href='exams.html' style='color:#d4af37;text-decoration:underline;'>Exams Portal</a></strong>."
    },
    {
      keywords: ['principal', 'head', 'leadership', 'management', 'hsnc', 'kishori bhagat'],
      response: "🏛️ <strong>Institutional Leadership:</strong><br>Smt. CHM College is headed by <strong>Principal Dr. Kishori Bhagat</strong> and governed by the <strong>Hyderabad (Sind) National Collegiate (HSNC) Board</strong>. The college holds NAAC 'A' Grade re-accreditation with 3.12 CGPA."
    },
    {
      keywords: ['placement', 'job', 'recruiter', 'package', 'internship', 'salary', 'highest package'],
      response: "💼 <strong>Placements & Career Progression:</strong><br>CHM has an 85%+ placement record with a highest package of ₹12.5 LPA. Tier-1 recruiters include <strong>Deloitte, TCS, Infosys, Wipro, Tech Mahindra, ICICI Bank, and L&T</strong>. Visit the <strong><a href='placement.html' style='color:#d4af37;text-decoration:underline;'>Placement Hub</a></strong> to view live drives."
    },
    {
      keywords: ['contact', 'address', 'phone', 'location', 'reach', 'helpline'],
      response: "📍 <strong>Address:</strong> Smt. C.H.M. College, Opp. Ulhasnagar Railway Station, Ulhasnagar - 421003, Dist. Thane, Maharashtra.<br>📞 <strong>Phone:</strong> +91 (0251) 273 4940 / Helpline: +91 7385687818<br>✉️ <strong>Email:</strong> principal@chmcollege.in"
    },
    {
      keywords: ['green campus', 'solar', 'sustainability', 'rainwater', 'naac 7.1'],
      response: "🌱 <strong>Green Campus & Sustainability:</strong><br>CHM features a 150 kW rooftop solar plant, 1,20,000 L rainwater harvesting cistern, and 180 kg/day composting facility. Check real-time telemetry on the <strong><a href='green-campus.html' style='color:#d4af37;text-decoration:underline;'>Green Campus Dashboard</a></strong>."
    },
    {
      keywords: ['parent', 'guardian', 'defaulter', 'attendance', 'ordinance 0.119'],
      response: "👪 <strong>Parent ERP Desk:</strong><br>Parents can monitor their ward's real-time attendance, track Mumbai University Ordinance 0.119 defaulter warnings (<75%), review internal marks, and book 1-on-1 PTA teacher counseling on the <strong><a href='parent-portal.html' style='color:#d4af37;text-decoration:underline;'>Parent Portal</a></strong>."
    }
  ];

  const DEFAULT_RESPONSE = "Namaste! I am <strong>ChandiBot AI</strong>, your 24/7 campus concierge. I can guide you through admissions, fee payment, railway concessions, the library RFID kiosk, Sindhi cultural heritage, exams, sports grace marks, or faculty counseling. Feel free to click any suggestion below or type your question!";

  function getBotResponse(userText) {
    const cleanText = userText.toLowerCase();

    // Check reactive campus store for live dynamic user questions
    if (window.CHMStore) {
      const state = window.CHMStore.getState();
      const user = state.user || {};

      if (cleanText.includes('my attendance') || cleanText.includes('attendance percentage') || cleanText.includes('am i defaulter')) {
        const att = user.overallAttendance || 86.4;
        const standing = att >= 75 ? '✅ <strong>Good Standing</strong>' : '⚠️ <strong style="color:#ef4444;">Defaulter Warning (<75%)</strong>';
        return `📊 <strong>Your Live Attendance Record:</strong><br>• Student: <strong>${user.name}</strong> (${user.roll})<br>• Cumulative Attendance: <strong>${att}%</strong> (${standing})<br>• Ordinance 0.119 Status: ${att >= 75 ? 'Eligible for Hall Ticket' : 'Counseling Required'}<br>• Recent Logged Session: USDS601 Smartboard QR check-in.`;
      }

      if (cleanText.includes('my book') || cleanText.includes('borrowed') || cleanText.includes('library loan') || cleanText.includes('my fine')) {
        const loans = state.libraryLoans || [];
        if (loans.length === 0) {
          return `📚 <strong>Library Records:</strong> You currently have no books borrowed from CHM Central Library.`;
        }
        const list = loans.map(b => `• <em>${b.title}</em> (Due: <strong>${b.dueDate}</strong>, Status: <span style="color:${b.status === 'Active' ? '#10b981' : '#ef4444'}">${b.status}</span>${b.fine > 0 ? `, Fine: ₹${b.fine}` : ''})`).join('<br>');
        return `📚 <strong>Your Active Library Loans:</strong><br>${list}<br>Return books or clear fines touchlessly at the <a href='library-kiosk.html' style='color:#d4af37;text-decoration:underline;'>RFID Kiosk</a>.`;
      }

      if (cleanText.includes('who am i') || cleanText.includes('my profile') || cleanText.includes('my roll') || cleanText.includes('my prn')) {
        return `🎓 <strong>Verified Student Profile:</strong><br>• Name: <strong>${user.name}</strong><br>• Roll No: <strong>${user.roll}</strong> | PRN: <code>${user.prn}</code><br>• Course: <strong>${user.course}</strong> (${user.year})<br>• Cumulative CGPA: <strong>${user.cgpa}</strong><br>• APAAR Academic Bank ID: <code>${user.apaarId}</code>`;
      }

      if (cleanText.includes('fee receipt') || cleanText.includes('my payment') || cleanText.includes('paid fee')) {
        const rc = (state.feeReceipts && state.feeReceipts[0]) || null;
        if (rc) {
          return `💳 <strong>Fee Payment Record:</strong><br>• Receipt No: <code>${rc.id}</code><br>• Program: <strong>${rc.type}</strong><br>• Amount: <strong>₹${rc.amount.toLocaleString('en-IN')}</strong> (${rc.status})<br>• Mode: ${rc.mode} on ${rc.date}<br>Verify authenticity on our <a href='verify.html?cert=${rc.id}' style='color:#d4af37;text-decoration:underline;'>Public Verification Desk</a>.`;
        }
      }
    }

    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(kw => cleanText.includes(kw))) {
        return item.response;
      }
    }
    return DEFAULT_RESPONSE;
  }

  // Self-Inject HTML Widget if not present
  function ensureWidgetDOM() {
    if (document.getElementById('chandibot-widget-container')) return;

    // Check if an older markup widget exists
    let launcher = document.getElementById('chandibot-launcher');
    let windowEl = document.getElementById('chandibot-window');

    if (!launcher || !windowEl) {
      const container = document.createElement('div');
      container.id = 'chandibot-widget-container';
      container.className = 'chandibot-widget';
      container.innerHTML = `
        <button type="button" class="chandibot-launcher" id="chandibot-launcher" aria-label="Open ChandiBot AI Campus Assistant" title="ChandiBot AI Campus Concierge">
          <span class="chandibot-online-ping"></span>
          🤖
        </button>

        <div class="chandibot-window" id="chandibot-window">
          <div class="bot-header">
            <div class="bot-profile">
              <div class="bot-avatar-circle">CHM</div>
              <div>
                <div class="bot-name">ChandiBot AI <span style="font-size:0.68rem; font-weight:normal; background:rgba(16,185,129,0.25); color:#a7f3d0; padding:2px 6px; border-radius:10px; border:1px solid rgba(16,185,129,0.4); margin-left:4px;" title="Conversations are automatically preserved across all pages">💾 Auto-Saved</span></div>
                <div class="bot-status-text">● Voice-Enabled Campus Concierge</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" class="bot-voice-btn" id="chandibot-clear-chat" title="Clear saved chat history" style="font-size:0.8rem; padding:4px 7px;">🗑️</button>
              <button type="button" class="bot-voice-btn" id="chandibot-voice-toggle" title="Toggle Voice Audio Reading (Text-to-Speech)">
                🔈
              </button>
              <button type="button" class="bot-close-btn" id="chandibot-close" aria-label="Close Assistant">✕</button>
            </div>
          </div>

          <div class="bot-messages" id="chandibot-messages">
            <div class="bot-msg bot">
              👋 Namaste! I am <strong>ChandiBot</strong>, CHM College's AI assistant. Ask me questions by typing or speaking through the microphone!
            </div>
          </div>

          <div class="bot-quick-chips">
            <button type="button" class="chip-btn" data-prompt="How do I use the Library RFID Self-Checkout Kiosk?">📚 Library RFID</button>
            <button type="button" class="chip-btn" data-prompt="Tell me about Sindhi Cultural Heritage and Fellowships">🏛️ Sindhi Heritage</button>
            <button type="button" class="chip-btn" data-prompt="How can I get Ordinance 0.229 Sports Grace Marks?">🏃 Sports & Grace Marks</button>
            <button type="button" class="chip-btn" data-prompt="How do I get a Central Railway Student Concession Pass?">🚆 Railway Pass</button>
            <button type="button" class="chip-btn" data-prompt="How do I apply for FYBSc-IT admission?">📝 Admissions 2026</button>
            <button type="button" class="chip-btn" data-prompt="What are the fee payment options and refund rules?">💳 Fees & Payment</button>
          </div>

          <div class="bot-input-area">
            <button type="button" id="chandibot-mic-btn" class="bot-mic-btn" title="Click to Speak (Voice Input)">
              🎤
            </button>
            <input type="text" id="chandibot-input" class="bot-input" placeholder="Type or click 🎤 to speak...">
            <button type="button" id="chandibot-send" class="bot-send-btn" aria-label="Send query">➤</button>
          </div>
        </div>
      `;
      document.body.appendChild(container);
    }
  }

  // Inject Dedicated Styles to guarantee flawless display across all pages
  function injectStyles() {
    if (document.getElementById('chandibot-global-styles')) return;
    const style = document.createElement('style');
    style.id = 'chandibot-global-styles';
    style.textContent = `
      .chandibot-widget {
        position: fixed;
        bottom: 25px;
        left: 25px;
        z-index: 10000;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .chandibot-launcher {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0a2647 0%, #145a32 100%);
        border: 2px solid #d4af37;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(10, 38, 71, 0.4);
        transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        font-size: 26px;
      }
      .chandibot-launcher:hover {
        transform: scale(1.1);
        box-shadow: 0 12px 30px rgba(212, 175, 55, 0.5);
      }
      .chandibot-online-ping {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 14px;
        height: 14px;
        background: #10b981;
        border: 2px solid #ffffff;
        border-radius: 50%;
      }
      .chandibot-window {
        position: fixed;
        bottom: 95px;
        left: 25px;
        width: 380px;
        max-width: calc(100vw - 40px);
        height: 520px;
        max-height: calc(100vh - 120px);
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px) scale(0.95);
        transition: all 0.25s ease;
        z-index: 10001;
      }
      .chandibot-window.open {
        opacity: 1;
        pointer-events: all;
        transform: translateY(0) scale(1);
      }
      .bot-header {
        background: linear-gradient(135deg, #0a2647 0%, #145a32 100%);
        color: #ffffff;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .bot-profile {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .bot-avatar-circle {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: #d4af37;
        color: #0a2647;
        font-weight: 800;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bot-name {
        font-weight: 700;
        font-size: 0.95rem;
      }
      .bot-status-text {
        font-size: 0.72rem;
        color: #86efac;
      }
      .bot-voice-btn, .bot-close-btn {
        background: rgba(255, 255, 255, 0.15);
        border: none;
        color: #ffffff;
        border-radius: 6px;
        padding: 4px 8px;
        cursor: pointer;
        font-size: 0.9rem;
      }
      .bot-voice-btn.active {
        background: #d4af37;
        color: #000000;
      }
      .bot-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        background: #f8fafc;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .bot-msg {
        max-width: 85%;
        padding: 10px 14px;
        border-radius: 12px;
        font-size: 0.88rem;
        line-height: 1.5;
        word-wrap: break-word;
      }
      .bot-msg.bot {
        background: #ffffff;
        color: #1e293b;
        align-self: flex-start;
        border: 1px solid #e2e8f0;
        border-bottom-left-radius: 2px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      }
      .bot-msg.user {
        background: #0a2647;
        color: #ffffff;
        align-self: flex-end;
        border-bottom-right-radius: 2px;
      }
      .bot-quick-chips {
        display: flex;
        gap: 6px;
        padding: 8px 12px;
        background: #ffffff;
        overflow-x: auto;
        border-top: 1px solid #e2e8f0;
        white-space: nowrap;
      }
      .chip-btn {
        background: #f1f5f9;
        border: 1px solid #cbd5e1;
        border-radius: 20px;
        padding: 4px 10px;
        font-size: 0.75rem;
        color: #334155;
        cursor: pointer;
        transition: background 0.2s;
      }
      .chip-btn:hover {
        background: #e2e8f0;
        border-color: #94a3b8;
      }
      .bot-input-area {
        display: flex;
        padding: 10px;
        background: #ffffff;
        border-top: 1px solid #e2e8f0;
        gap: 8px;
      }
      .bot-input {
        flex: 1;
        padding: 10px 14px;
        border: 1px solid #cbd5e1;
        border-radius: 20px;
        font-size: 0.88rem;
        outline: none;
      }
      .bot-input:focus {
        border-color: #0a2647;
      }
      .bot-send-btn {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: #0a2647;
        color: #ffffff;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bot-mic-btn {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: #f1f5f9;
        color: #1e293b;
        border: 1px solid #cbd5e1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bot-mic-btn.listening {
        background: #fee2e2;
        color: #ef4444;
        border-color: #ef4444;
        animation: pulseMic 1s infinite;
      }
      @keyframes pulseMic {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      @media (max-width: 480px) {
        .chandibot-widget {
          bottom: 15px;
          left: 15px;
        }
        .chandibot-window {
          width: calc(100vw - 30px);
          left: 15px;
          bottom: 80px;
          height: 480px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function initChandiBot() {
    injectStyles();
    ensureWidgetDOM();

    const launcher = document.getElementById('chandibot-launcher');
    const windowEl = document.getElementById('chandibot-window');
    const closeBtn = document.getElementById('chandibot-close');
    const msgContainer = document.getElementById('chandibot-messages');
    const inputEl = document.getElementById('chandibot-input');
    const sendBtn = document.getElementById('chandibot-send');
    const quickChips = document.querySelectorAll('.chip-btn');

    if (!launcher || !windowEl) return;

    // Toggle Chat Window
    launcher.onclick = () => {
      windowEl.classList.toggle('open');
      if (windowEl.classList.contains('open')) {
        inputEl?.focus();
      }
    };

    if (closeBtn) {
      closeBtn.onclick = () => {
        windowEl.classList.remove('open');
      };
    }

    // Send Message Handler
    function handleSend(text) {
      const query = text || inputEl?.value?.trim();
      if (!query) return;

      // Add User Message
      appendMessage(query, 'user');
      if (inputEl) inputEl.value = '';

      // Typing simulation
      const typingId = showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator(typingId);
        const reply = getBotResponse(query);
        appendMessage(reply, 'bot');
        if (voiceEnabled) {
          speakText(reply);
        }
      }, 450);
    }

    // Voice Synthesis (Text-to-Speech)
    let voiceEnabled = false;
    const voiceToggleBtn = document.getElementById('chandibot-voice-toggle');
    const micBtn = document.getElementById('chandibot-mic-btn');

    if (voiceToggleBtn) {
      voiceToggleBtn.onclick = () => {
        voiceEnabled = !voiceEnabled;
        voiceToggleBtn.classList.toggle('active', voiceEnabled);
        voiceToggleBtn.innerHTML = voiceEnabled ? '🔊' : '🔈';
        if (!voiceEnabled && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      };
    }

    function speakText(htmlText) {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      // Strip HTML tags for clean audio speech
      const cleanText = htmlText.replace(/<[^>]*>?/gm, ' ');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }

    // Voice Recognition (Speech-to-Text)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && micBtn) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      micBtn.onclick = () => {
        try {
          recognition.start();
          micBtn.classList.add('listening');
        } catch (err) {
          recognition.stop();
          micBtn.classList.remove('listening');
        }
      };

      recognition.onresult = (e) => {
        const spoken = e.results[0][0].transcript;
        if (inputEl) inputEl.value = spoken;
        micBtn.classList.remove('listening');
        handleSend(spoken);
      };

      recognition.onerror = () => {
        micBtn.classList.remove('listening');
      };

      recognition.onend = () => {
        micBtn.classList.remove('listening');
      };
    } else if (micBtn) {
      micBtn.title = "Voice recognition not supported in this browser";
    }

    const STORAGE_KEY = 'chm_chandibot_chat_history';

    function getSavedChats() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    }

    function saveChatEntry(sender, htmlContent) {
      try {
        const chats = getSavedChats();
        chats.push({ sender, html: htmlContent, timestamp: Date.now() });
        // Keep last 50 messages to prevent overflow
        if (chats.length > 50) chats.splice(0, chats.length - 50);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
      } catch (e) {
        console.warn('Unable to auto-save chat to localStorage:', e);
      }
    }

    function appendMessage(htmlContent, sender, shouldSave = true) {
      if (!msgContainer) return;
      const isSubpage = window.location.pathname.includes('/pages/');
      let processedHtml = htmlContent;
      if (sender === 'bot') {
        if (isSubpage) {
          processedHtml = processedHtml.replace(/href=['"]index\.html/g, "href='../index.html");
          processedHtml = processedHtml.replace(/href=['"]pages\//g, "href='");
        } else {
          processedHtml = processedHtml.replace(/href=['"](?!pages\/|http|#|mailto|tel|\.\.)([a-zA-Z0-9_\-]+\.html)/g, "href='pages/$1");
        }
      }
      const msg = document.createElement('div');
      msg.className = `bot-msg ${sender}`;
      msg.innerHTML = processedHtml;
      msgContainer.appendChild(msg);
      msgContainer.scrollTop = msgContainer.scrollHeight;

      if (shouldSave) {
        saveChatEntry(sender, htmlContent);
      }
    }

    // Restore auto-saved chats on initialization
    function restoreSavedChats() {
      const saved = getSavedChats();
      if (saved && saved.length > 0) {
        // Clear default welcome message and reload conversation
        msgContainer.innerHTML = '';
        saved.forEach(entry => {
          appendMessage(entry.html, entry.sender, false);
        });
      }
    }
    restoreSavedChats();

    // Clear chat history button handler
    const clearChatBtn = document.getElementById('chandibot-clear-chat');
    if (clearChatBtn) {
      clearChatBtn.onclick = () => {
        if (confirm('Clear saved ChandiBot chat conversation?')) {
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch (e) {}
          msgContainer.innerHTML = `
            <div class="bot-msg bot">
              👋 Namaste! I am <strong>ChandiBot</strong>, CHM College's AI assistant. Ask me questions by typing or speaking through the microphone!
            </div>
          `;
        }
      };
    }

    function showTypingIndicator() {
      if (!msgContainer) return '';
      const id = 'typing-' + Date.now();
      const typingEl = document.createElement('div');
      typingEl.id = id;
      typingEl.className = 'bot-msg bot';
      typingEl.innerHTML = '<span style="font-style:italic;color:#64748b;">ChandiBot is typing...</span>';
      msgContainer.appendChild(typingEl);
      msgContainer.scrollTop = msgContainer.scrollHeight;
      return id;
    }

    function removeTypingIndicator(id) {
      const el = document.getElementById(id);
      if (el) el.remove();
    }

    if (sendBtn) sendBtn.onclick = () => handleSend();
    if (inputEl) {
      inputEl.onkeypress = (e) => {
        if (e.key === 'Enter') handleSend();
      };
    }

    // Quick Chips click
    quickChips.forEach(chip => {
      chip.onclick = () => {
        const prompt = chip.getAttribute('data-prompt') || chip.textContent;
        handleSend(prompt);
      };
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChandiBot);
  } else {
    initChandiBot();
  }
})();
