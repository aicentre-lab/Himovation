// Tailwind Play CDN theme extension. Must load right after the Tailwind CDN script and before any page content.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ground:  'rgb(var(--c-base) / <alpha-value>)',   // named 'ground', not 'base', so Tailwind's text-base stays a font size
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        raised:  'rgb(var(--c-raised) / <alpha-value>)',
        brand:   'rgb(var(--c-brand) / <alpha-value>)',
        ink:     'rgb(var(--c-ink) / <alpha-value>)',
        muted:   'rgb(var(--c-muted) / <alpha-value>)',
        line:    'rgb(var(--c-line) / <alpha-value>)',
        accent:  'rgb(var(--c-accent) / <alpha-value>)',
        ember:   'rgb(var(--c-ember) / <alpha-value>)',
        emberink:'rgb(var(--c-ember-ink) / <alpha-value>)',
        ok:      'rgb(var(--c-ok) / <alpha-value>)',
        err:     'rgb(var(--c-err) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { wrap: '76rem' },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--c-accent) / .35), 0 16px 48px -16px rgb(var(--c-accent) / .45)',
      },
    },
  },
};
