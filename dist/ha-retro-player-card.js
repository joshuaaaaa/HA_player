/*!
 * Retro Media Player Card for Home Assistant
 * A retro-skin Lovelace media player card with visualizer, themes,
 * favorites, radio, media browsing and settings import/export.
 *
 * No build step required - this file is the source.
 */

const CARD_VERSION = "1.0.0";

/* ------------------------------------------------------------------ *
 * Constants
 * ------------------------------------------------------------------ */

const SUPPORT = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  TURN_ON: 128,
  TURN_OFF: 256,
  PLAY_MEDIA: 512,
  VOLUME_STEP: 1024,
  SELECT_SOURCE: 2048,
  STOP: 4096,
  CLEAR_PLAYLIST: 8192,
  PLAY: 16384,
  SHUFFLE_SET: 32768,
  SELECT_SOUND_MODE: 65536,
  BROWSE_MEDIA: 131072,
  REPEAT_SET: 262144,
  GROUPING: 524288,
};

const THEMES = {
  classic: {
    name: "Classic Skin",
    vars: {
      "--wa-font": '"Lucida Console", "DejaVu Sans Mono", Consolas, monospace',
      "--wa-bg": "#232323",
      "--wa-panel": "#3c3c3c",
      "--wa-panel-2": "#2e2e2e",
      "--wa-hi": "#6d6d6d",
      "--wa-lo": "#141414",
      "--wa-text": "#d6d6d6",
      "--wa-text-dim": "#8b8b8b",
      "--wa-accent": "#00ff4c",
      "--wa-accent-2": "#7cff00",
      "--wa-lcd-bg": "#0a0f0a",
      "--wa-lcd": "#00ff4c",
      "--wa-viz-lo": "#00ff4c",
      "--wa-viz-mid": "#d8ff00",
      "--wa-viz-hi": "#ff8a00",
      "--wa-peak": "#e8e8e8",
      "--wa-title": "#0d2b52",
      "--wa-radius": "2px",
      "--wa-glow": "0 0 6px rgba(0,255,76,.45)",
    },
  },
  modern: {
    name: "Modern Dark",
    vars: {
      "--wa-font":
        '"Segoe UI", Roboto, -apple-system, "Helvetica Neue", sans-serif',
      "--wa-bg": "#14161a",
      "--wa-panel": "#1e2228",
      "--wa-panel-2": "#171a1f",
      "--wa-hi": "#2f3540",
      "--wa-lo": "#0b0d10",
      "--wa-text": "#e8ecf1",
      "--wa-text-dim": "#8d97a5",
      "--wa-accent": "#03a9f4",
      "--wa-accent-2": "#4fc3f7",
      "--wa-lcd-bg": "#0b0e12",
      "--wa-lcd": "#7fd7ff",
      "--wa-viz-lo": "#0288d1",
      "--wa-viz-mid": "#26c6da",
      "--wa-viz-hi": "#80deea",
      "--wa-peak": "#ffffff",
      "--wa-title": "#0d1116",
      "--wa-radius": "10px",
      "--wa-glow": "0 0 10px rgba(3,169,244,.35)",
    },
  },
  neon: {
    name: "Neon Nights",
    vars: {
      "--wa-font": '"Segoe UI", Roboto, system-ui, sans-serif',
      "--wa-bg": "#05020c",
      "--wa-panel": "#120a26",
      "--wa-panel-2": "#0b0518",
      "--wa-hi": "#33206b",
      "--wa-lo": "#020106",
      "--wa-text": "#f2e9ff",
      "--wa-text-dim": "#9b86c9",
      "--wa-accent": "#ff2bd6",
      "--wa-accent-2": "#00e5ff",
      "--wa-lcd-bg": "#0a0417",
      "--wa-lcd": "#00e5ff",
      "--wa-viz-lo": "#ff2bd6",
      "--wa-viz-mid": "#a34bff",
      "--wa-viz-hi": "#00e5ff",
      "--wa-peak": "#ffffff",
      "--wa-title": "#1b0b3a",
      "--wa-radius": "8px",
      "--wa-glow": "0 0 14px rgba(255,43,214,.55)",
    },
  },
  vapor: {
    name: "Vaporwave",
    vars: {
      "--wa-font": '"Segoe UI", Roboto, system-ui, sans-serif',
      "--wa-bg": "#1b1036",
      "--wa-panel": "#2b1a55",
      "--wa-panel-2": "#20123f",
      "--wa-hi": "#5a3a9c",
      "--wa-lo": "#120a24",
      "--wa-text": "#ffe6ff",
      "--wa-text-dim": "#b79ae0",
      "--wa-accent": "#ff6ec7",
      "--wa-accent-2": "#5ef1ff",
      "--wa-lcd-bg": "#170d2e",
      "--wa-lcd": "#ff9ee0",
      "--wa-viz-lo": "#5ef1ff",
      "--wa-viz-mid": "#ff6ec7",
      "--wa-viz-hi": "#ffd166",
      "--wa-peak": "#ffffff",
      "--wa-title": "#3a1f6e",
      "--wa-radius": "6px",
      "--wa-glow": "0 0 12px rgba(255,110,199,.5)",
    },
  },
  terminal: {
    name: "Terminal Green",
    vars: {
      "--wa-font": '"DejaVu Sans Mono", "Courier New", monospace',
      "--wa-bg": "#000000",
      "--wa-panel": "#061006",
      "--wa-panel-2": "#020802",
      "--wa-hi": "#1d4a1d",
      "--wa-lo": "#000000",
      "--wa-text": "#33ff33",
      "--wa-text-dim": "#1f9e1f",
      "--wa-accent": "#33ff33",
      "--wa-accent-2": "#aaffaa",
      "--wa-lcd-bg": "#000000",
      "--wa-lcd": "#33ff33",
      "--wa-viz-lo": "#0f6b0f",
      "--wa-viz-mid": "#33ff33",
      "--wa-viz-hi": "#ccffcc",
      "--wa-peak": "#ffffff",
      "--wa-title": "#001a00",
      "--wa-radius": "0px",
      "--wa-glow": "0 0 8px rgba(51,255,51,.5)",
    },
  },
  amber: {
    name: "Amber CRT",
    vars: {
      "--wa-font": '"DejaVu Sans Mono", "Courier New", monospace',
      "--wa-bg": "#0d0700",
      "--wa-panel": "#1c1103",
      "--wa-panel-2": "#130b02",
      "--wa-hi": "#573608",
      "--wa-lo": "#060300",
      "--wa-text": "#ffb000",
      "--wa-text-dim": "#a06f06",
      "--wa-accent": "#ffb000",
      "--wa-accent-2": "#ffd88a",
      "--wa-lcd-bg": "#0a0500",
      "--wa-lcd": "#ffb000",
      "--wa-viz-lo": "#a35b00",
      "--wa-viz-mid": "#ffb000",
      "--wa-viz-hi": "#ffe6b0",
      "--wa-peak": "#ffffff",
      "--wa-title": "#241503",
      "--wa-radius": "2px",
      "--wa-glow": "0 0 10px rgba(255,176,0,.45)",
    },
  },
  light: {
    name: "Light Minimal",
    vars: {
      "--wa-font":
        '"Segoe UI", Roboto, -apple-system, "Helvetica Neue", sans-serif',
      "--wa-bg": "#eef1f5",
      "--wa-panel": "#ffffff",
      "--wa-panel-2": "#f4f6f9",
      "--wa-hi": "#ffffff",
      "--wa-lo": "#c9d1dc",
      "--wa-text": "#1d2530",
      "--wa-text-dim": "#6b7684",
      "--wa-accent": "#2264d1",
      "--wa-accent-2": "#4b8bef",
      "--wa-lcd-bg": "#1d2530",
      "--wa-lcd": "#9fd0ff",
      "--wa-viz-lo": "#2264d1",
      "--wa-viz-mid": "#00a3a3",
      "--wa-viz-hi": "#6fd36f",
      "--wa-peak": "#1d2530",
      "--wa-title": "#dde3ec",
      "--wa-radius": "10px",
      "--wa-glow": "0 0 8px rgba(34,100,209,.25)",
    },
  },
  ha: {
    name: "Follow HA Theme",
    vars: {
      "--wa-font": "var(--paper-font-body1_-_font-family, sans-serif)",
      "--wa-bg": "var(--card-background-color, #1c1c1c)",
      "--wa-panel": "var(--ha-card-background, var(--card-background-color, #222))",
      "--wa-panel-2": "var(--secondary-background-color, #191919)",
      "--wa-hi": "var(--divider-color, #333)",
      "--wa-lo": "var(--divider-color, #111)",
      "--wa-text": "var(--primary-text-color, #eee)",
      "--wa-text-dim": "var(--secondary-text-color, #999)",
      "--wa-accent": "var(--primary-color, #03a9f4)",
      "--wa-accent-2": "var(--accent-color, #ff9800)",
      "--wa-lcd-bg": "var(--secondary-background-color, #111)",
      "--wa-lcd": "var(--primary-color, #03a9f4)",
      "--wa-viz-lo": "var(--primary-color, #03a9f4)",
      "--wa-viz-mid": "var(--accent-color, #ff9800)",
      "--wa-viz-hi": "var(--primary-text-color, #fff)",
      "--wa-peak": "var(--primary-text-color, #fff)",
      "--wa-title": "var(--app-header-background-color, var(--primary-color, #03a9f4))",
      "--wa-radius": "var(--ha-card-border-radius, 12px)",
      "--wa-glow": "none",
    },
  },
};

const VISUALIZERS = {
  bars: "Spectrum bars",
  mirror: "Mirrored bars",
  wave: "Oscilloscope",
  dots: "Dot matrix",
  vu: "VU meters",
  off: "Off",
};

const EQ_BANDS = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];

const EQ_PRESETS = {
  Flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Rock: [5, 4, 2, -1, -2, 1, 3, 5, 6, 6],
  Pop: [-1, 2, 4, 5, 3, 0, -1, -1, 0, 1],
  Jazz: [4, 3, 1, 2, -1, -1, 0, 2, 3, 4],
  Classical: [5, 4, 3, 2, -1, -1, 0, 2, 3, 4],
  Dance: [6, 5, 2, 0, 0, -2, -3, -2, 1, 3],
  "Bass Boost": [8, 7, 5, 3, 1, 0, 0, 0, 0, 0],
  "Treble Boost": [0, 0, 0, 0, 1, 3, 5, 6, 7, 7],
  Vocal: [-2, -1, 1, 4, 5, 4, 2, 0, -1, -2],
};

const DEFAULT_STATIONS = [
  {
    name: "SomaFM - Groove Salad",
    url: "https://ice1.somafm.com/groovesalad-128-mp3",
    genre: "Downtempo",
  },
  {
    name: "SomaFM - Drone Zone",
    url: "https://ice1.somafm.com/dronezone-128-mp3",
    genre: "Ambient",
  },
  {
    name: "SomaFM - Secret Agent",
    url: "https://ice1.somafm.com/secretagent-128-mp3",
    genre: "Lounge",
  },
  {
    name: "SomaFM - Lush",
    url: "https://ice1.somafm.com/lush-128-mp3",
    genre: "Vocal",
  },
  {
    name: "SomaFM - DEF CON Radio",
    url: "https://ice1.somafm.com/defcon-128-mp3",
    genre: "Electronic",
  },
  {
    name: "Radio Paradise - Main Mix",
    url: "https://stream.radioparadise.com/mp3-192",
    genre: "Eclectic",
  },
  {
    name: "Radio Paradise - Mellow Mix",
    url: "https://stream.radioparadise.com/mellow-192",
    genre: "Mellow",
  },
  {
    name: "Radio Paradise - Rock Mix",
    url: "https://stream.radioparadise.com/rock-192",
    genre: "Rock",
  },
  {
    name: "FIP",
    url: "https://icecast.radiofrance.fr/fip-midfi.mp3",
    genre: "Eclectic",
  },
  {
    name: "France Inter",
    url: "https://icecast.radiofrance.fr/franceinter-midfi.mp3",
    genre: "Talk",
  },
];

/** Known media-source prefixes we can surface as one-click shortcuts. */
const SOURCE_SHORTCUTS = [
  { id: "media-source://radio_browser", label: "Radio Browser", icon: "radio" },
  { id: "media-source://spotify", label: "Spotify", icon: "spotify" },
  { id: "media-source://music_assistant", label: "Music Assistant", icon: "note" },
  { id: "media-source://media_source", label: "Local media", icon: "folder" },
  { id: "media-source://tts", label: "Text to speech", icon: "note" },
];

const DEFAULT_SETTINGS = {
  theme: "classic",
  visualizer: "bars",
  vizSensitivity: 1,
  vizBands: 24,
  showVisualizer: true,
  showArtwork: true,
  showEqButton: true,
  showPlaylistButton: true,
  showBrowserButton: true,
  showPlayerSelect: true,
  compact: false,
  marqueeSpeed: 1,
  showRemaining: false,
  volumeStep: 5,
  entity: null,
  eq: EQ_PRESETS.Flat.slice(),
  eqPreamp: 0,
  eqEnabled: false,
  favorites: [],
  stations: DEFAULT_STATIONS.slice(),
  customColors: {},
};

/* ------------------------------------------------------------------ *
 * Small helpers
 * ------------------------------------------------------------------ */

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const esc = (s) =>
  String(s == null ? "" : s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );

const fmtTime = (sec) => {
  if (sec == null || isNaN(sec) || sec < 0) return "--:--";
  const s = Math.floor(sec % 60);
  const m = Math.floor(sec / 60) % 60;
  const h = Math.floor(sec / 3600);
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

const uid = () =>
  "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const deepMerge = (base, extra) => {
  const out = Array.isArray(base) ? base.slice() : { ...base };
  if (!extra || typeof extra !== "object") return out;
  for (const [k, v] of Object.entries(extra)) {
    if (v && typeof v === "object" && !Array.isArray(v) && out[k] && typeof out[k] === "object" && !Array.isArray(out[k])) {
      out[k] = deepMerge(out[k], v);
    } else if (v !== undefined) {
      out[k] = Array.isArray(v) ? v.slice() : v;
    }
  }
  return out;
};

const ICONS = {
  prev: "M6 6h2v12H6zm3.5 6l8.5 6V6z",
  next: "M16 6h2v12h-2zm-2.5 6L5 6v12z",
  play: "M8 5v14l11-7z",
  pause: "M6 5h4v14H6zm8 0h4v14h-4z",
  stop: "M6 6h12v12H6z",
  eject: "M5 17h14v2H5zm7-12l7 9H5z",
  volume:
    "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05A4.47 4.47 0 0016.5 12z",
  mute: "M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45.05-.63zM19 12a7 7 0 01-1.11 3.76l1.46 1.46A8.94 8.94 0 0021 12a9 9 0 00-7-8.77v2.06A7 7 0 0119 12zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.9 8.9 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z",
  shuffle:
    "M10.6 13.4L8.7 15.3 4 10.6 5.4 9.2l3.3 3.3 1.9-1.9zM14 4l3 3-3 3V8h-2.2L4 15.8 5.4 17l7.8-7.8H17V4zM16 14v2h-2l3 3 3-3h-2v-2z",
  repeat:
    "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z",
  gear: "M19.4 13a7.6 7.6 0 000-2l2.1-1.6-2-3.5-2.5 1a7.7 7.7 0 00-1.7-1L15 3H9l-.3 2.9c-.6.2-1.2.6-1.7 1l-2.5-1-2 3.5L4.6 11a7.6 7.6 0 000 2l-2.1 1.6 2 3.5 2.5-1c.5.4 1.1.7 1.7 1L9 21h6l.3-2.9c.6-.2 1.2-.6 1.7-1l2.5 1 2-3.5-2.1-1.6zM12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z",
  list: "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z",
  eq: "M6 3v6H4v6h2v6h2v-6h2V9H8V3H6zm10 0v10h-2v6h2v2h2v-2h2v-6h-2V3h-2z",
  folder: "M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z",
  star: "M12 17.3l-6.2 3.7 1.7-7L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.8 1.7 7z",
  starOff:
    "M12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4zm0-13.4L9.19 8.63 2 9.24l5.45 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z",
  plus: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z",
  close: "M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z",
  back: "M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z",
  radio:
    "M20 6H8.3l6.2-2.6-.8-1.8L4 6h-.2A2 2 0 002 8v11a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zM7 19a3 3 0 113-3 3 3 0 01-3 3zm13-6h-8v-2h8v2zm0-4h-2V7h2v2z",
  note: "M12 3v10.6A4 4 0 1014 17V7h4V3h-6z",
  spotify:
    "M12 2a10 10 0 1010 10A10 10 0 0012 2zm4.59 14.42a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.22c3.81-.87 7.09-.5 9.72 1.11a.62.62 0 01.21.86zm1.23-2.74a.78.78 0 01-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.15-.56 11.24 1.33a.78.78 0 01.25 1.07zm.11-2.86C14.7 8.9 9.4 8.73 6.32 9.66a.93.93 0 11-.54-1.78c3.54-1.08 9.39-.87 13.09 1.33a.93.93 0 11-.94 1.61z",
  power: "M13 3h-2v10h2V3zm4.8 2.2l-1.4 1.4A7 7 0 1112 5V3a9 9 0 105.8 2.2z",
  download: "M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z",
  upload: "M5 20h14v-2H5v2zM5 9h4v6h6V9h4l-7-7-7 7z",
};

const svg = (path, size = 16) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="${path}"/></svg>`;

/* ------------------------------------------------------------------ *
 * Persistent per-card store (localStorage)
 * ------------------------------------------------------------------ */

class Store {
  constructor(key) {
    this.key = `ha-retro-player-card:${key || "default"}`;
  }

  load() {
    try {
      const raw = window.localStorage.getItem(this.key);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn("[retro-player-card] could not read settings", e);
      return {};
    }
  }

  save(data) {
    try {
      window.localStorage.setItem(this.key, JSON.stringify(data));
    } catch (e) {
      console.warn("[retro-player-card] could not persist settings", e);
    }
  }

  clear() {
    try {
      window.localStorage.removeItem(this.key);
    } catch (e) {
      /* ignore */
    }
  }
}

/* ------------------------------------------------------------------ *
 * Visualizer
 *
 * Audio is rendered by the media player device, not by the browser, so
 * the browser has no access to the actual audio stream. The visualizer
 * therefore synthesises a plausible spectrum driven by playback state,
 * track position and the EQ curve. It idles (and decays) when paused.
 * ------------------------------------------------------------------ */

class Visualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.bands = 24;
    this.values = new Float32Array(64);
    this.peaks = new Float32Array(64);
    this.wave = new Float32Array(128);
    this.mode = "bars";
    this.sensitivity = 1;
    this.active = false;
    this.energy = 0;
    this.colors = {
      lo: "#00ff4c",
      mid: "#d8ff00",
      hi: "#ff8a00",
      peak: "#fff",
      bg: "#000",
    };
    this.eq = new Array(10).fill(0);
    this._seed = Math.random() * 1000;
  }

  setColors(c) {
    this.colors = { ...this.colors, ...c };
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const r = this.canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(r.width * dpr));
    const h = Math.max(1, Math.floor(r.height * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.dpr = dpr;
  }

  /** EQ gain (dB) mapped onto a normalised band index. */
  _eqGain(f) {
    if (!this.eq || !this.eq.length) return 1;
    const pos = f * (this.eq.length - 1);
    const i = Math.floor(pos);
    const t = pos - i;
    const a = this.eq[i] || 0;
    const b = this.eq[Math.min(this.eq.length - 1, i + 1)] || 0;
    const db = a + (b - a) * t;
    return clamp(Math.pow(10, db / 40), 0.15, 3);
  }

  _step(t, dt) {
    const n = this.bands;
    const bpm = 118;
    const beatPhase = (t * bpm) / 60;
    const beat = Math.pow(Math.abs(Math.sin(beatPhase * Math.PI)), 12);
    const halfBeat = Math.pow(Math.abs(Math.sin(beatPhase * Math.PI * 2)), 20);

    for (let i = 0; i < n; i++) {
      const f = n > 1 ? i / (n - 1) : 0;
      let target = 0;
      if (this.active) {
        const tilt = Math.pow(1 - f, 0.85) * 0.75 + 0.18;
        const w1 = 0.5 + 0.5 * Math.sin(t * (0.7 + i * 0.17) + this._seed + i);
        const w2 = 0.5 + 0.5 * Math.sin(t * (2.1 + i * 0.09) + i * 1.9);
        const w3 = 0.5 + 0.5 * Math.sin(t * (5.3 - i * 0.05) + i * 0.4);
        const noise = Math.random() * 0.09;
        const kick = beat * Math.pow(1 - f, 2.2) * 0.7;
        const hat = halfBeat * Math.pow(f, 2.0) * 0.45;
        target =
          (tilt * (0.3 + 0.45 * w1 * w2 + 0.2 * w3) + kick + hat + noise) *
          this.sensitivity *
          this._eqGain(f);
      }
      target = clamp(target, 0, 1);
      const cur = this.values[i];
      // fast attack, slow release - classic analyser behaviour
      const k = target > cur ? 1 - Math.pow(0.001, dt) : 1 - Math.pow(0.28, dt);
      this.values[i] = cur + (target - cur) * k;
      this.peaks[i] = Math.max(this.values[i], this.peaks[i] - dt * 0.55);
    }

    let sum = 0;
    for (let i = 0; i < n; i++) sum += this.values[i];
    this.energy = sum / n;

    for (let i = 0; i < this.wave.length; i++) {
      const x = i / this.wave.length;
      this.wave[i] = this.active
        ? (Math.sin(x * Math.PI * 8 + t * 6) * 0.45 +
            Math.sin(x * Math.PI * 21 - t * 9) * 0.3 +
            Math.sin(x * Math.PI * 3 + t * 2.2) * 0.5) *
          (0.35 + this.energy) *
          this.sensitivity
        : this.wave[i] * (1 - Math.min(1, dt * 3));
    }
  }

  _grad(h) {
    const g = this.ctx.createLinearGradient(0, h, 0, 0);
    g.addColorStop(0, this.colors.lo);
    g.addColorStop(0.62, this.colors.mid);
    g.addColorStop(1, this.colors.hi);
    return g;
  }

  draw(t, dt) {
    this.resize();
    this._step(t, dt);
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const fn = this["_draw_" + this.mode];
    if (typeof fn === "function") fn.call(this, ctx, w, h);
  }

  _draw_bars(ctx, w, h) {
    const n = this.bands;
    const gap = Math.max(1, Math.round(w / n / 6));
    const bw = (w - gap * (n - 1)) / n;
    const grad = this._grad(h);
    for (let i = 0; i < n; i++) {
      const x = i * (bw + gap);
      const v = this.values[i];
      const bh = Math.max(1, v * h);
      ctx.fillStyle = grad;
      ctx.fillRect(x, h - bh, bw, bh);
      const py = h - Math.max(1, this.peaks[i] * h);
      ctx.fillStyle = this.colors.peak;
      ctx.fillRect(x, clamp(py - 2, 0, h - 2), bw, 2);
    }
  }

  _draw_mirror(ctx, w, h) {
    const n = this.bands;
    const gap = Math.max(1, Math.round(w / n / 6));
    const bw = (w - gap * (n - 1)) / n;
    const mid = h / 2;
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, this.colors.hi);
    grad.addColorStop(0.5, this.colors.lo);
    grad.addColorStop(1, this.colors.hi);
    ctx.fillStyle = grad;
    for (let i = 0; i < n; i++) {
      const x = i * (bw + gap);
      const bh = Math.max(1, (this.values[i] * h) / 2);
      ctx.fillRect(x, mid - bh, bw, bh);
      ctx.fillRect(x, mid, bw, bh);
    }
    ctx.fillStyle = this.colors.peak;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(0, mid - 1, w, 1);
    ctx.globalAlpha = 1;
  }

  _draw_wave(ctx, w, h) {
    const mid = h / 2;
    ctx.lineWidth = Math.max(1, h / 40);
    ctx.strokeStyle = this.colors.mid;
    ctx.shadowBlur = h / 20;
    ctx.shadowColor = this.colors.lo;
    ctx.beginPath();
    for (let i = 0; i < this.wave.length; i++) {
      const x = (i / (this.wave.length - 1)) * w;
      const y = mid - this.wave[i] * (h / 2.4);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  _draw_dots(ctx, w, h) {
    const n = this.bands;
    const rows = 12;
    const gap = Math.max(1, Math.round(w / n / 6));
    const bw = (w - gap * (n - 1)) / n;
    const rh = h / rows;
    for (let i = 0; i < n; i++) {
      const x = i * (bw + gap);
      const lit = Math.round(this.values[i] * rows);
      for (let r = 0; r < rows; r++) {
        const on = r < lit;
        const frac = r / rows;
        ctx.fillStyle = on
          ? frac > 0.75
            ? this.colors.hi
            : frac > 0.45
              ? this.colors.mid
              : this.colors.lo
          : this.colors.peak;
        ctx.globalAlpha = on ? 1 : 0.08;
        ctx.fillRect(x, h - (r + 1) * rh + rh * 0.2, bw, rh * 0.62);
      }
    }
    ctx.globalAlpha = 1;
  }

  _draw_vu(ctx, w, h) {
    const rows = 2;
    const pad = h * 0.16;
    const bh = (h - pad * (rows + 1)) / rows;
    const segs = 28;
    const sw = w / segs;
    for (let r = 0; r < rows; r++) {
      const y = pad + r * (bh + pad);
      const bias = r === 0 ? 1 : 0.88;
      const level = clamp(this.energy * 1.5 * bias, 0, 1);
      const lit = Math.round(level * segs);
      for (let s = 0; s < segs; s++) {
        const frac = s / segs;
        const on = s < lit;
        ctx.fillStyle =
          frac > 0.82 ? this.colors.hi : frac > 0.6 ? this.colors.mid : this.colors.lo;
        ctx.globalAlpha = on ? 1 : 0.1;
        ctx.fillRect(s * sw + 1, y, sw - 2, bh);
      }
    }
    ctx.globalAlpha = 1;
  }

  _draw_off() {
    /* nothing */
  }
}

/* ------------------------------------------------------------------ *
 * Styles
 * ------------------------------------------------------------------ */

const STYLES = `
:host { display:block; }
*, *::before, *::after { box-sizing:border-box; }

.wa {
  font-family: var(--wa-font);
  background: var(--wa-bg);
  color: var(--wa-text);
  border-radius: var(--wa-radius);
  overflow:hidden;
  border:1px solid var(--wa-lo);
  box-shadow: 0 2px 10px rgba(0,0,0,.35);
  user-select:none;
  -webkit-user-select:none;
}
.wa svg { fill: currentColor; display:block; }

/* --- title bar --- */
.titlebar {
  display:flex; align-items:center; gap:6px;
  padding:5px 8px;
  background: var(--wa-title);
  border-bottom:1px solid var(--wa-lo);
}
.titlebar .brand {
  font-size:11px; font-weight:700; letter-spacing:2px;
  text-transform:uppercase; color:var(--wa-text);
  opacity:.85; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.titlebar .spacer { flex:1 1 auto; }
.tbtn {
  display:inline-flex; align-items:center; justify-content:center;
  width:22px; height:20px; padding:0; cursor:pointer;
  background: var(--wa-panel); color:var(--wa-text);
  border:1px solid var(--wa-lo); border-top-color:var(--wa-hi); border-left-color:var(--wa-hi);
  border-radius: calc(var(--wa-radius) / 2);
}
.tbtn:hover { color: var(--wa-accent); }
.tbtn[aria-pressed="true"] {
  color: var(--wa-accent);
  background: var(--wa-panel-2);
  border-color: var(--wa-hi);
  border-top-color: var(--wa-lo); border-left-color: var(--wa-lo);
}

/* --- main body --- */
.body { padding:8px; display:flex; flex-direction:column; gap:8px; }
.row { display:flex; align-items:center; gap:8px; }

.display {
  display:flex; gap:8px;
  background: var(--wa-lcd-bg);
  border:1px solid var(--wa-lo);
  border-top-color: var(--wa-lo); border-left-color: var(--wa-lo);
  border-bottom-color: var(--wa-hi); border-right-color: var(--wa-hi);
  border-radius: calc(var(--wa-radius) / 2);
  padding:8px; position:relative; overflow:hidden;
}
.art {
  width:76px; height:76px; flex:0 0 auto;
  background: var(--wa-panel-2) center/cover no-repeat;
  border:1px solid var(--wa-hi);
  border-radius: calc(var(--wa-radius) / 2);
  display:flex; align-items:center; justify-content:center;
  color: var(--wa-text-dim);
}
.compact .art { width:56px; height:56px; }
.art.hidden { display:none; }
.dspcol { flex:1 1 auto; min-width:0; display:flex; flex-direction:column; gap:6px; }

.lcdrow { display:flex; align-items:baseline; gap:10px; color: var(--wa-lcd); }
.time {
  font-size:26px; line-height:1; font-weight:700; letter-spacing:1px;
  text-shadow: var(--wa-glow); cursor:pointer; font-variant-numeric: tabular-nums;
}
.compact .time { font-size:20px; }
.meta { font-size:9px; letter-spacing:1px; opacity:.75; text-transform:uppercase;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

.marquee { overflow:hidden; height:14px; position:relative; }
.marquee > span {
  position:absolute; white-space:nowrap; font-size:11px; color:var(--wa-lcd);
  text-shadow: var(--wa-glow); will-change: transform;
}
.marquee > span.scroll {
  animation-name: wa-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: 1.5s;
  animation-fill-mode: both;
}
@keyframes wa-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(var(--wa-scroll-end, -100%)); }
}

canvas.viz { width:100%; height:44px; display:block; background:transparent; }
.compact canvas.viz { height:30px; }
canvas.viz.hidden { display:none; }

/* --- sliders --- */
input[type=range] { -webkit-appearance:none; appearance:none; background:transparent; width:100%; margin:0; cursor:pointer; }
input[type=range]:focus { outline:none; }
input[type=range]::-webkit-slider-runnable-track {
  height:6px; background: var(--wa-panel-2); border:1px solid var(--wa-lo); border-radius:3px;
}
input[type=range]::-moz-range-track {
  height:6px; background: var(--wa-panel-2); border:1px solid var(--wa-lo); border-radius:3px;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance:none; appearance:none; width:11px; height:16px; margin-top:-6px;
  background: var(--wa-accent); border:1px solid var(--wa-lo); border-radius:2px;
  box-shadow: var(--wa-glow);
}
input[type=range]::-moz-range-thumb {
  width:11px; height:16px; background: var(--wa-accent);
  border:1px solid var(--wa-lo); border-radius:2px;
}
input[type=range]:disabled { opacity:.4; cursor:default; }

.seekwrap { display:flex; align-items:center; gap:8px; }
.seekwrap .t { font-size:10px; color:var(--wa-text-dim); min-width:38px; text-align:center;
  font-variant-numeric: tabular-nums; }

/* --- transport --- */
.transport {
  display:flex; align-items:center; gap:6px; flex-wrap:wrap;
  background: var(--wa-panel);
  border:1px solid var(--wa-lo); border-top-color: var(--wa-hi); border-left-color: var(--wa-hi);
  border-radius: calc(var(--wa-radius) / 2);
  padding:6px;
}
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap:5px;
  min-width:32px; height:28px; padding:0 7px; cursor:pointer;
  color: var(--wa-text); background: var(--wa-panel-2);
  border:1px solid var(--wa-lo); border-top-color: var(--wa-hi); border-left-color: var(--wa-hi);
  border-radius: calc(var(--wa-radius) / 2);
  font-family:inherit; font-size:10px; letter-spacing:1px; text-transform:uppercase;
}
.btn:hover:not(:disabled) { color: var(--wa-accent); border-color: var(--wa-accent); }
.btn:active:not(:disabled) { border-top-color: var(--wa-lo); border-left-color: var(--wa-lo);
  border-bottom-color: var(--wa-hi); border-right-color: var(--wa-hi); }
.btn:disabled { opacity:.35; cursor:not-allowed; }
.btn.primary { color: var(--wa-accent); }
.btn[aria-pressed="true"] { color: var(--wa-accent); background: var(--wa-bg);
  box-shadow: inset 0 0 0 1px var(--wa-accent); }
.btn.wide { flex:1 1 auto; }
.grow { flex:1 1 auto; }

.volwrap { display:flex; align-items:center; gap:6px; min-width:120px; flex:1 1 140px; }
.volwrap .pct { font-size:10px; color:var(--wa-text-dim); min-width:32px; text-align:right;
  font-variant-numeric: tabular-nums; }

select, input[type=text], input[type=number], textarea {
  font-family:inherit; font-size:11px; color:var(--wa-text);
  background: var(--wa-panel-2);
  border:1px solid var(--wa-lo); border-radius: calc(var(--wa-radius) / 2);
  padding:5px 6px; max-width:100%;
}
select:focus, input:focus, textarea:focus { outline:1px solid var(--wa-accent); }
textarea { width:100%; resize:vertical; min-height:76px; font-size:10px; }
label.field { display:flex; flex-direction:column; gap:4px; font-size:10px;
  color:var(--wa-text-dim); text-transform:uppercase; letter-spacing:1px; }
label.check { display:flex; align-items:center; gap:8px; font-size:11px;
  color:var(--wa-text); text-transform:none; letter-spacing:0; cursor:pointer; }
input[type=checkbox] { accent-color: var(--wa-accent); width:15px; height:15px; }

/* --- panels --- */
.panel {
  background: var(--wa-panel);
  border:1px solid var(--wa-lo); border-top-color: var(--wa-hi); border-left-color: var(--wa-hi);
  border-radius: calc(var(--wa-radius) / 2);
  padding:8px; display:flex; flex-direction:column; gap:8px;
}
.panel-head { display:flex; align-items:center; gap:6px; }
.panel-title { font-size:10px; letter-spacing:2px; text-transform:uppercase;
  color: var(--wa-text-dim); }
.tabs { display:flex; gap:4px; flex-wrap:wrap; }

.list { max-height:260px; overflow:auto; display:flex; flex-direction:column; gap:2px;
  background: var(--wa-lcd-bg); border:1px solid var(--wa-lo);
  border-radius: calc(var(--wa-radius) / 2); padding:3px; }
.item { display:flex; align-items:center; gap:6px; padding:5px 6px; font-size:11px;
  color: var(--wa-lcd); cursor:pointer; border-radius:2px; }
.item:hover { background: rgba(255,255,255,.07); }
.item.active { background: var(--wa-accent); color: var(--wa-lcd-bg); }
.item .idx { opacity:.55; min-width:20px; font-variant-numeric: tabular-nums; }
.item .nm { flex:1 1 auto; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.item .sub { opacity:.6; font-size:10px; white-space:nowrap; }
.item .acts { display:flex; gap:2px; opacity:0; }
.item:hover .acts, .item.active .acts { opacity:1; }
.iconbtn { display:inline-flex; align-items:center; justify-content:center;
  width:22px; height:20px; cursor:pointer; color:inherit;
  background:transparent; border:1px solid transparent; border-radius:2px; }
.iconbtn:hover { border-color: currentColor; }
.thumb { width:22px; height:22px; flex:0 0 auto; border-radius:2px; object-fit:cover;
  background: var(--wa-panel-2); }
.empty { padding:14px; text-align:center; font-size:11px; color: var(--wa-text-dim); }

.crumbs { display:flex; gap:4px; align-items:center; flex-wrap:wrap; font-size:10px;
  color: var(--wa-text-dim); }
.crumbs button { background:none; border:none; color: var(--wa-accent); cursor:pointer;
  font:inherit; padding:0; }

.eqgrid { display:flex; gap:6px; align-items:flex-end; justify-content:space-between;
  background: var(--wa-lcd-bg); border:1px solid var(--wa-lo);
  border-radius: calc(var(--wa-radius) / 2); padding:10px 8px 6px; overflow-x:auto; }
.eqband { display:flex; flex-direction:column; align-items:center; gap:4px; flex:1 1 0; min-width:26px; }
/* rotated horizontal slider - keeps the custom track/thumb styling that the
   native vertical appearance would discard */
.eqband .slot { height:86px; width:24px; display:flex; align-items:center; justify-content:center; }
.eqband .slot input[type=range] { width:86px; transform: rotate(-90deg); }
.eqband .slot input[type=range]::-webkit-slider-runnable-track { background: var(--wa-hi); }
.eqband .slot input[type=range]::-moz-range-track { background: var(--wa-hi); }
.eqband .hz { font-size:8px; color: var(--wa-text-dim); }
.eqband .db { font-size:9px; color: var(--wa-lcd); font-variant-numeric: tabular-nums; }

.settings-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap:10px; }
.section { display:flex; flex-direction:column; gap:8px; padding:8px;
  background: var(--wa-panel-2); border:1px solid var(--wa-lo);
  border-radius: calc(var(--wa-radius) / 2); }
.section h4 { margin:0; font-size:10px; letter-spacing:2px; text-transform:uppercase;
  color: var(--wa-accent); font-weight:600; }
.hint { font-size:10px; color: var(--wa-text-dim); line-height:1.45; }
.chips { display:flex; flex-wrap:wrap; gap:4px; }

.toast { position:absolute; left:50%; bottom:10px; transform:translateX(-50%);
  background: var(--wa-panel); color: var(--wa-accent); border:1px solid var(--wa-accent);
  padding:6px 12px; font-size:11px; border-radius:3px; pointer-events:none;
  opacity:0; transition:opacity .25s; z-index:20; }
.toast.show { opacity:1; }
.wa { position:relative; }

.unavailable { padding:18px; text-align:center; font-size:12px; color: var(--wa-text-dim); }
`;

/* ------------------------------------------------------------------ *
 * The card
 * ------------------------------------------------------------------ */

class RetroPlayerCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("ha-retro-player-card-editor");
  }

  static getStubConfig(hass) {
    const first =
      hass && hass.states
        ? Object.keys(hass.states).find((e) => e.startsWith("media_player."))
        : undefined;
    return { type: "custom:ha-retro-player-card", entity: first || "", theme: "classic" };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._built = false;
    this._panel = "none";
    this._browserTab = "favorites";
    this._browsePath = [];
    this._browseItems = null;
    this._browseLoading = false;
    this._seeking = false;
    this._volDrag = false;
    this._lastFrame = 0;
    this._raf = null;
    this._tick = null;
  }

  /* ---------------- config ---------------- */

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = {
      entity: "",
      title: "Retro Player",
      theme: "classic",
      visualizer: "bars",
      show_visualizer: true,
      show_artwork: true,
      show_eq: true,
      show_playlist: true,
      show_browser: true,
      show_player_select: true,
      compact: false,
      entities: null,
      stations: null,
      favorites: null,
      storage_key: null,
      ...config,
    };

    this._store = new Store(this._config.storage_key || this._config.entity || "default");

    const saved = this._store.load();
    const fromConfig = {
      theme: this._config.theme,
      visualizer: this._config.visualizer,
      showVisualizer: this._config.show_visualizer,
      showArtwork: this._config.show_artwork,
      showEqButton: this._config.show_eq,
      showPlaylistButton: this._config.show_playlist,
      showBrowserButton: this._config.show_browser,
      showPlayerSelect: this._config.show_player_select,
      compact: this._config.compact,
    };
    if (Array.isArray(this._config.stations) && this._config.stations.length) {
      fromConfig.stations = this._config.stations.map((s) =>
        typeof s === "string" ? { name: s, url: s } : { ...s },
      );
    }
    if (Array.isArray(this._config.favorites) && this._config.favorites.length) {
      fromConfig.favorites = this._config.favorites.map((f) => ({ id: uid(), ...f }));
    }

    this._settings = deepMerge(deepMerge(DEFAULT_SETTINGS, fromConfig), saved);
    if (!VISUALIZERS[this._settings.visualizer]) this._settings.visualizer = "bars";
    if (!THEMES[this._settings.theme]) this._settings.theme = "classic";

    if (this._built) {
      this._built = false;
      this.shadowRoot.innerHTML = "";
      if (this._hass) this._render();
    }
  }

  getCardSize() {
    return this._panel === "none" ? 5 : 9;
  }

  getLayoutOptions() {
    return { grid_min_columns: 6, grid_rows: "auto" };
  }

  /* ---------------- hass ---------------- */

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this._config) return;
    if (first || !this._built) this._render();
    else this._update();
  }

  get hass() {
    return this._hass;
  }

  connectedCallback() {
    this._startLoop();
    if (this._config && this._hass && !this._built) this._render();
  }

  disconnectedCallback() {
    this._stopLoop();
  }

  /* ---------------- state helpers ---------------- */

  get _entityId() {
    return this._settings.entity || this._config.entity || "";
  }

  get _stateObj() {
    const id = this._entityId;
    return id && this._hass ? this._hass.states[id] : undefined;
  }

  _attr(name, fallback) {
    const s = this._stateObj;
    return s && s.attributes[name] !== undefined ? s.attributes[name] : fallback;
  }

  _supports(feature) {
    return ((this._attr("supported_features", 0) || 0) & feature) !== 0;
  }

  get _isPlaying() {
    const s = this._stateObj;
    return !!s && s.state === "playing";
  }

  get _isActive() {
    const s = this._stateObj;
    return !!s && !["off", "unavailable", "unknown", "standby", "idle"].includes(s.state);
  }

  _position() {
    const s = this._stateObj;
    if (!s) return null;
    const base = s.attributes.media_position;
    if (base == null) return null;
    if (s.state !== "playing") return base;
    const updated = s.attributes.media_position_updated_at;
    if (!updated) return base;
    const delta = (Date.now() - new Date(updated).getTime()) / 1000;
    const dur = s.attributes.media_duration;
    const pos = base + Math.max(0, delta);
    return dur ? Math.min(pos, dur) : pos;
  }

  _duration() {
    return this._attr("media_duration", null);
  }

  _players() {
    if (!this._hass) return [];
    const filter = this._config.entities;
    let ids = Object.keys(this._hass.states).filter((e) => e.startsWith("media_player."));
    if (Array.isArray(filter) && filter.length) {
      ids = ids.filter((e) => filter.includes(e));
    }
    return ids
      .map((id) => ({
        id,
        name:
          (this._hass.states[id].attributes.friendly_name || id).toString(),
        state: this._hass.states[id].state,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  _title() {
    const s = this._stateObj;
    if (!s) return "No media player";
    if (s.state === "unavailable") return "Player unavailable";
    if (s.state === "off") return "Player is off";
    const a = s.attributes;
    const bits = [];
    if (a.media_artist) bits.push(a.media_artist);
    if (a.media_title) bits.push(a.media_title);
    if (!bits.length && a.media_channel) bits.push(a.media_channel);
    if (!bits.length && a.app_name) bits.push(a.app_name);
    if (!bits.length) bits.push(s.state === "idle" ? "Nothing playing" : s.state);
    return bits.join(" - ");
  }

  _service(service, data = {}) {
    if (!this._hass || !this._entityId) return Promise.resolve();
    return this._hass
      .callService("media_player", service, { entity_id: this._entityId, ...data })
      .catch((err) => {
        console.error("[retro-player-card] service failed", service, err);
        this._toast("Command failed: " + service);
      });
  }

  _saveSettings() {
    const { favorites, stations, ...rest } = this._settings;
    this._store.save({ ...rest, favorites, stations });
  }

  _toast(msg) {
    const el = this._$(".toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  _$(sel) {
    return this.shadowRoot.querySelector(sel);
  }

  _$$(sel) {
    return Array.from(this.shadowRoot.querySelectorAll(sel));
  }

  /* ---------------- render ---------------- */

  _render() {
    const s = this._settings;
    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="wa${s.compact ? " compact" : ""}">
        <div class="titlebar">
          <span class="brand">${esc(this._config.title || "Retro Player")}</span>
          <span class="spacer"></span>
          <select class="player-select" title="Playback device"></select>
          <button class="tbtn" data-panel="eq" title="Equalizer">${svg(ICONS.eq, 14)}</button>
          <button class="tbtn" data-panel="playlist" title="Playlist / favorites">${svg(ICONS.list, 14)}</button>
          <button class="tbtn" data-panel="browser" title="Browse media">${svg(ICONS.folder, 14)}</button>
          <button class="tbtn" data-panel="settings" title="Settings">${svg(ICONS.gear, 14)}</button>
        </div>
        <div class="body">
          <div class="display">
            <div class="art">${svg(ICONS.note, 26)}</div>
            <div class="dspcol">
              <div class="lcdrow">
                <span class="time" title="Click to toggle elapsed / remaining">--:--</span>
                <span class="meta"></span>
              </div>
              <div class="marquee"><span></span></div>
              <canvas class="viz"></canvas>
            </div>
          </div>

          <div class="seekwrap">
            <span class="t t-pos">--:--</span>
            <input class="seek" type="range" min="0" max="1000" value="0" step="1" />
            <span class="t t-dur">--:--</span>
          </div>

          <div class="transport">
            <button class="btn" data-cmd="prev" title="Previous">${svg(ICONS.prev)}</button>
            <button class="btn primary" data-cmd="play" title="Play / pause">${svg(ICONS.play)}</button>
            <button class="btn" data-cmd="stop" title="Stop">${svg(ICONS.stop)}</button>
            <button class="btn" data-cmd="next" title="Next">${svg(ICONS.next)}</button>
            <button class="btn" data-cmd="shuffle" title="Shuffle">${svg(ICONS.shuffle)}</button>
            <button class="btn" data-cmd="repeat" title="Repeat"><span class="rep-ico">${svg(ICONS.repeat)}</span><span class="rep-lbl"></span></button>
            <button class="btn" data-cmd="power" title="Power">${svg(ICONS.power)}</button>
            <span class="volwrap">
              <button class="btn" data-cmd="mute" title="Mute">${svg(ICONS.volume)}</button>
              <input class="vol" type="range" min="0" max="100" step="1" value="0" />
              <span class="pct">--%</span>
            </span>
          </div>

          <div class="panel-host"></div>
        </div>
        <div class="toast"></div>
      </div>
    `;

    this._el = this._$(".wa");
    this._canvas = this._$("canvas.viz");
    this._viz = new Visualizer(this._canvas);
    this._applyTheme();
    this._bind();
    this._built = true;
    this._renderPanel();
    this._update();
    this._startLoop();
  }

  _applyTheme() {
    const theme = THEMES[this._settings.theme] || THEMES.classic;
    const vars = { ...theme.vars, ...(this._settings.customColors || {}) };
    for (const [k, v] of Object.entries(vars)) this._el.style.setProperty(k, v);
    // resolve computed colours for the canvas
    requestAnimationFrame(() => {
      if (!this._viz || !this._el) return;
      const cs = getComputedStyle(this._el);
      this._viz.setColors({
        lo: cs.getPropertyValue("--wa-viz-lo").trim() || "#0f0",
        mid: cs.getPropertyValue("--wa-viz-mid").trim() || "#ff0",
        hi: cs.getPropertyValue("--wa-viz-hi").trim() || "#f80",
        peak: cs.getPropertyValue("--wa-peak").trim() || "#fff",
      });
    });
  }

  _bind() {
    this._$$(".tbtn[data-panel]").forEach((b) =>
      b.addEventListener("click", () => {
        const p = b.dataset.panel;
        this._panel = this._panel === p ? "none" : p;
        this._renderPanel();
        this._updateToggles();
      }),
    );

    this._$(".player-select").addEventListener("change", (e) => {
      this._settings.entity = e.target.value || null;
      this._saveSettings();
      this._browseItems = null;
      this._browsePath = [];
      this._update();
      if (this._panel === "browser") this._renderPanel();
    });

    this._$(".transport").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cmd]");
      if (btn) this._command(btn.dataset.cmd);
    });

    this._$(".time").addEventListener("click", () => {
      this._settings.showRemaining = !this._settings.showRemaining;
      this._saveSettings();
      this._update();
    });

    const seek = this._$(".seek");
    seek.addEventListener("pointerdown", () => (this._seeking = true));
    seek.addEventListener("input", () => {
      const dur = this._duration();
      if (dur) this._$(".t-pos").textContent = fmtTime((seek.value / 1000) * dur);
    });
    const endSeek = () => {
      if (!this._seeking) return;
      this._seeking = false;
      const dur = this._duration();
      if (dur && this._supports(SUPPORT.SEEK)) {
        this._service("media_seek", { seek_position: (seek.value / 1000) * dur });
      }
    };
    seek.addEventListener("change", endSeek);
    seek.addEventListener("pointerup", endSeek);
    seek.addEventListener("pointercancel", () => (this._seeking = false));

    const vol = this._$(".vol");
    vol.addEventListener("pointerdown", () => (this._volDrag = true));
    vol.addEventListener("input", () => {
      this._$(".volwrap .pct").textContent = `${vol.value}%`;
    });
    const endVol = () => {
      this._volDrag = false;
      this._service("volume_set", { volume_level: Number(vol.value) / 100 });
    };
    vol.addEventListener("change", endVol);

    if (this._resizeObs) this._resizeObs.disconnect();
    this._resizeObs = new ResizeObserver(() => this._viz && this._viz.resize());
    this._resizeObs.observe(this._el);
  }

  _command(cmd) {
    switch (cmd) {
      case "prev":
        return this._service("media_previous_track");
      case "next":
        return this._service("media_next_track");
      case "stop":
        return this._service("media_stop");
      case "play":
        return this._service(this._isPlaying ? "media_pause" : "media_play");
      case "mute":
        return this._service("volume_mute", {
          is_volume_muted: !this._attr("is_volume_muted", false),
        });
      case "shuffle":
        return this._service("shuffle_set", { shuffle: !this._attr("shuffle", false) });
      case "repeat": {
        const order = ["off", "all", "one"];
        const cur = this._attr("repeat", "off");
        const next = order[(order.indexOf(cur) + 1) % order.length];
        return this._service("repeat_set", { repeat: next });
      }
      case "power":
        return this._service(this._isActive ? "turn_off" : "turn_on");
      default:
        return undefined;
    }
  }

  /* ---------------- dynamic update ---------------- */

  _update() {
    if (!this._built) return;
    const s = this._stateObj;
    const set = this._settings;

    // player select
    const sel = this._$(".player-select");
    const players = this._players();
    const wanted = this._entityId;
    const sig = players.map((p) => p.id).join(",") + "|" + wanted;
    if (sel._sig !== sig) {
      sel._sig = sig;
      sel.innerHTML = players.length
        ? players
            .map(
              (p) =>
                `<option value="${esc(p.id)}"${p.id === wanted ? " selected" : ""}>${esc(p.name)}</option>`,
            )
            .join("")
        : `<option value="">No media players</option>`;
    }
    sel.style.display = set.showPlayerSelect ? "" : "none";

    // artwork
    const art = this._$(".art");
    const pic = this._attr("entity_picture", null);
    art.classList.toggle("hidden", !set.showArtwork);
    if (pic && pic !== art._pic) {
      art._pic = pic;
      art.style.backgroundImage = `url("${pic}")`;
      art.innerHTML = "";
    } else if (!pic && art._pic !== null) {
      art._pic = null;
      art.style.backgroundImage = "";
      art.innerHTML = svg(ICONS.note, 26);
    }

    // time + meta
    const pos = this._position();
    const dur = this._duration();
    const timeEl = this._$(".time");
    if (set.showRemaining && dur != null && pos != null) {
      timeEl.textContent = "-" + fmtTime(Math.max(0, dur - pos));
    } else {
      timeEl.textContent = fmtTime(pos);
    }

    const metaBits = [];
    const ct = this._attr("media_content_type", null);
    if (ct) metaBits.push(String(ct));
    const app = this._attr("app_name", null);
    if (app) metaBits.push(app);
    if (s) metaBits.push(s.state);
    this._$(".meta").textContent = metaBits.join(" · ");

    // marquee
    this._setMarquee(this._title());

    // seek
    const seek = this._$(".seek");
    const canSeek = this._supports(SUPPORT.SEEK) && !!dur;
    seek.disabled = !canSeek;
    if (!this._seeking) {
      seek.value = dur && pos != null ? clamp((pos / dur) * 1000, 0, 1000) : 0;
    }
    this._$(".t-pos").textContent = fmtTime(pos);
    this._$(".t-dur").textContent = dur ? fmtTime(dur) : "--:--";

    // transport buttons
    const btn = (c) => this._$(`.btn[data-cmd="${c}"]`);
    btn("prev").disabled = !this._supports(SUPPORT.PREVIOUS_TRACK);
    btn("next").disabled = !this._supports(SUPPORT.NEXT_TRACK);
    btn("stop").disabled = !this._supports(SUPPORT.STOP);
    btn("play").disabled = !s;
    btn("play").innerHTML = svg(this._isPlaying ? ICONS.pause : ICONS.play);

    const shuffleBtn = btn("shuffle");
    shuffleBtn.disabled = !this._supports(SUPPORT.SHUFFLE_SET);
    shuffleBtn.setAttribute("aria-pressed", String(!!this._attr("shuffle", false)));

    const repeatBtn = btn("repeat");
    repeatBtn.disabled = !this._supports(SUPPORT.REPEAT_SET);
    const rep = this._attr("repeat", "off");
    repeatBtn.setAttribute("aria-pressed", String(rep !== "off"));
    repeatBtn.querySelector(".rep-lbl").textContent = rep === "one" ? "1" : "";

    const powerBtn = btn("power");
    powerBtn.disabled = !this._supports(SUPPORT.TURN_ON | SUPPORT.TURN_OFF);
    powerBtn.setAttribute("aria-pressed", String(this._isActive));

    // volume
    const muted = !!this._attr("is_volume_muted", false);
    const muteBtn = btn("mute");
    muteBtn.disabled = !this._supports(SUPPORT.VOLUME_MUTE);
    muteBtn.innerHTML = svg(muted ? ICONS.mute : ICONS.volume);
    muteBtn.setAttribute("aria-pressed", String(muted));

    const vol = this._$(".vol");
    const lvl = this._attr("volume_level", null);
    vol.disabled = !this._supports(SUPPORT.VOLUME_SET);
    if (!this._volDrag) {
      vol.value = lvl == null ? 0 : Math.round(lvl * 100);
      this._$(".volwrap .pct").textContent = lvl == null ? "--%" : `${Math.round(lvl * 100)}%`;
    }

    // visualizer
    this._canvas.classList.toggle("hidden", !set.showVisualizer || set.visualizer === "off");
    this._viz.mode = set.visualizer;
    this._viz.bands = clamp(set.vizBands || 24, 8, 48);
    this._viz.sensitivity =
      (set.vizSensitivity || 1) *
      (set.eqEnabled ? Math.pow(10, (set.eqPreamp || 0) / 40) : 1);
    this._viz.eq = set.eqEnabled ? set.eq : new Array(EQ_BANDS.length).fill(0);
    this._viz.active = this._isPlaying;

    this._updateToggles();
  }

  _updateToggles() {
    const set = this._settings;
    const vis = {
      eq: set.showEqButton,
      playlist: set.showPlaylistButton,
      browser: set.showBrowserButton,
      settings: true,
    };
    this._$$(".tbtn[data-panel]").forEach((b) => {
      b.style.display = vis[b.dataset.panel] ? "" : "none";
      b.setAttribute("aria-pressed", String(this._panel === b.dataset.panel));
    });
  }

  _setMarquee(text) {
    const wrap = this._$(".marquee");
    const span = wrap.firstElementChild;
    if (span._txt === text) return;
    span._txt = text;
    span.textContent = text;
    span.classList.remove("scroll");
    requestAnimationFrame(() => {
      const over = span.scrollWidth - wrap.clientWidth;
      if (over > 4) {
        const speed = 26 * (this._settings.marqueeSpeed || 1);
        span.style.setProperty("--wa-scroll-end", `-${over + 24}px`);
        span.style.animationDuration = `${clamp((over + 24) / speed, 4, 60)}s`;
        span.style.animationDirection = "alternate";
        span.classList.add("scroll");
      } else {
        span.style.removeProperty("--wa-scroll-end");
      }
    });
  }

  /* ---------------- animation loop ---------------- */

  _startLoop() {
    if (this._raf || !this._built) return;
    const loop = (ts) => {
      this._raf = requestAnimationFrame(loop);
      const t = ts / 1000;
      const dt = clamp(t - (this._lastFrame || t), 0, 0.1);
      this._lastFrame = t;
      if (!this._viz) return;
      if (this._settings.showVisualizer && this._settings.visualizer !== "off") {
        // when idle, keep drawing only while bars are still decaying
        if (this._viz.active || this._viz.energy > 0.002) this._viz.draw(t, dt);
      }
    };
    this._raf = requestAnimationFrame(loop);
    this._tick = setInterval(() => {
      if (this._built && this._isPlaying && !this._seeking) this._updateProgress();
    }, 500);
  }

  _stopLoop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    if (this._tick) clearInterval(this._tick);
    this._tick = null;
  }

  _updateProgress() {
    const pos = this._position();
    const dur = this._duration();
    const set = this._settings;
    const timeEl = this._$(".time");
    if (!timeEl) return;
    timeEl.textContent =
      set.showRemaining && dur != null && pos != null
        ? "-" + fmtTime(Math.max(0, dur - pos))
        : fmtTime(pos);
    this._$(".t-pos").textContent = fmtTime(pos);
    if (dur && pos != null) this._$(".seek").value = clamp((pos / dur) * 1000, 0, 1000);
  }

  /* ---------------- panels ---------------- */

  _renderPanel() {
    const host = this._$(".panel-host");
    if (!host) return;
    host.innerHTML = "";
    if (this._panel === "none") return;
    const el = document.createElement("div");
    el.className = "panel";
    host.appendChild(el);
    if (this._panel === "eq") this._renderEq(el);
    else if (this._panel === "playlist") this._renderPlaylist(el);
    else if (this._panel === "browser") this._renderBrowser(el);
    else if (this._panel === "settings") this._renderSettings(el);
  }

  /* --- EQ panel --- */

  _renderEq(el) {
    const set = this._settings;
    const modes = this._attr("sound_mode_list", null);
    const curMode = this._attr("sound_mode", null);

    el.innerHTML = `
      <div class="panel-head">
        <span class="panel-title">Equalizer</span>
        <span class="grow"></span>
        <label class="check"><input type="checkbox" class="eq-on"${set.eqEnabled ? " checked" : ""}/> Enabled</label>
        <select class="eq-preset">
          <option value="">Preset...</option>
          ${Object.keys(EQ_PRESETS).map((p) => `<option value="${esc(p)}">${esc(p)}</option>`).join("")}
        </select>
      </div>
      <div class="eqgrid">
        <div class="eqband">
          <span class="db preamp-db">${set.eqPreamp > 0 ? "+" : ""}${set.eqPreamp}</span>
          <span class="slot"><input type="range" class="preamp" min="-12" max="12" step="1" value="${set.eqPreamp}" /></span>
          <span class="hz">PRE</span>
        </div>
        ${EQ_BANDS.map(
          (hz, i) => `
          <div class="eqband">
            <span class="db" data-db="${i}">${set.eq[i] > 0 ? "+" : ""}${set.eq[i] || 0}</span>
            <span class="slot"><input type="range" class="eqb" data-i="${i}" min="-12" max="12" step="1" value="${set.eq[i] || 0}" /></span>
            <span class="hz">${hz >= 1000 ? hz / 1000 + "k" : hz}</span>
          </div>`,
        ).join("")}
      </div>
      <div class="hint">
        Home Assistant has no generic equalizer API, so these sliders shape the
        visualizer response and are stored with your card settings. If your player
        exposes sound modes they are listed below and do change the device.
      </div>
      ${
        modes && modes.length
          ? `<div class="chips">${modes
              .map(
                (m) =>
                  `<button class="btn sound-mode" data-mode="${esc(m)}" aria-pressed="${m === curMode}">${esc(m)}</button>`,
              )
              .join("")}</div>`
          : ""
      }
    `;

    el.querySelector(".eq-on").addEventListener("change", (e) => {
      set.eqEnabled = e.target.checked;
      this._saveSettings();
      this._update();
    });
    el.querySelector(".eq-preset").addEventListener("change", (e) => {
      const p = EQ_PRESETS[e.target.value];
      if (!p) return;
      set.eq = p.slice();
      set.eqEnabled = true;
      this._saveSettings();
      this._renderEq(el);
      this._update();
      this._toast("Preset: " + e.target.value);
    });
    el.querySelectorAll(".eqb").forEach((sl) =>
      sl.addEventListener("input", (e) => {
        const i = Number(e.target.dataset.i);
        const v = Number(e.target.value);
        set.eq[i] = v;
        el.querySelector(`.db[data-db="${i}"]`).textContent = (v > 0 ? "+" : "") + v;
        this._viz.eq = set.eqEnabled ? set.eq : this._viz.eq;
        this._saveSettings();
      }),
    );
    el.querySelector(".preamp").addEventListener("input", (e) => {
      set.eqPreamp = Number(e.target.value);
      el.querySelector(".preamp-db").textContent =
        (set.eqPreamp > 0 ? "+" : "") + set.eqPreamp;
      this._viz.sensitivity =
        (set.vizSensitivity || 1) *
        (set.eqEnabled ? Math.pow(10, set.eqPreamp / 40) : 1);
      this._saveSettings();
    });
    el.querySelectorAll(".sound-mode").forEach((b) =>
      b.addEventListener("click", () =>
        this._service("select_sound_mode", { sound_mode: b.dataset.mode }),
      ),
    );
  }

  /* --- Playlist / favorites panel --- */

  _renderPlaylist(el) {
    const set = this._settings;
    const tab = this._browserTab === "radio" ? "radio" : "favorites";
    const items = tab === "radio" ? set.stations : set.favorites;

    el.innerHTML = `
      <div class="panel-head">
        <div class="tabs">
          <button class="btn tab" data-tab="favorites" aria-pressed="${tab === "favorites"}">${svg(ICONS.star, 13)} Favorites</button>
          <button class="btn tab" data-tab="radio" aria-pressed="${tab === "radio"}">${svg(ICONS.radio, 13)} Radio</button>
        </div>
        <span class="grow"></span>
        <button class="btn add-cur" title="Add what is playing now to favorites">${svg(ICONS.plus, 13)} Add current</button>
      </div>
      <div class="list">
        ${
          items.length
            ? items
                .map(
                  (it, i) => `
          <div class="item" data-i="${i}">
            <span class="idx">${i + 1}.</span>
            ${it.thumbnail ? `<img class="thumb" src="${esc(it.thumbnail)}" alt="" />` : ""}
            <span class="nm" title="${esc(it.url || it.media_content_id || "")}">${esc(it.name || "Untitled")}</span>
            ${it.genre ? `<span class="sub">${esc(it.genre)}</span>` : ""}
            <span class="acts">
              <button class="iconbtn" data-act="up" title="Move up">&#9650;</button>
              <button class="iconbtn" data-act="down" title="Move down">&#9660;</button>
              <button class="iconbtn" data-act="del" title="Remove">${svg(ICONS.close, 13)}</button>
            </span>
          </div>`,
                )
                .join("")
            : `<div class="empty">Nothing here yet. Add a stream below, or star items from the media browser.</div>`
        }
      </div>
      <div class="row">
        <input type="text" class="new-name" placeholder="Name" style="flex:1 1 120px" />
        <input type="text" class="new-url" placeholder="Stream URL or media_content_id" style="flex:2 1 200px" />
        <button class="btn new-add">${svg(ICONS.plus, 13)} Add</button>
      </div>
      <div class="hint">
        Click an entry to play it on <b>${esc(this._entityId || "-")}</b>.
        Radio entries are sent as <code>media_content_type: music</code>.
        ${tab === "radio" ? `<button class="btn reset-stations" style="margin-top:6px">Restore default stations</button>` : ""}
      </div>
    `;

    el.querySelectorAll(".tab").forEach((b) =>
      b.addEventListener("click", () => {
        this._browserTab = b.dataset.tab;
        this._renderPlaylist(el);
      }),
    );

    el.querySelector(".list").addEventListener("click", (e) => {
      const row = e.target.closest(".item");
      if (!row) return;
      const i = Number(row.dataset.i);
      const act = e.target.closest("[data-act]");
      const list = tab === "radio" ? set.stations : set.favorites;
      if (act) {
        e.stopPropagation();
        const a = act.dataset.act;
        if (a === "del") list.splice(i, 1);
        if (a === "up" && i > 0) list.splice(i - 1, 0, list.splice(i, 1)[0]);
        if (a === "down" && i < list.length - 1) list.splice(i + 1, 0, list.splice(i, 1)[0]);
        this._saveSettings();
        this._renderPlaylist(el);
        return;
      }
      this._playItem(list[i]);
      el.querySelectorAll(".item").forEach((r) => r.classList.toggle("active", r === row));
    });

    el.querySelector(".new-add").addEventListener("click", () => {
      const name = el.querySelector(".new-name").value.trim();
      const url = el.querySelector(".new-url").value.trim();
      if (!url) return this._toast("URL is required");
      const entry = { id: uid(), name: name || url, url, media_content_type: "music" };
      (tab === "radio" ? set.stations : set.favorites).push(entry);
      this._saveSettings();
      this._renderPlaylist(el);
      this._toast("Added");
    });

    el.querySelector(".add-cur").addEventListener("click", () => {
      const s = this._stateObj;
      if (!s || !s.attributes.media_content_id) return this._toast("Nothing to add");
      set.favorites.push({
        id: uid(),
        name: this._title(),
        url: s.attributes.media_content_id,
        media_content_type: s.attributes.media_content_type || "music",
        thumbnail: s.attributes.entity_picture || null,
      });
      this._saveSettings();
      this._browserTab = "favorites";
      this._renderPlaylist(el);
      this._toast("Added to favorites");
    });

    const reset = el.querySelector(".reset-stations");
    if (reset)
      reset.addEventListener("click", () => {
        set.stations = DEFAULT_STATIONS.slice();
        this._saveSettings();
        this._renderPlaylist(el);
        this._toast("Default stations restored");
      });
  }

  _playItem(item) {
    if (!item) return;
    if (!this._entityId) return this._toast("Select a media player first");
    const id = item.media_content_id || item.url;
    if (!id) return this._toast("Entry has no URL");
    this._service("play_media", {
      media_content_id: id,
      media_content_type: item.media_content_type || "music",
    }).then(() => this._toast("Playing: " + (item.name || id)));
  }

  /* --- Media browser panel --- */

  _renderBrowser(el) {
    const supportsBrowse = this._supports(SUPPORT.BROWSE_MEDIA);
    el.innerHTML = `
      <div class="panel-head">
        <span class="panel-title">Browse media</span>
        <span class="grow"></span>
        <button class="btn br-home" title="Root">${svg(ICONS.back, 13)} Root</button>
        <button class="btn br-reload" title="Reload">&#8635;</button>
      </div>
      <div class="chips shortcuts"></div>
      <div class="crumbs"></div>
      <div class="list browse-list">
        <div class="empty">${supportsBrowse ? "Loading..." : "This player does not support media browsing."}</div>
      </div>
      <div class="row">
        <input type="text" class="url-in" placeholder="Paste a stream / media URL to play directly" style="flex:1 1 auto" />
        <button class="btn url-play">${svg(ICONS.play, 13)} Play</button>
        <button class="btn url-fav" title="Save to favorites">${svg(ICONS.star, 13)}</button>
      </div>
      <div class="hint">
        Sources shown here come from your Home Assistant integrations. Install
        <b>Radio Browser</b> for radio stations, <b>Spotify</b> or
        <b>Music Assistant</b> for streaming services - they appear automatically.
      </div>
    `;

    el.querySelector(".shortcuts").innerHTML = SOURCE_SHORTCUTS.map(
      (s) =>
        `<button class="btn sc" data-id="${esc(s.id)}">${svg(ICONS[s.icon] || ICONS.folder, 13)} ${esc(s.label)}</button>`,
    ).join("");
    el.querySelectorAll(".sc").forEach((b) =>
      b.addEventListener("click", () => {
        this._browsePath = [{ id: b.dataset.id, type: "", title: b.textContent.trim() }];
        this._loadBrowse(el);
      }),
    );

    el.querySelector(".br-home").addEventListener("click", () => {
      this._browsePath = [];
      this._loadBrowse(el);
    });
    el.querySelector(".br-reload").addEventListener("click", () => this._loadBrowse(el));

    const urlIn = el.querySelector(".url-in");
    el.querySelector(".url-play").addEventListener("click", () => {
      const u = urlIn.value.trim();
      if (u) this._playItem({ name: u, url: u, media_content_type: "music" });
    });
    el.querySelector(".url-fav").addEventListener("click", () => {
      const u = urlIn.value.trim();
      if (!u) return this._toast("Enter a URL first");
      this._settings.favorites.push({
        id: uid(),
        name: u,
        url: u,
        media_content_type: "music",
      });
      this._saveSettings();
      this._toast("Saved to favorites");
    });

    if (supportsBrowse) this._loadBrowse(el);
  }

  async _loadBrowse(el) {
    const list = el.querySelector(".browse-list");
    if (!this._entityId) {
      list.innerHTML = `<div class="empty">Select a media player first.</div>`;
      return;
    }
    list.innerHTML = `<div class="empty">Loading...</div>`;
    const cur = this._browsePath[this._browsePath.length - 1];
    const msg = { type: "media_player/browse_media", entity_id: this._entityId };
    if (cur) {
      msg.media_content_id = cur.id;
      msg.media_content_type = cur.type || "";
    }
    try {
      const res = await this._hass.callWS(msg);
      this._browseItems = res;
      this._renderBrowseList(el, res);
    } catch (err) {
      console.error("[retro-player-card] browse failed", err);
      list.innerHTML = `<div class="empty">Could not browse: ${esc(
        (err && (err.message || err.error)) || "unknown error",
      )}</div>`;
    }
    this._renderCrumbs(el);
  }

  _renderCrumbs(el) {
    const c = el.querySelector(".crumbs");
    const parts = [`<button data-i="-1">Root</button>`].concat(
      this._browsePath.map(
        (p, i) => `<span>/</span><button data-i="${i}">${esc(p.title || "...")}</button>`,
      ),
    );
    c.innerHTML = parts.join("");
    c.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => {
        const i = Number(b.dataset.i);
        this._browsePath = i < 0 ? [] : this._browsePath.slice(0, i + 1);
        this._loadBrowse(el);
      }),
    );
  }

  _renderBrowseList(el, res) {
    const list = el.querySelector(".browse-list");
    const children = (res && res.children) || [];
    if (!children.length) {
      list.innerHTML = `<div class="empty">Nothing here.</div>`;
      return;
    }
    list.innerHTML = children
      .map(
        (ch, i) => `
      <div class="item" data-i="${i}">
        ${
          ch.thumbnail
            ? `<img class="thumb" src="${esc(ch.thumbnail)}" alt="" />`
            : `<span class="idx">${ch.can_expand ? "&#128193;" : "&#9835;"}</span>`
        }
        <span class="nm">${esc(ch.title)}</span>
        <span class="sub">${esc(ch.media_class || "")}</span>
        <span class="acts">
          ${ch.can_play ? `<button class="iconbtn" data-act="play" title="Play">${svg(ICONS.play, 13)}</button>` : ""}
          ${ch.can_play ? `<button class="iconbtn" data-act="fav" title="Add to favorites">${svg(ICONS.star, 13)}</button>` : ""}
        </span>
      </div>`,
      )
      .join("");

    list.querySelectorAll(".item").forEach((row) => {
      const ch = children[Number(row.dataset.i)];
      row.addEventListener("click", (e) => {
        const act = e.target.closest("[data-act]");
        if (act) {
          e.stopPropagation();
          if (act.dataset.act === "play") this._playBrowseItem(ch);
          if (act.dataset.act === "fav") {
            this._settings.favorites.push({
              id: uid(),
              name: ch.title,
              media_content_id: ch.media_content_id,
              media_content_type: ch.media_content_type,
              thumbnail: ch.thumbnail || null,
            });
            this._saveSettings();
            this._toast("Added to favorites");
          }
          return;
        }
        if (ch.can_expand) {
          this._browsePath.push({
            id: ch.media_content_id,
            type: ch.media_content_type,
            title: ch.title,
          });
          this._loadBrowse(el);
        } else if (ch.can_play) {
          this._playBrowseItem(ch);
        }
      });
    });
  }

  _playBrowseItem(ch) {
    this._service("play_media", {
      media_content_id: ch.media_content_id,
      media_content_type: ch.media_content_type,
    }).then(() => this._toast("Playing: " + ch.title));
  }

  /* --- Settings panel --- */

  _renderSettings(el) {
    const set = this._settings;
    const opt = (v, label, cur) =>
      `<option value="${esc(v)}"${v === cur ? " selected" : ""}>${esc(label)}</option>`;

    el.innerHTML = `
      <div class="panel-head">
        <span class="panel-title">Settings</span>
        <span class="grow"></span>
        <span class="hint">v${CARD_VERSION}</span>
      </div>
      <div class="settings-grid">
        <div class="section">
          <h4>Appearance</h4>
          <label class="field">Theme
            <select class="s-theme">${Object.entries(THEMES)
              .map(([k, t]) => opt(k, t.name, set.theme))
              .join("")}</select>
          </label>
          <label class="check"><input type="checkbox" class="s-compact"${set.compact ? " checked" : ""}/> Compact layout</label>
          <label class="check"><input type="checkbox" class="s-art"${set.showArtwork ? " checked" : ""}/> Show artwork</label>
          <label class="field">Marquee speed: <b class="v-marquee">${set.marqueeSpeed}x</b>
            <input type="range" class="s-marquee" min="0.25" max="4" step="0.25" value="${set.marqueeSpeed}" />
          </label>
        </div>

        <div class="section">
          <h4>Visualizer</h4>
          <label class="field">Mode
            <select class="s-viz">${Object.entries(VISUALIZERS)
              .map(([k, n]) => opt(k, n, set.visualizer))
              .join("")}</select>
          </label>
          <label class="check"><input type="checkbox" class="s-showviz"${set.showVisualizer ? " checked" : ""}/> Show visualizer</label>
          <label class="field">Sensitivity: <b class="v-sens">${set.vizSensitivity}x</b>
            <input type="range" class="s-sens" min="0.25" max="2.5" step="0.05" value="${set.vizSensitivity}" />
          </label>
          <label class="field">Bands: <b class="v-bands">${set.vizBands}</b>
            <input type="range" class="s-bands" min="8" max="48" step="1" value="${set.vizBands}" />
          </label>
          <div class="hint">The visualizer is synthesised - browsers cannot read audio played by a remote device.</div>
        </div>

        <div class="section">
          <h4>Buttons</h4>
          <label class="check"><input type="checkbox" class="s-b-eq"${set.showEqButton ? " checked" : ""}/> Equalizer button</label>
          <label class="check"><input type="checkbox" class="s-b-pl"${set.showPlaylistButton ? " checked" : ""}/> Playlist button</label>
          <label class="check"><input type="checkbox" class="s-b-br"${set.showBrowserButton ? " checked" : ""}/> Browser button</label>
          <label class="check"><input type="checkbox" class="s-b-ps"${set.showPlayerSelect ? " checked" : ""}/> Player selector</label>
        </div>

        <div class="section">
          <h4>Playback device</h4>
          <label class="field">Media player
            <select class="s-entity">
              <option value="">(use card configuration)</option>
              ${this._players()
                .map((p) => opt(p.id, `${p.name} - ${p.state}`, set.entity || ""))
                .join("")}
            </select>
          </label>
          <div class="hint">Card YAML entity: <code>${esc(this._config.entity || "-")}</code></div>
        </div>

        <div class="section" style="grid-column:1/-1">
          <h4>Backup &amp; restore</h4>
          <div class="chips">
            <button class="btn s-export">${svg(ICONS.download, 13)} Export file</button>
            <button class="btn s-copy">Copy to clipboard</button>
            <button class="btn s-import">${svg(ICONS.upload, 13)} Import file</button>
            <button class="btn s-paste">Import from text</button>
            <button class="btn s-reset">Reset to defaults</button>
            <input type="file" class="s-file" accept="application/json,.json" hidden />
          </div>
          <textarea class="s-json" spellcheck="false" placeholder="Exported JSON appears here - or paste a backup and press &quot;Import from text&quot;."></textarea>
          <div class="hint">
            Settings, favorites, radio stations and the EQ curve are stored in this
            browser under <code>${esc(this._store.key)}</code>. Export to move them to
            another device or browser.
          </div>
        </div>
      </div>
    `;

    const on = (sel, ev, fn) => el.querySelector(sel).addEventListener(ev, fn);
    const persist = (rerender) => {
      this._saveSettings();
      if (rerender) {
        this._panel = "settings";
        this._render();
      } else {
        this._update();
      }
    };

    on(".s-theme", "change", (e) => {
      set.theme = e.target.value;
      this._applyTheme();
      persist(false);
    });
    on(".s-compact", "change", (e) => {
      set.compact = e.target.checked;
      this._el.classList.toggle("compact", set.compact);
      persist(false);
    });
    on(".s-art", "change", (e) => {
      set.showArtwork = e.target.checked;
      persist(false);
    });
    on(".s-marquee", "input", (e) => {
      set.marqueeSpeed = Number(e.target.value);
      el.querySelector(".v-marquee").textContent = set.marqueeSpeed + "x";
      this._saveSettings();
    });
    on(".s-viz", "change", (e) => {
      set.visualizer = e.target.value;
      persist(false);
    });
    on(".s-showviz", "change", (e) => {
      set.showVisualizer = e.target.checked;
      persist(false);
    });
    on(".s-sens", "input", (e) => {
      set.vizSensitivity = Number(e.target.value);
      el.querySelector(".v-sens").textContent = set.vizSensitivity + "x";
      this._saveSettings();
      this._update();
    });
    on(".s-bands", "input", (e) => {
      set.vizBands = Number(e.target.value);
      el.querySelector(".v-bands").textContent = set.vizBands;
      this._saveSettings();
      this._update();
    });
    const toggles = {
      ".s-b-eq": "showEqButton",
      ".s-b-pl": "showPlaylistButton",
      ".s-b-br": "showBrowserButton",
      ".s-b-ps": "showPlayerSelect",
    };
    for (const [sel, key] of Object.entries(toggles)) {
      on(sel, "change", (e) => {
        set[key] = e.target.checked;
        persist(false);
      });
    }
    on(".s-entity", "change", (e) => {
      set.entity = e.target.value || null;
      this._browseItems = null;
      this._browsePath = [];
      persist(false);
    });

    /* --- export / import --- */
    const payload = () => ({
      app: "ha-retro-player-card",
      version: 1,
      exported: new Date().toISOString(),
      settings: this._settings,
    });

    on(".s-export", "click", () => {
      const blob = new Blob([JSON.stringify(payload(), null, 2)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `retro-player-card-${(this._config.storage_key || "settings").replace(/\W+/g, "-")}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      el.querySelector(".s-json").value = JSON.stringify(payload(), null, 2);
      this._toast("Exported");
    });

    on(".s-copy", "click", async () => {
      const text = JSON.stringify(payload(), null, 2);
      el.querySelector(".s-json").value = text;
      try {
        await navigator.clipboard.writeText(text);
        this._toast("Copied to clipboard");
      } catch (e) {
        el.querySelector(".s-json").select();
        this._toast("Copy manually from the text box");
      }
    });

    on(".s-import", "click", () => el.querySelector(".s-file").click());
    on(".s-file", "change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => this._importJson(String(reader.result));
      reader.readAsText(file);
    });
    on(".s-paste", "click", () => this._importJson(el.querySelector(".s-json").value));

    on(".s-reset", "click", () => {
      if (!window.confirm("Reset all card settings, favorites and stations?")) return;
      this._store.clear();
      this.setConfig(this._config);
      this._panel = "settings";
      this._render();
      this._toast("Settings reset");
    });
  }

  _importJson(text) {
    if (!text || !text.trim()) return this._toast("Nothing to import");
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return this._toast("Invalid JSON");
    }
    const incoming = data && data.settings ? data.settings : data;
    if (!incoming || typeof incoming !== "object") return this._toast("Unrecognised backup");
    this._settings = deepMerge(DEFAULT_SETTINGS, incoming);
    if (!THEMES[this._settings.theme]) this._settings.theme = "classic";
    if (!VISUALIZERS[this._settings.visualizer]) this._settings.visualizer = "bars";
    this._saveSettings();
    this._panel = "settings";
    this._render();
    this._toast("Settings imported");
  }
}

/* ------------------------------------------------------------------ *
 * Visual editor
 * ------------------------------------------------------------------ */

class RetroPlayerCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _emit(changes) {
    this._config = { ...this._config, ...changes };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _render() {
    if (!this._hass) return;
    const c = this._config;
    const players = Object.keys(this._hass.states)
      .filter((e) => e.startsWith("media_player."))
      .sort();

    const check = (key, label, def = true) =>
      `<label class="check"><input type="checkbox" data-key="${key}" ${
        (c[key] === undefined ? def : c[key]) ? "checked" : ""
      } /> ${label}</label>`;

    this.shadowRoot.innerHTML = `
      <style>
        .ed { display:flex; flex-direction:column; gap:12px; padding:4px 0;
              font-family: var(--paper-font-body1_-_font-family, sans-serif);
              color: var(--primary-text-color); }
        .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:10px; }
        label.field { display:flex; flex-direction:column; gap:4px; font-size:12px;
              color: var(--secondary-text-color); }
        label.check { display:flex; align-items:center; gap:8px; font-size:13px; }
        select, input[type=text] { font:inherit; padding:6px;
              background: var(--card-background-color); color: var(--primary-text-color);
              border:1px solid var(--divider-color); border-radius:4px; }
        .note { font-size:12px; color: var(--secondary-text-color); line-height:1.5; }
        code { background: var(--secondary-background-color); padding:1px 4px; border-radius:3px; }
      </style>
      <div class="ed">
        <div class="grid">
          <label class="field">Media player entity (required)
            <select data-key="entity">
              <option value="">-- select --</option>
              ${players
                .map(
                  (p) =>
                    `<option value="${esc(p)}"${p === c.entity ? " selected" : ""}>${esc(
                      this._hass.states[p].attributes.friendly_name || p,
                    )}</option>`,
                )
                .join("")}
            </select>
          </label>
          <label class="field">Card title
            <input type="text" data-key="title" value="${esc(c.title || "")}" placeholder="Retro Player" />
          </label>
          <label class="field">Default theme
            <select data-key="theme">
              ${Object.entries(THEMES)
                .map(
                  ([k, t]) =>
                    `<option value="${k}"${(c.theme || "classic") === k ? " selected" : ""}>${esc(t.name)}</option>`,
                )
                .join("")}
            </select>
          </label>
          <label class="field">Default visualizer
            <select data-key="visualizer">
              ${Object.entries(VISUALIZERS)
                .map(
                  ([k, n]) =>
                    `<option value="${k}"${(c.visualizer || "bars") === k ? " selected" : ""}>${esc(n)}</option>`,
                )
                .join("")}
            </select>
          </label>
          <label class="field">Settings storage key
            <input type="text" data-key="storage_key" value="${esc(c.storage_key || "")}" placeholder="defaults to entity id" />
          </label>
        </div>
        <div class="grid">
          ${check("show_visualizer", "Show visualizer")}
          ${check("show_artwork", "Show artwork")}
          ${check("show_eq", "Equalizer button")}
          ${check("show_playlist", "Playlist button")}
          ${check("show_browser", "Media browser button")}
          ${check("show_player_select", "Player selector")}
          ${check("compact", "Compact layout", false)}
        </div>
        <div class="note">
          Theme, visualizer, favorites and radio stations can also be changed from the
          card's own settings panel (gear icon); those choices are stored per browser
          and override the values above. Use <code>storage_key</code> to share
          settings between several cards, or to keep them separate.
        </div>
      </div>
    `;

    this.shadowRoot.querySelectorAll("[data-key]").forEach((input) => {
      const ev = input.type === "checkbox" ? "change" : "change";
      input.addEventListener(ev, () => {
        const key = input.dataset.key;
        let value = input.type === "checkbox" ? input.checked : input.value;
        if (value === "") value = undefined;
        const next = { ...this._config };
        if (value === undefined) delete next[key];
        else next[key] = value;
        this._config = next;
        this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
          }),
        );
      });
    });
  }
}

/* ------------------------------------------------------------------ *
 * Registration
 * ------------------------------------------------------------------ */

if (!customElements.get("ha-retro-player-card")) {
  customElements.define("ha-retro-player-card", RetroPlayerCard);
}
if (!customElements.get("ha-retro-player-card-editor")) {
  customElements.define("ha-retro-player-card-editor", RetroPlayerCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "ha-retro-player-card")) {
  window.customCards.push({
    type: "ha-retro-player-card",
    name: "Retro Media Player Card",
    description:
      "Retro-skin media player with visualizer, themes, radio, favorites and import/export.",
    preview: true,
    documentationURL: "https://github.com/joshuaaaaa/HA_player",
  });
}

console.info(
  `%c RETRO-MEDIA-PLAYER-CARD %c v${CARD_VERSION} `,
  "color:#0a0f0a;background:#00ff4c;font-weight:700",
  "color:#00ff4c;background:#0a0f0a",
);
