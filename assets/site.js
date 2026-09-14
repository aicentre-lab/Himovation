/* HIMOVATION 2026 — shared site script: utilities, renderers, behaviours. Requires assets/config.js loaded first. */

/* ============================ UTILITIES ================================= */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
class Raw { constructor(s) { this.s = s; } toString() { return this.s; } }
const raw = s => new Raw(s);
const part = v => v instanceof Raw ? v.s : Array.isArray(v) ? v.map(part).join('') : (v === null || v === undefined || v === false) ? '' : esc(v);
const html = (strings, ...vals) => raw(strings.reduce((out, str, i) => out + part(vals[i - 1]) + str));
const md = s => raw(esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>'));
const fmtINR = n => '₹' + Number(n).toLocaleString('en-IN');
const isUrl = h => /^https?:/i.test(h || '');
const generalRegisterHref = () => isUrl(CONFIG.REGISTRATION_LINK) ? CONFIG.REGISTRATION_LINK : (typeof homeHref === 'function' ? homeHref('register') : '#register');
const eventRegLink = ev => ev.registrationLink || (isUrl(CONFIG.REGISTRATION_LINK) ? CONFIG.REGISTRATION_LINK : '');
const resolveHref = h => h === 'REGISTRATION_LINK' ? generalRegisterHref() : h;
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const render = (sel, content) => { const el = $(sel); if (el) el.innerHTML = part(content); return el; };
const teamSizeText = t => t.min === t.max ? `${t.min} ${t.unit}` : `${t.min}–${t.max} ${t.unit}`;
const feeText = f => f.amount === 0 ? 'Free' : `${fmtINR(f.amount)} / ${f.per}`;
const trackOf = key => CONFIG.tracks[key] || CONFIG.tracks.common;
const MEDALS = ['#F5A524', '#9CA3AF', '#C2743E'];   // gold, silver, bronze
const medal = rank => html`<span class="podium-medal" style="--medal:${MEDALS[rank] || MEDALS[2]}" aria-hidden="true">${icon('trophy')}</span>`;
const PAGE = document.body.dataset.page || 'home';
const IS_HOME = PAGE === 'home';
const homeHref = id => (IS_HOME ? '' : 'index.html') + '#' + id;
const SPRITE = "<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\" focusable=\"false\">\n    <symbol id=\"ridge\" viewBox=\"0 0 1440 120\" preserveAspectRatio=\"none\">\n      <path d=\"M0 70 L100 56 L200 64 L300 36 L400 50 L500 22 L600 44 L700 14 L800 38 L900 20 L1000 46 L1100 28 L1200 52 L1300 34 L1400 58 L1440 50\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" vector-effect=\"non-scaling-stroke\" opacity=\".45\"/>\n      <path d=\"M0 96 L80 78 L160 88 L240 60 L320 72 L400 44 L480 66 L560 38 L640 58 L720 30 L800 54 L880 40 L960 64 L1040 46 L1120 70 L1200 52 L1280 80 L1360 66 L1440 84\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" vector-effect=\"non-scaling-stroke\"/>\n      <path d=\"M0 108 L120 98 L240 104 L360 86 L480 96 L600 78 L720 90 L840 72 L960 88 L1080 76 L1200 94 L1320 84 L1440 100\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" vector-effect=\"non-scaling-stroke\" opacity=\".7\"/>\n    </symbol>\n    <pattern id=\"contours\" patternUnits=\"userSpaceOnUse\" width=\"360\" height=\"360\">\n      <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" transform=\"rotate(-8 180 180)\">\n        <ellipse cx=\"180\" cy=\"180\" rx=\"40\" ry=\"26\" opacity=\".9\"/>\n        <ellipse cx=\"184\" cy=\"178\" rx=\"70\" ry=\"48\" opacity=\".7\"/>\n        <ellipse cx=\"176\" cy=\"184\" rx=\"100\" ry=\"72\" opacity=\".55\"/>\n        <ellipse cx=\"182\" cy=\"180\" rx=\"132\" ry=\"98\" opacity=\".4\"/>\n        <ellipse cx=\"178\" cy=\"182\" rx=\"164\" ry=\"126\" opacity=\".25\"/>\n      </g>\n    </pattern>\n  </svg>";

const ICONS = {
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  robot: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8V4M8 4h8"/><circle cx="9" cy="14" r="1.2"/><circle cx="15" cy="14" r="1.2"/><path d="M3 13H1M23 13h-2M9 18h6"/>',
  gamepad: '<path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.6l-.9 8.5A2.6 2.6 0 0 0 6.3 19l2.4-3h6.6l2.4 3a2.6 2.6 0 0 0 4.5-1.9l-.9-8.5A4 4 0 0 0 17.32 5Z"/>',
  flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"/><path d="M7 15h10"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8Z"/><circle cx="7" cy="7" r="1.5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  external: '<path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  youtube: '<path d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.5 4.6 12 4.6 12 4.6s-6.5 0-8.4.5A3 3 0 0 0 1.5 7.2 31 31 0 0 0 1 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23 12a31 31 0 0 0-.5-4.8z"/><path d="m10 15 5-3-5-3z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 0z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.9 12.9 0 0 1 22 2c0 2.7-.9 7.6-6 11a22 22 0 0 1-4 2z"/><path d="M9 12H4s.5-3 2-4 4-1 4-1M15 15v5s3-.5 4-2 1-4 1-4"/>',
  school: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  train: '<rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3"/><circle cx="8.5" cy="15.5" r="1"/><circle cx="15.5" cy="15.5" r="1"/>',
  bus: '<path d="M8 6v6M15 6v6M2 12h19.6M4 18V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12M4 18h16"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  sparkle: '<path d="m12 3 1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
};
const icon = (name, cls = '') => raw(`<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.sparkle}</svg>`);

/* ============================ RENDERERS ================================= */
function renderHead(id) {
  const s = CONFIG.sections[id]; if (!s) return;
  render(`[data-head="${id}"]`, html`
    <p class="eyebrow reveal">${s.eyebrow}</p>
    <h2 id="${id}-title" class="h2 mt-3 reveal" style="--i:1">${s.heading}</h2>
    ${s.intro ? html`<p class="prose-muted mt-5 text-base md:text-lg reveal" style="--i:2">${md(s.intro)}</p>` : ''}`);}

function renderHeader() {
  const site = CONFIG.site, o = site.organizer;
  render('#site-header', html`
    <nav class="nav-inner" aria-label="Primary">
      <a href="${IS_HOME ? '#hero' : 'index.html'}" class="flex items-center gap-3" aria-label="HIMOVATION 2026 home">
        <span class="logo-plate">
          <img src="${site.logo.srcLight || site.logo.src}" data-theme-logo alt="${site.logo.alt}" width="352" height="333" decoding="async">
        </span>
        <span class="brand-divider" aria-hidden="true"></span>
        <span class="site-brand-text" id="site-wordmark">
          <span class="site-brand-title">${site.name}</span>
          <span class="site-brand-sub">${o.school} · SRHU</span>
        </span>
      </a>
      <ul class="nav-list">${CONFIG.nav.map(n => html`<li><a class="nav-link" href="${homeHref(n.id)}" data-nav="${n.id}">${n.label}</a></li>`)}</ul>
      <div class="nav-actions">
        <a class="btn btn-primary btn-sm" id="nav-register-btn" data-register><span class="btn-inner">Register</span></a>
        <button id="menu-btn" class="hamburger lg:hidden" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>
      </div>
    </nav>
    <div id="mobile-menu" hidden>
      <nav class="menu-nav" aria-label="Mobile">
        <ul>${CONFIG.nav.map(n => html`<li><a class="menu-link" href="${homeHref(n.id)}" data-nav="${n.id}">${n.label}</a></li>`)}</ul>
        <p class="menu-eyebrow">Event pages</p>
        <ul class="menu-events">${CONFIG.events.map(e => html`<li><a class="chip chip-solid w-full" href="${e.href}"><span class="dot"></span>${trackOf(e.track).label}</a></li>`)}</ul>
        <div class="menu-actions">
          <a class="btn btn-primary btn-block" data-register><span class="btn-inner">Register now</span></a>
          <p class="text-center text-xs text-muted mt-2">${CONFIG.dates.display} · ${CONFIG.venue.short}</p>
        </div>
      </nav>
    </div>`);
  const wb = $('#site-wordmark'); if (wb) wb.style.display = 'flex';
  const rb = $('#nav-register-btn'); if (rb) rb.style.display = 'inline-flex';
}

function applyRegisterLinks() {
  $$('[data-register]').forEach(a => {
    a.href = generalRegisterHref();
    if (isUrl(a.getAttribute('href'))) { a.target = '_blank'; a.rel = 'noopener'; }
  });
}

const countdownMarkup = (compact = false) => html`
  <div data-countdown role="timer" aria-label="Countdown to HIMOVATION 2026">
    <div class="countdown" style="${compact ? 'max-width:22rem;margin:0 auto' : 'max-width:22rem'}" data-cd-tiles aria-hidden="true">
      <div class="cd-tile"><span class="cd-num" data-cd="d">00</span><span class="cd-label">Days</span></div>
      <div class="cd-sep" aria-hidden="true">:</div>
      <div class="cd-tile"><span class="cd-num" data-cd="h">00</span><span class="cd-label">Hours</span></div>
      <div class="cd-sep" aria-hidden="true">:</div>
      <div class="cd-tile"><span class="cd-num" data-cd="m">00</span><span class="cd-label">Minutes</span></div>
      <div class="cd-sep" aria-hidden="true">:</div>
      <div class="cd-tile"><span class="cd-num" data-cd="s">00</span><span class="cd-label">Seconds</span></div>
    </div>
    <div data-cd-state hidden></div>
  </div>`;

function ctaMarkup(c, extra = '') {
  const href = resolveHref(c.href);
  const ext = c.external && /^https?:/i.test(href);
  return html`<a class="btn ${c.style === 'primary' ? 'btn-primary' : 'btn-ghost'} ${extra}" href="${href}" ${ext ? raw('target="_blank" rel="noopener"') : ''} data-magnetic>
    <span class="btn-inner">${c.label}${icon(c.style === 'primary' ? 'arrow' : 'chevron')}</span>${ext ? html`<span class="sr-only"> (opens in new tab)</span>` : ''}</a>`;
}

const EVENT_PHOTOS = {
  hackathon: 'assets/event-hackathon.jpg',
  robowar: 'assets/event-robowar.jpg',
  esports: 'assets/event-esports.jpg',
  exhibition: 'assets/event-exhibition.jpg',
};

function renderHero() {
  const s = CONFIG.site, d = CONFIG.dates, o = s.organizer, total = CONFIG.events.reduce((a, e) => a + e.prizePool, 0);
  render('[data-render="hero"]', html`
    <div class="hero-editorial">
      <div class="hero-header-meta reveal">
        <span class="hero-institution">${o.dept} · ${o.school} · ${o.university}</span>
        <span class="hero-dates-tag">${d.display}</span>
      </div>

      <div class="hero-layout-grid">
        <div class="hero-left-col">
          <div class="hero-headline-block reveal" style="--i:1">
            <h1 class="hero-main-title">HIMOVATION <span class="hero-edition">${s.edition}</span></h1>
            <p class="hero-serif-tagline">${s.tagline}</p>
          </div>

          <p class="hero-intro-lead reveal" style="--i:2">${md(CONFIG.about.paragraphs[0])}</p>
          
          <ul class="hero-chips reveal" style="--i:3" aria-label="Key details">
            <li class="chip">${icon('calendar')} ${d.display}</li>
            <li class="chip">${icon('pin')} ${CONFIG.venue.short}</li>
            <li class="chip chip-blue">${icon('trophy')} ${fmtINR(total)}+ prize pool</li>
            <li class="chip">${icon('code')} 4 Parallel Tracks</li>
          </ul>

          <div class="hero-countdown-box reveal" style="--i:4">
            <p class="countdown-caption" data-cd-caption>Inauguration begins in</p>
            ${countdownMarkup(false)}
          </div>

          <div class="hero-ctas reveal" style="--i:5">
            ${CONFIG.hero.ctas.map(c => ctaMarkup(c))}
          </div>
        </div>

        <div class="hero-right-col reveal" style="--i:6">
          <div class="hero-location-badge">
            ${icon('pin')}
            <div>
              <p class="hero-location-name">${CONFIG.venue.name}</p>
              <p class="hero-location-sub">${CONFIG.venue.short}</p>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" class="scroll-hint reveal" style="--i:7" aria-label="Scroll to about section">Scroll down <span class="scroll-cue" aria-hidden="true"></span></a>
    </div>`);
}

function renderMarquee() {
  const items = [
    ...CONFIG.events.map(e => ({ label: trackOf(e.track).label + ' — ' + e.name, color: trackOf(e.track).color })),
    { label: '27–28 November 2026', color: 'var(--accent-blue)' },
    { label: 'SRHU · Jolly Grant · Dehradun', color: 'var(--accent-blue)' },
    { label: fmtINR(CONFIG.events.reduce((a, e) => a + e.prizePool, 0)) + '+ in prizes', color: 'var(--accent-blue)' },
    ...CONFIG.events.map(e => ({ label: e.capacity, color: trackOf(e.track).color })),
  ];
  const set = [...items, ...items];
  const container = $('[data-render="marquee"]');
  if (!container) return;
  container.innerHTML = `<div class="marquee-wrap" aria-hidden="true"><div class="marquee-track">` +
    set.map(it => `<span class="marquee-item"><span class="dot"></span>${it.label}</span>`).join('') +
    `</div></div>`;
}

function renderAbout() {
  renderHead('about');
  renderHosts();
  render('[data-render="about"]', CONFIG.about.paragraphs.map((p, i) => html`<p class="prose-muted text-base md:text-lg${i ? ' mt-5' : ''} reveal" style="--i:${i + 2}">${md(p)}</p>`));
  const o = CONFIG.site.organizer;
  render('[data-render="glance"]', html`
    <div class="fact-box reveal lg:mt-2" style="--i:2">
      <p class="eyebrow">At a glance</p>
      <dl class="fact-list">
        ${CONFIG.about.glance.map(g => html`<div class="fact"><dt>${g.label}</dt><dd>${g.value}</dd></div>`)}
      </dl>
      <div class="mt-7 border-t pt-5 text-sm text-muted">
        <p class="font-medium text-ink">${o.dept}</p>
        <p>${o.school}, ${o.university}</p>
        <p>${o.city}</p>
      </div>
    </div>`);
}

function renderHosts() {
  const h = CONFIG.about.hosts; if (!h) return;
  render('[data-render="hosts"]', html`
    <div class="hosts-container">
      <p class="eyebrow reveal">${h.eyebrow}</p>
      <h3 class="h2 mt-2 max-w-3xl reveal" style="--i:1;font-size:clamp(1.6rem,3vw,2.4rem)">${h.heading}</h3>
      <div class="hosts-grid">
        ${h.cards.map((c, i) => html`
        <article class="host-card reveal" style="--i:${i + 2}" aria-labelledby="host-${c.id}">
          ${c.showLogo ? html`<span class="logo-plate mb-5"><img src="${CONFIG.site.logo.srcLight || CONFIG.site.logo.src}" alt="${CONFIG.site.logo.alt}" loading="lazy" decoding="async"></span>` : ''}
          <p class="eyebrow">${c.eyebrow}</p>
          <h4 id="host-${c.id}" class="host-card-title">${c.title}</h4>
          <div class="prose-muted flex flex-col gap-3 text-sm">${c.paragraphs.map(t => html`<p>${md(t)}</p>`)}</div>
          <ul class="mt-6 flex flex-wrap gap-2" aria-label="Key facts">${c.facts.map(f => html`<li class="chip chip-solid">${f}</li>`)}</ul>
          ${c.link ? html`<p class="mt-auto pt-6"><a class="btn btn-ghost btn-sm" href="${c.link.href}" target="_blank" rel="noopener"><span class="btn-inner">${c.link.label} ${icon('external')}</span></a></p>` : ''}
        </article>`)}
      </div>
    </div>`);
}

function renderStats() {
  render('[data-render="stats"]', CONFIG.stats.map((s, i) => {
    const final = `${s.prefix || ''}${Number(s.value).toLocaleString('en-IN', { minimumFractionDigits: s.decimals || 0, maximumFractionDigits: s.decimals || 0 })}${s.suffix || ''}`;
    return html`<li class="stat-cell reveal" style="--i:${i}">
      <span class="sr-only">${final}</span>
      <span class="stat-num num" aria-hidden="true" data-counter data-value="${s.value}" data-decimals="${s.decimals || 0}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix || ''}">${s.prefix || ''}0${s.suffix || ''}</span>
      <span class="stat-label">${s.label}</span></li>`; }));
}

const factItems = ev => ({
  teamSize: ['Team size', teamSizeText(ev.teamSize)],
  fee:      ['Entry fee', feeText(ev.fee)],
  prizePool:['Prize pool', fmtINR(ev.prizePool)],
  capacity: ['Capacity', ev.capacity],
});

function renderEvents() {
  renderHead('events');
  const flagships = CONFIG.events.filter(e => e.id !== 'exhibition');
  const exhibition = CONFIG.events.find(e => e.id === 'exhibition');

  render('[data-render="events"]', html`
    <div class="flagship-events-grid">
      ${flagships.map((ev, i) => {
        const t = trackOf(ev.track), facts = factItems(ev), photo = EVENT_PHOTOS[ev.id] || 'assets/event-hackathon.jpg';
        return html`
        <article class="event-card reveal" style="--i:${i}">
          <div class="event-card-media">
            <img src="${photo}" alt="${ev.name}" class="event-card-img" loading="lazy" decoding="async">
            <span class="event-card-track-badge">${t.label}</span>
          </div>
          <div class="event-card-body">
            <h3 class="event-card-title">${ev.name}</h3>
            <p class="event-card-sub">${ev.subtitle}</p>
            <p class="event-card-blurb">${ev.blurb}</p>
            <div class="event-card-facts">
              <div class="event-fact-item">
                <span class="event-fact-label">Team size</span>
                <span class="event-fact-val">${teamSizeText(ev.teamSize)}</span>
              </div>
              <div class="event-fact-item">
                <span class="event-fact-label">Entry fee</span>
                <span class="event-fact-val">${feeText(ev.fee)}</span>
              </div>
              <div class="event-fact-item">
                <span class="event-fact-label">Prize pool</span>
                <span class="event-fact-val">${fmtINR(ev.prizePool)}</span>
              </div>
            </div>
            <div class="event-card-action">
              <a class="btn btn-ghost btn-sm" href="${ev.href}"><span class="btn-inner">View event details ${icon('arrow')}</span></a>
              ${eventRegLink(ev) ? html`<a class="btn btn-primary btn-sm" href="${eventRegLink(ev)}" target="_blank" rel="noopener"><span class="btn-inner">Register ${icon('external')}</span></a>` : ''}
            </div>
          </div>
        </article>`;
      })}
    </div>

    ${exhibition ? html`
    <article class="exhibition-spotlight-card reveal" style="--i:4">
      <div class="exhibition-card-media">
        <img src="${EVENT_PHOTOS.exhibition}" alt="${exhibition.name}" class="exhibition-card-img" loading="lazy" decoding="async">
      </div>
      <div class="exhibition-card-body">
        <div class="flex items-center gap-2 mb-2">
          <span class="badge"><i></i>${trackOf(exhibition.track).label}</span>
          <span class="chip" style="background:#ECFDF5;color:#047857;border-color:#A7F3D0">Free Entry</span>
        </div>
        <h3 class="h3">${exhibition.name}</h3>
        <p class="text-sm text-accent font-medium mt-1">${exhibition.subtitle}</p>
        <p class="prose-muted mt-3 text-sm">${exhibition.blurb}</p>
        <div class="event-card-facts mt-4 mb-4">
          <div class="event-fact-item">
            <span class="event-fact-label">Eligibility</span>
            <span class="event-fact-val">Classes 8–12</span>
          </div>
          <div class="event-fact-item">
            <span class="event-fact-label">Entry fee</span>
            <span class="event-fact-val">Free</span>
          </div>
          <div class="event-fact-item">
            <span class="event-fact-label">Prize pool</span>
            <span class="event-fact-val">${fmtINR(exhibition.prizePool)}</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <a class="btn btn-ghost btn-sm" href="${exhibition.href}"><span class="btn-inner">Exhibition details ${icon('arrow')}</span></a>
          ${eventRegLink(exhibition) ? html`<a class="btn btn-primary btn-sm" href="${eventRegLink(exhibition)}" target="_blank" rel="noopener"><span class="btn-inner">Register school team ${icon('external')}</span></a>` : ''}
        </div>
      </div>
    </article>` : ''}
  `);

  render('[data-render="general-rules"]', html`
    <div class="rules-card reveal">
      <div class="flex items-center gap-3">
        <span class="icon-tile">${icon('shield')}</span>
        <div>
          <h3 class="h3 text-xl">For every participant</h3>
          <p class="text-xs text-muted mt-1">Official guidelines and code of conduct applicable across all festival arenas</p>
        </div>
      </div>
      <ul class="rules-list">
        ${CONFIG.generalRules.map(r => html`<li>${icon('check')}<span>${r}</span></li>`)}
      </ul>
      <p class="mt-6 text-xs text-muted border-t pt-4">The Organising Committee may revise rules, schedules, formats, game titles and weight categories before the event. Final rulebooks are issued through the official registration channels.</p>
    </div>`);
}

function renderPrizes() {
  renderHead('prizes');
  const total = CONFIG.events.reduce((a, e) => a + e.prizePool, 0);
  const specials = CONFIG.events.flatMap(e => e.specialAwards);
  render('[data-render="prize-total"]', html`
    <div class="fact-box flex items-center gap-5 px-6 py-4 reveal" style="--i:2">
      <span class="icon-tile">${icon('trophy')}</span>
      <div>
        <p class="text-xs uppercase text-muted" style="letter-spacing:.16em">Combined prize pool</p>
        <p class="num text-2xl md:text-3xl font-bold text-ink mt-1">${fmtINR(total)}<span class="text-accent">+</span></p>
        ${specials.length ? html`<p class="mt-1 text-xs text-muted">plus ${specials.join(', ')}</p>` : ''}
      </div>
    </div>`);

  render('[data-render="prizes"]', html`
    <div class="prizes-grid">
      ${CONFIG.events.map((ev, i) => {
        const t = trackOf(ev.track);
        return html`
        <article class="prize-card reveal" style="--i:${i}" aria-labelledby="pz-${ev.id}">
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="badge"><i></i>${t.label}</span>
              <h3 id="pz-${ev.id}" class="h3 text-xl mt-2">${ev.name}</h3>
            </div>
            <div class="text-right">
              <span class="text-xs uppercase text-muted" style="letter-spacing:.08em">Prize Pool</span>
              <p class="num text-xl font-bold text-accent">${fmtINR(ev.prizePool)}</p>
            </div>
          </div>
          <div class="prize-breakdown-row">
            ${ev.prizes.map((p, pi) => html`
              <div class="prize-tier">
                <span class="prize-tier-rank">${p.place} prize</span>
                <p class="num prize-tier-amount">${fmtINR(p.amount)}</p>
              </div>`)}
          </div>
          <div class="flex flex-wrap items-center gap-2 border-t pt-4 mt-5 text-xs text-muted">
            <span>Certificates of Achievement for all winners</span>
            ${ev.specialAwards.map(a => html`<span class="chip chip-blue">${icon('award')}${a}</span>`)}
          </div>
        </article>`;
      })}
    </div>`);
}

function renderSchedule() {
  renderHead('schedule');
  const days = CONFIG.schedule.days;
  render('[data-render="schedule"]', html`
    <div class="schedule-controls reveal">
      <div class="tablist" role="tablist" aria-label="Festival days">
        ${days.map((d, i) => html`<button class="tab" role="tab" type="button" id="tab-${d.id}" aria-controls="panel-${d.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span>${d.label}</span><small>${d.date}</small></button>`)}
      </div>
      <div class="flex flex-wrap items-center gap-2" role="group" aria-label="${CONFIG.schedule.legendNote}">
        <span class="text-xs uppercase text-muted" style="letter-spacing:.12em">${CONFIG.schedule.legendNote}:</span>
        <button class="legend-btn" type="button" data-filter="" aria-pressed="true">All</button>
        ${Object.entries(CONFIG.tracks).filter(([k]) => k !== 'common').map(([k, t]) => html`<button class="legend-btn" type="button" data-filter="${k}" aria-pressed="false">${t.label}</button>`)}
      </div>
    </div>
    ${days.map((d, di) => html`
    <div class="mt-6" role="tabpanel" id="panel-${d.id}" aria-labelledby="tab-${d.id}" tabindex="0" ${di ? raw('hidden') : ''}>
      <ol class="tl">
        ${d.rows.map((r, i) => {
          const parallel = i > 0 && d.rows[i - 1].time === r.time;
          return html`
          <li class="tl-row reveal" data-tracks="${r.tracks.join(' ')}" style="--i:${Math.min(i, 5)}">
            <div class="flex items-center gap-3">
              <span class="tl-time">${r.time}</span>
              ${parallel ? html`<span class="chip text-xs" style="padding:0.15rem 0.4rem;font-size:0.65rem">Parallel</span>` : ''}
            </div>
            <div class="tl-details">
              <h4 class="tl-title">${r.title}</h4>
              ${r.note ? html`<p class="tl-note">${r.note}</p>` : ''}
            </div>
            <div class="flex flex-wrap gap-2">
              ${r.tracks.map(k => html`<span class="badge"><i></i>${trackOf(k).label}</span>`)}
            </div>
          </li>`;
        })}
      </ol>
    </div>`)}`);
}

function renderWhy() {
  renderHead('why');
  render('[data-render="why"]', html`
    <ul class="why-grid">
      ${CONFIG.why.map((w, i) => html`
      <li class="why-card reveal" style="--i:${i}">
        <span class="why-icon">${icon(w.icon)}</span>
        <h3 class="why-title">${w.title}</h3>
        <p class="why-desc">${w.text}</p>
      </li>`)}
    </ul>`);
}

function renderFAQ() {
  renderHead('faq');
  render('[data-render="faq"]', html`
    <div class="faq-list">
      ${CONFIG.faq.map((f, i) => html`
      <div class="faq-item reveal" style="--i:${Math.min(i, 5)}">
        <h3>
          <button class="faq-btn" type="button" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}">
            <span>${f.q}</span>
            ${icon('chevron')}
          </button>
        </h3>
        <div class="faq-panel" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}" inert>
          <div>
            <div class="faq-panel-content prose-muted flex flex-col gap-3">
              ${(Array.isArray(f.a) ? f.a : [f.a]).map(p => html`<p>${md(p)}</p>`)}
            </div>
          </div>
        </div>
      </div>`)}
    </div>`);
}

function renderRegisterBand() {
  const s = CONFIG.sections.register, d = CONFIG.dates;
  const deadline = d.registrationDeadline ? new Date(d.registrationDeadline) : null;
  render('[data-render="register"]', html`
    <div class="wrap" style="text-align:center">
      <p class="eyebrow reveal">${s.eyebrow}</p>
      <h2 id="register-title" class="h2 mx-auto mt-2 max-w-3xl reveal" style="--i:1">${s.heading}</h2>
      <p class="prose-muted mx-auto mt-4 max-w-2xl reveal" style="--i:2">${md(s.intro)}</p>
      <div class="mt-8 reveal" style="--i:3">
        <p class="countdown-caption" data-cd-caption>Inauguration begins in</p>
        ${countdownMarkup(true)}
      </div>
      ${deadline && !isNaN(deadline) ? html`<p class="mt-4 reveal" style="--i:4"><span class="chip chip-blue">${icon('clock')} Registration closes ${deadline.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>` : ''}
      <ul class="reg-event-list reveal" style="--i:5" aria-label="Register per event">
        ${CONFIG.events.map(ev => {
          const t = trackOf(ev.track), link = eventRegLink(ev);
          return html`
          <li class="reg-event-row">
            <div>
              <span class="badge"><i></i>${t.label}</span>
              <p class="reg-event-title">${ev.name}</p>
              <p class="reg-event-meta">${feeText(ev.fee)} · ${teamSizeText(ev.teamSize)}</p>
            </div>
            ${link ? html`<a class="btn btn-primary btn-sm" href="${link}" target="_blank" rel="noopener"><span class="btn-inner">Register ${icon('external')}</span><span class="sr-only"> for ${t.label} (opens in new tab)</span></a>`
                   : html`<span class="chip" title="Registration for this event has not opened yet">${icon('clock')} Opens soon</span>`}
          </li>`;
        })}
      </ul>
      <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row reveal" style="--i:6">
        ${ctaMarkup({ label: 'Ask a question', href: '#contact', style: 'ghost' })}
      </div>
    </div>`);
}

function renderContact() {
  renderHead('contact');
  const c = CONFIG.contact, v = CONFIG.venue;
  render('[data-render="contact-info"]', html`
    <div class="coord-grid reveal">
      ${c.coordinators.map(k => html`
        <div class="coord-cell">
          <p class="text-xs uppercase text-muted" style="letter-spacing:.14em">${k.role}</p>
          <p class="mt-2 font-medium text-ink">${k.name}</p>
          ${k.phone ? html`<a class="link mt-1 block text-sm" href="tel:${k.phone.replace(/\s/g, '')}">${k.phone}</a>` : ''}
          ${k.email ? html`<a class="link mt-1 block text-sm" href="mailto:${k.email}">${k.email}</a>` : ''}
        </div>`)}
    </div>
    <ul class="mt-5 flex flex-col gap-3 text-sm reveal" style="--i:1;list-style:none">
      <li class="flex items-center gap-3"><span class="icon-tile">${icon('mail')}</span><div><p class="text-xs text-muted">Email</p><a class="link font-medium" href="mailto:${c.email}">${c.email}</a></div></li>
      <li class="flex items-center gap-3"><span class="icon-tile">${icon('phone')}</span><div><p class="text-xs text-muted">Helpline</p><a class="link font-medium" href="tel:${c.phone.replace(/[^\d+]/g, '')}">${c.phone}</a></div></li>
      <li class="flex items-start gap-3"><span class="icon-tile">${icon('pin')}</span><div><p class="text-xs text-muted">Venue</p><p class="font-medium">${v.name}, ${v.address}</p></div></li>
    </ul>
    <div class="mt-6 reveal" style="--i:2">
      <p class="eyebrow">Getting here</p>
      <ul class="travel-grid">
        ${v.travel.map(t => html`
          <li class="travel-card">
            <div class="flex items-center gap-1 text-accent">${icon(t.icon, 'h-3 w-3')}<span class="text-xs uppercase text-muted" style="letter-spacing:.1em">${t.mode}</span></div>
            <p class="mt-1 text-xs font-medium text-ink">${t.name}</p>
            <p class="num text-xs text-muted">≈ ${t.distanceKm} km</p>
          </li>`)}
      </ul>
    </div>
    <ul class="mt-6 flex gap-2 reveal" style="--i:3;list-style:none" aria-label="Social media">
      ${CONFIG.social.map(s => html`<li><a class="icon-tile" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.name} (opens in new tab)">${icon(s.icon)}</a></li>`)}
    </ul>`);
  render('[data-render="subjects"]', c.form.subjects.map(s => html`<option>${s}</option>`));
  const map = $('[data-map]'); if (map) map.src = v.mapEmbedUrl;
  const ml = $('[data-map-link]'); if (ml) ml.href = v.mapLink;
}

function eventSectionMarkup(ev, s) {
  if (s.type === 'chips') return html`<ul class="flex flex-wrap gap-2">${s.items.map(i => html`<li class="chip chip-solid chip-wrap">${i}</li>`)}</ul>`;
  if (s.type === 'steps') return html`<ol class="flex flex-col gap-4">${s.items.map((it, i) => html`<li class="step"><i>${i + 1}</i><span class="prose-muted text-sm md:text-base">${md(it)}</span></li>`)}</ol>`;
  if (s.type === 'downloads') return downloadsMarkup(ev);
  return html`<ul class="check flex flex-col gap-3">${s.items.map(it => html`<li>${icon('check')}<span class="prose-muted text-sm md:text-base">${md(it)}</span></li>`)}</ul>`;
}

function downloadsMarkup(ev) {
  const d = (ev.page && ev.page.downloads) || [];
  if (!d.length) return html`<p class="prose-muted text-sm">Rulebooks and templates for this event will be published here once the committee finalises them.</p>`;
  return html`<ul class="flex flex-col gap-3">${d.map(f => html`
    <li class="glass flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-start gap-3"><span class="icon-tile flex-none">${icon('ticket')}</span><div><p class="font-semibold">${f.label}</p><p class="prose-muted mt-1 text-sm">${f.note}</p></div></div>
      <a class="btn btn-ghost btn-sm flex-none" href="${f.href}" download><span class="btn-inner">Download${f.size ? html` <span class="font-sans font-normal text-muted">(${f.size})</span>` : ''}</span></a>
    </li>`)}  </ul>`;
}

function renderEventPage() {
  const id = document.body.dataset.event, ev = CONFIG.events.find(e => e.id === id);
  if (!ev) { render('[data-render="event-page"]', html`<section class="section-inner section-py"><h1 class="h2">Event not found</h1><p class="prose-muted mt-4"><a class="link" href="index.html#events">Back to all events</a></p></section>`); return; }
  const t = trackOf(ev.track), pg = ev.page || {}, v = CONFIG.venue, reg = eventRegLink(ev), ext = isUrl(reg);
  const regBtn = (label, extra = '') => reg ? html`<a class="btn btn-primary btn-wrap ${extra}" href="${reg}" ${ext ? raw('target="_blank" rel="noopener"') : ''} data-magnetic><span class="btn-inner">${label} ${icon('arrow')}</span>${ext ? html`<span class="sr-only"> (opens in new tab)</span>` : ''}</a>` : html`<span class="btn btn-ghost btn-wrap ${extra}" aria-disabled="true"><span class="btn-inner">${icon('clock')} Registration opens soon</span></span>`;
  document.title = `${ev.name} · HIMOVATION 2026`;
  const days = CONFIG.schedule.days.map(d => ({ ...d, rows: d.rows.filter(r => r.tracks.includes(ev.track) || r.tracks.includes('common')) }));
  const others = CONFIG.events.filter(e => e.id !== ev.id);
  const coords = (pg.coordinators && pg.coordinators.length) ? pg.coordinators : CONFIG.contact.coordinators.filter(c => c.name && c.phone);
  render('[data-render="event-page"]', html`
    <section class="relative overflow-hidden section-py" style="padding-bottom:3.5rem" aria-labelledby="event-title">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(60% 50% at 20% 20%, color-mix(in srgb, ${t.color} 12%, transparent), transparent 70%)" aria-hidden="true"></div>
      <div class="section-inner" style="position:relative">
        <nav class="text-sm text-muted reveal" aria-label="Breadcrumb"><ol class="flex flex-wrap items-center gap-2"><li><a class="link" href="index.html">Home</a></li><li aria-hidden="true">/</li><li><a class="link" href="index.html#events">Events</a></li><li aria-hidden="true">/</li><li class="text-ink" aria-current="page">${t.label}</li></ol></nav>
        <div class="mt-8" style="display:grid;gap:2.5rem" class="ev-hero-grid">
          <div class="min-w-0">
            <span class="badge reveal" style="--track:${t.color}; --i:1"><i></i>${t.label}${ev.fee.amount === 0 ? html` <span style="margin-left:.5rem;display:inline-flex;align-items:center;background:rgba(16,185,129,.15);color:rgb(var(--c-ok));border-radius:4px;padding:.2rem .55rem;font-size:.68rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase">Free</span>` : ''}</span>
            <h1 id="event-title" class="hero-title mt-4 reveal" style="--i:1; font-size: clamp(2.3rem, 6.5vw, 4.75rem)">${ev.name}</h1>
            <p class="hero-tagline mt-4 reveal" style="--i:2">${ev.subtitle}</p>
            <p class="prose-muted mt-5 max-w-2xl text-base md:text-lg reveal" style="--i:3">${ev.blurb}</p>
            <ul class="hero-chips mt-7 reveal" style="--i:4" aria-label="Key details">
              <li class="chip">${icon('calendar')}${pg.dates || CONFIG.dates.display}</li>
              <li class="chip">${icon('users')}${teamSizeText(ev.teamSize)}</li>
              <li class="chip">${icon('ticket')}${feeText(ev.fee)}</li>
              <li class="chip chip-ember">${icon('trophy')}${fmtINR(ev.prizePool)} prize pool</li>
            </ul>
            <div class="hero-ctas mt-8 reveal" style="--i:5">
              ${regBtn(`Register for ${t.label}`)}
              ${(pg.downloads || []).slice(0, 1).map(f => html`<a class="btn btn-ghost btn-wrap" href="${f.href}" download data-magnetic><span class="btn-inner">${icon('ticket')} ${f.cta || f.label}</span></a>`)}
            </div>
          </div>
          <div class="glass p-6 sm:p-7 reveal" style="--i:3">
            <p class="eyebrow">At a glance</p>
            <dl class="mt-5" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem">
              <div class="fact"><dt>Dates</dt><dd>${pg.dates || CONFIG.dates.display}</dd></div>
              <div class="fact"><dt>Venue</dt><dd>${v.short}</dd></div>
              <div class="fact"><dt>Team size</dt><dd>${teamSizeText(ev.teamSize)}</dd></div>
              <div class="fact"><dt>Entry fee</dt><dd>${feeText(ev.fee)}${ev.fee.note ? html`<span class="mt-1 block font-sans text-xs font-normal text-muted">${ev.fee.note}</span>` : ''}</dd></div>
              <div class="fact col-span-2"><dt>Expected participation</dt><dd>${ev.capacity}</dd></div>
              ${pg.when ? html`<div class="fact col-span-2"><dt>When</dt><dd class="font-sans text-sm font-normal text-muted">${pg.when}</dd></div>` : ''}
            </dl>
          </div>
        </div>
      </div>
    </section>
    <style>.ev-hero-grid { display: grid; gap: 2.5rem; } @media (min-width: 1024px) { .ev-hero-grid { grid-template-columns: 1.35fr 1fr; align-items: end; } }</style>

    <svg class="divider" aria-hidden="true" style="color:rgba(255,255,255,.06)"><use href="#ridge"/></svg>

    <section class="section-py" aria-labelledby="details-title">
      <div class="section-inner">
        <div class="ev-detail-grid">
          <div class="min-w-0">
            <p class="eyebrow reveal">Details</p>
            <h2 id="details-title" class="h2 mt-3 reveal" style="--i:1">Everything you need to know.</h2>
            <dl class="mt-8 flex flex-col gap-6 reveal" style="--i:2">
              <div class="fact"><dt>Format</dt><dd class="prose-muted font-sans text-sm font-normal md:text-base">${ev.format}</dd></div>
              <div class="fact"><dt>Eligibility</dt><dd class="prose-muted font-sans text-sm font-normal md:text-base">${ev.eligibility}</dd></div>
            </dl>
            ${ev.sections.map((sec, i) => html`<section class="mt-12 reveal" aria-labelledby="sec-${i}"><h3 id="sec-${i}" class="h3 text-lg md:text-xl">${sec.heading}</h3><div class="mt-5">${eventSectionMarkup(ev, sec)}</div></section>`)}
          </div>
          <aside class="flex flex-col gap-5 aside-sticky">
            <div class="glass p-6 reveal" style="--track:${t.color}">
              <div class="flex items-center justify-between gap-3"><p class="eyebrow">Prizes</p><p class="num text-sm text-muted">Pool <span class="font-semibold text-ink">${fmtINR(ev.prizePool)}</span></p></div>
              <div class="mt-4 flex flex-col gap-2">${ev.prizes.map((p, i) => html`<div class="flex items-center justify-between" style="border-radius:6px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);padding:.6rem .75rem"><span class="flex items-center gap-3">${medal(i)}<span class="text-xs uppercase text-muted" style="letter-spacing:.1em">${p.place} prize</span></span><span class="num text-lg font-bold${i === 0 ? ' text-emberink' : ' text-ink'}">${fmtINR(p.amount)}</span></div>`)}</div>
              ${ev.specialAwards.length ? html`<ul class="mt-3 flex flex-wrap gap-2">${ev.specialAwards.map(a => html`<li class="chip chip-ember">${icon('award')}${a}</li>`)}</ul>` : ''}
              <p class="mt-4 text-xs text-muted">Certificates of Achievement with every cash prize; participation certificates for all who complete the event. Prize distribution at the valedictory, Day 2.</p>
            </div>
            <div class="glass p-6 reveal" style="--i:1">
              <p class="eyebrow">Coordinators</p>
              ${coords.length ? html`<ul class="mt-4 flex flex-col gap-3">${coords.map(c => { const digits = c.phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, ''); return html`<li>${c.role ? html`<p class="text-xs uppercase text-muted" style="letter-spacing:.1em">${c.role}</p>` : ''}<p class="font-semibold">${c.name}</p><a class="link text-sm" href="tel:+91${digits}">+91 ${digits.replace(/(\d{5})(\d{5})/, '$1 $2')}</a></li>`; })}</ul>` : html`<p class="prose-muted mt-3 text-sm">Event coordinators will be announced here. Until then, write to the festival desk.</p>`}
              <p class="mt-4 border-t pt-4 text-sm"><a class="link" href="mailto:${CONFIG.contact.email}">${CONFIG.contact.email}</a></p>
            </div>
            <div class="glass p-6 reveal" style="--i:2">
              <p class="eyebrow">For every participant</p>
              <ul class="check mt-4 flex flex-col gap-2 text-sm prose-muted">${CONFIG.generalRules.slice(0, 4).map(r => html`<li>${icon('check')}<span>${r}</span></li>`)}</ul>
              <p class="mt-4 text-sm"><a class="link" href="index.html#events">All participant rules</a> · <a class="link" href="index.html#faq">FAQ</a></p>
            </div>
          </aside>
        </div>
        <style>.ev-detail-grid { display: grid; gap: 3rem; } @media (min-width: 1024px) { .ev-detail-grid { grid-template-columns: minmax(0,1fr) 20rem; gap: 4rem; } }</style>
      </div>
    </section>

    <section class="section-py section-surface" aria-labelledby="track-schedule-title">
      <div class="section-inner">
        <p class="eyebrow reveal">Schedule</p>
        <h2 id="track-schedule-title" class="h2 mt-3 reveal" style="--i:1">Your two days at SRHU.</h2>
        <p class="prose-muted mt-4 max-w-2xl reveal" style="--i:2">${t.label} sessions with the common festival moments. The <a class="link" href="index.html#schedule">full timeline</a> shows all four tracks side by side.</p>
        <div class="mt-10 grid-2">
          ${days.map((d, di) => html`<div class="reveal" style="--i:${di + 2}"><h3 class="h3 text-lg">${d.label} <span class="font-sans text-sm font-normal text-muted">· ${d.date}</span></h3>
            <ol class="tl tl-compact mt-5">${d.rows.map(r => { const own = r.tracks.includes(ev.track); return html`<li class="tl-row ${r.milestone ? 'is-milestone' : ''} ${own ? '' : 'is-dim'}" style="--track:${own ? t.color : trackOf('common').color}"><span class="tl-node" aria-hidden="true"></span><div class="tl-card"><span class="tl-time">${r.time}</span><h4 class="mt-1 font-display" style="font-size:.95rem;font-weight:600;line-height:1.35">${r.title}</h4>${r.note ? html`<p class="mt-1 text-xs text-muted">${r.note}</p>` : ''}</div></li>`; })}</ol></div>`)}
        </div>
      </div>
    </section>

    <section class="section-py" aria-labelledby="other-events-title">
      <div class="section-inner">
        <p class="eyebrow reveal">More arenas</p>
        <h2 id="other-events-title" class="h2 mt-3 reveal" style="--i:1">The other three events.</h2>
        <ul class="mt-10 grid-3">${others.map((o, i) => { const ot = trackOf(o.track); return html`
          <li><a class="bento-card h-full reveal" href="${o.href}" style="--track:${ot.color}; --i:${i + 2}">
            <div class="flex items-center justify-between gap-3"><span class="icon-tile bento-icon" style="color:var(--track); background: color-mix(in srgb, var(--track) 12%, transparent); border-color: color-mix(in srgb, var(--track) 25%, transparent)">${icon(o.icon)}</span><span class="badge"><i></i>${ot.label}</span></div>
            <h3 class="h3 mt-5 text-lg">${o.name}</h3><p class="prose-muted mt-2 text-sm">${o.blurb}</p>
            <p class="mt-5 text-sm font-semibold text-accent">Open event page →</p>
          </a></li>`; })}</ul>
      </div>
    </section>

    <section class="register-band" style="padding:4rem 0" aria-labelledby="event-register-title">
      <svg class="contour-bg" aria-hidden="true" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#contours)"/></svg>
      <div class="register-glow" aria-hidden="true"></div>
      <div class="section-inner" style="position:relative;text-align:center">
        <p class="eyebrow reveal">Registrations open</p>
        <h2 id="event-register-title" class="h2 mx-auto mt-3 max-w-3xl reveal" style="--i:1">Ready for ${t.label}?</h2>
        <p class="prose-muted mx-auto mt-4 max-w-2xl reveal" style="--i:2">${feeText(ev.fee)} · ${teamSizeText(ev.teamSize)} · ${ev.capacity}. Seats are allotted first come, first served and confirmed after verification.</p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row reveal" style="--i:3">
          ${regBtn('Register now')}
          <a class="btn btn-ghost" href="index.html#contact"><span class="btn-inner">Ask a question ${icon('chevron')}</span></a>
        </div>
      </div>
    </section>`);}

function renderFooter() {
  const s = CONFIG.site, o = s.organizer, f = CONFIG.footer;
  render('[data-render="footer"]', html`
    <div class="footer-top">
      <div>
        <span class="logo-plate" style="height:3.25rem;margin-bottom:1.25rem"><img src="${s.logo.srcLight || s.logo.src}" alt="${s.logo.alt}" loading="lazy" decoding="async"></span>
        <h3 class="h3 text-xl">${s.name}</h3>
        <p class="mt-2 text-sm text-muted">${o.dept}<br>${o.school}<br>${o.university}, ${o.city}</p>
        <p class="mt-4 max-w-md text-xs text-muted">${f.initiative || 'Flagship Technical Festival'}</p>
      </div>
      <div>
        <p class="eyebrow">Quick links</p>
        <ul class="mt-4 flex flex-col gap-2 text-sm" style="list-style:none">
          ${CONFIG.nav.map(n => html`<li><a class="link text-muted" href="${homeHref(n.id)}">${n.label}</a></li>`)}
          <li><a class="link text-muted" href="${homeHref('register')}">Register</a></li>
        </ul>
        <p class="eyebrow mt-6">Event pages</p>
        <ul class="mt-4 flex flex-col gap-2 text-sm" style="list-style:none">
          ${CONFIG.events.map(e => html`<li><a class="link text-muted" href="${e.href}">${e.name}</a></li>`)}
        </ul>
      </div>
      <div>
        <p class="eyebrow">Reach us</p>
        <ul class="mt-4 flex flex-col gap-2 text-sm text-muted" style="list-style:none">
          <li><a class="link" href="mailto:${CONFIG.contact.email}">${CONFIG.contact.email}</a></li>
          <li>${CONFIG.venue.short}</li>
          <li>${CONFIG.dates.display}</li>
        </ul>
        <ul class="mt-5 flex gap-2" style="list-style:none" aria-label="Social media">
          ${CONFIG.social.map(x => html`<li><a class="icon-tile" href="${x.href}" target="_blank" rel="noopener" aria-label="${x.name} (opens in new tab)">${icon(x.icon, 'h-4 w-4')}</a></li>`)}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${f.copyright} · Swami Rama Himalayan University</p>
      <p>${s.tagline}</p>
    </div>`);
}

/* ============================ BEHAVIOURS ================================ */
function trapFocus(root) {
  const SEL = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  const onKey = e => {
    if (e.key !== 'Tab') return;
    const f = $$(SEL, root).filter(el => el.offsetParent !== null || el === document.activeElement);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  root.addEventListener('keydown', onKey);
  return () => root.removeEventListener('keydown', onKey);
}

function initHeader() {
  const header = $('#site-header'), progress = $('#progress'), toTop = $('#to-top');
  let ticking = false;
  const update = () => {
    const y = window.scrollY || 0, max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 24);
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    toTop.classList.toggle('is-shown', y > 700);
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
  toTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' }); $('#main').focus({ preventScroll: true }); });

  const links = $$('[data-nav]');
  const sections = $$('main section[id]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(l => { if (l.dataset.nav === en.target.id) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current'); });
      });
    }, { rootMargin: '-38% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));
  }
}

function initMenu() {
  const btn = $('#menu-btn'), menu = $('#mobile-menu'), page = $('#page'), header = $('#site-header');
  let release = null;
  const isOpen = () => btn.getAttribute('aria-expanded') === 'true';
  const open = () => {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
    btn.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); btn.setAttribute('aria-label', 'Close menu');
    document.documentElement.style.overflow = 'hidden';
    if ('inert' in page) page.inert = true; else page.setAttribute('aria-hidden', 'true');
    release = trapFocus(header);
    const first = $('a', menu); if (first) first.focus();
  };
  const close = (returnFocus = true) => {
    menu.classList.remove('is-open'); btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Open menu');
    document.documentElement.style.overflow = '';
    if ('inert' in page) page.inert = false; else page.removeAttribute('aria-hidden');
    if (release) { release(); release = null; }
    const done = () => { menu.hidden = true; };
    prefersReducedMotion() ? done() : setTimeout(done, 280);
    if (returnFocus) btn.focus();
  };
  btn.addEventListener('click', () => isOpen() ? close() : open());
  menu.addEventListener('click', e => { if (e.target.closest('a')) close(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen()) close(); });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches && isOpen()) close(false); });
}

function initReveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) return;
  document.documentElement.classList.add('js-reveal');
  void document.documentElement.offsetWidth;
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  const vh = window.innerHeight;
  els.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.95 && r.bottom > 0 && el.offsetParent !== null) el.classList.add('is-visible'); else io.observe(el);
  });
}

function initCounters() {
  const els = $$('[data-counter]');
  const fmt = (v, d) => Number(v).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  const run = el => {
    const v = +el.dataset.value, d = +el.dataset.decimals, p = el.dataset.prefix, s = el.dataset.suffix;
    if (prefersReducedMotion()) { el.textContent = p + fmt(v, d) + s; return; }
    const t0 = performance.now(), dur = 1400;
    const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = p + fmt(v * e, d) + s; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }), { threshold: 0.5 });
  els.forEach(el => io.observe(el));
}

function initCountdown() {
  const start = Date.parse(CONFIG.dates.start), end = Date.parse(CONFIG.dates.end);
  const roots = $$('[data-countdown]');
  if (!roots.length || isNaN(start)) return;
  const pad = n => String(n).padStart(2, '0');
  let lastLabel = '';
  const tick = () => {
    const now = Date.now(), diff = start - now;
    roots.forEach(root => {
      const tiles = $('[data-cd-tiles]', root), state = $('[data-cd-state]', root), caption = root.parentElement.querySelector('[data-cd-caption]');
      if (diff > 0) {
        const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
        $('[data-cd="d"]', root).textContent = pad(d); $('[data-cd="h"]', root).textContent = pad(h);
        $('[data-cd="m"]', root).textContent = pad(m); $('[data-cd="s"]', root).textContent = pad(s);
        tiles.hidden = false; state.hidden = true; if (caption) caption.hidden = false;
        const label = `Inauguration in ${d} days, ${h} hours and ${m} minutes`;
        if (label !== lastLabel) { root.setAttribute('aria-label', label); lastLabel = label; }
      } else if (!isNaN(end) && now < end) {
        tiles.hidden = true; state.hidden = false; if (caption) caption.hidden = true;
        if (!state.dataset.mode || state.dataset.mode !== 'live') {
          state.dataset.mode = 'live';
          state.innerHTML = String(html`<div class="inline-flex flex-wrap items-center justify-center gap-3" style="border-radius:9999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);padding:.6rem 1.25rem;font-family:'Space Grotesk',sans-serif;font-weight:600"><span class="live-dot" aria-hidden="true"></span>${CONFIG.dates.liveLabel}<a class="link font-sans text-sm font-normal" href="#schedule">See today's schedule</a></div>`);
          root.setAttribute('aria-label', CONFIG.dates.liveLabel);
        }
      } else {
        tiles.hidden = true; state.hidden = false; if (caption) caption.hidden = true;
        if (state.dataset.mode !== 'ended') {
          state.dataset.mode = 'ended';
          state.innerHTML = String(html`<p class="font-display text-lg font-semibold text-muted">${CONFIG.dates.endedLabel}</p>`);
          root.setAttribute('aria-label', CONFIG.dates.endedLabel);
        }
      }
    });
  };
  tick();
  setInterval(tick, 1000);
  window.__himovationTick = tick;
}

function initTabs() {
  const tabs = $$('[role="tab"]'); if (!tabs.length) return;
  const activate = (tab, focus = true) => {
    tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; const p = $('#' + t.getAttribute('aria-controls')); if (p) p.hidden = !on; });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => activate(t, false));
    t.addEventListener('keydown', e => {
      const n = tabs.length; let j = null;
      if (e.key === 'ArrowRight') j = (i + 1) % n; else if (e.key === 'ArrowLeft') j = (i - 1 + n) % n; else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = n - 1;
      if (j !== null) { e.preventDefault(); activate(tabs[j]); }
    });
  });
  const legend = $$('[data-filter]');
  legend.forEach(b => b.addEventListener('click', () => {
    legend.forEach(x => x.setAttribute('aria-pressed', x === b));
    const k = b.dataset.filter;
    $$('[role="tabpanel"]').forEach(panel => {
      const rows = $$('.tl-row', panel);
      rows.forEach(r => { const ts = r.dataset.tracks.split(' '); r.hidden = !!k && !ts.includes(k) && !ts.includes('common'); });
      rows.filter(r => !r.hidden).forEach((r, i) => { r.classList.toggle('is-left', i % 2 === 0); r.classList.toggle('is-right', i % 2 === 1); r.classList.add('is-visible'); });
      let empty = $('.tl-empty', panel); if (!empty) { empty = document.createElement('p'); empty.className = 'tl-empty prose-muted mt-4 text-sm'; empty.textContent = 'No sessions for this track on this day.'; panel.appendChild(empty); }
      empty.hidden = rows.some(r => !r.hidden);
    });
  }));
}

function initAccordion() {
  document.addEventListener('click', e => {
    const b = e.target.closest('.faq-btn'); if (!b) return;
    const panel = $('#' + b.getAttribute('aria-controls')), open = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', String(!open));
    panel.classList.toggle('is-open', !open);
    if ('inert' in panel) panel.inert = open;
  });
}

function initMagnetic(scope = document) {
  if (!isFinePointer() || prefersReducedMotion()) return;
  $$('[data-magnetic]', scope).forEach(btn => {
    if (btn.dataset.magneticReady) return; btn.dataset.magneticReady = '1';
    const inner = $('.btn-inner', btn) || btn;
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      inner.style.transform = `translate(${Math.max(-6, Math.min(6, dx * .18)).toFixed(1)}px, ${Math.max(-4, Math.min(4, dy * .25)).toFixed(1)}px)`;
      btn.style.setProperty('--mx', (e.clientX - r.left) + 'px'); btn.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    btn.addEventListener('pointerleave', () => { inner.style.transform = ''; });
  });
  $$('.bento-card', scope).forEach(card => {
    if (card.dataset.glowReady) return; card.dataset.glowReady = '1';
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty('--mx', x + 'px'); card.style.setProperty('--my', y + 'px');
      card.style.setProperty('--px', ((x / r.width - .5) * 10).toFixed(1) + 'px'); card.style.setProperty('--py', ((y / r.height - .5) * 10).toFixed(1) + 'px');
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--px', '0px'); card.style.setProperty('--py', '0px'); });
  });
}

function initForm() {
  const form = $('#contact-form'); if (!form) return;
  const success = $('#contact-success');
  const rules = {
    name:    v => v.trim().length >= 2 || 'Enter your full name.',
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address, like name@college.edu.',
    phone:   v => !v.trim() || /^(\+?91)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '')) || 'Enter a 10-digit Indian mobile number, or leave this empty.',
    subject: v => !!v || 'Choose a topic.',
    message: v => (v.trim().length >= 10 && v.trim().length <= 1000) || 'Write at least 10 characters (up to 1,000).',
  };
  let attempted = false;
  const field = k => ({ el: $('#cf-' + k), err: $('#err-' + k) });
  const validate = k => {
    const { el, err } = field(k); const res = rules[k](el.value);
    if (res === true) { el.removeAttribute('aria-invalid'); err.hidden = true; err.textContent = ''; return true; }
    el.setAttribute('aria-invalid', 'true'); err.textContent = res; err.hidden = false; return false;
  };
  Object.keys(rules).forEach(k => { const { el } = field(k); el.addEventListener('input', () => { if (attempted) validate(k); }); el.addEventListener('blur', () => { if (attempted) validate(k); }); });
  form.addEventListener('submit', e => {
    e.preventDefault(); attempted = true;
    if ($('#cf-website').value) return;
    const bad = Object.keys(rules).filter(k => !validate(k));
    if (bad.length) { field(bad[0]).el.focus(); return; }
    const data = Object.fromEntries(Object.keys(rules).map(k => [k, field(k).el.value.trim()]));
    if (CONFIG.contact.form.endpoint) { form.action = CONFIG.contact.form.endpoint; form.method = 'POST'; form.submit(); return; }
    const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || '-'}\nTopic: ${data.subject}\n\n${data.message}`;
    const mail = `mailto:${CONFIG.contact.email}?subject=${encodeURIComponent('[HIMOVATION 2026] ' + data.subject + ' – ' + data.name)}&body=${encodeURIComponent(body)}`;
    form.hidden = true;
    success.innerHTML = String(html`
      <div style="border-radius:8px;border:1px solid rgba(16,185,129,.25);background:rgba(16,185,129,.08);padding:1.25rem">
        <div class="flex items-center gap-3"><span class="icon-tile" style="color:rgb(var(--c-ok));background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.3)">${icon('check')}</span><h4 class="h3 text-base">Thanks, ${data.name.split(' ')[0]}. Your message is ready.</h4></div>
        <p class="prose-muted mt-3 text-sm">This site has no mail server yet, so the message opens in your mail app addressed to <strong>${CONFIG.contact.email}</strong>. Send it from there and we will reply to <strong>${data.email}</strong> within two working days.</p>
        <div class="mt-4 flex flex-col gap-2 sm:flex-row"><a class="btn btn-primary btn-sm" href="${mail}"><span class="btn-inner">Open in mail app ${icon('mail')}</span></a><button class="btn btn-ghost btn-sm" type="button" data-form-reset><span class="btn-inner">Write another</span></button></div>
      </div>`);
    success.hidden = false;
    $('h4', success).setAttribute('tabindex', '-1'); $('h4', success).focus();
    $('[data-form-reset]', success).addEventListener('click', () => { success.hidden = true; form.hidden = false; form.reset(); attempted = false; Object.keys(rules).forEach(k => { const { el, err } = field(k); el.removeAttribute('aria-invalid'); err.hidden = true; }); $('#cf-name').focus(); });
  });
}

function initCanvas() {
  // Disabled in minimal editorial aesthetic
  return;
}

function validateConfig() {
  const warn = [];
  if (IS_HOME) CONFIG.nav.forEach(n => { if (!$('#' + n.id)) warn.push(`nav id "${n.id}" has no matching section`); });
  CONFIG.events.forEach(e => { if (!e.href) warn.push(`event ${e.id} has no page href`); });
  const tracks = Object.keys(CONFIG.tracks);
  CONFIG.events.forEach(e => {
    if (!tracks.includes(e.track)) warn.push(`event ${e.id}: unknown track "${e.track}"`);
    const sum = e.prizes.reduce((a, p) => a + p.amount, 0);
    if (sum !== e.prizePool) warn.push(`event ${e.id}: prizePool ${e.prizePool} differs from the sum of prizes ${sum}`);
  });
  const slots = CONFIG.events.map(e => e.bentoSlot);
  if (new Set(slots).size !== slots.length) warn.push('events have duplicate bentoSlot values');
  CONFIG.schedule.days.forEach(d => d.rows.forEach(r => r.tracks.forEach(t => { if (!tracks.includes(t)) warn.push(`schedule row "${r.title}": unknown track "${t}"`); })));
  if (CONFIG.faq.length < 8 || CONFIG.faq.length > 10) warn.push(`FAQ has ${CONFIG.faq.length} items (expected 8–10)`);
  if (/REPLACE/i.test(CONFIG.REGISTRATION_LINK)) warn.push('REGISTRATION_LINK still contains the placeholder');
  CONFIG.events.forEach(e => { if (!eventRegLink(e)) warn.push(`event ${e.id} has no registrationLink yet (shows "Registration opens soon")`); });
  CONFIG.social.forEach(s => { if (/REPLACE/i.test(s.href)) warn.push(`social link for ${s.name} still contains the placeholder`); });
  if (/XXXX/.test(CONFIG.contact.phone)) warn.push('contact.phone is still a placeholder');
  const st = Date.parse(CONFIG.dates.start), en = Date.parse(CONFIG.dates.end);
  if (isNaN(st) || isNaN(en)) warn.push('dates.start / dates.end are not valid ISO strings'); else if (en <= st) warn.push('dates.end is not after dates.start');
  if (!CONFIG.dates.display.includes(CONFIG.dates.start.slice(0, 4))) warn.push('dates.display year does not match dates.start');
  const total = CONFIG.events.reduce((a, e) => a + e.prizePool, 0);
  const stat = CONFIG.stats.find(s => /L/.test(s.suffix || ''));
  if (stat && Math.abs(stat.value * 1e5 - total) > 5000) warn.push(`prize pool stat ₹${stat.value}L differs from the computed total ${fmtINR(total)}`);
  (warn.length ? console.warn : console.info)(`[HIMOVATION config] ${warn.length ? warn.length + ' warning(s)' : 'no warnings'}`, warn);
  return warn;
}

/* Theme toggle removed — site is dark-only as per redesign plan */

/* ============================ INIT ====================================== */
function init() {
  document.body.insertAdjacentHTML('afterbegin', SPRITE);
  renderHeader();
  if (IS_HOME) {
    renderHero(); renderMarquee(); renderAbout(); renderStats(); renderEvents(); renderPrizes(); renderSchedule();
    renderWhy(); renderFAQ(); renderRegisterBand(); renderContact();
  } else {
    renderEventPage();
  }
  renderFooter(); applyRegisterLinks();
  initHeader(); initMenu(); initReveal(); initCounters(); initCountdown(); initTabs();
  initAccordion(); initMagnetic(); initForm(); initCanvas();
  if (CONFIG.debug || location.hash === '#debug') validateConfig();
  window.HIMOVATION = { CONFIG, validateConfig };
}
init();
