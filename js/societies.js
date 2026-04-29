/* ==========================================================================
   societies.js — page-specific behaviour for societies.html.
   shared.js already handles: scroll reveal, navbar scroll state,
   mobile menu, smooth-scroll, active nav link, footer year.
   This file handles only what's unique to this page.
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------
     Scroll-spy: highlight whichever society section the user is on.
     Adds a subtle active state to the society-row that is in view.
  ------------------------------------------------------------------ */
  function initSocietySpy() {
    const rows = document.querySelectorAll('.society-row');
    if (!rows.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('society-row--in-view', entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    rows.forEach((row) => io.observe(row));
  }

  /* ------------------------------------------------------------------
     Tilt microinteraction on logo rings (desktop only, pointer fine).
  ------------------------------------------------------------------ */
  function initLogoTilt() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.querySelectorAll('.society-row__logo-ring').forEach((ring) => {
      ring.addEventListener('mousemove', (e) => {
        const rect = ring.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const tiltX = dy * -6;
        const tiltY = dx * 6;
        ring.style.transform = `scale(1.03) perspective(400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });

      ring.addEventListener('mouseleave', () => {
        ring.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------------------
     Init
  ------------------------------------------------------------------ */
  function init() {
    initSocietySpy();
    initLogoTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
