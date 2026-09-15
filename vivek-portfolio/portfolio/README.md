# Vivek Gupta — Portfolio

A dark, glassmorphic developer portfolio built with plain HTML, CSS, and JavaScript (no frameworks). Deploys as-is on GitHub Pages.

## Structure
```
index.html
css/style.css
js/script.js
assets/images/avatar.jpg        ← your photo, already wired into the hero
assets/images/projects/*.svg    ← placeholder project thumbnails
assets/Vivek_Gupta_Resume.pdf   ← add your real resume here (referenced but not included)
```

## Things to personalize before you publish

1. **GitHub live stats & repos** — open `js/script.js` and set:
   ```js
   const GITHUB_USERNAME = "your-github-username";
   ```
   This pulls your public repo count, followers, and 5 latest repos live via the GitHub API — no key needed.

2. **Resume** — drop your actual PDF at `assets/Vivek_Gupta_Resume.pdf` (same filename, or update the two links in `index.html` under `#resume` and the hero buttons).

3. **Contact form** — the form currently shows a confirmation message but doesn't send anywhere (there's no backend here). Wire it to a free service like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com/) by pointing the `<form>` action or `fetch` call at their endpoint — see the comment in `initContactForm()` in `js/script.js`.

4. **Real links** — replace the placeholder `#` hrefs for LinkedIn, Instagram, and each project's GitHub/Live Demo buttons with your actual URLs. Also update the email and phone number in the Contact section.

5. **Project images** — the 5 project thumbnails are custom SVG illustrations matching the site's theme (not real screenshots). Swap in real screenshots of your projects at `assets/images/projects/` for extra credibility.

6. **Avatar** — your uploaded photo is used directly in the hero, framed with a glow ring and floating animation. If you'd like an illustrated/3D-style avatar instead, that needs to be generated with a dedicated image-generation tool or commissioned from a designer — I can't produce likeness-based artwork of a real person here, but the current photo-based hero already reads as premium with the glassmorphism framing.

## Deploying to GitHub Pages
1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → set source to your default branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo>/`.
