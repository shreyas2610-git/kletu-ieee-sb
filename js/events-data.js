/* ==========================================================================
   events-data.js — single source of truth for every event on the site.

   HOW TO ADD A NEW EVENT (whenever you're organising / running one):

     1. Drop the event poster/photo into:   assets/events/<slug>.webp
        (use a <slug> that's all-lowercase and kebab-case — no spaces)

     2. Copy events/_template.html to events/<slug>.html, then fill in the
        long-form detail content there. Keep the filename matching the slug.

     3. Append a new object to the EVENTS array below. You only need:
          - slug          → kebab-case id (must match the detail-page filename)
          - title         → shows on the card + detail page
          - date          → "YYYY-MM-DD" (or "YYYY-MM-DDTHH:MM" for time)
          - image         → "assets/events/<slug>.webp"
          - description   → 1–2 line summary shown on the card
          - category      → optional short label shown on the card ("Workshop",
                            "Talk", "Hackathon", …). Leave "" to hide.
          - priority      → optional integer. Higher = shown first. Default 0.
                            Bump to pin something at the top of its section.

        The detailUrl field is computed automatically from the slug.

     4. That's it. The events page will:
          - put it under "Upcoming events" while date ≥ today, then
          - automatically move it to "Past events" the day after.
          - sort by priority (desc), then by nearest date.

   Remove an event by deleting its entry here AND the matching detail page.
   ========================================================================== */

(function () {
  'use strict';

  var EVENTS = [
    // ------------------------------------------------------------------
    // Example: an UPCOMING event (date is in the future)
    // ------------------------------------------------------------------
    {
      slug: 'ai-in-robotics-tech-talk',
      title: 'AI in Robotics — a tech talk',
      date: '2026-06-14',
      image: 'assets/events/ai-in-robotics-tech-talk.webp',
      description: 'A deep dive into how machine-learning models are reshaping robotics, with a guest session from industry.',
      category: 'Tech talk',
      priority: 1
    },

    // ------------------------------------------------------------------
    // Example: a PAST event (date has passed; shows under Past events)
    // ------------------------------------------------------------------
    {
      slug: 'ieee-day-2025',
      title: 'IEEE Day 2025 — open house',
      date: '2025-10-07',
      image: 'assets/events/ieee-day-2025.webp',
      description: 'Our annual branch-wide celebration with chapter demos, student projects, and a fireside chat.',
      category: 'Flagship',
      priority: 1
    },

    {
      slug: 'intro-to-ieee-xplore',
      title: 'Intro to IEEE Xplore — hands-on session',
      date: '2025-09-12',
      image: 'assets/events/intro-to-ieee-xplore.webp',
      description: 'A walk-through of IEEE Xplore for first-years — searching papers, citing work, and finding conference proceedings.',
      category: 'Workshop',
      priority: 0
    }
  ];

  // Compute detailUrl and freeze so consumers can't accidentally mutate
  EVENTS.forEach(function (ev) {
    if (!ev.detailUrl) ev.detailUrl = 'events/' + ev.slug + '.html';
    if (typeof ev.priority !== 'number') ev.priority = 0;
    if (!ev.category) ev.category = '';
  });

  // Expose globally — events.js reads from here.
  window.EVENTS = EVENTS;
})();
