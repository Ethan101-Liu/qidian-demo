'use strict';

// The user's continuous film is locally hosted; its first frame is the fallback.
window.OPENING_CONFIG = Object.freeze({
  videoSrc: 'assets/character/intro-film.mp4',
  posterSrc: 'assets/character/intro-film-poster.png',
  filmEndProgress: 0.88,
  transitionStart: 0.88,
  contentRevealStart: 0.90,
});
