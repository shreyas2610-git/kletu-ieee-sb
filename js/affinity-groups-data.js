/* ==========================================================================
   affinity-groups-data.js — single source of truth for the Affinity Groups
   page tabs. Same shape as societies-data.js, just a different list.
   ========================================================================== */

(function () {
  'use strict';

  var AFFINITY_GROUPS = [
    {
      slug: 'women-in-engineering',
      abbr: 'WIE',
      name: 'IEEE Women in Engineering',
      status: 'Petition endorsed',
      statusNote: 'Approval in progress',
      tagline: 'A global network supporting women technologists and innovators.',
      description: 'WIE at KLETU works on mentorship, technical workshops, and outreach programs that make engineering more representative — both within campus and through partnerships beyond it.',
      image: 'assets/affinity/women-in-engineering.webp'
    }
  ];

  AFFINITY_GROUPS.forEach(function (g) {
    if (!g.officeBearersUrl) g.officeBearersUrl = 'office-bearers/' + g.slug + '.html';
  });

  window.TAB_DATA = AFFINITY_GROUPS;
  window.TAB_CONFIG = {
    kind: 'affinity-group',
    chairLabel: 'office bearers',
    officeBearersGlobal: {
      execoms: 'office-bearers/execoms.html',
      stb: 'office-bearers/stb.html'
    },
    placeholderAlt: 'IEEE KLETU affinity group'
  };
})();
