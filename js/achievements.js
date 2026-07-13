/* ==========================================================================
   achievements.js — reads window.ACHIEVEMENTS (from js/achievements-data.js),
   manages the Hero Section Slider, statistics counters, category filtering,
   live search, and dynamic card generation.
   ========================================================================== */

(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var FALLBACK_IMAGE = 'assets/images/logo.webp';

  var activeCategory = 'all';
  var searchFilterText = '';

  // ----- Helpers --------------------------------------------------------

  function parseDate(value) {
    var d = new Date(value);
    return isNaN(d.getTime()) ? new Date(0) : d;
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

  function compareAchievements(a, b) {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return parseDate(b.date).getTime() - parseDate(a.date).getTime();
  }

  // ----- Card Builder ---------------------------------------------------

  function buildCard(ach, index) {
    var date = parseDate(ach.date);
    var day = String(date.getDate()).padStart(2, '0');
    var month = MONTHS[date.getMonth()] || '';
    var year = date.getFullYear();
    var detail = ach.detailUrl;

    var badgeHtml = ach.category
      ? '<span class="achievement-card__badge"><i class="ph ph-trophy" aria-hidden="true"></i> ' + escapeHtml(ach.category) + '</span>'
      : '';

    var card = document.createElement('article');
    card.className = 'achievement-card reveal';
    card.setAttribute('data-category', ach.category.toLowerCase());
    card.style.setProperty('--reveal-index', String(index % 3)); // Stagger animations in groups of 3

    var imageSrc = ach.cardImage || ach.detailImage || FALLBACK_IMAGE;

    var innerContent = 
      '<div class="achievement-card__media">' +
        '<img src="' + escapeHtml(imageSrc) + '" alt="' + escapeHtml(ach.title) + '" ' +
          'onerror="this.onerror=null;this.src=\'' + FALLBACK_IMAGE + '\';this.classList.add(\'achievement-card__media-img--placeholder\');">' +
        badgeHtml +
      '</div>' +
      '<div class="achievement-card__body">' +
        '<time class="achievement-card__date" datetime="' + escapeHtml(ach.date) + '">' +
          '<i class="ph ph-calendar-blank" aria-hidden="true"></i> ' + month + ' ' + day + ', ' + year +
        '</time>' +
        '<h3 class="achievement-card__title">' + escapeHtml(ach.title) + '</h3>' +
        (ach.description ? '<p class="achievement-card__description">' + escapeHtml(ach.description) + '</p>' : '');

    if (detail) {
      card.innerHTML =
        '<a href="' + escapeHtml(detail) + '" class="achievement-card__link" aria-label="Read achievement: ' + escapeHtml(ach.title) + '">' +
          innerContent +
          '<span class="achievement-card__cta">' +
            'Read full story' +
            '<i class="ph ph-arrow-right" aria-hidden="true"></i>' +
          '</span>' +
        '</div>' +
        '</a>';
    } else {
      card.innerHTML =
        '<div class="achievement-card__link-disabled">' +
          innerContent +
        '</div>';
    }

    return card;
  }

  // ----- Hero Slider Controller ------------------------------------------

  function initHeroSlider(achievements) {
    var sliderContainer = document.querySelector('[data-slider-container]');
    var dotsContainer = document.querySelector('[data-slider-dots]');
    var prevBtn = document.querySelector('[data-slider-prev]');
    var nextBtn = document.querySelector('[data-slider-next]');

    if (!sliderContainer) return;

    // Filter achievements marked for slider, sort them chronologically (most recent first)
    var sliderData = achievements.filter(function (ach) {
      return ach.slider === true;
    }).sort(function (a, b) {
      return parseDate(b.date).getTime() - parseDate(a.date).getTime();
    });

    // Limit to maximum of 3 achievements
    if (sliderData.length > 3) {
      sliderData = sliderData.slice(0, 3);
    }

    // If no slider items are found, render a fallback slide using global brand text
    if (sliderData.length === 0) {
      sliderContainer.innerHTML =
        '<div class="achievements-slide active">' +
          '<div class="achievements-slide__bg achievements-slide__bg--fallback"></div>' +
          '<div class="achievements-slide__content container">' +
            '<span class="achievements-slide__eyebrow">IEEE KLETU Student Branch</span>' +
            '<h2 class="achievements-slide__title">Fostering <em>Innovation</em> &amp; Excellence</h2>' +
            '<p class="achievements-slide__lead">"Success is not just about winning; it\'s about creating impact, inspiring innovation, and empowering future leaders."</p>' +
          '</div>' +
        '</div>';
      if (dotsContainer) dotsContainer.style.display = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    // Render slider HTML content
    var slidesHtml = '';
    var dotsHtml = '';

    if (sliderData.length <= 1) {
      if (dotsContainer) dotsContainer.style.display = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    } else {
      if (dotsContainer) dotsContainer.style.display = 'flex';
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
    }

    sliderData.forEach(function (ach, idx) {
      var activeClass = idx === 0 ? ' active' : '';
      var bgImg = ach.sliderImage || ach.detailImage || ach.cardImage || FALLBACK_IMAGE;
      var detailBtn = ach.detailUrl 
        ? '<div class="achievements-slide__actions"><a href="' + escapeHtml(ach.detailUrl) + '" class="btn btn--primary">Read full story <i class="ph ph-arrow-right"></i></a></div>'
        : '';

      slidesHtml +=
        '<div class="achievements-slide' + activeClass + '" data-slide-index="' + idx + '">' +
          '<div class="achievements-slide__bg" style="background-image: url(\'' + escapeHtml(bgImg) + '\')"></div>' +
          '<div class="achievements-slide__content container">' +
            '<span class="achievements-slide__eyebrow">' + escapeHtml(ach.category || 'Achievement') + '</span>' +
            '<h2 class="achievements-slide__title">' + escapeHtml(ach.title) + '</h2>' +
            (ach.description ? '<p class="achievements-slide__lead">' + escapeHtml(ach.description) + '</p>' : '') +
            detailBtn +
          '</div>' +
        '</div>';

      dotsHtml += '<button class="slider-dot' + (idx === 0 ? ' active' : '') + '" data-dot-index="' + idx + '" aria-label="Go to slide ' + (idx + 1) + '"></button>';
    });

    sliderContainer.innerHTML = slidesHtml;
    if (dotsContainer) {
      dotsContainer.innerHTML = dotsHtml;
    }

    // Slider active state variable
    var currentSlide = 0;
    var totalSlides = sliderData.length;
    var autoplayInterval = null;

    function showSlide(index) {
      if (index < 0) {
        index = totalSlides - 1;
      } else if (index >= totalSlides) {
        index = 0;
      }

      var slides = sliderContainer.querySelectorAll('.achievements-slide');
      var dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];

      slides.forEach(function (slide, idx) {
        if (idx === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      dots.forEach(function (dot, idx) {
        if (idx === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      currentSlide = index;
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      if (totalSlides > 1) {
        autoplayInterval = setInterval(nextSlide, 6000); // Change slides every 6s
      }
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    // Attach Event Listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        startAutoplay(); // Reset interval
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        startAutoplay(); // Reset interval
      });
    }

    if (dotsContainer) {
      dotsContainer.addEventListener('click', function (e) {
        var dot = e.target.closest('.slider-dot');
        if (!dot) return;
        var idx = parseInt(dot.getAttribute('data-dot-index'), 10);
        showSlide(idx);
        startAutoplay(); // Reset interval
      });
    }

    // Pause autoplay on mouse enter
    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);

    // Initial Autoplay Trigger
    startAutoplay();
  }

  // ----- Filtering and Rendering Logic -----------------------------------

  function renderList(target, achievements) {
    if (!target) return;

    target.innerHTML = '';

    // Filter achievements
    var filtered = achievements.filter(function (ach) {
      // Category check
      var matchesCategory = true;
      if (activeCategory !== 'all') {
        matchesCategory = ach.category.toLowerCase() === activeCategory.toLowerCase();
      }

      // Keyword Search check
      var matchesSearch = true;
      if (searchFilterText) {
        var query = searchFilterText.toLowerCase();
        var title = (ach.title || '').toLowerCase();
        var desc = (ach.description || '').toLowerCase();
        var cat = (ach.category || '').toLowerCase();
        matchesSearch = title.indexOf(query) !== -1 || desc.indexOf(query) !== -1 || cat.indexOf(query) !== -1;
      }

      return matchesCategory && matchesSearch;
    });

    // Sort achievements
    filtered.sort(compareAchievements);

    // Dynamic Injection
    filtered.forEach(function (ach, idx) {
      target.appendChild(buildCard(ach, idx));
    });

    // Empty state trigger
    var emptyState = document.getElementById('achievementsEmpty');
    if (emptyState) {
      if (filtered.length === 0) {
        emptyState.hidden = false;
        target.style.display = 'none';
      } else {
        emptyState.hidden = true;
        target.style.display = '';
      }
    }

    // Re-run scroll animations on visible cards
    revealCards(target);
  }

  function initFilters(achievements, target) {
    var filterContainer = document.getElementById('achievementsFilters');
    if (!filterContainer) return;

    // Collect all unique categories
    var categories = {};
    achievements.forEach(function (ach) {
      if (ach.category) {
        categories[ach.category] = true;
      }
    });

    // Append a button for each category
    Object.keys(categories).sort().forEach(function (cat) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-pill';
      btn.setAttribute('data-filter', cat.toLowerCase());
      btn.textContent = cat;
      filterContainer.appendChild(btn);
    });

    // Add click listeners to category pills
    filterContainer.addEventListener('click', function (e) {
      var button = e.target.closest('.filter-pill');
      if (!button) return;

      var pills = filterContainer.querySelectorAll('.filter-pill');
      pills.forEach(function (pill) {
        pill.classList.remove('active');
      });

      button.classList.add('active');
      activeCategory = button.getAttribute('data-filter');

      renderList(target, achievements);
    });
  }

  function initSearch(achievements, target) {
    var searchInput = document.getElementById('achievementsSearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
      searchFilterText = e.target.value.trim();
      renderList(target, achievements);
    });
  }

  function revealCards(root) {
    var cards = root.querySelectorAll('.achievement-card');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
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
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    cards.forEach(function (c) { io.observe(c); });
  }

  // ----- Init -----------------------------------------------------------

  function init() {
    var achievements = window.ACHIEVEMENTS || [];
    var target = document.querySelector('[data-achievements-target="list"]');

    // Init slider
    initHeroSlider(achievements);

    // Init listing systems
    initFilters(achievements, target);
    initSearch(achievements, target);
    renderList(target, achievements);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
