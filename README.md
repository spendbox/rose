# The Ress Brand — Virtual Assistant Portfolio

A fast, modern, mobile-friendly one-page portfolio for **Rosemary (Ress)**, a virtual assistant.
Built as a plain static site (HTML + CSS + a little vanilla JS) — no build step, deploys instantly.

- **Brand colour:** `#cc4e00`
- **Fonts:** Fraunces (display) + Plus Jakarta Sans (body), loaded from Google Fonts
- **Sections:** Hero · About · Services · Toolkit · Skills · Process · Book · Testimonials · Contact
- **Contact:** direct WhatsApp (+234 902 965 7427) plus a floating WhatsApp button (FAB)

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

Contact is handled entirely via **WhatsApp** — the contact buttons and the floating
action button open a chat with +234 902 965 7427 (with a friendly pre-filled message).
No form, no backend, so this deploys identically to Netlify or Vercel.

## Things to personalise

These are the only spots with placeholder/assumed content — swap in the real details:

- **Photo:** add `assets/rosemary.jpg` (portrait, ideally 4:5). It auto-replaces the
  monogram in the hero. No code change needed.
- **Book cover:** the Book section loads the real cover from Cloudinary. If that URL
  ever changes, update the `book__cover-img` `src` in `index.html` (a styled text
  fallback shows automatically if the image fails to load).
- **About / services / skills copy:** taken from Rosemary's portfolio slides. Tweak freely.
- **Stats strip:** the four figures (response time etc.) are sensible defaults — confirm
  or change them in `index.html`.

## A note on hosting

You mentioned both Netlify and Vercel. This is configured for **Netlify** (per your
"build it on Netlify for now"), but since it's pure static frontend with WhatsApp
contact (no form/backend), it deploys identically to Vercel with zero changes.
