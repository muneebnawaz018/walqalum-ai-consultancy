/**
 * The interface sound engine.
 *
 * Every sound is synthesised with the Web Audio API rather than loaded as a
 * file — the whole kit is a few oscillators and a burst of filtered noise, so
 * there is nothing to download and nothing to cache.
 *
 * Frequencies, gains and durations are the design's own values.
 *
 * A browser will not let audio start before the visitor has interacted with the
 * page, so the context is created lazily on the first pointer press. Until then
 * every call is a no-op rather than an error.
 */

const STORAGE_KEY = "wq-sound";

type Osc = "sine" | "triangle" | "square" | "sawtooth";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private lastTick = 0;
  /** Session-scoped, not persistent: the design treats it as a per-visit choice. */
  enabled = true;

  /** Reads the stored preference. Called on mount, not at module load, because
   *  `sessionStorage` does not exist while rendering on the server. */
  restore() {
    try {
      this.enabled = sessionStorage.getItem(STORAGE_KEY) !== "off";
    } catch {
      /* Private mode and blocked storage both throw. Default to on. */
    }
    return this.enabled;
  }

  /** Creates the context. Safe to call repeatedly. */
  unlock() {
    if (this.ctx) return this.ctx;
    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (Ctor) this.ctx = new Ctor();
    } catch {
      /* Audio unavailable. Everything below then no-ops. */
    }
    return this.ctx;
  }

  private env(g: GainNode, peak: number, dur: number) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    g.gain.setValueAtTime(peak, t);
    /* Exponential rather than linear: a linear fade reads as a click at the tail. */
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }

  private tone(type: Osc, freq: number, peak: number, dur: number) {
    const c = this.ctx;
    if (!c || !this.enabled) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    o.connect(g);
    g.connect(c.destination);
    this.env(g, peak, dur);
    o.start();
    o.stop(c.currentTime + dur + 0.02);
  }

  /** A short band-passed noise burst, which gives the click its body. */
  private noise(peak: number, dur: number, freq = 1800) {
    const c = this.ctx;
    if (!c || !this.enabled) return;
    const len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const s = c.createBufferSource();
    const f = c.createBiquadFilter();
    const g = c.createGain();
    s.buffer = buf;
    f.type = "bandpass";
    f.frequency.value = freq;
    f.Q.value = 1.2;
    s.connect(f);
    f.connect(g);
    g.connect(c.destination);
    this.env(g, peak, dur);
    s.start();
  }

  /** Hover. Throttled hard: sweeping a nav would otherwise machine-gun. */
  tick() {
    const now = performance.now();
    if (now - this.lastTick < 90) return;
    this.lastTick = now;
    this.tone("triangle", 1050, 0.04, 0.018);
  }

  /** Press. */
  click() {
    if (!this.unlock() || !this.enabled) return;
    this.tone("sine", 200, 0.1, 0.045);
    this.noise(0.05, 0.04);
  }

  /** Opening or closing the drawer: lower and softer than a click. */
  menu() {
    if (!this.unlock() || !this.enabled) return;
    this.tone("sine", 150, 0.09, 0.06);
    this.noise(0.04, 0.05, 900);
  }

  /** Returns the new state. Plays a confirmation only when turning on — a
   *  confirmation sound for "off" would contradict itself. */
  toggle() {
    this.enabled = !this.enabled;
    try {
      sessionStorage.setItem(STORAGE_KEY, this.enabled ? "on" : "off");
    } catch {
      /* Non-persistent is fine; the in-memory flag still holds for this page. */
    }
    if (this.enabled) this.click();
    return this.enabled;
  }
}

export const sound = new SoundEngine();
