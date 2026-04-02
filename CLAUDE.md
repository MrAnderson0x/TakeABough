# Take A Bough Tree Service — Website

## Overview
Business website for **Take A Bough Tree Service**, a tree care company based in Snohomish County, WA. Serves 9 counties across the greater Puget Sound region. Phone: (425) 501-4160.

## Structure
- **index.html** — Homepage (hero, trust badges, services overview, why choose us, service area, testimonials, CTA)
- **services.html** — Detailed service pages (tree removal, trimming, stump grinding, emergency, land clearing, arborist)
- **about.html** — Company story, values, equipment
- **employee.html** — Employee of the Month (currently: Snuggies the Cat, March 2026)
- **contact.html** — Contact form, business hours, service area map placeholder
- **css/styles.css** — All styles (variables, components, responsive)
- **js/main.js** — Mobile nav, sticky header, scroll animations, form validation, testimonial rotate, stats counter
- **images/** — Image assets (currently empty, awaiting photos)

## Tech Stack
- Static HTML/CSS/JS, no frameworks or build tools
- CSS custom properties for theming (--green-dark, --gold, etc.)
- Georgia serif for headings, system sans-serif for body
- IntersectionObserver for scroll animations
- No backend — contact form is client-side only (no submission endpoint yet)

## Conventions
- All pages share identical header, footer, mobile call bar, and back-to-top button
- Interior pages use `.page-hero` for banner; homepage uses `.hero`
- CSS classes follow BEM-lite naming (e.g. `.service-card-body`, `.employee-stat-value`)
- Emoji used as icon placeholders until real images/SVGs are added
- `animate-on-scroll` class triggers fade-in via IntersectionObserver

## Pending
- No git repo initialized
- Images folder empty — photos incoming
- No favicon
- Contact form has no backend/submission endpoint
- Map placeholder on contact page (no embed yet)
- No analytics/GA tag integrated yet
