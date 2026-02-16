# DBIM & GIGW React TypeScript Starter

This project is a Vite + React + TypeScript starter implementing the homepage template you provided and following DBIM / GIGW guidelines for accessibility and structure.

## How to run

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

## What I implemented

- Vite + React + TypeScript scaffold
- Homepage layout with Header, Hero carousel, Announcements ticker, Key Offerings tabs, Recent Documents, Social Media grid, Footer
- Design tokens in `src/styles/tokens.css` and global styles in `src/styles/global.css`
- Basic accessibility: skip link, ARIA roles, focus styles, keyboard-focusable tabs
- Public folder with `manifest.json`, `robots.txt`, and `sitemap.xml` placeholders

## Notes on GIGW / DBIM compliance

- Colors and typography are stored as tokens for easy tuning to official DBIM values.
- Key accessibility features implemented; further audit recommended (automated tools + manual testing) to reach full GIGW 3.0 compliance.

## Content snapshot

- Source: https://www.lpsc.gov.in/ (Liquid Propulsion Systems Centre homepage)
- Snapshot date: 2026-02-15
- Notes: This is a one-time snapshot of the LPSC homepage (hero text, latest events, press release snippets, and footer links). All content remains the property of the original site; this repo contains a copy for prototyping and testing only.

