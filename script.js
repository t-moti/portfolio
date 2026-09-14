// ============ SCROLL PROGRESS ============
const progressFill = document.getElementById('progress-fill');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const max = h.scrollHeight - h.clientHeight;
  progressFill.style.width = (max > 0 ? (scrolled/max)*100 : 0) + '%';
}
document.addEventListener('scroll', updateProgress);
updateProgress();

// ============ MOBILE NAV ============
const navToggle = document.getElementById('nav-toggle');
const nav = document.querySelector('#site-header nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', false);
}));

// ============ TRAJECTORY DOT ALONG PATH ============
const path = document.getElementById('trajectory');
const dot = document.getElementById('trajectory-dot');
if (path && dot){
  const len = path.getTotalLength();
  let t = 0;
  function animateDot(){
    t += 0.0035;
    if (t > 1) t = 0;
    const pt = path.getPointAtLength(t * len);
    dot.setAttribute('cx', pt.x);
    dot.setAttribute('cy', pt.y);
    requestAnimationFrame(animateDot);
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    requestAnimationFrame(animateDot);
  }
}

// ============ RENDER SKILLS ============
const skillGrid = document.getElementById('skill-grid');
SKILLS.forEach(s => {
  const el = document.createElement('article');
  el.className = 'skill-card';
  el.setAttribute('tabindex', '0');
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', `View details for ${s.name}`);
  el.innerHTML = `
    <div class="skill-tag">${s.category}</div>
    <h3>${s.name}</h3>
    <p>${s.summary}</p>
    <span class="skill-link">View resources & practice →</span>
  `;
  el.addEventListener('click', () => openSkill(s.id));
  el.addEventListener('keydown', e => { if (e.key === 'Enter') openSkill(s.id); });
  skillGrid.appendChild(el);
});

// ============ RENDER CURRENTLY LEARNING ============
const learningGrid = document.getElementById('learning-grid');
CURRENTLY_LEARNING.forEach(l => {
  const el = document.createElement('div');
  el.className = 'learning-card';
  el.innerHTML = `
    <div class="learning-dot" aria-hidden="true"></div>
    <div>
      <h3>${l.name}</h3>
      <p>${l.note}</p>
      <span class="learning-since">${l.since}</span>
    </div>
  `;
  learningGrid.appendChild(el);
});

// ============ RENDER CONTACT ============
const contactGrid = document.getElementById('contact-grid');
CONTACTS.forEach(c => {
  const el = document.createElement('a');
  el.className = 'contact-card';
  el.href = c.href;
  el.target = c.href.startsWith('http') ? '_blank' : '_self';
  el.rel = 'noopener';
  el.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none">${c.icon}</svg>
    <div>
      <div class="contact-label">${c.label}</div>
      <div class="contact-value">${c.value}</div>
    </div>
  `;
  contactGrid.appendChild(el);
});

// ============ RENDER PROJECTS ============
const projectGrid = document.getElementById('project-grid');
PROJECTS.forEach(p => {
  const el = document.createElement('article');
  el.className = 'project-card';
  el.setAttribute('tabindex', '0');
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', `View details for ${p.title}`);
  el.innerHTML = `
    <img class="project-thumb" src="${p.thumb}" alt="${p.title}" loading="lazy">
    <div class="project-body">
      <div class="project-tag">${p.tag}</div>
      <h3>${p.title}</h3>
      <p>${p.summary}</p>
    </div>
  `;
  el.addEventListener('click', () => openProject(p.id));
  el.addEventListener('keydown', e => { if (e.key === 'Enter') openProject(p.id); });
  projectGrid.appendChild(el);
});

// ============ SHARED DETAIL OVERLAY ============
const overlay = document.getElementById('detail-overlay');
const overlayContent = document.getElementById('overlay-content');
const overlayClose = document.getElementById('overlay-close');
let galleryIndex = 0;
let activeProject = null;

function openOverlay(hashValue){
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  history.replaceState(null, '', hashValue);
}

function closeOverlay(){
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  history.replaceState(null, '', location.pathname);
}

overlayClose.addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

// ---- PROJECT DETAIL ----
function openProject(id){
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  activeProject = p;
  galleryIndex = 0;
  renderProjectOverlay();
  openOverlay(`#project=${id}`);
}

function renderProjectOverlay(){
  const p = activeProject;
  const item = p.gallery[galleryIndex];
  const mediaHtml = item.type === 'video'
    ? `<video src="${item.src}" controls></video>`
    : `<img src="${item.src}" alt="${p.title} — image ${galleryIndex+1}">`;

  const dots = p.gallery.map((_, i) =>
    `<span class="${i === galleryIndex ? 'active' : ''}" data-i="${i}"></span>`
  ).join('');

  overlayContent.innerHTML = `
    <div class="detail-tag">${p.tag}</div>
    <h2 class="detail-title">${p.title}</h2>
    <div class="detail-meta">${p.role} · ${p.date}</div>

    <div class="detail-gallery">
      ${mediaHtml}
      ${p.gallery.length > 1 ? `
        <button class="gallery-nav prev" aria-label="Previous image">‹</button>
        <button class="gallery-nav next" aria-label="Next image">›</button>
      ` : ''}
    </div>
    ${p.gallery.length > 1 ? `<div class="gallery-dots">${dots}</div>` : ''}

    <div class="detail-body">
      ${p.description.map(par => `<p>${par}</p>`).join('')}
      <div class="detail-tools">
        ${p.tools.map(t => `<span>${t}</span>`).join('')}
      </div>
    </div>
  `;

  const prevBtn = overlayContent.querySelector('.gallery-nav.prev');
  const nextBtn = overlayContent.querySelector('.gallery-nav.next');
  if (prevBtn) prevBtn.addEventListener('click', () => { galleryIndex = (galleryIndex - 1 + p.gallery.length) % p.gallery.length; renderProjectOverlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { galleryIndex = (galleryIndex + 1) % p.gallery.length; renderProjectOverlay(); });
  overlayContent.querySelectorAll('.gallery-dots span').forEach(dotEl => {
    dotEl.addEventListener('click', () => { galleryIndex = parseInt(dotEl.dataset.i); renderProjectOverlay(); });
  });
}

// ---- SKILL DETAIL ----
const RESOURCE_LABEL = { course: "Course", book: "Book", video: "Video" };

function openSkill(id){
  const s = SKILLS.find(x => x.id === id);
  if (!s) return;

  const resourcesHtml = s.resources.map(r => `
    <li class="resource-item">
      <span class="resource-type">${RESOURCE_LABEL[r.type] || r.type}</span>
      <div>
        <div class="resource-title">${r.title}</div>
        <div class="resource-provider">${r.provider}</div>
      </div>
      ${r.link ? `<a href="${r.link}" target="_blank" rel="noopener" class="resource-link">Open →</a>` : ''}
    </li>
  `).join('');

  const practiceHtml = s.practice.map(pr => {
    const isProjectLink = pr.link && pr.link.startsWith('#project=');
    const linkHtml = pr.link
      ? isProjectLink
        ? `<a href="${pr.link}" class="practice-link" data-project-link="${pr.link.replace('#project=','')}">View full project →</a>`
        : `<a href="${pr.link}" target="_blank" rel="noopener" class="practice-link">View →</a>`
      : '';
    return `
      <div class="practice-card">
        ${pr.image ? `<img src="${pr.image}" alt="${pr.title}">` : ''}
        <div class="practice-body">
          <h4>${pr.title}</h4>
          <p>${pr.description}</p>
          ${linkHtml}
        </div>
      </div>
    `;
  }).join('');

  overlayContent.innerHTML = `
    <div class="detail-tag">${s.category}</div>
    <h2 class="detail-title">${s.name}</h2>
    <div class="detail-meta">${s.summary}</div>

    <h3 class="detail-subhead">How it was learned</h3>
    <ul class="resource-list">${resourcesHtml}</ul>

    <h3 class="detail-subhead">Practice & projects</h3>
    <div class="practice-grid">${practiceHtml}</div>
  `;

  // Clicking a practice item that links to a full project: close skill view, open project view.
  overlayContent.querySelectorAll('[data-project-link]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const projectId = a.dataset.projectLink;
      closeOverlay();
      setTimeout(() => openProject(projectId), 200);
    });
  });

  openOverlay(`#skill=${id}`);
}

// Deep-link support on load: #project=id or #skill=id
window.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash;
  if (hash.startsWith('#project=')){
    openProject(hash.replace('#project=', ''));
  } else if (hash.startsWith('#skill=')){
    openSkill(hash.replace('#skill=', ''));
  }
});

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();
