/* Слайдер «до / после»: перетаскивание мышью, пальцем и стрелками с клавиатуры.
   Разметка: [data-ba] с CSS-переменной --pos и скрытым <input type="range"> внутри. */
(function () {
  function init(root) {
    var input = root.querySelector('input[type="range"]');
    if (!input) return;
    var dragging = false;

    function set(value) {
      var v = Math.max(0, Math.min(100, value));
      root.style.setProperty('--pos', v + '%');
      input.value = String(Math.round(v));
      input.setAttribute('aria-valuetext', Math.round(v) + '%');
    }

    function fromPointer(e) {
      var r = root.getBoundingClientRect();
      return ((e.clientX - r.left) / r.width) * 100;
    }

    input.addEventListener('input', function () { set(Number(input.value)); });

    root.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      dragging = true;
      root.setPointerCapture(e.pointerId);
      set(fromPointer(e));
      e.preventDefault();
      input.focus({ preventScroll: true });
    });
    root.addEventListener('pointermove', function (e) {
      if (dragging) set(fromPointer(e));
    });
    function stop() { dragging = false; }
    root.addEventListener('pointerup', stop);
    root.addEventListener('pointercancel', stop);
    root.addEventListener('lostpointercapture', stop);

    set(Number(input.value));
  }

  document.querySelectorAll('[data-ba]').forEach(init);
})();
