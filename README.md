# Niccolo Forte personal website

Static personal website for `niccoloforte.com`.

The site is plain HTML, CSS, and client-side JavaScript. It can be hosted either
on GitHub Pages or on Vercel.

## Files

- `index.html` - homepage
- `blog.html` - blog landing page
- `style.css` - site styling
- `script.js` - mobile navigation and scroll reveal animations
- `favicon.svg` - NF browser icon
- `assets/Niccolo-Forte-CV.pdf` - CV linked from the site
- `vercel.json` - Vercel static-site settings
- `CNAME` - custom domain for GitHub Pages
- `.nojekyll` - ensures GitHub Pages serves the site as plain static files

## Vercel setup

When importing this repository into Vercel, use:

- Framework Preset: `Other`
- Build Command: leave blank
- Output Directory: `.`
- Install Command: leave blank

The `vercel.json` file enables clean URLs, so `/blog` will resolve to
`blog.html` on Vercel.

## GitHub Pages notes

If hosting through GitHub Pages, keep the files at the repository root and
publish from the `main` branch and `/ (root)`.

`CNAME` and `.nojekyll` are only needed for GitHub Pages. They can stay in the
repo while testing Vercel, but Vercel will manage the live custom domain from
its own dashboard once DNS is switched.
