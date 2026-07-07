// ============================================================
// EDIT THIS FILE TO UPDATE SITE CONTENT.
// No HTML/CSS knowledge required for routine updates.
// ============================================================

const COURSES = [
  { code: "AE 301", title: "Thermodynamics 2", meta: "Core — Semester 3" },
  { code: "AE 305", title: "Aerodynamics 1", meta: "Core — Semester 3" },
  { code: "AE 310", title: "Heat Transfer", meta: "Core — Semester 3" },
  { code: "EE 210", title: "Basic Electrical Engineering", meta: "Core — Semester 3" },
  { code: "ME 260", title: "Mechanical Vibration", meta: "Core — Semester 3" },
  { code: "ME 240", title: "Mechanics of Materials", meta: "Core — Semester 3" },
];

const CONTACTS = [
  {
    label: "Email",
    value: "motahare.talebi24@email.com",
    href: "motahare.talebi24@email.com",
    icon: `<path d="M4 4h16v16H4z" stroke-width="2" fill="none"/><path d="M4 6l8 7 8-7" stroke-width="2" fill="none"/>`
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/motahare-talebi-394b03398",
    href: "https://linkedin.com/in/motahare-talebi-394b03398",
    icon: `<rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2" fill="none"/><path d="M8 10v6M8 8v.01M12 16v-4a2 2 0 0 1 4 0v4" stroke-width="2" fill="none"/>`
  },
  {
    label: "GitHub",
    value: "github.com/t-moti",
    href: "https://github.com/t-moti",
    icon: `<path d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.6-.2.6-.43v-1.68c-2.5.55-3.03-1.2-3.03-1.2-.4-1.05-1-1.33-1-1.33-.83-.56.06-.55.06-.55.9.06 1.38.94 1.38.94.8 1.38 2.1.98 2.6.75.08-.58.32-.98.57-1.2-2-.22-4.1-1-4.1-4.5 0-1 .35-1.8.94-2.44-.1-.22-.4-1.13.1-2.36 0 0 .77-.25 2.5.94a8.6 8.6 0 0 1 4.56 0c1.73-1.2 2.5-.94 2.5-.94.5 1.23.2 2.14.1 2.36.6.64.94 1.44.94 2.44 0 3.5-2.1 4.28-4.1 4.5.33.29.62.85.62 1.72v2.55c0 .23.15.5.6.42A9 9 0 0 0 12 3z" stroke-width="1.5" fill="none"/>`
  },
  {
    label: "Phone",
    value: "+98 993 466 9858",
    href: "tel:+989934669858",
    icon: `<path d="M6 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" stroke-width="2" fill="none"/>`
  },
];

// PROJECTS
// thumb: card image. gallery: array of {type:'image'|'video', src}.
const PROJECTS = [
  {
    id: "wind-tunnel-wing",
    tag: "Aerodynamics",
    title: "Low-Speed Wind Tunnel Wing Study",
    summary: "Lift and drag characterization of a NACA 2412 airfoil across angles of attack.",
    thumb: "assets/projects/placeholder-1.jpg",
    gallery: [
      { type: "image", src: "assets/projects/placeholder-1.jpg" },
      { type: "image", src: "assets/projects/placeholder-2.jpg" },
    ],
    description: [
      "Built and tested a scaled NACA 2412 wing section in a low-speed wind tunnel to measure lift and drag coefficients across a range of angles of attack.",
      "Compared experimental results against thin airfoil theory and XFOIL predictions, identifying separation onset near 14 degrees angle of attack."
    ],
    tools: ["XFOIL", "MATLAB", "Wind tunnel balance"],
    role: "Solo project",
    date: "2026"
  },
  {
    id: "truss-analysis",
    tag: "Structures",
    title: "Statically Indeterminate Truss Analysis",
    summary: "Force method and FEA comparison for a redundant truss under combined loading.",
    thumb: "assets/projects/placeholder-2.jpg",
    gallery: [
      { type: "image", src: "assets/projects/placeholder-2.jpg" },
    ],
    description: [
      "Solved a statically indeterminate truss by hand using the force method, then verified results with a finite element model.",
      "Discrepancy between hand calculation and FEA was under 3%, attributed to simplified pin-joint assumptions."
    ],
    tools: ["CATIA", "Hand calculation", "FEA"],
    role: "Team of 3",
    date: "2025"
  },
  {
    id: "rankine-cycle",
    tag: "Thermodynamics",
    title: "Regenerative Rankine Cycle Model",
    summary: "Efficiency modeling of a regenerative Rankine cycle with a closed feedwater heater.",
    thumb: "assets/projects/placeholder-3.jpg",
    gallery: [
      { type: "image", src: "assets/projects/placeholder-3.jpg" },
    ],
    description: [
      "Modeled a regenerative Rankine cycle with a closed feedwater heater to quantify the thermal efficiency gain over a basic cycle.",
      "Followed Sonntag's formulation, computing state properties at each stage and comparing net work output."
    ],
    tools: ["EES", "Steam tables"],
    role: "Solo project",
    date: "2026"
  },
  {
    id: "Catia-Practice-1",
    tag: "Catia",
    title: "practicing my way into mastery catia",
    summary: "a simple shape ",
    thumb: "assets/projects/Catia-Practice-1.png",
    gallery: [
      { type: "image", src: "assets/projects/Catia-Practice-1.png" },
      { type: "image", src: "assets/projects/placeholder-2.jpg" },
    ],
    description: [
      "Not much discribtion.",
    ],
    tools: ["Catia"],
    role: "Solo project",
    date: "2025"
  },
];
