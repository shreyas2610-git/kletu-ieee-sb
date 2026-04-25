/* ==========================================================================
   events.js — reads window.EVENTS (from js/events-data.js), splits into
   upcoming vs. past based on today's date, sorts by priority then date,
   and renders an event card into each [data-events-target].
   ========================================================================== */

(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var FALLBACK_IMAGE = 'assets/images/logo.webp';

  // ----- helpers --------------------------------------------------------

  function startOfToday() {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function parseDate(value) {
    // Accept "YYYY-MM-DD" or full ISO. Fall back to epoch so bad data sorts last.
    var d = new Date(value);
    return isNaN(d.getTime()) ? new Date(0) : d;
  }

  function isPast(event, today) {
    return parseDate(event.date) < today;
  }

  // Primary sort: priority desc. Secondary: earlier date first for upcoming,
  // more-recent date first for past.
  function makeComparator(pastSection) {
    return function (a, b) {
      if (a.priority !== b.priority) return b.priority - a.priority;
      var ad = parseDate(a.date).getTime();
      var bd = parseDate(b.date).getTime();
      return pastSection ? (bd - ad) : (ad - bd);
    };
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ----- card builder ---------------------------------------------------

  function buildCard(event, index) {
    var date = parseDate(event.date);
    var day = String(date.getDate()).padStart(2, '0');
    var month = MONTHS[date.getMonth()] || '';
    var iso = event.date || '';
    var detail = event.detailUrl || ('events/' + event.slug + '.html');

    var categoryHtml = event.category
      ? '<span class="event-card__category">' + escapeHtml(event.category) + '</span>'
      : '';

    var card = document.createElement('article');
    card.className = 'event-card';
    card.style.setProperty('--card-index', String(index));

    card.innerHTML =
      '<a href="' + escapeHtml(detail) + '" class="event-card__link" aria-label="Read about ' + escapeHtml(event.title) + '">' +
        '<div class="event-card__media">' +
          '<img src="' + escapeHtml(event.image || FALLBACK_IMAGE) + '" alt="' + escapeHtml(event.title) + '" ' +
            'onerror="this.onerror=null;this.src=\'' + FALLBACK_IMAGE + '\';this.classList.add(\'event-card__media-img--placeholder\');">' +
          '<time class="event-card__date" datetime="' + escapeHtml(iso) + '">' +
            '<span class="event-card__date-day">' + day + '</span>' +
            '<span class="event-card__date-month">' + month + '</span>' +
          '</time>' +
          categoryHtml +
        '</div>' +
        '<div class="event-card__body">' +
          '<h3 class="event-card__title">' + escapeHtml(event.title) + '</h3>' +
          '<p class="event-card__description">' + escapeHtml(event.description || '') + '</p>' +
          '<span class="event-card__cta">' +
            'Learn more' +
            '<i class="ph ph-arrow-right" aria-hidden="true"></i>' +
          '</span>' +
        '</div>' +
      '</a>';

    return card;
  }

  // ----- renderer -------------------------------------------------------

  function renderInto(target, events, pastSection) {
    if (!target) return 0;

    target.innerHTML = '';

    var sorted = events.slice().sort(makeComparator(pastSection));
    sorted.forEach(function (ev, i) {
      target.appendChild(buildCard(ev, i));
    });

    return sorted.length;
  }

  function formatDateLong(value) {
    var d = parseDate(value);
    return DAYS[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }

  // Picks the chronologically-relevant event for the section header detail line:
  //   upcoming → soonest in the future
  //   past     → most recently passed
  function pickReferenceEvent(events, isPast) {
    if (!events.length) return null;
    var byDate = events.slice().sort(function (a, b) {
      return parseDate(a.date).getTime() - parseDate(b.date).getTime();
    });
    return isPast ? byDate[byDate.length - 1] : byDate[0];
  }

  function updateMeta(kind, events, isPast) {
    var countEl = document.querySelector('[data-events-count="' + kind + '"]');
    var detailEl = document.querySelector('[data-events-detail="' + kind + '"]');
    var n = events.length;

    if (countEl) {
      var noun = isPast ? 'past event' : 'upcoming event';
      countEl.textContent = n === 0
        ? (isPast ? 'Archive empty' : 'Nothing scheduled yet')
        : (n + ' ' + noun + (n === 1 ? '' : 's'));
    }

    if (detailEl) {
      if (n === 0) {
        detailEl.hidden = true;
        detailEl.innerHTML = '';
      } else {
        var ref = pickReferenceEvent(events, isPast);
        var label = isPast ? 'Most recent' : 'Next';
        detailEl.hidden = false;
        detailEl.innerHTML = '<strong>' + label + '</strong>' + formatDateLong(ref.date);
      }
    }
  }

  function toggleEmpty(kind, show) {
    var el = document.querySelector('[data-events-empty="' + kind + '"]');
    if (!el) return;
    el.hidden = !show;
  }

  function revealCards(root) {
    var cards = root.querySelectorAll('.event-card');
    if (!cards.length || !('IntersectionObserver' in window)) {
      cards.forEach(function (c) { c.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    cards.forEach(function (c) { io.observe(c); });
  }

  // ----- init -----------------------------------------------------------

  function init() {
    var allEvents = window.EVENTS || [];
    var today = startOfToday();

    var upcoming = allEvents.filter(function (e) { return !isPast(e, today); });
    var past = allEvents.filter(function (e) {  return  isPast(e, today); });

    var upcomingTarget = document.querySelector('[data-events-target="upcoming"]');
    var pastTarget = document.querySelector('[data-events-target="past"]');

    var nUp = renderInto(upcomingTarget, upcoming, false);
    var nPast = renderInto(pastTarget, past, true);

    updateMeta('upcoming', upcoming, false);
    updateMeta('past', past, true);
    toggleEmpty('upcoming', nUp === 0);
    toggleEmpty('past', nPast === 0);

    if (upcomingTarget) revealCards(upcomingTarget);
    if (pastTarget) revealCards(pastTarget);

    // If the URL has a hash (#upcoming / #past), scroll it into view after
    // cards render (otherwise the hash jump happens before layout settles).
    if (window.location.hash) {
      var target = document.getElementById(window.location.hash.slice(1));
      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
