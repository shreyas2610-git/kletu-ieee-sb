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

  // ----- events hero slider ---------------------------------------------

  function initEventsSlider(allEvents, today) {
    var sliderContainer = document.querySelector('[data-slider-container]');
    var dotsContainer = document.querySelector('[data-slider-dots]');
    var prevBtn = document.querySelector('[data-slider-prev]');
    var nextBtn = document.querySelector('[data-slider-next]');

    if (!sliderContainer) return;

    var isUpcomingPage = !!document.querySelector('[data-events-target="upcoming"]');
    var isPastPage = !!document.querySelector('[data-events-target="past"]');

    var sliderCandidates = allEvents.filter(function (e) { return e.slider === true; });
    var slidesData = [];
    var isFallback = false;

    if (isUpcomingPage) {
      // Prioritize upcoming events for slider
      slidesData = sliderCandidates.filter(function (e) { return !isPast(e, today); });
      // Sort upcoming: soonest first
      slidesData.sort(makeComparator(false));

      // Fallback to past if no upcoming events are scheduled
      if (slidesData.length === 0) {
        slidesData = sliderCandidates.filter(function (e) { return isPast(e, today); });
        // Sort past: most recent first
        slidesData.sort(makeComparator(true));
        isFallback = true;
      }
    } else if (isPastPage) {
      // Just past events on past page
      slidesData = sliderCandidates.filter(function (e) { return isPast(e, today); });
      slidesData.sort(makeComparator(true));
    } else {
      // Fallback generic list if loaded on other pages
      slidesData = sliderCandidates.slice().sort(makeComparator(true));
    }

    // Limit to 3 slides max
    if (slidesData.length > 3) {
      slidesData = slidesData.slice(0, 3);
    }

    if (slidesData.length === 0) {
      // Renders a fallback slide if no matching events
      sliderContainer.innerHTML =
        '<div class="events-slide active">' +
          '<div class="events-slide__bg events-slide__bg--fallback"></div>' +
          '<div class="events-slide__content container">' +
            '<span class="events-slide__eyebrow">IEEE KLETU Events</span>' +
            '<h2 class="events-slide__title">No events to showcase</h2>' +
            '<p class="events-slide__lead">Check back soon for new announcements, workshops, and hackathons.</p>' +
          '</div>' +
        '</div>';
      if (dotsContainer) dotsContainer.style.display = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    var slidesHtml = '';
    var dotsHtml = '';

    slidesData.forEach(function (ev, idx) {
      var activeClass = idx === 0 ? ' active' : '';
      var detail = ev.detailUrl || ('events/' + ev.slug + '.html');
      
      // Determine Eyebrow / Badges based on page and fallback states
      var isUpcomingEvent = !isPast(ev, today);
      var label = '';
      if (isUpcomingPage) {
        if (isFallback) {
          label = 'Featured Past Event';
        } else {
          label = 'Featured Upcoming Event';
        }
      } else {
        label = 'Featured Past Event';
      }

      var categoryLabel = ev.category ? (label + ' &middot; ' + escapeHtml(ev.category)) : label;

      slidesHtml +=
        '<div class="events-slide' + activeClass + '" data-slide-index="' + idx + '">' +
          '<div class="events-slide__bg" style="background-image: url(\'' + escapeHtml(ev.image || FALLBACK_IMAGE) + '\')"></div>' +
          '<div class="events-slide__content container">' +
            '<span class="events-slide__eyebrow">' + categoryLabel + '</span>' +
            '<h2 class="events-slide__title">' + escapeHtml(ev.title) + '</h2>' +
            '<p class="events-slide__lead">' + escapeHtml(ev.description || '') + '</p>' +
            '<div class="events-slide__actions">' +
              '<a href="' + escapeHtml(detail) + '" class="btn btn--primary">Learn more <i class="ph ph-arrow-right"></i></a>' +
            '</div>' +
          '</div>' +
        '</div>';

      dotsHtml += '<button class="slider-dot' + (idx === 0 ? ' active' : '') + '" data-dot-index="' + idx + '" aria-label="Go to slide ' + (idx + 1) + '"></button>';
    });

    sliderContainer.innerHTML = slidesHtml;
    if (dotsContainer) {
      dotsContainer.innerHTML = dotsHtml;
    }

    var currentSlide = 0;
    var totalSlides = slidesData.length;
    var autoplayInterval = null;

    function showSlide(index) {
      if (index < 0) index = totalSlides - 1;
      else if (index >= totalSlides) index = 0;

      var slides = sliderContainer.querySelectorAll('.events-slide');
      var dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];

      slides.forEach(function (slide, idx) {
        slide.classList.toggle('active', idx === index);
      });

      dots.forEach(function (dot, idx) {
        dot.classList.toggle('active', idx === index);
      });

      currentSlide = index;
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function startAutoplay() {
      stopAutoplay();
      if (totalSlides > 1) {
        autoplayInterval = setInterval(nextSlide, 6000);
      }
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); startAutoplay(); });
    if (dotsContainer) {
      dotsContainer.addEventListener('click', function (e) {
        var dot = e.target.closest('.slider-dot');
        if (!dot) return;
        var idx = parseInt(dot.getAttribute('data-dot-index'), 10);
        showSlide(idx);
        startAutoplay();
      });
    }

    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  // ----- init -----------------------------------------------------------

  function init() {
    // Check if local CMS API is available (http://localhost:5000)
    if (typeof fetch === 'function') {
      fetch('http://localhost:5000/api/v1/public/events')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && Array.isArray(data.events) && data.events.length > 0) {
            var cmsEvents = data.events.map(function (ev) {
              return {
                slug: ev.slug,
                title: ev.title,
                date: ev.event_date ? String(ev.event_date).slice(0, 10) : '',
                image: ev.banner_url || 'assets/images/logo.webp',
                description: ev.summary || '',
                category: 'Event',
                priority: 10,
                slider: true,
                detailUrl: 'events/' + ev.slug + '.html'
              };
            });

            // Merge CMS published events into window.EVENTS
            var existingSlugs = cmsEvents.map(function (e) { return e.slug; });
            var legacyEvents = (window.EVENTS || []).filter(function (e) {
              return existingSlugs.indexOf(e.slug) === -1;
            });

            window.EVENTS = cmsEvents.concat(legacyEvents);
          }
          renderPageEvents();
        })
        .catch(function () {
          renderPageEvents(); // Fallback to hardcoded events-data.js if CMS server is offline
        });
    } else {
      renderPageEvents();
    }
  }

  function renderPageEvents() {
    var allEvents = window.EVENTS || [];
    var today = startOfToday();

    // Initialize Hero Slider
    initEventsSlider(allEvents, today);

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
