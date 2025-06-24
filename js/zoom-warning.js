// Показывает предупреждение, если масштаб браузера не 100%
(function() {
  function isZoomed() {
    // Проверяем devicePixelRatio (1 = 100%)
    return Math.abs(window.devicePixelRatio - 1) > 0.05;
  }
  function showWarning(show) {
    var warning = document.getElementById('zoom-warning');
    if (warning) warning.style.display = show ? 'block' : 'none';
  }
  function checkZoom() {
    showWarning(isZoomed());
  }
  window.addEventListener('resize', checkZoom);
  window.addEventListener('DOMContentLoaded', checkZoom);
})(); 