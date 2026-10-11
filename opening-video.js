'use strict';

// Only seek the most recent scroll target. A slow decoder must not build up
// a queue of obsolete targets when the reader changes direction quickly.
(function initializeOpeningFilm() {
  const config = window.OPENING_CONFIG;
  const film = document.querySelector('.opening-film');
  const opening = document.querySelector('.opening');
  let progress = 0;
  let desiredTime = 0;
  let ready = false;
  let scheduled = false;
  let enabled = true;

  opening.dataset.filmStatus = config.videoSrc ? 'loading' : 'awaiting-media';
  film.poster = config.posterSrc;

  function scheduleSeek() {
    if (!ready || !enabled || scheduled || film.seeking) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      if (!ready || !enabled || film.seeking) return;
      if (Math.abs(film.currentTime - desiredTime) > 1 / 40) {
        film.currentTime = desiredTime;
      }
    });
  }

  function setProgress(next) {
    progress = Math.max(0, Math.min(1, next));
    opening.dataset.filmProgress = progress.toFixed(4);
    if (Number.isFinite(film.duration) && film.duration > 0) {
      desiredTime = progress * Math.max(0, film.duration - 0.04);
      scheduleSeek();
    }
  }

  film.addEventListener('loadedmetadata', () => setProgress(progress));
  film.addEventListener('loadeddata', () => {
    ready = true;
    opening.dataset.filmStatus = 'ready';
    opening.classList.add('has-film');
    setProgress(progress);
  });
  film.addEventListener('seeked', () => {
    opening.dataset.filmTime = film.currentTime.toFixed(3);
    scheduleSeek();
  });
  film.addEventListener('error', () => {
    ready = false;
    opening.dataset.filmStatus = 'error';
    opening.classList.remove('has-film');
  });

  window.openingFilm = Object.freeze({
    setProgress,
    setEnabled(value) {
      enabled = Boolean(value);
      if (enabled) scheduleSeek();
    },
  });

  if (config.videoSrc) {
    film.src = config.videoSrc;
    film.load();
  }
})();
