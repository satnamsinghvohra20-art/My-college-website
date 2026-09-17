/**
 * Smt. CHM College Pure Web Audio Synthesizer & Tactile Haptic Feedback Suite
 * Generates rich micro-interaction audio cues in pure browser audio buffers (zero MP3 files needed).
 * Integrates mobile vibration (navigator.vibrate) and respects user accessibility preferences.
 */

(function (window) {
  'use strict';

  class AudioHapticsEngine {
    constructor() {
      this.ctx = null;
      this.isAudioEnabled = true;
      this.isHapticsEnabled = true;

      // Sync settings with CHMStore if available
      if (window.CHMStore) {
        window.CHMStore.subscribe(state => {
          if (state.settings) {
            this.isAudioEnabled = state.settings.audioEffects !== false;
            this.isHapticsEnabled = state.settings.haptics !== false;
          }
        });
      }

      // Lazily unlock audio on first user gesture
      const unlock = () => {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };

      window.addEventListener('click', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });
    }

    ensureContext() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    }

    vibrate(pattern) {
      if (!this.isHapticsEnabled) return;
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate(pattern || 15);
        } catch (e) {}
      }
    }

    // Soft UI Click Sound
    playClick() {
      if (!this.isAudioEnabled) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);

      this.vibrate(10);
    }

    // Success Chime (Two-tone chord: C5 -> G5)
    playSuccess() {
      if (!this.isAudioEnabled) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.09, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.28);
      });

      this.vibrate([20, 30, 40]);
    }

    // Camera / Laser Scanner Beep
    playScanBeep() {
      if (!this.isAudioEnabled) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, ctx.currentTime); // A6
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);

      this.vibrate([40, 20, 40]);
    }

    // Soft Error / Warning Tone
    playError() {
      if (!this.isAudioEnabled) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(160, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);

      this.vibrate([60, 40, 60]);
    }

    // Toggle sound effects
    toggleAudio(enable) {
      this.isAudioEnabled = enable !== undefined ? enable : !this.isAudioEnabled;
      if (window.CHMStore) {
        window.CHMStore.setState(s => {
          s.settings.audioEffects = this.isAudioEnabled;
        });
      }
      return this.isAudioEnabled;
    }
  }

  window.CHMAudio = new AudioHapticsEngine();

})(window);
