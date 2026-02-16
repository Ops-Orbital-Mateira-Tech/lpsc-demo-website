import React from 'react';

export default function AccessibilityStatement() {
  return (
    <main className="container" aria-labelledby="accessibility-heading">
      <h1 id="accessibility-heading">Accessibility Statement</h1>
      <p>
        This website aims to conform to WCAG 2.1 AA and GIGW 3.0 guidelines. If you encounter any
        accessibility barriers, please contact us at <a href="mailto:webmaster@lpsc.gov.in">webmaster@lpsc.gov.in</a>.
      </p>
      <h2>Standards</h2>
      <p>We follow WCAG 2.1 AA standards and continuously work to improve accessibility.</p>
      <h2>Feedback</h2>
      <p>
        Report issues or request content in alternative formats via email. We aim to respond within 5 business days.
      </p>
    </main>
  );
}

