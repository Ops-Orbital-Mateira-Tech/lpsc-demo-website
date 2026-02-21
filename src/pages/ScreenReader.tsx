import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function ScreenReader() {
  return (
    <>
      <Header />
      <main className="container" role="main" style={{ padding: '1.25rem 1rem' }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: '0.5rem' }}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a> › Screen Reader
        </nav>

        <h1>Screen Reader</h1>

        <p>
          This website complies with Web Content Accessibility Guidelines (WCAG) and is compatible with common screen readers.
          The list below provides links to popular screen readers and whether they are free or commercial.
        </p>

        <section aria-labelledby="sr-list" style={{ marginTop: '1rem' }}>
          <h2 id="sr-list">Screen readers</h2>

          <div style={{ overflowX: 'auto' }}>
            <table className="screen-reader-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e6e6e6' }}>Screen Reader</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e6e6e6' }}>Website / Download</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e6e6e6' }}>Free / Commercial</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>Screen Access For All (SAFA)</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>
                    <a href="http://safa.sourceforge.net/" target="_blank" rel="noopener noreferrer">http://safa.sourceforge.net/</a>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>Free</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>Non Visual Desktop Access (NVDA)</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>
                    <a href="http://www.nvda-project.org/" target="_blank" rel="noopener noreferrer">http://www.nvda-project.org/</a>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>Free</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>System Access To Go</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>
                    <a href="http://www.satogo.com/" target="_blank" rel="noopener noreferrer">http://www.satogo.com/</a>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>Free</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>WebAnywhere</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>—</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>Free</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>Hal</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>
                    <a href="http://www.yourdolphin.co.uk/productdetail.asp?id=5" target="_blank" rel="noopener noreferrer">YourDolphin - Hal</a>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>Commercial</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>JAWS</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>—</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #f2f2f2' }}>Commercial</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem' }}>Supernova</td>
                  <td style={{ padding: '0.5rem' }}>
                    <a href="http://www.yourdolphin.co.uk/productdetail.asp?id=1" target="_blank" rel="noopener noreferrer">YourDolphin - Supernova</a>
                  </td>
                  <td style={{ padding: '0.5rem' }}>Commercial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: '1.25rem' }}>
          <h2>Notes</h2>
          <ul>
            <li>This page lists representative screen readers; availability and licensing may change. Use the links above to reach the vendor or project page.</li>
            <li>If you face accessibility issues on this site, contact the web team via the Contact page.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

