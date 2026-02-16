import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from 'lucide-react';

const tabs = ['Portals', 'Procurement', 'Email & File Sharing'];

const portalsItems = [
  { title: 'Employee', href: 'https://apps.lpsc.gov.in/currentemployees/' },
  { title: 'Retired Staff', href: 'https://apps.lpsc.gov.in/retiredemployees/' },
  { title: 'Nodan Mukur', href: 'https://www.lpsc.gov.in/nodanmukur.html' }
];

const procurementItems = [
  { title: 'EGPS', href: 'https://eproc.isro.gov.in/' },
  { title: 'Tenders', href: 'https://www.lpsc.gov.in/tender.html' },
  { title: 'GST Details', href: 'https://www.lpsc.gov.in/GST.html' },
  { title: 'KYP', href: 'https://apps.lpsc.gov.in/SupplierPortal/' }
];

const emailItems = [
  { title: 'Employee Email', href: 'https://mail.lpsc.gov.in/' },
  { title: 'Bhandaar', href: 'https://bhandaar.lpsc.gov.in/' }
];

export default function KeyOfferings() {
  const [active, setActive] = useState(0);

  const itemsFor = (i: number) => {
    if (i === 0) return portalsItems;
    if (i === 1) return procurementItems;
    return emailItems;
  };

  return (
    <section className="key-offerings" aria-labelledby="key-offerings">
      <div className="container key-grid">
        <div className="offerings-panel" aria-labelledby="key-offerings">
          <h2 id="key-offerings"><Grid className="heading-icon" aria-hidden="true" /> Key Offerings</h2>
          <div role="tablist" aria-label="Key Offerings Tabs" className="tabs">
            {tabs.map((t, i) => (
              <button
                key={t}
                role="tab"
                aria-selected={active === i}
                tabIndex={0}
                onClick={() => setActive(i)}
                className={active === i ? 'active' : ''}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="offerings-list" role="tabpanel" tabIndex={0}>
            <ul>
              {itemsFor(active).map((it) => (
                <li key={it.href} className="offering-item">
                  <NavLink to={it.href}>{it.title}</NavLink>
                  <span className="chev">›</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="offerings-footer">
            <button className="view-more">VIEW MORE ›</button>
          </div>
        </div>

        <div className="whats-new" role="region" aria-labelledby="whats-new">
          <h3 id="whats-new">What's New</h3>
          <ul>
            <li>
              <a href="/documents">Major achievements of LPSC for recent months</a>
            </li>
            <li>
              <a href="/documents">Electronics Component Manufacturing Scheme</a>
            </li>
            <li>
              <a href="/documents">Inviting Expression of Interest for ToT</a>
            </li>
            <li>
              <a href="/documents">Tenders - Result of techno-financial bid</a>
            </li>
          </ul>
          <div className="whats-new-footer">
            <button className="view-more alt">VIEW MORE ›</button>
          </div>
        </div>
      </div>
    </section>
  );
}

