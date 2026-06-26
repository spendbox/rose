# The Ress Brand — Virtual Assistant Portfolio

A fast, modern, mobile-friendly one-page portfolio for **Rosemary (Ress)**, a virtual assistant.
Built as a plain static site (HTML + CSS + a little vanilla JS) — no build step, deploys instantly.

- **Brand colour:** `#cc4e00`
- **Fonts:** Fraunces (display) + Plus Jakarta Sans (body), loaded from Google Fonts
- **Sections:** Hero · About · Services · Toolkit · Process · Book · Testimonials · Contact

## Structure

```
index.html        # the whole page
css/styles.css     # all styling + responsive rules
js/main.js         # nav, mobile menu, scroll reveals
assets/            # favicon, OG image, (drop rosemary.jpg here)
netlify.toml       # Netlify config + headers/caching
```

## Run locally

It's just static files. Either open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Netlify

1. Push this branch to GitHub (already done).
2. In Netlify → **Add new site → Import from Git** → pick this repo/branch.
3. Build command: *(leave empty)* · Publish directory: `.`
4. Deploy. That's it.

The **contact form** uses [Netlify Forms](https://docs.netlify.com/forms/setup/) and
works automatically once deployed to Netlify — submissions appear under the site's
**Forms** tab. (It won't capture submissions on plain local file hosting or on Vercel
without extra setup.)

## Things to personalise

These are the only spots with placeholder/assumed content — swap in the real details:

- **Photo:** add `assets/rosemary.jpg` (portrait, ideally 4:5). It auto-replaces the
  monogram in the hero. No code change needed.
- **Book title:** the cover art and copy in the Book section use a generic title since
  the Selar page (`selar.com/5w907v13u9`) was blocked by this environment's network
  policy — update the real title in `index.html` (search for `book__cover-title`).
- **About / services copy:** written from solid VA best-practice since the Canva
  portfolio couldn't be fetched here. Tweak to match Rosemary's exact voice/offerings.
- **Stats strip:** the four figures (response time etc.) are sensible defaults — confirm
  or change them in `index.html`.

## A note on hosting

You mentioned both Netlify and Vercel. This is configured for **Netlify** (per your
"build it on Netlify for now"). It will also deploy fine to Vercel as a static site —
the only Netlify-specific feature is the contact form, which would need a Vercel
alternative (e.g. Formspree) if you move.
