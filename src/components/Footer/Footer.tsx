import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="links">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="https://eproc.isro.gov.in/">EGPS (Procurement)</a></li>
            <li><a href="https://www.lpsc.gov.in/tender.html">Tenders</a></li>
            <li><a href="https://www.lpsc.gov.in/GST.html">GST Details</a></li>
            <li><a href="https://apps.lpsc.gov.in/SupplierPortal/">KYP</a></li>
          </ul>
        </div>
        <div className="subscribe">
          <h3>Recruitment & Portals</h3>
          <ul>
            <li><a href="https://www.lpsc.gov.in/noticeresult.html">Results & Notices</a></li>
            <li><a href="https://apps.lpsc.gov.in/currentemployees/">Employee Portal</a></li>
            <li><a href="https://apps.lpsc.gov.in/retiredemployees/">Retired Staff</a></li>
          </ul>
        </div>
        <div className="accessibility">
          <h3>Accessibility</h3>
          <ul>
            <li><a href="/accessibility">Accessibility Statement</a></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
            <li><a href="/robots.txt">Robots</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">This website belongs to Liquid Propulsion Systems Centre (LPSC), Department of Space, Government of India</div>
    </footer>
  );
}

