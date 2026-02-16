import React from 'react';
import { FileText, Link as LinkIcon, Info } from 'lucide-react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import AnnouncementsTicker from '../components/Announcements/AnnouncementsTicker';
import KeyOfferings from '../components/KeyOfferings/KeyOfferings';
import DocumentCards from '../components/Documents/DocumentCards';
import SocialGrid from '../components/SocialMedia/SocialGrid';

export default function Home() {
  return (
    <>
      <Header />
      <main id="maincontent" role="main">
        <HeroCarousel />
        <AnnouncementsTicker />
        <section aria-labelledby="about-ministry" className="about-ministry">
          <div className="container">
            <h2 id="about-ministry"> About LPSC</h2>
            <p>
              Liquid Propulsion Systems Centre (LPSC) is the lead Centre for development and realization of
              earth-to-orbit advanced propulsion stages for Launch Vehicles and also the in-space propulsion
              systems for Spacecrafts. The LPSC activities and facilities are spread across its two campuses
              viz., LPSC Headquarters and Design Offices at Valiamala/Thiruvananthapuram, and Spacecraft
              Propulsion Systems Activities at LPSC, Bengaluru/Karnataka.
            </p>
            <div className="cards">
              <button className="card">Our Team</button>
              <button className="card">Our Organisations</button>
              <button className="card">Our Performance</button>
            </div>
          </div>
        </section>

        <KeyOfferings />

        <section aria-labelledby="recent-docs" className="recent-and-links">
          <div className="container recent-and-links-inner">
            <div className="recent-column">
              <h2 id="recent-docs">
                <FileText className="heading-icon" aria-hidden="true" /> Recent Documents
              </h2>
              <DocumentCards />
            </div>

            <div className="important-links" role="region" aria-labelledby="important-links">
              <h2 id="important-links">
                <LinkIcon className="heading-icon" aria-hidden="true" /> Important Links
              </h2>
              <ul>
                <li>
                  <a href="/about/about-lpsc">
                    Our Director <span className="link-bar">›</span>
                  </a>
                </li>
                <li>
                  <a href="https://pmnrf.gov.in/" target="_blank" rel="noopener">
                    Avail 100% Tax Relief through PMNRF <span className="link-bar">›</span>
                  </a>
                </li>
                <li>
                  <a href="/connect">
                    Vigilance Officer <span className="link-bar">›</span>
                  </a>
                </li>
                <li>
                  <a href="/connect">
                    Right To Information <span className="link-bar">›</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <SocialGrid />
      </main>
      <Footer />
    </>
  );
}

