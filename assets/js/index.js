/* ------------------------------------------------------------ */
/* ---------------- FUNCIONALIDAD DEL CARRUSEL ---------------- */
/* ------------------------------------------------------------ */

const $slides = Array.from(document.querySelectorAll('.carousel-item .hero'));

var $currentSlide;
var initialTouchPosition;
var finishingTouchPosition
var timer;

window.addEventListener('popstate', showCarouselSlide);
window.addEventListener('touchstart', e => touchInitial = e.touches[0].clientY);
window.addEventListener('touchend', redirectURL);
window.addEventListener('keydown', redirectURL);
$slides.map($slide => $slide.addEventListener('wheel', redirectURL, true))

showCarouselSlide();

// Muestra una slide del carrusel segun el ID al que apunte la URL
function showCarouselSlide() {
  let slideLoaded = false;

  $slides.map($slide => {
    $slide.parentElement.classList.remove('active');
    if (document.location.href.includes($slide.id)) {
      slideLoaded = true
      // Agrega la clase active al slide cuyo id se encuentra en la url
      $slide.parentElement.classList.add('active');
      $currentSlide = $slide;

      timer = true;
      setTimeout(() => timer = false, 500);
    } else {
      // Elimina la posible clase active del slide
      $slide.parentElement.classList.remove('active');
    }
  });

  // Si la url no tiene asignado ningun id mostrara el slide por defecto (culture)
  if (!slideLoaded) {
    $slides[0].parentElement.classList.add('active');
    $currentSlide = $slides[0];
  }
}

// Modifica el ID al que apunta la URL como respuesta a: Scroll ▲ ▼, Nav Keys ▲ ▼ & Touch ▲ ▼
function redirectURL(e) {
  if (e.type == 'wheel' && timer) return;
  if (e.type == 'touchend') finishingTouchPosition = e.changedTouches[0].clientY;

  switch ($currentSlide.id) {
    case 'culture':
      if (e.deltaY > 0 || e.keyCode == 40 || initialTouchPosition > finishingTouchPosition + 5) document.location.href = '#spin_trowel'
      break;
    case 'spin_trowel':
      if (e.deltaY < 0 || e.keyCode == 38 || initialTouchPosition < finishingTouchPosition - 5) document.location.href = '#culture'
      if (e.deltaY > 0 || e.keyCode == 40 || initialTouchPosition > finishingTouchPosition + 5) document.location.href = '#orbea_oiz'
      break;
    case 'orbea_oiz':
      if (e.deltaY < 0 || e.keyCode == 38 || initialTouchPosition < finishingTouchPosition - 5) document.location.href = '#spin_trowel'
      if (e.deltaY > 0 || e.keyCode == 40 || initialTouchPosition > finishingTouchPosition + 5) document.location.href = '#onda_bench'
      break;
    case 'onda_bench':
      if (e.deltaY < 0 || e.keyCode == 38 || initialTouchPosition < finishingTouchPosition - 5) document.location.href = '#orbea_oiz'
      if (e.deltaY > 0 || e.keyCode == 40 || initialTouchPosition > finishingTouchPosition + 5) document.location.href = '#xabidb'
      break;
    case 'xabidb':
      if (e.deltaY < 0 || e.keyCode == 38 || initialTouchPosition < finishingTouchPosition - 5) document.location.href = '#onda_bench'
      break;
  }
}