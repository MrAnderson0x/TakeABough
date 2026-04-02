# Take A Bough Tree Service — Website

## Overview
Business website for **Take A Bough Tree Service**, a tree care company based in Snohomish County, WA. 25+ years of experience. Serves 9 counties across the greater Puget Sound region (does NOT serve Seattle). Phone: (425) 501-4160. Email: quote@takeabough.com. Domain: takeabough.com.

## Structure
- **index.html** — Homepage (hero, trust badges, services overview, why choose us, safe work near structures feature, service area, testimonials, CTA)
- **services.html** — Detailed service pages (tree removal, trimming, stump grinding, emergency, land clearing, arborist)
- **about.html** — Company story, values, equipment (with truck photo), stats
- **employee.html** — Employee of the Month (currently: Snuggies the Cat, March 2026)
- **contact.html** — Contact form, business hours, service area map placeholder
- **css/styles.css** — All styles (variables, components, responsive)
- **js/main.js** — Mobile nav, sticky header, scroll animations, form validation, testimonial rotate, stats counter
- **images/** — Photos (job site photos, logos, favicon, Snuggies)
- **pictures/** — Raw source photos from job sites
- **logos/** — Original EPS vector logo files + extracted PNGs in images/

## Tech Stack
- Static HTML/CSS/JS, no frameworks or build tools
- CSS custom properties for theming (yellow-forward: --yellow, --gold, --green-dark, etc.)
- Georgia serif for headings, system sans-serif for body
- IntersectionObserver for scroll animations
- No backend — contact form is client-side only (no submission endpoint yet)

## Hosting & Deployment
- GitHub repo: MrAnderson0x/TakeABough (public)
- Deployed via GitHub Pages on `yellow-theme` branch
- Custom domain: takeabough.com (registered on Squarespace, DNS pointed to GitHub Pages)
- CNAME file in repo root for custom domain

## Email
- Provider: Zoho Mail (free plan)
- Address: quote@takeabough.com
- MX, SPF, and DKIM records configured in Squarespace DNS

## Conventions
- All pages share identical header, footer, mobile call bar, and back-to-top button
- Interior pages use `.page-hero` (yellow background) for banner; homepage uses `.hero` (yellow gradient)
- CSS classes follow BEM-lite naming (e.g. `.service-card-body`, `.employee-stat-value`)
- Real photos used for service cards, about page, and employee page
- Take A Bough circle logo (lumberjack) used in nav and as favicon
- `animate-on-scroll` class triggers fade-in via IntersectionObserver

## Pending
- Contact form has no backend/submission endpoint
- Map placeholder on contact page (no embed yet)
- No analytics/GA tag integrated yet
- HTTPS enforcement on GitHub Pages (after DNS propagation)
