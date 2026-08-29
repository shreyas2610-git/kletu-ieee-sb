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
    },
    {
      slug: 'smart-grid-symposium',
      title: 'Smart Grid & Renewable Energy Symposium',
      date: '2026-05-15',
      image: 'assets/images/PES.webp',
      description: 'Hands-on technical sessions on grid modernization, renewable energy integration, and microgrid control architectures.',
      category: 'Symposium',
      society: 'Power & Energy Society',
      priority: 0,
      slider: true
    },
    {
      slug: 'robo-quest-2026',
      title: 'RoboQuest 2026 — Autonomous Robotics Challenge',
      date: '2026-03-20',
      image: 'assets/images/RAS.webp',
      description: 'An inter-collegiate robotics competition testing motion planning, autonomous maze navigation, and computer vision control.',
      category: 'Competition',
      society: 'Robotics & Automation Society',
      priority: 0,
      slider: true
    },
    {
      slug: 'wie-empower-tech',
      title: 'Women in Tech Leadership Conclave',
      date: '2026-02-10',
      image: 'assets/images/WIE.webp',
      description: 'Keynote talks, panel discussions, and career mentoring sessions celebrating women leadership in engineering and research.',
      category: 'Conclave & Panel',
      society: 'Women in Engineering',
      priority: 0,
      slider: false
    },
    {
      slug: 'vlsi-design-workshop',
      title: 'Advanced VLSI & CAD Tools Masterclass',
      date: '2025-11-18',
      image: 'assets/images/CEDA.webp',
      description: 'Practical training on logic synthesis, system-on-chip (SoC) design, and electronic design automation tools for modern ICs.',
      category: 'Masterclass',
      society: 'Council on Electronic Design Automation',
      priority: 0,
      slider: false
    },
    {
      slug: 'bio-med-hackathon',
      title: 'MedTech Hackathon & Health Informatics',
      date: '2025-09-05',
      image: 'assets/images/EMBS.webp',
      description: '36-hour hackathon developing wearable bio-sensors, signal processing pipelines, and medical device prototypes.',
      category: 'Hackathon',
      society: 'Engineering in Medicine & Biology Society',
      priority: 0,
      slider: false
    },
    {
      slug: 'ev-drivetrain-conclave',
      title: 'EV Powertrain & Power Electronics Workshop',
      date: '2025-04-12',
      image: 'assets/images/PELS.webp',
      description: 'Technical deep-dive into electric vehicle power converters, inverter topologies, and high-efficiency battery management systems.',
      category: 'Technical Workshop',
      society: 'Power Electronics Society',
      priority: 0,
      slider: false
    },
    {
      slug: 'neuromorphic-circuits-seminar',
      title: 'Analog Circuits & Neuromorphic Computing',
      date: '2024-10-22',
      image: 'assets/images/CASS.webp',
      description: 'Seminar on analog circuit design, neuromorphic processing, and sensor interfaces given by industry experts.',
      category: 'Seminar',
      society: 'Circuits & Systems Society',
      priority: 0,
      slider: false
    },
    {
      slug: 'ieee-day-celebration',
      title: 'IEEE Day Annual Celebration & Expo',
      date: '2024-10-01',
      image: 'assets/images/logo.webp',
      description: 'Annual gathering celebrating IEEE Day across all student branch societies with project demos, networking, and award ceremonies.',
      category: 'Celebration & Expo',
      society: 'Student Branch Main',
      priority: 0,
      slider: false
    }
  ];

  EVENTS.forEach(function (ev) {
    if (!ev.detailUrl) ev.detailUrl = 'events/' + ev.slug + '.html';
    if (typeof ev.priority !== 'number') ev.priority = 0;
    if (!ev.category) ev.category = '';
  });

  window.EVENTS = EVENTS;
})();
