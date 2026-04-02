# Take A Bough Tree Service — Website

## Overview
Business website for **Take A Bough Tree Service**, a tree care company based in Snohomish County, WA. 25+ years of experience. Serves 9 counties across the greater Puget Sound region (does NOT serve Seattle). Phone: (425) 501-4160. Email: quote@takeabough.com. Domain: takeabough.com.

## Structure
Pages use clean URLs (directory-based, no .html extensions):
- **index.html** — Homepage (`/`) — hero, trust badges, services overview, why choose us, safe work near structures feature, service area, testimonials, CTA
- **services/index.html** — Services (`/services/`) — detailed service pages (tree removal, trimming, stump grinding, emergency, land clearing, arborist)
- **about/index.html** — About (`/about/`) — company story, values, equipment (with truck photo), stats
- **employee/index.html** — Employee of the Month (`/employee/`) — currently: Snuggies the Cat, March 2026
- **contact/index.html** — Contact (`/contact/`) — contact form, business hours, service area map placeholder
- **css/styles.css** — All styles (variables, components, responsive)
- **js/main.js** — Mobile nav, sticky header, scroll animations, form validation, testimonial rotate, stats counter, review system (commented out)
- **images/** — Photos (job site photos, logos, favicon, Snuggies)
- **pictures/** — Raw source photos from job sites
- **logos/** — Original EPS vector logo files + extracted PNGs in images/
- **google-apps-script.js** — Reference file for Google Sheets review system setup
- **sitemap.xml** — Sitemap for Google indexing
- **robots.txt** — Search engine crawling rules

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
- HTTPS enforced
- CNAME file in repo root for custom domain
- Google Search Console set up, sitemap submitted

## Email
- Provider: Zoho Mail (free plan)
- Address: quote@takeabough.com
- MX, SPF, and DKIM records configured in Squarespace DNS

## Review System (not yet active)
- Customer review form (commented out in index.html testimonials section)
- Google Sheets backend via Google Apps Script (see google-apps-script.js for setup)
- Reviews require manual approval (set "Approved" column to "yes" in sheet)
- JS in main.js auto-loads approved reviews; falls back to hardcoded reviews if not configured
- To activate: create Google Sheet, deploy Apps Script, set REVIEWS_SCRIPT_URL in main.js, uncomment form in index.html

## Conventions
- All pages share identical header, footer, mobile call bar, and back-to-top button
- Interior pages use `.page-hero` (yellow background) for banner; homepage uses `.hero` (yellow gradient)
- CSS classes follow BEM-lite naming (e.g. `.service-card-body`, `.employee-stat-value`)
- Clean URLs via directory structure (e.g. `services/index.html` serves `/services/`)
- Internal links use `/` for home, `services/`, `about/`, etc. (no .html)
- Subpages use `../` relative paths for assets (css, js, images)
- Real photos used for service cards, about page, and employee page
- Take A Bough circle logo (lumberjack) used in nav and as favicon
- `animate-on-scroll` class triggers fade-in via IntersectionObserver

## Pending
- Contact form has no backend/submission endpoint
- Map placeholder on contact page (no embed yet)
- No analytics/GA tag integrated yet
- Review system needs Google Sheet setup to activate
