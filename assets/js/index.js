/* ------------------------------------------------------------ */
/* ---------------- FUNCIONALIDAD DEL CARRUSEL ---------------- */
/* ------------------------------------------------------------ */

const $slides = Array.from(document.querySelectorAll('.carousel-item .hero'));

var $currentSlide;
var initialTouchPosition;
var finishingTouchPosition

window.addEventListener('popstate', showCarouselSlide);
window.addEventListener('touchstart', e => touchInitial = e.touches[0].clientY);
window.addEventListener('touchend', redirectURL);
window.addEventListener('keydown', redirectURL);

showCarouselSlide();

// Muestra una slide del carrusel segun el ID al que apunte la URL
function showCarouselSlide() {
  let slideLoaded = false;

  $slides.map($slide => {
    if (document.location.href.includes($slide.id)) {
      slideLoaded = true
      // Agrega la clase active a la seccion cuyo id se encuentra en la url
      $slide.parentElement.classList.add('active');
      $slide.addEventListener('wheel', redirectURL, true);
      $currentSlide = $slide;
    } else {
      // Elimina la posible clase active en la seccion
      $slide.parentElement.classList.remove('active');
      $slide.removeEventListener('wheel', redirectURL)
    }
  });

  // Si la url no tiene asignado ningun id mostrara el slide por defecto (culture)
  if (!slideLoaded) {
    $slides[0].parentElement.classList.add('active');
    $slides[0].addEventListener('wheel', redirectURL, true);
    $currentSlide = $slides[0];
  }
}

// Modifica el ID al que apunta la URL como respuesta a: Scroll ▲ ▼, Nav Keys ▲ ▼ & Touch ▲ ▼
function redirectURL(e) {
  console.log($currentSlide.id)
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