import React, { useState } from 'react';
import { PauseCircle, PlayCircle } from 'lucide-react';

const items = [
  'Centralized Selection of Graduate (Engineering & Non-Engineering) & Technician Apprentices in LPSC, Valiamala Unit.',
  'Published the Answer Key of the Written Test held on 04/01/2026 — Objections can be raised till 02/02/2026.',
  'Pension Adalat LPSC(B) — details on site'
];

export default function AnnouncementsTicker() {
  const [paused, setPaused] = useState(false);
  return (
    <section className={`announcements ${paused ? 'paused' : ''}`} aria-label="Announcements" aria-live="polite">
      <div className="container ticker">
        <div className="ticker-header">
          <strong>Announcements</strong>
          <button
            className="ticker-pause"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? 'Play announcements' : 'Pause announcements'}
          >
            {paused ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
          </button>
        </div>
        <div className="marquee" role="marquee" aria-hidden={paused}>
          <div className="marquee-track">
            {items.concat(items).map((it, idx) => (
              <span key={idx} className="marquee-item">
                {it}
                <span className="sep" aria-hidden="true"> — </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

