# Prototype Test Platform

A minimal, accessible static site for your usability study with 6 pages:

1. `1-demographics.html` — embeds a Google Form for demographics
2. `2-task.html` — task instructions
3. `3-prototype.html` — embeds your Figma prototype
4. `4-nasatlx.html` — embeds NASA-TLX Google Form
5. `5-sus.html` — embeds SUS Google Form
6. `6-ueq.html` — embeds UEQ Google Form

## Setup

1. Replace the Google Form embed URLs:
   - Open each Google Form → **Send** → **Embed** (`<>`) → copy the `<iframe>` URL.
   - In the HTML files, replace `REPLACE_*_FORM_ID` segments with your form IDs or paste your full embed URL in the `src` attribute.

2. (Optional) Adjust the Figma link in `3-prototype.html` if needed.

## Local Preview

Serve with any static server, for example:
- Python: `python3 -m http.server` then open `http://localhost:8000/1-demographics.html`

## Deploy to Cloudflare Pages

1. Create a new **Pages** project in Cloudflare Dashboard.
2. Choose **Direct Upload** or connect a Git repo.
3. Upload the contents of this folder (or push to your repo). No build step required.
4. Set `1-demographics.html` as your entry link when sharing the study.

## Notes

- The **Next** and **Back** buttons navigate between physical HTML files.
- On pages with forms, the Next button is disabled until the participant ticks “I have submitted the form.”
  (We cannot automatically detect Google Form submission due to cross‑origin restrictions.)
- The progress bar updates automatically based on the current page.

## Structure

```
assets/
  styles.css
  script.js
1-demographics.html
2-task.html
3-prototype.html
4-nasatlx.html
5-sus.html
6-ueq.html
```