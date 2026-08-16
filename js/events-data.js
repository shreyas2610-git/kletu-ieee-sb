/* ==========================================================================
   events-data.js

   GENERATED FILE - do not edit by hand.

   The IEEE Student Branch CMS is the single source of truth for events. This
   file is rewritten in full every time an event is published or unpublished.
   To add, change or remove an event, use the CMS at the admin portal; any
   manual edit here is overwritten on the next publish.

   Each entry carries only structured fields, so every card renders identically
   regardless of what the article body contains.
   ========================================================================== */

(function () {
  'use strict';

  var EVENTS = [
    {
      slug: 'ai-in-robotics-tech-talk',
      title: 'AI in Robotics — a tech talk',
      date: '2026-06-14',
      image: 'assets/images/logo.webp',
      description: 'A session on how machine-learning models are reshaping real-world robotics, from perception stacks to imitation learning - with a live Q&A from industry.',
      category: 'Tech talk',
      society: 'Student Branch',
      priority: 0,
      slider: true
    },
    {
      slug: 'computer-society-inauguration-and-ideathon',
      title: 'Computer Society Inauguration & Ideathon',
      date: '2026-05-23',
      image: 'assets/images/logo.webp',
      description: 'The official inauguration of the IEEE Computer Society Student Branch Chapter at KLE Technological University, coupled with a high-impact Industry Day and collaborative Ideathon competition.',
      category: 'Inauguration',
      society: 'Computer Society',
      priority: 0,
      slider: true
    }
  ];

  EVENTS.forEach(function (ev) {
    if (!ev.detailUrl) ev.detailUrl = 'events/' + ev.slug + '.html';
    if (typeof ev.priority !== 'number') ev.priority = 0;
    if (!ev.category) ev.category = '';
  });

  window.EVENTS = EVENTS;
})();
