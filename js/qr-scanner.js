/**
 * Smt. CHM College WebRTC Real-Time Camera QR & Barcode Scanner
 * Native video stream capture using navigator.mediaDevices.getUserMedia
 * Supported by native hardware-accelerated BarcodeDetector with image file & manual input fallback.
 */

(function (window, document) {
  'use strict';

  class CameraScanner {
    constructor() {
      this.stream = null;
      this.video = null;
      this.canvas = null;
      this.ctx = null;
      this.animFrameId = null;
      this.barcodeDetector = null;
      this.isOpen = false;
      this.onScanCallback = null;

      if ('BarcodeDetector' in window) {
        try {
          this.barcodeDetector = new BarcodeDetector({
            formats: ['qr_code', 'code_128', 'code_39', 'ean_13']
          });
        } catch (e) {
          console.log('BarcodeDetector format error, fallback to general', e);
        }
      }
    }

    open(options = {}) {
      if (this.isOpen) return;
      this.isOpen = true;
      this.onScanCallback = options.onScan || null;
      this.title = options.title || 'Scan QR / Student ID Barcode';

      this.buildModal();
      this.startCamera();
      if (window.CHMAudio) window.CHMAudio.playClick();
    }

    buildModal() {
      const overlay = document.createElement('div');
      overlay.id = 'chm-scanner-modal-root';
      overlay.className = 'chm-scanner-modal-overlay';

      overlay.innerHTML = `
        <div class="chm-scanner-modal" role="dialog" aria-modal="true">
          <div class="chm-scanner-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="fa fa-qrcode" style="color: var(--chm-gold); font-size: 1.2rem;"></i>
              <strong style="font-size: 1rem;">${this.title}</strong>
            </div>
            <button type="button" class="modal-close" id="chm-scanner-close-btn" aria-label="Close Scanner">&times;</button>
          </div>
          <div class="chm-scanner-viewport" id="chm-scanner-viewport">
            <video id="chm-scanner-video-el" class="chm-scanner-video" playsinline autoplay muted></video>
            <div class="chm-scanner-reticle">
              <div class="chm-scanner-laser"></div>
            </div>
            <div id="chm-scanner-loading" style="position: absolute; color: #cbd5e1; font-size: 0.9rem; text-align: center; padding: 1rem;">
              <i class="fa fa-spinner fa-spin fa-2x" style="color: var(--chm-gold); margin-bottom: 0.5rem; display: block;"></i>
              Initializing Camera Hardware...
            </div>
          </div>
          <div style="padding: 1rem; background: #071529; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span style="color: #94a3b8;">Align QR inside the golden frame</span>
              <button type="button" id="chm-scanner-simulate-btn" class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;">
                <i class="fa fa-bolt"></i> Demo Scan
              </button>
            </div>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="chm-manual-token-input" placeholder="Or enter Seat/Token (e.g. TYIT-028)" style="flex: 1; padding: 6px 10px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <button type="button" id="chm-manual-submit-btn" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.85rem;">Apply</button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      this.overlay = overlay;
      this.video = overlay.querySelector('#chm-scanner-video-el');
      this.loadingEl = overlay.querySelector('#chm-scanner-loading');

      // Bind close button
      overlay.querySelector('#chm-scanner-close-btn').addEventListener('click', () => this.close());
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });

      // Bind simulation button (for automated tests or devices without webcams)
      overlay.querySelector('#chm-scanner-simulate-btn').addEventListener('click', () => {
        const mockTokens = ['CHM-ATT-2026-USIT601', 'SEAT-AUD-014-TYIT', 'RFID-8821-CS', 'CHM-CR-129B-94821'];
        const chosen = mockTokens[Math.floor(Math.random() * mockTokens.length)];
        this.handleCapture(chosen);
      });

      // Bind manual submit
      const manualInput = overlay.querySelector('#chm-manual-token-input');
      overlay.querySelector('#chm-manual-submit-btn').addEventListener('click', () => {
        const val = manualInput.value.trim();
        if (val) this.handleCapture(val);
      });
      manualInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = manualInput.value.trim();
          if (val) this.handleCapture(val);
        }
      });
    }

    async startCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const constraints = {
            video: {
              facingMode: { ideal: 'environment' },
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          };
          this.stream = await navigator.mediaDevices.getUserMedia(constraints);
          this.video.srcObject = this.stream;
          this.video.onloadedmetadata = () => {
            this.video.play();
            if (this.loadingEl) this.loadingEl.style.display = 'none';
            this.startScanningLoop();
          };
        } else {
          throw new Error('getUserMedia not supported');
        }
      } catch (err) {
        console.warn('Camera stream error or permission denied:', err);
        if (this.loadingEl) {
          this.loadingEl.innerHTML = `
            <div style="color: #fca5a5;">
              <i class="fa fa-camera-slash fa-2x" style="margin-bottom: 0.5rem; display: block;"></i>
              Camera offline or permission denied.<br>
              <span style="font-size: 0.78rem; color: #cbd5e1;">Use the Demo Scan or manual input below.</span>
            </div>
          `;
        }
      }
    }

    startScanningLoop() {
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
      }

      const scanFrame = async () => {
        if (!this.isOpen) return;

        if (this.video && this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
          this.canvas.width = this.video.videoWidth;
          this.canvas.height = this.video.videoHeight;
          this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

          // If BarcodeDetector is available natively
          if (this.barcodeDetector) {
            try {
              const barcodes = await this.barcodeDetector.detect(this.canvas);
              if (barcodes && barcodes.length > 0) {
                const detectedVal = barcodes[0].rawValue;
                this.handleCapture(detectedVal);
                return;
              }
            } catch (err) {}
          }
        }

        this.animFrameId = requestAnimationFrame(scanFrame);
      };

      this.animFrameId = requestAnimationFrame(scanFrame);
    }

    handleCapture(result) {
      if (window.CHMAudio) window.CHMAudio.playScanBeep();

      // Show temporary success feedback on viewport
      const viewport = this.overlay.querySelector('#chm-scanner-viewport');
      if (viewport) {
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.inset = '0';
        flash.style.background = 'rgba(16, 185, 129, 0.4)';
        flash.style.display = 'flex';
        flash.style.alignItems = 'center';
        flash.style.justifyContent = 'center';
        flash.style.color = '#ffffff';
        flash.style.fontSize = '1.2rem';
        flash.style.fontWeight = 'bold';
        flash.innerHTML = `<i class="fa fa-check-circle fa-2x"></i>`;
        viewport.appendChild(flash);
      }

      setTimeout(() => {
        this.close();
        if (typeof this.onScanCallback === 'function') {
          this.onScanCallback(result);
        } else {
          alert(`Scanned Token: ${result}`);
        }
      }, 400);
    }

    close() {
      this.isOpen = false;
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
      if (this.overlay && this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      if (window.CHMAudio) window.CHMAudio.playClick();
    }
  }

  window.CHMScanner = new CameraScanner();

})(window, document);
