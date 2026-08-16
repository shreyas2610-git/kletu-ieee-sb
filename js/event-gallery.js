/* ==========================================================================
   event-gallery.js — behaviour for the photo gallery on event detail pages.

   The gallery is a scroll-snap track, so it already works without this file:
   users can swipe or trackpad-scroll through the photos. This script adds the
   arrow buttons, the dot indicators and keyboard support on top of that.

   Loaded only on generated pages that actually have more than one photo.
   ========================================================================== */

(function () {
  'use strict';

  function initGallery(root) {
    var track = root.querySelector('[data-gallery-track]');
    if (!track) return;

    var slides = Array.prototype.slice.call(
      track.querySelectorAll('.event-gallery__slide')
    );
    if (slides.length < 2) return;

    var dots = Array.prototype.slice.call(root.querySelectorAll('[data-gallery-dot]'));
    var prevBtn = root.querySelector('[data-gallery-prev]');
    var nextBtn = root.querySelector('[data-gallery-next]');
    var current = 0;

    function setActive(index) {
      current = Math.max(0, Math.min(index, slides.length - 1));
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
      });
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current === slides.length - 1;
    }

    function goTo(index) {
      var target = slides[Math.max(0, Math.min(index, slides.length - 1))];
      if (!target) return;
      // scrollLeft rather than scrollIntoView: scrollIntoView would also scroll
      // the page vertically to bring the gallery into view.
      track.scrollTo({
        left: target.offsetLeft - track.offsetLeft,
        behavior: 'smooth'
      });
      setActive(index);
    }

    // Keep the dots in sync when the user swipes or scrolls the track directly.
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setActive(slides.indexOf(entry.target));
            }
          });
        },
        { root: track, threshold: 0.6 }
      );
      slides.forEach(function (slide) { observer.observe(slide); });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () { goTo(current - 1); });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () { goTo(current + 1); });
    }
    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () { goTo(index); });
    });

    root.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(current - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(current + 1);
      }
    });

    root.setAttribute('tabindex', '0');
    setActive(0);
  }

  function init() {
    var galleries = document.querySelectorAll('[data-event-gallery]');
    Array.prototype.forEach.call(galleries, initGallery);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
