# HIMOVATION 2026 — festival website

Single-page site for **HIMOVATION 2026**, the national technical festival of the Department of Computer Science & Engineering, School of Science & Technology (SST), Swami Rama Himalayan University (SRHU), Dehradun. 27–28 November 2026.

Everything lives in one file: [`index.html`](index.html). No build step. Tailwind and Google Fonts load from CDNs; the SRHU logo loads from `assets/`.

## Run it

- Double-click `index.html`, or
- serve the folder: `python3 -m http.server 8080` and open <http://localhost:8080/>

## Edit content

Open `index.html` and find the block between `CONFIG-START` and `CONFIG-END` near the top of the `<script>`. Every editable value is there:

| What | Where in `CONFIG` |
|---|---|
| Registration form / portal URL | `REGISTRATION_LINK` (top of the block) |
| Dates, countdown target, tentative flag, deadline | `dates` |
| Venue, map, travel distances | `venue` |
| Event formats, fees, team sizes, prizes, rules, evaluation criteria | `events[]` (modal text comes from `sections[]`) |
| Two-day schedule and parallel tracks | `schedule.days[].rows[]` (`tracks` uses keys from `tracks`) |
| FAQ, Why participate, About copy | `faq[]`, `why[]`, `about` |
| Sponsor tiers and logos | `sponsors.tiers[].sponsors[]` → `{ name, logo: "assets/sponsors/x.png", url }` |
| Coordinators, email, phone, form topics | `contact` |
| Social links, footer lines | `social[]`, `footer` |

Text supports `**bold**` and `[link text](https://…)`. Raw HTML is escaped on purpose.

The `<title>`, meta description and Open Graph tags in `<head>` are static (link previews do not run JavaScript), so update those by hand when dates or copy change.

## Check your edits

Open the page with `#debug` in the URL (for example `index.html#debug`) and look at the browser console. `validateConfig()` warns about placeholder links, prize totals that don't add up, unknown track keys, invalid dates and a FAQ outside 8–10 items.

## Assets

- `assets/srhu-logo.png` — white SRHU brand mark on a transparent background (navbar and footer). Replace with an official PNG/SVG of the same mark if one is supplied; keep it unstretched and uncropped.
- `assets/srhu-logo-plate.png` — official reverse mark on the Prussian Blue plate (for use on light or photographic backgrounds).
- `assets/srhu-logo-light.png` — blue mark on white (favicon source, print).
- `assets/favicon-96.png`

Both logo versions were extracted from the SRHU brand guidelines deck (May 2025). Brand colour: Prussian Blue `#0D3668`.

## Source documents

`docs/` holds the department's festival proposal and participant guidelines the content was drawn from.
