// Видео «80 секунд обо мне»: открывается по клику на кружок в коллаже
(function () {
  var dialog = document.getElementById('about-video');
  var trigger = document.querySelector('.video-trigger');
  if (!dialog || !trigger || typeof dialog.showModal !== 'function') return;
  var video = dialog.querySelector('video');
  var closeBtn = dialog.querySelector('.video-modal__close');

  function open() {
    dialog.showModal();
    document.documentElement.classList.add('is-modal-open');
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }
  function close() { dialog.close(); }

  trigger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  // клик по затемнённому фону закрывает окно
  dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
  dialog.addEventListener('close', function () {
    video.pause();
    document.documentElement.classList.remove('is-modal-open');
    trigger.focus();
  });
})();
