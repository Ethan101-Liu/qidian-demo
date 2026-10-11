'use strict';

(function initializeSkillBookCursor() {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const atlas = new Image();
  const layer = document.createElement('div');
  layer.className = 'skill-cursor';
  layer.setAttribute('aria-hidden', 'true');
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 192;
  layer.appendChild(canvas);
  document.body.appendChild(layer);
  const context = canvas.getContext('2d');
  if (!context) return;

  // Bounds of the two untouched generated assets in the 1774 × 887 atlas.
  const bookSource = { x: 62, y: 88, w: 923, h: 799 };
  const pageSource = { x: 1110, y: 47, w: 521, h: 790 };
  const position = { x: 0, y: 0 };
  let loaded = false;
  let active = false;
  let lastMove = 0;
  let lastFrame = 0;
  let phase = 0;
  let targetPhase = 0;
  let frameId = 0;
  let previousPoint = null;

  function drawPage() {
    context.setTransform(2, 0, 0, 2, 0, 0);
    context.clearRect(0, 0, 96, 96);
    context.drawImage(atlas, bookSource.x, bookSource.y, bookSource.w,
      bookSource.h, 7, 14, 82, 71);
    const cycle = phase % 1;
    if (!reduceMotion.matches && cycle > 0.008 && cycle < 0.992) {
      const angle = cycle * Math.PI;
      const spine = 48.4;
      const top = 16;
      const pageHeight = 53.4;
      const pageWidth = 32;
      const strips = 32;
      const opacity = Math.min(1, cycle / 0.08, (1 - cycle) / 0.08);

      function project(u) {
        const curl = Math.sin(Math.PI * u) * Math.sin(angle) * 0.16;
        const depth = Math.sin(angle) * u * pageWidth;
        return {
          x: spine + (u * Math.cos(angle) + curl) * pageWidth,
          y: top - depth * 0.36,
        };
      }

      // Thin affine strips form a curved sheet with a continuous turning angle.
      for (let i = 0; i < strips; i++) {
        const from = project(i / strips);
        const to = project((i + 1) / strips);
        const sourceWidth = pageSource.w / strips;
        const width = to.x - from.x;
        if (Math.abs(width) < 0.015) continue;
        context.save();
        context.globalAlpha = opacity;
        context.setTransform(2 * width / sourceWidth,
          2 * (to.y - from.y) / sourceWidth,
          0, 2 * pageHeight / pageSource.h, from.x * 2, from.y * 2);
        context.drawImage(atlas, pageSource.x + i * sourceWidth,
          pageSource.y, sourceWidth + 0.5, pageSource.h,
          0, 0, sourceWidth + 0.5, pageSource.h);
        context.restore();
      }
      context.setTransform(2, 0, 0, 2, 0, 0);
      context.save();
      context.globalAlpha = Math.sin(angle) * 0.13;
      context.fillStyle = '#30251b';
      context.fillRect(spine - 1, top, 2, pageHeight);
      context.restore();
    }
    layer.dataset.pagePhase = phase.toFixed(3);
  }

  function frame(now) {
    frameId = 0;
    if (!active || document.hidden) return;
    const dt = Math.min(40, now - (lastFrame || now - 16));
    lastFrame = now;
    if (reduceMotion.matches) targetPhase = phase = 0;
    else {
      // Finish the current leaf after movement stops; do not spin while idle.
      if (now - lastMove > 100 && targetPhase % 1 > 0.001) {
        targetPhase = Math.ceil(targetPhase);
      }
      phase += (targetPhase - phase) * (1 - Math.exp(-dt / 65));
      if (Math.abs(targetPhase - phase) < 0.001) phase = targetPhase;
    }
    layer.style.transform = `translate3d(${position.x - 40}px, ${position.y - 40}px, 0)`;
    drawPage();
    if (Math.abs(targetPhase - phase) > 0.0001) frameId = requestAnimationFrame(frame);
  }

  function requestFrame() {
    if (!frameId) frameId = requestAnimationFrame(frame);
  }

  function hide() {
    active = false;
    previousPoint = null;
    layer.classList.remove('visible');
    document.body.classList.remove('has-skill-cursor');
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  }

  document.addEventListener('pointermove', event => {
    if (!loaded || !finePointer.matches || event.pointerType !== 'mouse') {
      hide(); return;
    }
    if (previousPoint && !reduceMotion.matches) {
      const distance = Math.hypot(event.clientX - previousPoint.x,
        event.clientY - previousPoint.y);
      targetPhase = Math.min(phase + 1.2, targetPhase + Math.min(160, distance) / 145);
    }
    previousPoint = { x: event.clientX, y: event.clientY };
    position.x = event.clientX;
    position.y = event.clientY;
    lastMove = performance.now();
    active = true;
    layer.classList.add('visible');
    layer.classList.toggle('interactive', Boolean(event.target.closest('button,a,[role="tab"]')));
    document.body.classList.add('has-skill-cursor');
    requestFrame();
  }, { passive: true });

  document.addEventListener('pointerout', e => { if (!e.relatedTarget) hide(); });
  document.addEventListener('keydown', e => { if (e.key === 'Tab') hide(); });
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  finePointer.addEventListener('change', hide);
  reduceMotion.addEventListener('change', () => { targetPhase = phase = 0; requestFrame(); });

  // A native modal is above the body's stacking context. Keep the same cursor
  // canvas inside that top layer while the book dialog is open.
  window.addEventListener('book-dialog-open', () => {
    document.querySelector('.book-dialog').appendChild(layer);
    requestFrame();
  });
  window.addEventListener('book-dialog-close', () => {
    document.body.appendChild(layer);
    requestFrame();
  });

  atlas.addEventListener('load', () => { loaded = true; drawPage(); });
  atlas.addEventListener('error', hide);
  atlas.src = 'assets/cursor/ink-book-atlas.png';
})();
