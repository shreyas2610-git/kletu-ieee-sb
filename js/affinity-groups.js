/* ==========================================================================
   affinity-groups.js — page-specific behaviour for affinity-groups.html.
   shared.js already handles: scroll reveal, navbar scroll state,
   mobile menu, smooth-scroll, active nav link, footer year.
   This file handles only what's unique to this page.
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------
     Scroll-spy: mark whichever ag-row is currently in the viewport.
  ------------------------------------------------------------------ */
  function initGroupSpy() {
    const rows = document.querySelectorAll('.ag-row');
    if (!rows.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('ag-row--in-view', entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    rows.forEach((row) => io.observe(row));
  }

  /* ------------------------------------------------------------------
     Tilt microinteraction on logo rings (fine-pointer desktops only).
  ------------------------------------------------------------------ */
  function initLogoTilt() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.querySelectorAll('.ag-row__logo-ring').forEach((ring) => {
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
    initGroupSpy();
    initLogoTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
