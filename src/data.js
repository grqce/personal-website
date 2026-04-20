/* ─── SUBWAY LINE PATHS ────────────────────────────────────
 * Real metro-style paths: horizontal + vertical + 45° diagonals,
 * with rounded corners at every bend.
 * ──────────────────────────────────────────────────────── */
const LINE_PATHS = {
  about:
    `M 80,310 L 285,310 Q 300,310 315,295
     L 435,175 Q 450,160 465,160
     L 735,160 Q 750,160 765,175
     L 885,295 Q 900,310 915,310
     L 1140,310`,
  coding:
    `M 200,80 L 200,295 Q 200,310 215,325
     L 345,455 Q 360,470 375,470
     L 585,470 Q 600,470 600,485
     L 600,620`,
  product:
    `M 1000,80 L 1000,265 Q 1000,280 985,295
     L 855,425 Q 840,440 840,455
     L 840,600`,
  art:
    `M 80,530 L 365,530 Q 380,530 395,515
     L 545,365 Q 560,350 575,350
     L 785,350 Q 800,350 815,335
     L 935,215 Q 950,200 965,200
     L 1140,200`,
};

/* ─── INTERCHANGES ──────────────────────────────────────
 * Points where two lines cross — drawn as transfer circles.
 * ──────────────────────────────────────────────────────── */
const INTERCHANGES = [
  { x: 200,  y: 310, lines: ['about', 'coding']  },
  { x: 440,  y: 470, lines: ['coding', 'art']    },
  { x: 870,  y: 280, lines: ['about', 'art']     },
  { x: 970,  y: 310, lines: ['about', 'product'] },
  { x: 1000, y: 200, lines: ['product', 'art']   },
];

/* ─── LINES ─────────────────────────────────────────────
 * Each line carries its color, stations, and portfolio items.
 * Edit copy/projects here — the map + portfolio pages update automatically.
 * ──────────────────────────────────────────────────────── */
const LINES = [
  {
    id: 'about', name: 'About Me', badge: 'GL', color: '#C0392B',
    path: LINE_PATHS.about,
    stations: [
      { id: 'a1', name: 'Grace Li',   x:   80, y: 310, terminal: true },
      { id: 'a2', name: 'Background', x:  375, y: 235 },
      { id: 'a3', name: 'Education',  x:  600, y: 160 },
      { id: 'a4', name: 'Skills',     x:  825, y: 235 },
      { id: 'a5', name: 'Contact',    x: 1140, y: 310, terminal: true },
    ],
    items: [
      { title: 'Background',  year: '—',         tags: ['Penn M&T', 'Engineering', 'Wharton'],           desc: "Software engineer passionate about technology, design, and business. CS + Finance & Statistics at Penn's M&T dual-degree program." },
      { title: 'Education',   year: '2022–2026', tags: ['UPenn', 'SEAS + Wharton'],                      desc: "Dual degree in Computer & Information Science (SEAS) and Finance & Statistics (Wharton) via Penn's Management & Technology program." },
      { title: 'Skills',      year: '—',         tags: ['React', 'Python', 'TypeScript', 'SQL', 'Figma'], desc: 'Full-stack development, product design, user research, data analysis, systems thinking.' },
      { title: 'Interests',   year: '—',         tags: ['Geography', 'NYT Crosswords', 'Arts'],          desc: 'Geography, visual & performing arts, NYT crosswords, community impact, and exploring cities through their transit systems.' },
      { title: 'Contact',     year: '—',         tags: ['Open to opportunities'],                        desc: 'ligrace@wharton.upenn.edu — open to internships, collaborations, and interesting projects.' },
    ],
  },
  {
    id: 'coding', name: 'Programming', badge: 'PR', color: '#1845AA',
    path: LINE_PATHS.coding,
    stations: [
      { id: 'c1', name: 'GitHub',      x: 200, y:  80, terminal: true },
      { id: 'c2', name: 'Web Dev',     x: 200, y: 195 },
      { id: 'c3', name: 'Stack',       x: 280, y: 390 },
      { id: 'c4', name: 'Data',        x: 500, y: 470 },
      { id: 'c5', name: 'Open Source', x: 600, y: 548 },
      { id: 'c6', name: 'Dev Blog',    x: 600, y: 620, terminal: true },
    ],
    items: [
      { title: 'Web Development', year: '2024–2025', tags: ['React', 'Node.js', 'PostgreSQL'], desc: 'Placeholder — describe your web development projects here.' },
      { title: 'Project Beta',    year: '2025',      tags: ['TypeScript', 'Next.js'],          desc: 'Placeholder — add your project description here.' },
      { title: 'Tools & Stack',   year: '—',         tags: ['React', 'Python', 'Git', 'Figma'], desc: 'Placeholder — describe your technical toolkit.' },
      { title: 'Data Projects',   year: '2024',      tags: ['Python', 'Pandas', 'Viz'],        desc: 'Placeholder — describe your data science work.' },
      { title: 'Open Source',     year: '2024–2025', tags: ['GitHub', 'Contributions'],        desc: 'Placeholder — describe your open source contributions.' },
    ],
  },
  {
    id: 'product', name: 'Product / UX', badge: 'PX', color: '#1A7A4A',
    path: LINE_PATHS.product,
    stations: [
      { id: 'p1', name: 'Philosophy',    x: 1000, y:  80, terminal: true },
      { id: 'p2', name: 'Research',      x: 1000, y: 172 },
      { id: 'p3', name: 'Case Study 01', x:  905, y: 375 },
      { id: 'p4', name: 'Case Study 02', x:  840, y: 522 },
      { id: 'p5', name: 'Process',       x:  840, y: 600, terminal: true },
    ],
    items: [
      { title: 'Design Philosophy', year: '—',    tags: ['User-Centered', 'Systems'],             desc: 'Design is empathy made tangible. Great products solve real problems with minimal friction.' },
      { title: 'Case Study 01',     year: '2025', tags: ['UX Research', 'Prototyping', 'Figma'],  desc: 'Placeholder — add your first product case study here.' },
      { title: 'Case Study 02',     year: '2024', tags: ['Product Design', 'User Testing'],       desc: 'Placeholder — add your second case study here.' },
      { title: 'Process & Tools',   year: '—',    tags: ['Figma', 'Notion', 'Miro', 'Maze'],      desc: 'Placeholder — describe your UX workflow from discovery to delivery.' },
    ],
  },
  {
    id: 'art', name: 'Art & Illustration', badge: 'AI', color: '#C05A10',
    path: LINE_PATHS.art,
    stations: [
      { id: 'ar1', name: 'Shop',            x:   80, y: 530, terminal: true },
      { id: 'ar2', name: 'Performing Arts', x:  220, y: 530 },
      { id: 'ar3', name: 'Illustrations',   x:  620, y: 350 },
      { id: 'ar4', name: 'Digital Art',     x:  720, y: 350 },
      { id: 'ar5', name: 'Gallery',         x: 1140, y: 200, terminal: true },
    ],
    items: [
      { title: 'Digital Illustration', year: '2024–2025', tags: ['Procreate', 'Adobe'],           desc: 'Placeholder — showcase your digital illustration work.' },
      { title: 'Performing Arts',      year: '—',         tags: ['Theater', 'Dance'],             desc: 'Placeholder — describe your performing arts background.' },
      { title: 'Print & Editorial',    year: '2024',      tags: ['Zine', 'Print', 'Editorial'],   desc: 'Placeholder — describe your print and editorial work.' },
      { title: 'Sketchbook',           year: 'Ongoing',   tags: ['Process', 'Sketches'],          desc: 'Placeholder — share your sketchbook and process work.' },
      { title: 'Commissions & Shop',   year: '—',         tags: ['Available', 'Custom work'],     desc: 'Placeholder — describe your commission availability.' },
    ],
  },
];

const LINE_MAP = Object.fromEntries(LINES.map(l => [l.id, l]));

/* ─── METRO CARDS (splash collage) ─────────────────────────
 * Grid of transit cards from around the world. Each one is
 * shown on the splash; hovering lifts it, clicking enters the
 * map.
 *   • `src`       — path to a real card image (e.g. assets/cards/london.png)
 *   • `color`     — fallback bg for the stylized placeholder
 *   • `textColor` — 'light' (default) or 'dark' for the city label
 *   • `tilt`      — small rotation in degrees (-5 to 5) for vibes
 *   • `lineId`    — optional future routing; unused today
 * Add/remove freely — the splash re-flows automatically.
 * ──────────────────────────────────────────────────────── */
const PLACEHOLDER_CARD = 'assets/metrocard_front-Photoroom.png';

const METRO_CARDS = [
  { id: 'nyc',    name: 'New York',    src: PLACEHOLDER_CARD, tilt: -2 },
  { id: 'london', name: 'London',      src: PLACEHOLDER_CARD, tilt:  3 },
  { id: 'tokyo',  name: 'Tokyo',       src: PLACEHOLDER_CARD, tilt: -4 },
  { id: 'paris',  name: 'Paris',       src: PLACEHOLDER_CARD, tilt:  2 },
  { id: 'hk',     name: 'Hong Kong',   src: PLACEHOLDER_CARD, tilt: -3 },
  { id: 'seoul',  name: 'Seoul',       src: PLACEHOLDER_CARD, tilt:  4 },
  { id: 'berlin', name: 'Berlin',      src: PLACEHOLDER_CARD, tilt: -2 },
  { id: 'moscow', name: 'Moscow',      src: PLACEHOLDER_CARD, tilt:  3 },
  { id: 'sg',     name: 'Singapore',   src: PLACEHOLDER_CARD, tilt: -4 },
  { id: 'sydney', name: 'Sydney',      src: PLACEHOLDER_CARD, tilt:  2 },
  { id: 'toronto',name: 'Toronto',     src: PLACEHOLDER_CARD, tilt: -3 },
  { id: 'mexico', name: 'Mexico City', src: PLACEHOLDER_CARD, tilt:  4 },
];
