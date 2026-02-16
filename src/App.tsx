import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ministry from './pages/Ministry';
import Offerings from './pages/Offerings';
import DocumentsPage from './pages/DocumentsPage';
import Media from './pages/Media';
import Connect from './pages/Connect';

import ResearchIntroduction from './pages/research/Introduction';
import ResearchProjects from './pages/research/Projects';
import ResearchAreas from './pages/research/Areas';

import PropulsionSystems from './pages/technologies/PropulsionSystems';
import AdvancedPropulsionSystems from './pages/technologies/AdvancedPropulsionSystems';
import NewProjectsApproved from './pages/technologies/NewProjectsApproved';
import Sensors from './pages/technologies/Sensors';
import TechnologiesFAQ from './pages/technologies/FAQ';
import TechnologiesPublications from './pages/technologies/Publications';

import OutreachExhibition from './pages/outreach/Exhibition';
import OutreachCampusVisits from './pages/outreach/CampusVisits';
import AboutLPSC from './pages/about/AboutLPSC';
import History from './pages/about/History';
import FormerDirectors from './pages/about/FormerDirectors';
import WorkingHours from './pages/about/WorkingHours';
import StudentsInternship from './pages/students/Internship';
import StudentsProjects from './pages/students/Projects';
import { AccessibilityProvider } from './context/AccessibilityContext';
import AccessibilityToolbar from './components/AccessibilityToolbar/AccessibilityToolbar';

export default function App() {
  return (
    <>
      <AccessibilityProvider>
        <a className="skip-link" href="#primarynav">
          Skip to navigation
        </a>
        <a className="skip-link" href="#maincontent">
          Skip to content
        </a>
        <AccessibilityToolbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ministry/*" element={<Ministry />} />
        <Route path="/offerings/*" element={<Offerings />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/media" element={<Media />} />
        <Route path="/connect" element={<Connect />} />

        <Route path="/research/introduction" element={<ResearchIntroduction />} />
        <Route path="/research/projects" element={<ResearchProjects />} />
        <Route path="/research/areas" element={<ResearchAreas />} />

        <Route path="/technologies/propulsion-systems" element={<PropulsionSystems />} />
        <Route path="/technologies/advanced-propulsion-systems" element={<AdvancedPropulsionSystems />} />
        <Route path="/technologies/new-projects-approved" element={<NewProjectsApproved />} />
        <Route path="/technologies/sensors" element={<Sensors />} />
        <Route path="/technologies/faq" element={<TechnologiesFAQ />} />
        <Route path="/technologies/publications" element={<TechnologiesPublications />} />

        <Route path="/outreach/exhibition" element={<OutreachExhibition />} />
        <Route path="/outreach/campus-visits" element={<OutreachCampusVisits />} />
        <Route path="/about/about-lpsc" element={<AboutLPSC />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/former-directors" element={<FormerDirectors />} />
        <Route path="/about/working-hours" element={<WorkingHours />} />

        <Route path="/students/internship" element={<StudentsInternship />} />
        <Route path="/students/projects" element={<StudentsProjects />} />
        </Routes>
      </AccessibilityProvider>
    </>
  );
}

