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

// ============ RENDER COURSES ============
const courseGrid = document.getElementById('course-grid');
COURSES.forEach(c => {
  const el = document.createElement('div');
  el.className = 'course-card';
  el.innerHTML = `
    <div class="course-code">${c.code}</div>
    <h3>${c.title}</h3>
    <div class="course-meta">${c.meta}</div>
  `;
  courseGrid.appendChild(el);
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

// ============ PROJECT OVERLAY ============
const overlay = document.getElementById('project-overlay');
const overlayContent = document.getElementById('overlay-content');
const overlayClose = document.getElementById('overlay-close');
let galleryIndex = 0;
let activeProject = null;

function openProject(id){
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  activeProject = p;
  galleryIndex = 0;
  renderOverlay();
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  history.replaceState(null, '', `#project=${id}`);
}

function closeProject(){
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  history.replaceState(null, '', '#projects');
}

function renderOverlay(){
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
  if (prevBtn) prevBtn.addEventListener('click', () => { galleryIndex = (galleryIndex - 1 + p.gallery.length) % p.gallery.length; renderOverlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { galleryIndex = (galleryIndex + 1) % p.gallery.length; renderOverlay(); });
  overlayContent.querySelectorAll('.gallery-dots span').forEach(dotEl => {
    dotEl.addEventListener('click', () => { galleryIndex = parseInt(dotEl.dataset.i); renderOverlay(); });
  });
}

overlayClose.addEventListener('click', closeProject);
overlay.addEventListener('click', e => { if (e.target === overlay) closeProject(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(); });

// Deep-link support: #project=id on load
window.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash;
  if (hash.startsWith('#project=')){
    openProject(hash.replace('#project=', ''));
  }
});

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();
