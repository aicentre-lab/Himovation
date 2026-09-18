# HIMOVATION 2026 — festival website

Single-page site for **HIMOVATION 2026**, the national technical festival of the Department of Computer Science & Engineering, School of Science & Technology (SST), Swami Rama Himalayan University (SRHU), Dehradun. 27–28 November 2026.

Plain static files, no build step. Tailwind and Google Fonts load from CDNs.

| File | What it is |
|---|---|
| `index.html` | Home page (hero, about, events grid, prizes, schedule, FAQ, contact) |
| `hackathon.html`, `robo-war.html`, `e-sports.html`, `exhibition.html` | One page per flagship event: rules, timeline, prizes, downloads, coordinators. Rendered from `CONFIG.events` |
| `assets/config.js` | **All editable content** (`CONFIG`), including each event's page data |
| `assets/site.js` | Rendering and behaviour shared by every page |
| `assets/site.css`, `assets/tailwind-config.js` | Styles and design tokens |
| `assets/downloads/` | Files offered for download (Solve-a-Thon problem statement template) |
| `assets/` | Logos, favicon, share image |

## Run it

- Double-click `index.html`, or
- serve the folder: `python3 -m http.server 8080` and open <http://localhost:8080/>

## Edit content

Open `assets/config.js`. Every editable value is there:

| What | Where in `CONFIG` |
|---|---|
| Registration link per event | `events[].registrationLink` (empty shows "Registration opens soon") |
| Where the general Register buttons go | `REGISTRATION_LINK` (top of the file): `#register` for the per-event list, or one portal URL |
| Dates, countdown target, tentative flag, deadline | `dates` |
| Venue, map, travel distances | `venue` |
| Event formats, fees, team sizes, prizes | `events[]` |
| Event page content: rules, process steps, criteria (chips / steps / list / downloads / payment) | `events[].sections[]` |
| UPI payment: QR image, UPI ID, payee name, payment steps | `payment` (QR file `assets/upi-qr.png`); when each fee is due is `events[].fee.due` |
| Event page extras: dates line, downloads, coordinators | `events[].page` |
| Event page file name | `events[].href` (rename the HTML file to match) |
| Two-day schedule and parallel tracks | `schedule.days[].rows[]` (`tracks` uses keys from `tracks`) |
| Show or hide the schedule | `schedule.published`: `false` (current) shows a "Schedule coming soon" card on the home and event pages; set `true` once timings are final. The rows stay in `schedule.days` |
| FAQ, Why participate, About copy | `faq[]`, `why[]`, `about` |
| About SRHU and SST cards | `about.hosts.cards[]` (verify years and programme wording with the university) |
| Coordinators, email, phone, form topics | `contact` |
| Social links, footer lines | `social[]`, `footer` |

Text supports `**bold**` and `[link text](https://…)`. Raw HTML is escaped on purpose.

The `<title>`, meta description and Open Graph tags in each page's `<head>` are static (link previews do not run JavaScript), so update those by hand when dates or copy change.

To add a download to an event page, drop the file in `assets/downloads/` and list it under that event's `page.downloads`.

## Theme

The site is light by default. The sun/moon button in the navbar switches to the dark palette and remembers the choice in the browser. Both palettes are CSS custom properties at the top of the `<style>` block (`:root` for light, `:root[data-theme="dark"]` for dark). The registration band and the footer always use the dark palette (`class="theme-dark"`); remove that class to make them light too.

## Check your edits

Open the page with `#debug` in the URL (for example `index.html#debug`) and look at the browser console. `validateConfig()` warns about placeholder links, prize totals that don't add up, unknown track keys, invalid dates and a FAQ outside 8–10 items.

## Assets

- `assets/SRHU LOGO WITH NAAC A+.png` — the official logo file supplied by the department (blue mark, transparent background).
- `assets/srhu-logo-dark.png` — reverse version for **dark backgrounds**: blue swapped to white, white fills made transparent. Used in the footer, and in the navbar when the dark theme is on.
- `assets/srhu-logo-light.png` — trimmed original for **light backgrounds**. Used in the navbar (light theme), the favicon and the share image.
- `assets/og-cover.png` — 1200×630 share image for link previews.
- `assets/favicon-96.png`

Both variants are generated from the official file with ImageMagick; regenerate them if the department issues a new logo. Brand colour: Prussian Blue `#0D3668`.

## Source documents

`docs/` holds the department's festival proposal and participant guidelines the content was drawn from.
