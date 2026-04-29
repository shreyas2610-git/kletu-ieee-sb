/* ==========================================================================
   societies-data.js — single source of truth for the Societies page tabs.

   HOW TO ADD / UPDATE A SOCIETY

     1. Drop the chapter logo / hero image into:
          assets/societies/<slug>.webp
        (use a kebab-case slug — no spaces; this also identifies the office
        bearers page below.)

     2. Edit / add an object in the SOCIETIES array. Required fields only —
        the rest are optional and will be rendered if present.

     3. The order in this array is the order tabs appear on the page.

     4. Each entry's office-bearers slot defaults to
          office-bearers/<slug>.html
        unless you set `officeBearersUrl` explicitly.

   The tab itself only shows the `abbr` (kept tight on purpose). Everything
   else lives in the panel below the tabs.
   ========================================================================== */

(function () {
  'use strict';

  var SOCIETIES = [
    {
      slug: 'computer-society',
      abbr: 'CS',
      name: 'IEEE Computer Society',
      status: 'Active',
      statusNote: 'Approved 04 Dec 2026',
      tagline: 'The largest community of computing professionals worldwide.',
      description: 'The Computer Society chapter at KLETU is our hub for everything software, systems, and computing. We run paper-reading circles, hands-on workshops, and project nights through the academic year.',
      image: 'assets/societies/computer-society.webp'
    },
    {
      slug: 'communications-society',
      abbr: 'ComSoc',
      name: 'IEEE Communications Society',
      status: 'Active',
      statusNote: 'Membership promotion ongoing',
      tagline: 'Bridging the engineers shaping how the world connects.',
      description: 'ComSoc anchors our work on networks, signals, and wireless systems. The chapter coordinates with industry partners on guest lectures and spectrum-related labs.',
      image: 'assets/societies/communications-society.webp'
    },
    {
      slug: 'power-electronics-society',
      abbr: 'PES',
      name: 'IEEE Power Electronics Society',
      status: 'Petition endorsed',
      statusNote: 'Approval in progress',
      tagline: 'Energy-efficient electronics for a power-hungry world.',
      description: 'Our Power Electronics chapter focuses on converters, drives, and renewable-integration projects. The petition is endorsed and the chapter is on track for activation.',
      image: 'assets/societies/power-electronics-society.webp'
    },
    {
      slug: 'power-and-energy-society',
      abbr: 'PELS',
      name: 'IEEE Power & Energy Society',
      status: 'Petition endorsed',
      statusNote: 'Approval in progress',
      tagline: 'Generating, transmitting, distributing — the grid, end to end.',
      description: 'PELS at KLETU will host work on power systems, smart grids, and sustainable energy. Petition endorsed and activation pending the IEEE review cycle.',
      image: 'assets/societies/power-and-energy-society.webp'
    },
    {
      slug: 'robotics-and-automation-society',
      abbr: 'RAS',
      name: 'IEEE Robotics & Automation Society',
      status: 'Petition endorsed',
      statusNote: 'Approval in progress',
      tagline: 'Where mechanical, electrical, and software disciplines meet.',
      description: 'The RAS chapter brings together hardware builders and ML practitioners around robotics — perception stacks, control systems, and competitions like Robocon.',
      image: 'assets/societies/robotics-and-automation-society.webp'
    }
  ];

  // Compute fallbacks
  SOCIETIES.forEach(function (s) {
    if (!s.officeBearersUrl) s.officeBearersUrl = 'office-bearers/' + s.slug + '.html';
  });

  // Globals consumed by js/society-tabs.js
  window.TAB_DATA = SOCIETIES;
  window.TAB_CONFIG = {
    kind: 'society',
    chairLabel: 'office bearers',         // wording used inside the panel
    officeBearersGlobal: {
      execoms: 'office-bearers/execoms.html',
      stb: 'office-bearers/stb.html'
    },
    placeholderAlt: 'IEEE KLETU technical society'
  };
})();
