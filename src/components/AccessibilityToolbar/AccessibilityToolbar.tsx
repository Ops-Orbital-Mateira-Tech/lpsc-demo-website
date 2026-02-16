import React, { useState } from 'react';
import '../AccessibilityToolbar/toolbar.css';
import { useAccessibility } from '../../context/AccessibilityContext';
import { User, PlayCircle, RefreshCw } from 'lucide-react';

// small custom SVG icons (kept inline to avoid extra files)
const ContrastIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 21a9 9 0 100-18v18z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const FontIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 7h4l4 10h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CursorIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 3l7 14 2-6 6 7-15-15z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LinkIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M10 14a5 5 0 007.07 0l2.83-2.83" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 10a5 5 0 00-7.07 0L4.1 12.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const SpacingIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 7h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 3v4M17 3v4M7 17v4M17 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LegibleIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 6h16M6 18h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LineHeightIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const AlignIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 6h18M6 12h12M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const VideoIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="M17 10l4-2v8l-4-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TooltipIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 20v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
  </svg>
);

export default function AccessibilityToolbar() {
  const { prefs, setPref, announce, ttsSpeak, ttsStop } = useAccessibility();
  const [open, setOpen] = useState(false);
  const [ttsPlaying, setTtsPlaying] = useState(false);

  const toggleOpen = () => setOpen((s) => !s);

  const handleTts = () => {
    if (ttsPlaying) {
      ttsStop?.();
      setTtsPlaying(false);
      announce('Text to speech stopped');
    } else {
      ttsSpeak?.('This page will be read aloud. Use controls to stop.');
      setTtsPlaying(true);
      announce('Text to speech started');
    }
  };

  const controls = [
    { id: 'contrast', label: 'Contrast +', pressed: prefs.highContrast, onClick: () => { setPref('highContrast', !prefs.highContrast); announce('Contrast toggled'); }, Icon: ContrastIcon },
    // font cycles through small -> normal -> large
    { id: 'font', label: `Font: ${prefs.fontSize}`, pressed: false, onClick: () => {
        const next = prefs.fontSize === 'small' ? 'normal' : prefs.fontSize === 'normal' ? 'large' : 'small';
        setPref('fontSize', next);
        announce(`Font size set to ${next}`);
      }, Icon: FontIcon },
    { id: 'cursor', label: 'Cursor', pressed: prefs.cursorLarge, onClick: () => { setPref('cursorLarge', !prefs.cursorLarge); announce(prefs.cursorLarge ? 'Cursor size normal' : 'Large cursor enabled'); }, Icon: CursorIcon },
    { id: 'links', label: 'Highlight Link', pressed: prefs.underlineLinks, onClick: () => setPref('underlineLinks', !prefs.underlineLinks), Icon: LinkIcon },
    { id: 'letter', label: (() => {
        if (prefs.letterSpacing === 'normal') return 'Letter: normal';
        if (prefs.letterSpacing === 'wide') return 'Letter: wide';
        return 'Letter: widest';
      })(), pressed: false, onClick: () => {
        const next = prefs.letterSpacing === 'normal' ? 'wide' : prefs.letterSpacing === 'wide' ? 'widest' : 'normal';
        setPref('letterSpacing', next as any);
        const verbal = next === 'wide' ? '0.06 em' : next === 'widest' ? '0.12 em' : 'normal';
        announce(`Letter spacing set to ${verbal}`);
      }, Icon: SpacingIcon },
    { id: 'legible', label: 'Legible Font', pressed: !!prefs.legibleFont, onClick: () => { setPref('legibleFont', !prefs.legibleFont); announce(prefs.legibleFont ? 'Legible font disabled' : 'Legible font enabled'); }, Icon: LegibleIcon },
    { id: 'line', label: 'Line Height', pressed: !!prefs.increasedLineHeight, onClick: () => { setPref('increasedLineHeight', !prefs.increasedLineHeight); announce(prefs.increasedLineHeight ? 'Line height normal' : 'Increased line height'); }, Icon: LineHeightIcon },
    { id: 'align', label: 'Text Align', pressed: !!prefs.textAlignJustify, onClick: () => { setPref('textAlignJustify', !prefs.textAlignJustify); announce(prefs.textAlignJustify ? 'Text align normal' : 'Text justified'); }, Icon: AlignIcon },
    { id: 'videos', label: 'Toggle Videos', pressed: false, onClick: () => { announce('Videos toggled'); }, Icon: VideoIcon },
    { id: 'tooltips', label: 'Toggle Tooltips', pressed: !!prefs.tooltips, onClick: () => { setPref('tooltips', !prefs.tooltips); announce(prefs.tooltips ? 'Tooltips disabled' : 'Tooltips enabled'); }, Icon: TooltipIcon },
    { id: 'reset', label: 'Reset', pressed: false, onClick: () => { setPref('fontSize', 'normal'); setPref('highContrast', false); setPref('textOnly', false); setPref('grayscale', false); setPref('underlineLinks', true); announce('Accessibility settings reset'); }, Icon: RefreshCw },
    { id: 'reload', label: 'Reload', pressed: false, onClick: () => { window.location.reload(); }, Icon: RefreshCw }
  ];

  return (
    <div className="a11y-toolbar" aria-hidden={false}>
      <button
        className={`a11y-floating-btn ${open ? 'open' : ''}`}
        aria-label={open ? 'Close accessibility toolbar' : 'Open accessibility toolbar'}
        onClick={toggleOpen}
        aria-expanded={open}
      >
        <User size={30} /> <span className="visually-hidden">Accessibility Tools</span>
      </button>

      {open && (
        <div className="a11y-panel" role="toolbar" aria-label="Accessibility controls">
          <h3 className="panel-title">Accessibility Tools</h3>
          <div className="a11y-panel-grid" role="grid">
            {controls.map((c) => {
              const Icon = (c as any).Icon;
              return (
                <button
                  key={c.id}
                  className={`a11y-card ${c.pressed ? 'active' : ''}`}
                  onClick={() => {
                    c.onClick();
                    // small click animation handled by CSS
                  }}
                  aria-pressed={c.pressed}
                  data-tooltip={c.label}
                  title={c.label}
                >
                  <div className="card-icon"><Icon size={28} /></div>
                  <div className="card-label">{c.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

