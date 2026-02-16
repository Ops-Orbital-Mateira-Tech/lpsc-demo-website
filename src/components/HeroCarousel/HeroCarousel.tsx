import React, { useEffect, useRef, useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PauseCircle, PlayCircle } from 'lucide-react';

// Preferred images in repo: /images/lpsc-hero-1.jpg, /images/lpsc-hero-2.jpg, /images/lpsc-hero-3.jpg
// Fallback to project assets if local images are not present.
const preferred = ['/images/lpsc-hero-1.jpg', '/images/lpsc-hero-2.jpg', '/images/lpsc-hero-3.jpg'];
const fallback = [
  '/assets/Screenshot_2026-02-15_211755-6e00a086-024e-4c40-9bd4-8bdea96bdb56.png',
  '/assets/Screenshot_2026-02-15_211840-4537151b-96a0-42a4-a96d-272ba6937d52.png',
  '/assets/Screenshot_2026-02-15_211851-3eb17835-bc06-4fe4-af2f-eccb87c9ac2c.png'
];

export default function HeroCarousel() {
  const images = preferred;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefs, announce } = useAccessibility();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isPaused) return;
    autoRef.current = window.setInterval(() => {
      setIndex((i) => {
        const nextIndex = (i + 1) % images.length;
        if (prefs?.announceDynamic) announce && announce(`Slide ${nextIndex + 1}`);
        return nextIndex;
      });
    }, 5000);
    return () => {
      if (autoRef.current) window.clearInterval(autoRef.current);
    };
  }, [images.length, isPaused, prefersReducedMotion]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      setIsPaused((s) => !s);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>, idx: number) => {
    const target = e.currentTarget;
    if (fallback[idx]) {
      target.src = fallback[idx];
    } else {
      target.style.display = 'none';
    }
  };

  return (
    <section
      className="hero"
      aria-label="Main slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={onKeyDown}
      ref={sectionRef}
      tabIndex={0}
    >
      <div className="hero-inner" role="region" aria-roledescription="carousel" aria-live="off">
        {images.map((src, i) => (
          <div
            className={`hero-slide ${i === index ? 'active' : ''}`}
            key={i}
            aria-hidden={i === index ? 'false' : 'true'}
          >
            <img src={src} alt={`Hero image ${i + 1}`} onError={(e) => handleError(e, i)} aria-hidden={prefs?.textOnly ? 'true' : 'false'} />
          </div>
        ))}

        <div className="hero-controls">
          <button aria-label="Previous slide" onClick={prev} className="hero-prev">
            ‹
          </button>
          <button aria-label="Next slide" onClick={next} className="hero-next">
            ›
          </button>
          <button
            aria-pressed={isPaused}
            aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
            className="hero-pause"
            onClick={() => setIsPaused((s) => !s)}
          >
            {isPaused ? <PlayCircle size={22} /> : <PauseCircle size={22} />}
          </button>
        </div>

        <div className="hero-indicators" role="tablist" aria-label="Slide indicators">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              className={`indicator ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

