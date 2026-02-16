import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, Type, Contrast } from 'lucide-react';

export default function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lang, setLang] = useState<'en'|'hi'>('en');
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'hi';
  }, [lang]);

  const toggleMenu = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  const onMenuKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu(i);
    } else if (e.key === 'Escape') {
      setOpenIndex(null);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpenIndex(i);
      const submenu = document.querySelector<HTMLAnchorElement>(`.submenu[data-for=\"${i}\"] a`);
      submenu?.focus();
    }
  };
  return (
    <header className="site-header" role="banner">
      <div className="topbar container">
        <div className="branding">
          <img src="/images/Emblem.png" alt="Government Emblem" className="emblem" />
          <img src="/images/LPSC-Logo.png" alt="LPSC logo" className="logo" />
          <div className="title">
            <h1 className="sr-only">Liquid Propulsion Systems Centre — Indian Space Research Organisation</h1>
            <div className="org">Liquid Propulsion Systems Centre</div>
            <div className="dept">Indian Space Research Organisation</div>
          </div>
        </div>

        <div className="search-centered" role="search" aria-label="Site search">
          <label htmlFor="site-search" className="sr-only">
            Search the site
          </label>
          <input id="site-search" name="q" type="search" placeholder="Search..." aria-label="Search the site" />
          <button aria-label="Search" className="search-btn">🔍</button>
        </div>

        <div className="access-and-logos">
          <div className="right-logos" aria-hidden="true">
            <img src="/images/DigitalIndia.png" alt="Digital India logo" className="mini-logo" />
          </div>

          <div className="header-icons">
            <button className="icon-btn" aria-label="Language">
              <Globe size={18} />
            </button>
            <button className="icon-btn" aria-label="Text size">
              <Type size={18} />
            </button>
            <button className="icon-btn" aria-label="Accessibility options">
              <Contrast size={18} />
            </button>
          </div>
        </div>
      </div>

      <nav id="primarynav" ref={navRef} className="main-nav" role="navigation" aria-label="Primary navigation">
        <div className="container nav-inner">
          <ul className="nav-list">
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>

            <li className="has-sub" aria-expanded={openIndex === 0}>
              <button aria-haspopup="true" aria-expanded={openIndex === 0} onClick={() => toggleMenu(0)} onKeyDown={(e) => onMenuKeyDown(e, 0)}>About Us ▾</button>
              <ul className="submenu" role="menu" data-for="0">
                <li role="none">
                  <NavLink to="/about/about-lpsc" role="menuitem">
                    About LPSC
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/about/history" role="menuitem">
                    History of LPSC
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/about/former-directors" role="menuitem">
                    Former Directors
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/about/working-hours" role="menuitem">
                    Working Hours & Holiday List
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/connect" role="menuitem">
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="has-sub" aria-expanded={openIndex === 1}>
              <button aria-haspopup="true" aria-expanded={openIndex === 1} onClick={() => toggleMenu(1)} onKeyDown={(e) => onMenuKeyDown(e, 1)}>Research ▾</button>
              <ul className="submenu" role="menu" data-for="1">
                <li role="none">
                  <NavLink to="/research/introduction" role="menuitem">
                    Introduction
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/research/projects" role="menuitem">
                    Projects
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/research/areas" role="menuitem">
                    Research Areas
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="has-sub" aria-expanded={openIndex === 2}>
              <button aria-haspopup="true" aria-expanded={openIndex === 2} onClick={() => toggleMenu(2)} onKeyDown={(e) => onMenuKeyDown(e, 2)}>Technologies ▾</button>
              <ul className="submenu" role="menu" data-for="2">
                <li role="none">
                  <NavLink to="/technologies/propulsion-systems" role="menuitem">
                    Propulsion Systems
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/technologies/advanced-propulsion-systems" role="menuitem">
                    Advanced Propulsion Systems
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/technologies/new-projects-approved" role="menuitem">
                    New Projects Approved
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/technologies/sensors" role="menuitem">
                    Sensors
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/technologies/faq" role="menuitem">
                    FAQ
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/technologies/publications" role="menuitem">
                    Publications
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink to="/how-to-reach">How to Reach?</NavLink>
            </li>

            <li className="has-sub" aria-expanded={openIndex === 3}>
              <button aria-haspopup="true" aria-expanded={openIndex === 3} onClick={() => toggleMenu(3)} onKeyDown={(e) => onMenuKeyDown(e, 3)}>Out Reach ▾</button>
              <ul className="submenu" role="menu" data-for="3">
                <li role="none">
                  <NavLink to="/outreach/exhibition" role="menuitem">
                    Exhibition
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/outreach/campus-visits" role="menuitem">
                    Campus Visits
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="has-sub" aria-expanded={openIndex === 4}>
              <button aria-haspopup="true" aria-expanded={openIndex === 4} onClick={() => toggleMenu(4)} onKeyDown={(e) => onMenuKeyDown(e, 4)}>Students ▾</button>
              <ul className="submenu" role="menu" data-for="4">
                <li role="none">
                  <NavLink to="/students/internship" role="menuitem">
                    Internship
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink to="/students/projects" role="menuitem">
                    Projects
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <a href="https://www.isro.gov.in" target="_blank" rel="noopener">
                ISRO
              </a>
            </li>

            <li>
              <a href="https://www.india.gov.in" target="_blank" rel="noopener">
                National Portal
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

