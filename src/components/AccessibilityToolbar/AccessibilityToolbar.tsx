import React, { useState } from 'react';
import '../AccessibilityToolbar/toolbar.css';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function AccessibilityToolbar() {
  const { prefs, setPref, announce, ttsSpeak, ttsStop } = useAccessibility();
  const [open, setOpen] = useState(false);
  const [ttsPlaying, setTtsPlaying] = useState(false);

  const toggleOpen = () => setOpen((s) => !s);

  return (
    <div className="a11y-toolbar" aria-hidden={false}>
      <button
        className="a11y-floating-btn"
        aria-label={open ? 'Close accessibility toolbar' : 'Open accessibility toolbar'}
        onClick={toggleOpen}
        aria-expanded={open}
      >
        A11Y
      </button>

      {open && (
        <div className="a11y-panel" role="toolbar" aria-label="Accessibility controls">
          <div className="control-group">
            <div className="control-label">Font size</div>
            <div className="control-row">
              <button aria-pressed={prefs.fontSize === 'small'} onClick={() => setPref('fontSize', 'small')}>A-</button>
              <button aria-pressed={prefs.fontSize === 'normal'} onClick={() => setPref('fontSize', 'normal')}>A</button>
              <button aria-pressed={prefs.fontSize === 'large'} onClick={() => setPref('fontSize', 'large')}>A+</button>
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">Contrast</div>
            <div className="control-row">
              <button aria-pressed={prefs.highContrast} onClick={() => { setPref('highContrast', !prefs.highContrast); announce('Contrast toggled'); }}>
                High contrast
              </button>
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">Text mode</div>
            <div className="control-row">
              <button aria-pressed={prefs.textOnly} onClick={() => setPref('textOnly', !prefs.textOnly)}>Text only</button>
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">Read aloud</div>
            <div className="control-row">
              <button
                aria-pressed={ttsPlaying}
                onClick={() => {
                  if (ttsPlaying) {
                    ttsStop?.();
                    setTtsPlaying(false);
                  } else {
                    ttsSpeak?.('This page will be read aloud. Use controls to stop.');
                    setTtsPlaying(true);
                  }
                }}
              >
                {ttsPlaying ? 'Stop' : 'Play'}
              </button>
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">Language</div>
            <div className="control-row">
              <button aria-pressed={prefs.lang === 'en'} onClick={() => setPref('lang', 'en')}>English</button>
              <button aria-pressed={prefs.lang === 'hi'} onClick={() => setPref('lang', 'hi')}>Hindi</button>
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">Links</div>
            <div className="control-row">
              <button aria-pressed={prefs.underlineLinks} onClick={() => setPref('underlineLinks', !prefs.underlineLinks)}>Underline links</button>
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">Appearance</div>
            <div className="control-row">
              <button aria-pressed={prefs.grayscale} onClick={() => setPref('grayscale', !prefs.grayscale)}>Grayscale</button>
              <button aria-pressed={prefs.magnifier} onClick={() => setPref('magnifier', !prefs.magnifier)}>Magnifier</button>
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">Announcements</div>
            <div className="control-row">
              <button aria-pressed={prefs.announceDynamic} onClick={() => setPref('announceDynamic', !prefs.announceDynamic)}>Announce dynamic</button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

