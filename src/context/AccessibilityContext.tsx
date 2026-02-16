import React, { createContext, useContext, useEffect, useState } from 'react';

type FontSize = 'small' | 'normal' | 'large';

type Prefs = {
  fontSize: FontSize;
  highContrast: boolean;
  textOnly: boolean;
  tts: boolean;
  lang: 'en' | 'hi';
  underlineLinks: boolean;
  grayscale: boolean;
  magnifier: boolean;
  announceDynamic: boolean;
  legibleFont?: boolean;
  cursorLarge?: boolean;
  increasedLineHeight?: boolean;
  textAlignJustify?: boolean;
  letterSpacing?: 'normal'|'wide'|'widest';
  tooltips?: boolean;
};

type ContextType = {
  prefs: Prefs;
  setPref: <K extends keyof Prefs>(k: K, v: Prefs[K]) => void;
  announce: (msg: string, politeness?: 'polite' | 'assertive') => void;
  ttsSpeak?: (text: string) => void;
  ttsStop?: () => void;
};

const defaultPrefs: Prefs = {
  fontSize: 'normal',
  highContrast: false,
  textOnly: false,
  tts: false,
  lang: 'en',
  underlineLinks: true,
  grayscale: false,
  magnifier: false,
  announceDynamic: true
  ,
  legibleFont: false,
  cursorLarge: false,
  increasedLineHeight: false,
  textAlignJustify: false
  ,
  letterSpacing: 'normal',
  tooltips: false
};

const AccessibilityContext = createContext<ContextType>({
  prefs: defaultPrefs,
  setPref: () => {},
  announce: () => {}
});

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

const STORAGE_KEY = 'accessibility_prefs';

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prefs, setPrefs] = useState<Prefs>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...defaultPrefs, ...(JSON.parse(raw) as Partial<Prefs>) } : defaultPrefs;
    } catch {
      return defaultPrefs;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {}

    // Apply classes on html element
    const html = document.documentElement;
    html.classList.toggle('a11y-font-small', prefs.fontSize === 'small');
    html.classList.toggle('a11y-font-large', prefs.fontSize === 'large');
    html.classList.toggle('a11y-high-contrast', prefs.highContrast);
    html.classList.toggle('a11y-text-only', prefs.textOnly);
    html.classList.toggle('a11y-underline-links', prefs.underlineLinks);
    html.classList.toggle('a11y-grayscale', prefs.grayscale);
    html.classList.toggle('a11y-magnifier', prefs.magnifier);
    html.classList.toggle('a11y-legible', !!prefs.legibleFont);
    html.classList.toggle('a11y-cursor-large', !!prefs.cursorLarge);
    html.classList.toggle('a11y-line-height', !!prefs.increasedLineHeight);
    html.classList.toggle('a11y-text-justify', !!prefs.textAlignJustify);
    html.classList.remove('a11y-letterspacing-normal','a11y-letterspacing-wide','a11y-letterspacing-widest');
    html.classList.add(`a11y-letterspacing-${prefs.letterSpacing}`);
    html.classList.toggle('a11y-tooltips', !!prefs.tooltips);
    document.documentElement.lang = prefs.lang;
  }, [prefs]);

  // Magnifier: update CSS variables on mouse move when magnifier is enabled
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const html = document.documentElement;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      html.style.setProperty('--mx', `${x}%`);
      html.style.setProperty('--my', `${y}%`);
      // cursor overlay position
      const cursorEl = document.getElementById('a11y-cursor-overlay');
      if (cursorEl) {
        (cursorEl as HTMLElement).style.left = `${e.clientX}px`;
        (cursorEl as HTMLElement).style.top = `${e.clientY}px`;
      }
    };
    if (prefs.magnifier || prefs.cursorLarge) {
      window.addEventListener('mousemove', onMove);
    } else {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.style.removeProperty('--mx');
      document.documentElement.style.removeProperty('--my');
      const cursorEl = document.getElementById('a11y-cursor-overlay');
      if (cursorEl && cursorEl.parentNode) cursorEl.parentNode.removeChild(cursorEl);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, [prefs.magnifier, prefs.cursorLarge]);

  // Manage cursor overlay element when cursorLarge enabled
  useEffect(() => {
    if (prefs.cursorLarge) {
      let el = document.getElementById('a11y-cursor-overlay') as HTMLElement | null;
      if (!el) {
        el = document.createElement('div');
        el.id = 'a11y-cursor-overlay';
        el.setAttribute('aria-hidden', 'true');
        el.style.position = 'fixed';
        el.style.width = '48px';
        el.style.height = '48px';
        el.style.borderRadius = '0';
        el.style.background = 'transparent';
        el.style.pointerEvents = 'none';
        el.style.transform = 'translate(-10%,-10%) scale(1)';
        el.style.zIndex = '2147483647';
        // Use the cursor SVG from public assets for the overlay
        el.innerHTML = `<img src="/images/svg/cursor.svg" alt="" aria-hidden="true" />`;
        // subtle drop shadow for visibility
        el.style.filter = 'drop-shadow(0 4px 10px rgba(0,0,0,0.25))';
        document.body.appendChild(el);
      }
    } else {
      const el = document.getElementById('a11y-cursor-overlay');
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }
  }, [prefs.cursorLarge]);

  // Announcer element
  useEffect(() => {
    let el = document.getElementById('a11y-announcer');
    if (!el) {
      el = document.createElement('div');
      el.id = 'a11y-announcer';
      el.className = 'sr-only';
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
  }, []);

  const announce = (msg: string, politeness: 'polite' | 'assertive' = 'polite') => {
    try {
      const el = document.getElementById('a11y-announcer');
      if (el) {
        el.setAttribute('aria-live', politeness);
        el.textContent = '';
        // small delay to ensure screen readers pick up change
        setTimeout(() => {
          el.textContent = msg;
        }, 100);
      }
    } catch {}
  };

  const setPref = <K extends keyof Prefs>(k: K, v: Prefs[K]) => {
    setPrefs((p) => ({ ...p, [k]: v }));
  };

  // TTS via util
  let ttsSpeak = (text: string) => {};
  let ttsStop = () => {};
  try {
    // dynamic import to avoid SSR issues
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const tts = require('../utils/tts');
    ttsSpeak = tts.speak;
    ttsStop = tts.stop;
  } catch {}

  return (
    <AccessibilityContext.Provider value={{ prefs, setPref, announce, ttsSpeak, ttsStop }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityContext;

