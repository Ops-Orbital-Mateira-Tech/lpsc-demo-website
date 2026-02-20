import React, { useEffect, useRef, useState } from "react";
import { useAccessibility } from "../../context/AccessibilityContext";
import { NavLink } from "react-router-dom";
import {
  Globe,
  Type,
  Contrast,
  ChevronDown,
  Menu,
  Sliders,
} from "lucide-react";

export default function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showHeaderControls, setShowHeaderControls] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const navRef = useRef<HTMLElement | null>(null);
  const { prefs, setPref } = useAccessibility();

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "hi";
  }, [lang]);

  const toggleMenu = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  const onMenuKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu(i);
    } else if (e.key === "Escape") {
      setOpenIndex(null);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpenIndex(i);
      const submenu = document.querySelector<HTMLAnchorElement>(
        `.submenu[data-for=\"${i}\"] a`,
      );
      submenu?.focus();
    }
  };
  return (
    <header className="site-header" role="banner">
      <div className="topbar container">
        <div className="branding-row">
          <div className="branding">
            <img
              src="/images/Emblem.png"
              alt="Government Emblem"
              className="emblem"
            />
            <div className="title">
              <h1 className="sr-only">
                Liquid Propulsion Systems Centre — Indian Space Research
                Organisation
              </h1>
              <div className="org">Liquid Propulsion Systems Centre</div>
              <div className="dept">Indian Space Research Organisation</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="right-logos" aria-hidden="true">
                <img
                  src="/images/DigitalIndia.png"
                  alt="Digital India logo"
                  className="mini-logo"
                />
              </div>
              <img
                src="/images/LPSC-Logo.png"
                alt="LPSC logo"
                className="logo"
              />
            </div>
          </div>
        </div>

        <div className="search-row">
          <div
            className="search-centered"
            role="search"
            aria-label="Site search"
          >
            <label htmlFor="site-search" className="sr-only">
              Search the site
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Search..."
              aria-label="Search the site"
            />
            <button aria-label="Search" className="search-btn">
              🔍
            </button>
          </div>
        </div>

        <div className="nav-row" role="toolbar" aria-label="Navigation toggles">
          <button
            className="menu-toggle menu-toggle-left"
            aria-expanded={mobileNavOpen}
            aria-controls="primarynav-list"
            onClick={() => setMobileNavOpen((s) => !s)}
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
          >
            <Menu size={20} />
          </button>

          <div className="nav-row-spacer" aria-hidden="true" >
          <div className="search-row mobile-search-row">
          <div
            className="search-centered"
            role="search"
            aria-label="Site search"
          >
            <label htmlFor="site-search" className="sr-only">
              Search the site
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Search..."
              aria-label="Search the site"
            />
            <button aria-label="Search" className="search-btn">
              🔍
            </button>
          </div>
        </div>
        </div>

          <button
            className="menu-toggle menu-toggle-right"
            aria-expanded={showHeaderControls}
            aria-controls="header-controls"
            onClick={() => setShowHeaderControls((s) => !s)}
            aria-label={
              showHeaderControls ? "Hide header tools" : "Show header tools"
            }
          >
            <Sliders size={20} />
          </button>
        </div>

        <div
          id="header-controls"
          className={`header-icons header-text-controls ${
            showHeaderControls ? "show" : ""
          }`}
          aria-hidden={!showHeaderControls}
        >
          <div
            className="text-size-controls"
            role="group"
            aria-label="Text size controls"
          >
            <button
              className={`text-size-btn ${
                prefs.fontSize === "large" ? "active" : ""
              }`}
              aria-pressed={prefs.fontSize === "large"}
              aria-label="Increase text size"
              onClick={() => setPref("fontSize", "large")}
            >
              A+
            </button>
            <button
              className={`text-size-btn ${
                prefs.fontSize === "normal" ? "active" : ""
              }`}
              aria-pressed={prefs.fontSize === "normal"}
              aria-label="Default text size"
              onClick={() => setPref("fontSize", "normal")}
            >
              A
            </button>
            <button
              className={`text-size-btn ${
                prefs.fontSize === "small" ? "active" : ""
              }`}
              aria-pressed={prefs.fontSize === "small"}
              aria-label="Decrease text size"
              onClick={() => setPref("fontSize", "small")}
            >
              A-
            </button>
          </div>

          <a
            className="skip-inline"
            href="#about-ministry"
            style={{ fontSize: "0.7rem" }}
          >
            Skip to main content
          </a>
        </div>
      </div>

      <nav
        id="primarynav"
        ref={navRef}
        className="main-nav"
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className="container nav-inner">
          <ul
            id="primarynav-list"
            className={`nav-list ${mobileNavOpen ? "show" : ""}`}
          >
            <li>
              <button
                aria-label="Home"
                onClick={() => (window.location.href = "/")}
              >
                Home
              </button>
            </li>

            <li className="has-sub" aria-expanded={openIndex === 0}>
              <button
                aria-haspopup="true"
                aria-expanded={openIndex === 0}
                onClick={() => toggleMenu(0)}
                onKeyDown={(e) => onMenuKeyDown(e, 0)}
              >
                <span>About Us</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>
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
              <button
                aria-haspopup="true"
                aria-expanded={openIndex === 1}
                onClick={() => toggleMenu(1)}
                onKeyDown={(e) => onMenuKeyDown(e, 1)}
              >
                <span>Research</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>
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
              <button
                aria-haspopup="true"
                aria-expanded={openIndex === 2}
                onClick={() => toggleMenu(2)}
                onKeyDown={(e) => onMenuKeyDown(e, 2)}
              >
                <span>Technologies</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              <ul className="submenu" role="menu" data-for="2">
                <li role="none">
                  <NavLink
                    to="/technologies/propulsion-systems"
                    role="menuitem"
                  >
                    Propulsion Systems
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink
                    to="/technologies/advanced-propulsion-systems"
                    role="menuitem"
                  >
                    Advanced Propulsion Systems
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink
                    to="/technologies/new-projects-approved"
                    role="menuitem"
                  >
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
              <button
                aria-label="How to Reach?"
                onClick={() => (window.location.href = "/how-to-reach")}
              >
                How to Reach?
              </button>
            </li>

            <li className="has-sub" aria-expanded={openIndex === 3}>
              <button
                aria-haspopup="true"
                aria-expanded={openIndex === 3}
                onClick={() => toggleMenu(3)}
                onKeyDown={(e) => onMenuKeyDown(e, 3)}
              >
                <span>Out Reach</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>
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
              <button
                aria-haspopup="true"
                aria-expanded={openIndex === 4}
                onClick={() => toggleMenu(4)}
                onKeyDown={(e) => onMenuKeyDown(e, 4)}
              >
                <span>Students</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>
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
              <button
                aria-label="ISRO"
                onClick={() =>
                  (window.location.href = "https://www.isro.gov.in")
                }
              >
                ISRO
              </button>
            </li>

            <li>
              <button
                aria-label="National Portal"
                onClick={() =>
                  (window.location.href = "https://www.india.gov.in")
                }
              >
                National Portal
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
