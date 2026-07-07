# Portfolio — structure

Files:
- `index.html` — page structure. Edit copy directly here (hero text, resume summary, section titles).
- `style.css` — all visual styling. Colors and fonts defined at top under `:root`.
- `data.js` — courses, contact links, and projects. Edit this for routine content updates. No HTML editing needed.
- `script.js` — rendering and interaction logic. No edits needed for normal updates.
- `assets/resume/resume.pdf` — replace with your actual résumé, same filename.
- `assets/projects/` — replace placeholder images with real project photos. Reference new filenames in `data.js`.

## Add a project
Open `data.js`, add an object to the `PROJECTS` array:
```js
{
  id: "unique-id",
  tag: "Category",
  title: "Project title",
  summary: "One-line summary shown on the card.",
  thumb: "assets/projects/your-image.jpg",
  gallery: [
    { type: "image", src: "assets/projects/your-image-1.jpg" },
    { type: "video", src: "assets/projects/your-video.mp4" }
  ],
  description: ["Paragraph one.", "Paragraph two."],
  tools: ["Tool 1", "Tool 2"],
  role: "Solo project",
  date: "2026"
}
```

## Add a course
Add to `COURSES` array in `data.js`: `{ code, title, meta }`.

## Add a contact method
Add to `CONTACTS` array in `data.js`: `{ label, value, href, icon }`. Icon is inline SVG path markup.

## Deploy
Static site, no build step. Push to GitHub, enable GitHub Pages on the repo, or drag the folder into Netlify.
