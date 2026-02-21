import React from 'react';
import { Twitter, Facebook, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-column">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="https://eproc.isro.gov.in/" target="_blank" rel="noopener">EGPS (Procurement)</a></li>
            <li><a href="https://www.lpsc.gov.in/tender.html" target="_blank" rel="noopener">Tenders</a></li>
            <li><a href="https://www.lpsc.gov.in/GST.html" target="_blank" rel="noopener">GST Details</a></li>
            <li><a href="https://apps.lpsc.gov.in/SupplierPortal/" target="_blank" rel="noopener">KYP</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Recruitment & Portals</h3>
          <ul>
            <li><a href="https://www.lpsc.gov.in/noticeresult.html" target="_blank" rel="noopener">Results & Notices</a></li>
            <li><a href="https://apps.lpsc.gov.in/currentemployees/" target="_blank" rel="noopener">Employee Portal</a></li>
            <li><a href="https://apps.lpsc.gov.in/retiredemployees/" target="_blank" rel="noopener">Retired Staff</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Policies</h3>
          <ul className="policy-list">
            <li><a href="https://www.lpsc.gov.in/privacy.html" target="_blank" rel="noopener">Privacy Policy</a></li>
            <li><a href="https://www.lpsc.gov.in/terms.html" target="_blank" rel="noopener">Terms of Use</a></li>
            <li><a href="https://www.lpsc.gov.in/disclaimer.html" target="_blank" rel="noopener">Disclaimer</a></li>
            <li><a href="https://www.lpsc.gov.in/accessibility.html" target="_blank" rel="noopener">Accessibility</a></li>
            <li><a href="/screen-reader">Screen Reader</a></li>
          </ul>
        </div>

        <div className="footer-column footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons" role="list">
            <a role="listitem" className="social" href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter"><Twitter /></a>
            <a role="listitem" className="social" href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><Facebook /></a>
            <a role="listitem" className="social" href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube"><Youtube /></a>
            <a role="listitem" className="social" href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn"><Linkedin /></a>
          </div>
        </div>
      </div>
      <div className="copyright">This website belongs to Liquid Propulsion Systems Centre (LPSC), Department of Space, Government of India</div>
    </footer>
  );
}

