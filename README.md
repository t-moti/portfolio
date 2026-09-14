# Portfolio — structure

Files:
- `index.html` — page structure. Edit copy directly here (hero text, resume summary, section titles).
- `style.css` — all visual styling. Colors and fonts defined at top under `:root`.
- `data.js` — skills, currently-learning items, contact links, and projects. Edit this for routine content updates. No HTML editing needed.
- `script.js` — rendering and interaction logic. No edits needed for normal updates.
- `assets/resume/resume.pdf` — replace with your actual résumé, same filename.
- `assets/projects/` — project card and gallery images.
- `assets/skills/` — images for practice/project items shown inside a skill's detail view.

## Add a skill
Open `data.js`, add an object to the `SKILLS` array:
```js
{
  id: "unique-id",
  category: "Category shown as a tag",
  name: "Skill name",
  summary: "One line shown on the card.",
  resources: [
    { type: "course", title: "Course name", provider: "Platform", link: "https://..." },
    { type: "book", title: "Book title", provider: "Author", link: "" },
    { type: "video", title: "Video title", provider: "Channel", link: "https://..." }
  ],
  practice: [
    {
      title: "Exercise or mini-project name",
      description: "What you did and what it proved.",
      image: "assets/skills/your-image.jpg",
      link: ""   // external link, or "#project=project-id" to jump to a full project writeup
    }
  ]
}
```
`resources` items with no link (`link: ""`) render without a clickable "Open" button — use this for books with no online link.

## Add a "currently learning" item
Add to the `CURRENTLY_LEARNING` array in `data.js`:
```js
{ name: "Tool or topic", note: "What you're doing with it right now.", since: "Started Month Year" }
```
These display as a simple list, no detail page.

## Add a project
Add to the `PROJECTS` array in `data.js`:
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
To link a skill's practice item straight to one of your full projects, set that practice item's `link` to `#project=your-project-id`, matching the project's `id`.

## Add a contact method
Add to `CONTACTS` array in `data.js`: `{ label, value, href, icon }`. Icon is inline SVG path markup.

## Deploy
Static site, no build step. Push to GitHub, enable GitHub Pages on the repo, or drag the folder into Netlify.
