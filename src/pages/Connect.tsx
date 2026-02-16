import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function Connect() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [status, setStatus] = useState<'idle'|'submitted'>('idle');
  const { announce } = useAccessibility();

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    // Placeholder: in production submit to backend endpoint.
    setStatus('submitted');
    announce && announce('Your message has been submitted. Thank you.');
  };

  return (
    <main className="container" aria-labelledby="connect-heading">
      <h1 id="connect-heading">Connect</h1>
      <p>Contact information and links (placeholder).</p>

      {status === 'submitted' ? (
        <div role="status" aria-live="polite">Thank you — your message has been received.</div>
      ) : (
        <form onSubmit={onSubmit} noValidate aria-describedby="form-errors">
          <div id="form-errors" aria-live="assertive">
            {Object.keys(errors).length > 0 && (
              <ul>
                {Object.entries(errors).map(([k, v]) => (
                  <li key={k}>{v}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required aria-invalid={!!errors.email} />
          </div>

          <div className="form-row">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </div>

          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required aria-invalid={!!errors.message} />
          </div>

          <div className="form-row">
            <button type="submit">Send Message</button>
          </div>
        </form>
      )}
    </main>
  );
}

