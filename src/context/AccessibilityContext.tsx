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
    document.documentElement.lang = prefs.lang;
  }, [prefs]);

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

