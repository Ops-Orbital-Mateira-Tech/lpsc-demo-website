import React from 'react';
import { ArrowRight } from 'lucide-react';

const docs = [
  {
    title: 'Centralized Selection of Graduate & Technician Apprentices',
    excerpt:
      'Details for selection of Graduate (Engineering & Non-Engineering) & Technician Apprentices in LPSC.',
    href: '/documents/centralized-selection-apprentices.pdf',
    type: 'PDF',
    size: '124 KB',
    lastUpdated: '2026-02-01'
  },
  {
    title: 'Answer Key Published (Written Test 04/01/2026)',
    excerpt: 'Answer key published — objections accepted until 02/02/2026.',
    href: '/documents/answer-key-04012026.pdf',
    type: 'PDF',
    size: '48 KB',
    lastUpdated: '2026-02-02'
  },
  {
    title: 'Selection Drive for Apprentices',
    excerpt: 'Selection drive for Graduate & Technician Apprentices for training year 2024-2025.',
    href: '/documents/selection-drive-apprentices.pdf',
    type: 'PDF',
    size: '96 KB',
    lastUpdated: '2025-12-15'
  },
  {
    title: 'Tender: Running Cafeteria',
    excerpt: 'Tender notice for running cafeteria at LPSC — see Tenders page.',
    href: '/documents/tender-running-cafeteria.pdf',
    type: 'PDF',
    size: '68 KB',
    lastUpdated: '2025-10-01'
  }
];

export default function DocumentCards() {
  return (
    <div className="document-cards">
      {docs.map((d, i) => (
        <article key={i} className="doc-card" aria-labelledby={`doc-${i}`}>
          <div className="doc-content">
            <h3 id={`doc-${i}`}>{d.title}</h3>
            <p>{d.excerpt}</p>
            {d.lastUpdated && (
              <div className="doc-meta">
                <time dateTime={d.lastUpdated}>Last updated: {d.lastUpdated}</time>
              </div>
            )}
          </div>

          <a
            className="doc-link"
            href={d.href}
            aria-label={`View ${d.title} (${d.type}, ${d.size})`}
            download
          >
            <span className="doc-link-bar" aria-hidden="true">
              <ArrowRight size={18} />
            </span>
            <span className="sr-only">{`${d.type}, ${d.size}`}</span>
          </a>
        </article>
      ))}
    </div>
  );
}

