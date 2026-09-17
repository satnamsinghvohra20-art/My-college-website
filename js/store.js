/**
 * Smt. CHM College Unified Reactive Campus Store (CHMStore)
 * Pure client-side reactive state management with IndexedDB persistence,
 * LocalStorage fallback, and cross-tab real-time BroadcastChannel sync.
 * 
 * Manages: Student ERP session, attendance registry, library RFID loans,
 * fee receipts, statutory grievances, railway concession passes, and UI settings.
 */

(function (window) {
  'use strict';

  const DB_NAME = 'CHM_CAMPUS_DB';
  const DB_VERSION = 1;
  const STORE_NAME = 'campus_state';
  const SYNC_CHANNEL_NAME = 'chm_campus_sync_v1';

  // Default initial campus state
  const DEFAULT_STATE = {
    user: {
      id: 'CHM-2024-8841',
      name: 'Satnam Singh Vohra',
      roll: 'TYIT-028',
      prn: '2024016400329104',
      course: 'B.Sc. (Data Science & IT)',
      year: 'Third Year (Sem VI)',
      division: 'A',
      overallAttendance: 86.4,
      cgpa: '8.92',
      email: 'satnam.vohra@chmcollege.in',
      phone: '+91 98765 43210',
      apaarId: 'IN-ABC-9482-1049-7721'
    },
    attendanceLog: [
      { id: 'att-1', subject: 'Machine Learning & Predictive Analytics', code: 'USDS601', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'Present', mode: 'Smartboard QR' },
      { id: 'att-2', subject: 'Big Data Engineering & Cloud Dataform', code: 'USDS602', timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'Present', mode: 'Smartboard QR' },
      { id: 'att-3', subject: 'Deep Learning & Neural Architectures', code: 'USDS603', timestamp: new Date(Date.now() - 172800000).toISOString(), status: 'Present', mode: 'Smartboard QR' }
    ],
    libraryLoans: [
      { id: 'book-101', title: 'Pattern Recognition & Machine Learning', author: 'Christopher M. Bishop', rfidTag: 'RFID-8821-CS', borrowDate: '2026-09-04', dueDate: '2026-09-18', status: 'Active', fine: 0 },
      { id: 'book-102', title: 'Sindhi Heritage: Classical Verses of Shah Jo Risalo', author: 'HSNC Research Cell', rfidTag: 'RFID-1954-SH', borrowDate: '2026-08-25', dueDate: '2026-09-08', status: 'Overdue', fine: 20 }
    ],
    feeReceipts: [
      { id: 'CHM-TXN-9021', type: 'Annual Tuition & Lab Fees (TY B.Sc)', amount: 24500, date: '2026-07-15', mode: 'UPI (Axis Bank)', status: 'Success', certHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
    ],
    grievances: [
      { id: 'GRV-2026-041', category: 'Infrastructure & Labs', subject: 'GPU server allocation for Big Data capstone', date: '2026-09-10', status: 'In Review', cell: 'SGRC', resolutionDays: 4 }
    ],
    concessions: [
      { id: 'CON-129B-402', stationFrom: 'Ulhasnagar (ULNR)', stationTo: 'Dadar (DR)', classType: 'First Class', duration: 'Quarterly', status: 'Approved', approvalDate: '2026-09-05', certToken: 'CHM-CR-129B-94821' }
    ],
    settings: {
      theme: 'light',
      language: 'en',
      audioEffects: true,
      haptics: true,
      aiVoice: true,
      activePersona: 'student'
    }
  };

  class ReactiveStore {
    constructor() {
      this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      this.subscribers = new Set();
      this.db = null;
      this.syncChannel = null;
      this.isReady = false;

      this.initBroadcast();
      this.initIndexedDB();
    }

    initBroadcast() {
      try {
        if ('BroadcastChannel' in window) {
          this.syncChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
          this.syncChannel.onmessage = (event) => {
            if (event.data && event.data.type === 'SYNC_STATE') {
              this.state = event.data.payload;
              this.notifyLocalSubscribers();
            }
          };
        }
      } catch (err) {
        console.warn('BroadcastChannel not available:', err);
      }
    }

    initIndexedDB() {
      if (!('indexedDB' in window)) {
        this.loadFromLocalStorage();
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        this.loadFromDB();
      };

      request.onerror = () => {
        console.warn('IndexedDB failed to open, falling back to localStorage');
        this.loadFromLocalStorage();
      };
    }

    loadFromDB() {
      try {
        const transaction = this.db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const req = store.get('root_state');

        req.onsuccess = () => {
          if (req.result && req.result.data) {
            this.state = Object.assign({}, DEFAULT_STATE, req.result.data);
          } else {
            this.saveToDB(this.state);
          }
          this.isReady = true;
          this.notifyLocalSubscribers();
        };

        req.onerror = () => {
          this.loadFromLocalStorage();
        };
      } catch (e) {
        this.loadFromLocalStorage();
      }
    }

    saveToDB(stateData) {
      if (this.db) {
        try {
          const transaction = this.db.transaction([STORE_NAME], 'readwrite');
          const store = transaction.objectStore(STORE_NAME);
          store.put({ key: 'root_state', data: stateData, updatedAt: Date.now() });
        } catch (err) {
          console.warn('Failed saving to IndexedDB:', err);
        }
      }
      // Redundant backup to localStorage
      try {
        localStorage.setItem('chm_campus_state_backup', JSON.stringify(stateData));
      } catch (err) {}
    }

    loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('chm_campus_state_backup');
        if (saved) {
          this.state = Object.assign({}, DEFAULT_STATE, JSON.parse(saved));
        }
      } catch (e) {}
      this.isReady = true;
      this.notifyLocalSubscribers();
    }

    getState() {
      return this.state;
    }

    setState(updater) {
      if (typeof updater === 'function') {
        updater(this.state);
      } else if (typeof updater === 'object') {
        Object.assign(this.state, updater);
      }

      this.saveToDB(this.state);
      this.notifyLocalSubscribers();

      // Broadcast to other open tabs
      if (this.syncChannel) {
        try {
          this.syncChannel.postMessage({ type: 'SYNC_STATE', payload: this.state });
        } catch (e) {}
      }
    }

    subscribe(fn) {
      this.subscribers.add(fn);
      // Immediately invoke with current state
      fn(this.state);
      return () => this.subscribers.delete(fn);
    }

    notifyLocalSubscribers() {
      for (const sub of this.subscribers) {
        try {
          sub(this.state);
        } catch (err) {
          console.error('Error in store subscriber:', err);
        }
      }
      // Dispatch global window event
      window.dispatchEvent(new CustomEvent('chm:store-update', { detail: this.state }));
    }

    // Convenience Mutation Helpers
    recordAttendance(record) {
      this.setState(s => {
        s.attendanceLog.unshift(Object.assign({
          id: 'att-' + Date.now(),
          timestamp: new Date().toISOString()
        }, record));
        // Bump attendance calculation
        s.user.overallAttendance = Math.min(100, +(s.user.overallAttendance + 0.2).toFixed(1));
      });
    }

    addLibraryLoan(book) {
      this.setState(s => {
        s.libraryLoans.unshift(Object.assign({
          id: 'loan-' + Date.now(),
          borrowDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
          status: 'Active',
          fine: 0
        }, book));
      });
    }

    returnLibraryBook(bookId) {
      this.setState(s => {
        const item = s.libraryLoans.find(b => b.id === bookId || b.rfidTag === bookId);
        if (item) {
          item.status = 'Returned';
          item.returnDate = new Date().toISOString().split('T')[0];
          item.fine = 0;
        }
      });
    }

    recordFeePayment(payment) {
      this.setState(s => {
        s.feeReceipts.unshift(Object.assign({
          id: 'CHM-TXN-' + Math.floor(1000 + Math.random() * 9000),
          date: new Date().toISOString().split('T')[0],
          status: 'Success'
        }, payment));
      });
    }

    submitGrievance(complaint) {
      this.setState(s => {
        s.grievances.unshift(Object.assign({
          id: 'GRV-2026-' + Math.floor(100 + Math.random() * 900),
          date: new Date().toISOString().split('T')[0],
          status: 'Received',
          resolutionDays: 15
        }, complaint));
      });
    }
  }

  // Create global singleton
  window.CHMStore = new ReactiveStore();

})(window);
