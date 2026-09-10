/* ==========================================================================
   CHANDIBOT - CHM COLLEGE AI CAMPUS ASSISTANT
   Trained on CHM College policies, admissions, exams, syllabi & campus life
   ========================================================================== */

(function () {
  const KNOWLEDGE_BASE = [
    {
      keywords: ['admission', 'apply', 'form', 'registration', 'eligibility', 'process'],
      response: "Admissions for Academic Year 2026-27 are currently underway! You can apply online through our Digitized Admission Portal. Junior College (FYJC) admissions follow the government online portal, while Degree College (FYBA, FYBCom, FYBSc, BSc-IT, BMS, BAF, BAMMC) requires pre-admission online enrollment with Mumbai University followed by the CHM College digital form."
    },
    {
      keywords: ['fee', 'fees', 'cost', 'payment', 'structure', 'refund'],
      response: "Fee structures vary by course. Aided programs (B.A., B.Com, B.Sc) range from ₹6,500 to ₹9,200/year. Self-Financing programs (B.Sc IT, BMS, BAF, BFM, BAMMC) range between ₹18,500 to ₹32,000/year. All fees can be paid seamlessly online via UPI, Cards, or Net Banking on our portal with instant printable receipts."
    },
    {
      keywords: ['cutoff', 'cut off', 'merit list', 'percentage', 'marks'],
      response: "Previous year cutoff trends for Degree College:<br>• <strong>B.Sc IT</strong>: Open 68%+, Sindhi Minority 52%+<br>• <strong>BMS</strong>: Commerce 82%+, Science 75%+, Sindhi 65%+<br>• <strong>BAF</strong>: Open 80%+, Sindhi 60%+<br>• <strong>B.Com</strong>: Open 74%+, Sindhi 50%+<br>Try our interactive <em>Smart Cutoff Predictor</em> on the homepage to calculate your chance!"
    },
    {
      keywords: ['sindhi', 'minority', 'reservation', 'quota'],
      response: "Smt. CHM College is a Sindhi Linguistic Minority institution managed by the prestigious HSNC Board. 50% of total seats are reserved for students belonging to the Sindhi community. An affidavit or school leaving certificate stating Sindhi mother tongue is required."
    },
    {
      keywords: ['exam', 'examination', 'hall ticket', 'timetable', 'atkt', 'result'],
      response: "Semester examinations are administered in accordance with University of Mumbai guidelines. You can download your official Examination Hall Ticket and view Semester Results directly under our 'Examinations' tab by entering your 7-digit Seat / PRN number."
    },
    {
      keywords: ['principal', 'head', 'leadership', 'management', 'hsnc'],
      response: "Smt. CHM College is led by <strong>Principal Dr. Kishori Bhagat</strong> and governed by the <strong>Hyderabad (Sind) National Collegiate (HSNC) Board</strong>, founded by visionary educationists Barrister H.G. Advani and Principal K.M. Kundnani."
    },
    {
      keywords: ['placement', 'job', 'recruiter', 'package', 'internship', 'salary'],
      response: "The Career Progression Team (CPT) at CHM College has an outstanding record with 85%+ placement assistance. Major recruiters include <strong>TCS, Infosys, Wipro, Tech Mahindra, Deloitte, ICICI Bank, and L&T</strong>, with average packages ranging from ₹3.5 LPA to ₹7.2 LPA."
    },
    {
      keywords: ['library', 'books', 'timing', 'opac', 'reading room'],
      response: "The CHM Central Library houses over 60,000 books, rare Sindhi manuscripts, 40+ national/international journals, and digital e-resources (N-LIST & INFLIBNET). Open Monday to Saturday: 8:00 AM to 6:00 PM."
    },
    {
      keywords: ['contact', 'address', 'phone', 'location', 'reach', 'helpline'],
      response: "📍 <strong>Address:</strong> Smt. C.H.M. College, Opposite Ulhasnagar Railway Station, Ulhasnagar, Dist. Thane - 421003, Maharashtra.<br>📞 <strong>Admission Helpline:</strong> +91 7385687818 (10:30 AM - 3:30 PM)<br>✉️ <strong>Email:</strong> principal@chmcollege.in"
    },
    {
      keywords: ['ragging', 'complaint', 'grievance', 'harassment', 'help'],
      response: "CHM College maintains a strict <strong>Zero Tolerance Policy</strong> towards ragging and harassment. You can lodge a confidential or anonymous grievance through our online Grievance Redressal portal, or call the National Anti-Ragging Toll-Free Helpline at 1800-180-5522."
    },
    {
      keywords: ['courses', 'departments', 'programs', 'subjects', 'stream'],
      response: "We offer comprehensive education across 4 divisions:<br>1. <strong>Junior College:</strong> Arts, Science, Commerce.<br>2. <strong>Undergraduate (Aided):</strong> B.A., B.Com, B.Sc.<br>3. <strong>Undergraduate (SFC):</strong> B.Sc IT, B.Sc CS, B.Sc Biotech, BMS, BAF, BBI, BFM, BAMMC.<br>4. <strong>Post-Graduate & Ph.D.:</strong> M.A., M.Com, M.Sc (IT, Chemistry, Biotech, Microbiology) & Ph.D. Research Centers."
    }
  ];

  const DEFAULT_RESPONSE = "Thank you for asking! I am <strong>ChandiBot</strong>, CHM College's AI assistant. I can guide you through admissions, cutoff calculators, exam hall tickets, fee structures, faculty contacts, or campus facilities. Feel free to click any suggestion below or ask your question!";

  function getBotResponse(userText) {
    const cleanText = userText.toLowerCase();
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(kw => cleanText.includes(kw))) {
        return item.response;
      }
    }
    return DEFAULT_RESPONSE;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const launcher = document.getElementById('chandibot-launcher');
    const windowEl = document.getElementById('chandibot-window');
    const closeBtn = document.getElementById('chandibot-close');
    const msgContainer = document.getElementById('chandibot-messages');
    const inputEl = document.getElementById('chandibot-input');
    const sendBtn = document.getElementById('chandibot-send');
    const quickChips = document.querySelectorAll('.chip-btn');

    if (!launcher || !windowEl) return;

    // Toggle Chat Window
    launcher.addEventListener('click', () => {
      windowEl.classList.toggle('open');
      if (windowEl.classList.contains('open')) {
        inputEl?.focus();
      }
    });

    closeBtn?.addEventListener('click', () => {
      windowEl.classList.remove('open');
    });

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
      }, 550);
    }

    // Voice Synthesis (Text-to-Speech)
    let voiceEnabled = false;
    const voiceToggleBtn = document.getElementById('chandibot-voice-toggle');
    const micBtn = document.getElementById('chandibot-mic-btn');

    voiceToggleBtn?.addEventListener('click', () => {
      voiceEnabled = !voiceEnabled;
      voiceToggleBtn.classList.toggle('active', voiceEnabled);
      voiceToggleBtn.innerHTML = voiceEnabled ? '🔊' : '🔈';
      if (!voiceEnabled && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    });

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

      micBtn.addEventListener('click', () => {
        try {
          recognition.start();
          micBtn.classList.add('listening');
        } catch (err) {
          recognition.stop();
          micBtn.classList.remove('listening');
        }
      });

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

    function appendMessage(htmlContent, sender) {
      const msg = document.createElement('div');
      msg.className = `bot-msg ${sender}`;
      msg.innerHTML = htmlContent;
      msgContainer.appendChild(msg);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    function showTypingIndicator() {
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

    sendBtn?.addEventListener('click', () => handleSend());
    inputEl?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    // Quick Chips click
    quickChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt') || chip.textContent;
        handleSend(prompt);
      });
    });
  });
})();

