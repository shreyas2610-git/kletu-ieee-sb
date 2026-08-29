/* ==========================================================================
   events-data.js — Single Source of Truth for IEEE KLETU Events
   ========================================================================== */

(function () {
  'use strict';

  var EVENTS = [
    {
      slug: 'pitch-pouch',
      title: 'Pitch Pouch',
      date: '2026-07-27',
      image: 'https://res.cloudinary.com/zjrsghig/image/upload/v1787760869/ieee-cms/banner/pitch-pouch-banner-1ca0adfd.webp',
      description: 'A sustainability-focused event where creativity met entrepreneurship! Students presented innovative pitch proposals on sustainable technology.',
      category: 'Workshop & Pitch Competition',
      society: 'Computer Society',
      priority: 1,
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
