// Картинки в кейсах открываются крупно по клику (как видео на главной)
(function () {
  var root = document.querySelector('main.case');
  if (!root || typeof HTMLDialogElement !== 'function') return;

  var imgs = Array.prototype.filter.call(root.querySelectorAll('img'), function (img) {
    if (img.closest('[data-ba], a, button, .done, .tabs-nav')) return false;   // слайдер, ссылки, иконки пунктов
    if (img.classList.contains('step-arrow')) return false;
    var w = img.getBoundingClientRect().width || parseInt(img.getAttribute('width'), 10) || 0;
    return w >= 160;
  });
  if (!imgs.length) return;

  var dlg = document.createElement('dialog');
  dlg.className = 'modal lightbox';
  dlg.setAttribute('aria-label', 'Картинка крупно');
  dlg.innerHTML =
    '<div class="modal__box">' +
      '<img class="lightbox__img" alt="">' +
      '<button class="modal__close" type="button" aria-label="Закрыть">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      '</button>' +
    '</div>';
  document.body.appendChild(dlg);
  var big = dlg.querySelector('.lightbox__img');
  var lastTrigger = null;

  function open(img) {
    lastTrigger = img;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || '';
    dlg.showModal();
    document.documentElement.classList.add('is-modal-open');
  }
  function close() { dlg.close(); }

  imgs.forEach(function (img) {
    img.classList.add('zoomable');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', (img.alt ? img.alt + '. ' : '') + 'Открыть крупно');
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
    });
  });

  dlg.querySelector('.modal__close').addEventListener('click', close);
  // клик мимо картинки (по затемнению) закрывает окно
  dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
  big.addEventListener('click', close);
  dlg.addEventListener('close', function () {
    document.documentElement.classList.remove('is-modal-open');
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  });
})();
