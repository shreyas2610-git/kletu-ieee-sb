/* ==========================================================================
   office-bearers.js — Renders the Office Bearers page.
   Reads OFFICE_BEARERS_DATA (global from office-bearers-data.js).
   Three accordion panels: Execom, STB Office Bearers, Society & Affinity
   Group Office Bearers. Year grouping inside each panel (2026, then 2025).
   ========================================================================== */

(function () {
  'use strict';

  if (typeof OFFICE_BEARERS_DATA === 'undefined') return;

  /* ---------------------------------------------------------------------- */
  /*  Section config — each entry becomes one accordion panel               */
  /* ---------------------------------------------------------------------- */
  var SECTIONS = [
    {
      key: 'execom',
      title: 'Executive Committee',
      subtitle: 'The elected student leadership that drives branch strategy, membership, and day-to-day operations.',
    },
    {
      key: 'stb',
      title: 'STB Office Bearers',
      subtitle: 'Faculty counsellors and mentors who guide the branch and liaise with IEEE Bangalore Section.',
    },
    {
      key: 'societies',
      title: 'Society & Affinity Group Office Bearers',
      subtitle: 'Chairs and secretaries of the technical chapters and affinity groups under the branch.',
    },
  ];

  /* ---------------------------------------------------------------------- */
  /*  Helpers                                                                */
  /* ---------------------------------------------------------------------- */

  /**
   * Returns a two-letter initial from a name.
   * e.g. "Rushikesh Patil" → "RP"
   */
  function getInitials(name) {
    var parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  /**
   * Build a single bearer card.
   */
  function createCard(person, index) {
    var card = document.createElement('article');
    card.className = 'ob-card reveal';
    card.style.setProperty('--card-index', String(index));

    var hasPhoto = person.photo && person.photo.trim() !== '';

    card.innerHTML =
      '<div class="ob-card__photo">' +
        (hasPhoto
          ? '<img src="' + person.photo + '" alt="' + person.name + '" ' +
            'onerror="this.onerror=null;this.parentElement.innerHTML=\'<span class=ob-card__initials>' + getInitials(person.name) + '</span>\'">'
          : '<span class="ob-card__initials">' + getInitials(person.name) + '</span>') +
      '</div>' +
      '<div class="ob-card__info">' +
        '<h4 class="ob-card__name">' + person.name + '</h4>' +
        '<span class="ob-card__role">' + person.role + '</span>' +
      '</div>';

    return card;
  }

  /* ---------------------------------------------------------------------- */
  /*  Build the year-grouped card grid for a given section key              */
  /* ---------------------------------------------------------------------- */
  function buildSectionContent(sectionKey) {
    var frag = document.createDocumentFragment();
    var years = Object.keys(OFFICE_BEARERS_DATA).sort(function (a, b) {
      return parseInt(b, 10) - parseInt(a, 10); // 2026 before 2025
    });

    years.forEach(function (year) {
      var yearData = OFFICE_BEARERS_DATA[year];
      var people = yearData[sectionKey];
      if (!people || !people.length) return;

      // Year header
      var yearHeader = document.createElement('div');
      yearHeader.className = 'ob-year-header reveal';
      yearHeader.innerHTML =
        '<span class="ob-year-header__label">' + year + '</span>' +
        '<span class="ob-year-header__line"></span>';
      frag.appendChild(yearHeader);

      // Card grid
      var grid = document.createElement('div');
      grid.className = 'ob-grid';

      people.forEach(function (person, i) {
        grid.appendChild(createCard(person, i));
      });

      frag.appendChild(grid);
    });

    return frag;
  }

  /* ---------------------------------------------------------------------- */
  /*  Accordion behaviour                                                    */
  /* ---------------------------------------------------------------------- */
  function initAccordion() {
    var container = document.querySelector('[data-ob-accordion]');
    if (!container) return;

    SECTIONS.forEach(function (section, idx) {
      // Panel wrapper
      var panel = document.createElement('div');
      panel.className = 'ob-panel' + (idx === 0 ? ' is-open' : '');
      panel.setAttribute('data-ob-panel', section.key);

      // Trigger button
      var trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'ob-panel__trigger';
      trigger.setAttribute('aria-expanded', idx === 0 ? 'true' : 'false');
      trigger.id = 'ob-trigger-' + section.key;
      trigger.innerHTML =
        '<div class="ob-panel__trigger-text">' +
          '<h3 class="ob-panel__title">' + section.title + '</h3>' +
          '<p class="ob-panel__subtitle">' + section.subtitle + '</p>' +
        '</div>' +
        '<span class="ob-panel__caret"><i class="ph ph-caret-down" aria-hidden="true"></i></span>';

      // Content region
      var content = document.createElement('div');
      content.className = 'ob-panel__content';
      content.setAttribute('role', 'region');
      content.setAttribute('aria-labelledby', trigger.id);
      content.appendChild(buildSectionContent(section.key));

      panel.appendChild(trigger);
      panel.appendChild(content);
      container.appendChild(panel);

      // Click handler
      trigger.addEventListener('click', function () {
        var isOpen = panel.classList.contains('is-open');

        // Close all
        container.querySelectorAll('.ob-panel').forEach(function (p) {
          p.classList.remove('is-open');
          p.querySelector('.ob-panel__trigger').setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked
        if (!isOpen) {
          panel.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          // Re-trigger reveal animations on newly visible cards
          requestAnimationFrame(function () {
            observeReveals(content);
          });
        }
      });
    });

    // Initial reveal for the first open panel
    var firstContent = container.querySelector('.ob-panel.is-open .ob-panel__content');
    if (firstContent) {
      requestAnimationFrame(function () { observeReveals(firstContent); });
    }
  }

  /* ---------------------------------------------------------------------- */
  /*  Observe .reveal elements inside a container                            */
  /* ---------------------------------------------------------------------- */
  function observeReveals(root) {
    var els = root.querySelectorAll('.reveal:not(.revealed)');
    if (!els.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------- */
  /*  Init on DOM ready                                                      */
  /* ---------------------------------------------------------------------- */
  function init() {
    initAccordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
