/* ==========================================================================
   society-tabs.js — shared tab renderer used by both societies.html and
   affinity-groups.html.

   Reads:
     window.TAB_DATA   — array of items (see societies-data.js / affinity-groups-data.js)
     window.TAB_CONFIG — { kind, chairLabel, officeBearersGlobal, placeholderAlt }

   Renders:
     [data-tab-bar]     — list of tab buttons (one per item, just the abbr)
     [data-tab-image]   — <figure> whose <img> swaps on tab change
     [data-tab-content] — panel rendered fresh on each tab change
   ========================================================================== */

(function () {
  'use strict';

  var FALLBACK_IMAGE = 'assets/images/logo.webp';

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildPanel(item, config) {
    var ob = config.officeBearersGlobal || {};
    var teamLabel = (item.abbr || '').toUpperCase() + ' team';

    var statusHtml = item.status
      ? '<span class="society-panel__status">' +
          '<span class="society-panel__status-dot" data-status="' +
            escapeHtml(item.status.toLowerCase().replace(/\s+/g, '-')) + '"></span>' +
          escapeHtml(item.status) +
          (item.statusNote ? ' &middot; ' + escapeHtml(item.statusNote) : '') +
        '</span>'
      : '';

    var taglineHtml = item.tagline
      ? '<p class="society-panel__tagline">' + escapeHtml(item.tagline) + '</p>'
      : '';

    var descriptionHtml = item.description
      ? '<p class="society-panel__description">' + escapeHtml(item.description) + '</p>'
      : '';

    var obLinksHtml =
      '<div class="society-panel__office-bearers">' +
        '<span class="society-panel__office-bearers-label">Office bearers</span>' +
        '<div class="society-panel__ob-links">' +
          (item.officeBearersUrl
            ? '<a href="' + escapeHtml(item.officeBearersUrl) + '" class="ob-link">' +
                '<span>' + escapeHtml(teamLabel) + '</span>' +
                '<i class="ph ph-arrow-up-right" aria-hidden="true"></i>' +
              '</a>'
            : '') +
          (ob.execoms
            ? '<a href="' + escapeHtml(ob.execoms) + '" class="ob-link">' +
                '<span>Execoms</span>' +
                '<i class="ph ph-arrow-up-right" aria-hidden="true"></i>' +
              '</a>'
            : '') +
          (ob.stb
            ? '<a href="' + escapeHtml(ob.stb) + '" class="ob-link">' +
                '<span>STB office bearers</span>' +
                '<i class="ph ph-arrow-up-right" aria-hidden="true"></i>' +
              '</a>'
            : '') +
        '</div>' +
      '</div>';

    return (
      '<article class="society-panel">' +
        '<div class="society-panel__head">' +
          '<span class="society-panel__abbr" aria-hidden="true">' + escapeHtml(item.abbr) + '</span>' +
          '<div class="society-panel__head-meta">' +
            statusHtml +
            '<h2 class="society-panel__name">' + escapeHtml(item.name) + '</h2>' +
            taglineHtml +
          '</div>' +
        '</div>' +
        descriptionHtml +
        obLinksHtml +
      '</article>'
    );
  }

  function init() {
    var data = window.TAB_DATA || [];
    var config = window.TAB_CONFIG || {};
    if (!data.length) return;

    var tabBar = document.querySelector('[data-tab-bar]');
    var imageWrap = document.querySelector('[data-tab-image]');
    var imageEl = imageWrap ? imageWrap.querySelector('img') : null;
    var content = document.querySelector('[data-tab-content]');
    if (!tabBar || !content) return;

    // -------- render tab buttons (abbr only — kept tight) -----------------
    tabBar.innerHTML = data
      .map(function (item, i) {
        return (
          '<button type="button" class="society-tab' + (i === 0 ? ' is-active' : '') +
            '" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') +
            '" data-tab-index="' + i + '">' +
            escapeHtml(item.abbr) +
          '</button>'
        );
      })
      .join('');

    // -------- swap image (no layout shift, fade through) ------------------
    function swapImage(item) {
      if (!imageEl) return;
      // Fade out → swap src → fade in
      imageEl.style.opacity = '0';
      var src = item.image || FALLBACK_IMAGE;
      var alt = item.name || config.placeholderAlt || '';

      var swap = function () {
        imageEl.removeEventListener('transitionend', swap);
        imageEl.src = src;
        imageEl.alt = alt;
        imageEl.classList.remove('society-banner__img--placeholder');
        imageEl.onerror = function () {
          this.onerror = null;
          this.src = FALLBACK_IMAGE;
          this.classList.add('society-banner__img--placeholder');
        };
        // next paint → fade back in
        requestAnimationFrame(function () { imageEl.style.opacity = '1'; });
      };
      imageEl.addEventListener('transitionend', swap, { once: true });
      // safety net — if no transition fires (e.g. reduced motion), trigger manually
      setTimeout(function () {
        if (imageEl.style.opacity === '0') swap();
      }, 220);
    }

    // -------- render the panel for a given index -------------------------
    function showItem(i) {
      var item = data[i];
      if (!item) return;
      content.innerHTML = buildPanel(item, config);
      swapImage(item);

      Array.prototype.forEach.call(tabBar.querySelectorAll('.society-tab'), function (btn, j) {
        var active = (j === i);
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
        btn.setAttribute('tabindex', active ? '0' : '-1');
      });
    }

    // initial render
    showItem(0);

    // -------- click handler ----------------------------------------------
    tabBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.society-tab');
      if (!btn || !tabBar.contains(btn)) return;
      var idx = Number(btn.getAttribute('data-tab-index'));
      if (!isNaN(idx)) showItem(idx);
    });

    // -------- keyboard support (ArrowLeft/Right, Home, End) --------------
    tabBar.addEventListener('keydown', function (e) {
      var current = tabBar.querySelector('.society-tab.is-active');
      if (!current) return;
      var idx = Number(current.getAttribute('data-tab-index'));
      var max = data.length - 1;
      var next = idx;

      if (e.key === 'ArrowRight') next = idx >= max ? 0 : idx + 1;
      else if (e.key === 'ArrowLeft') next = idx <= 0 ? max : idx - 1;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = max;
      else return;

      e.preventDefault();
      showItem(next);
      var btn = tabBar.querySelector('[data-tab-index="' + next + '"]');
      if (btn) btn.focus();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
