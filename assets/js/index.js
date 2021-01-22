/* ------------------------------------------------------------ */
/* --------------- CREACION DINAMICA DEL SIDEBAR -------------- */
/* ------------------------------------------------------------ */

const $sidebar = document.querySelector('nav.sidebar');
const $slides = Array.from(document.querySelectorAll('.carousel__item'));

let templateHTML = '';

// Crea un sidebar item por cada slide dentro del carrusel
$slides.map(($slide, index) => {
  templateHTML += 
  `<button class="sidebar__item" data-slide=${index}>
    <img class="sidebar__icon" src="./assets/svg/mas.svg">
    <img class="sidebar__icon sidebar__icon--dark" src="./assets/svg/mas_dark.svg">
  </button>`
})

$sidebar.innerHTML = templateHTML;

/* ------------------------------------------------------------ */
/* ---------------- FUNCIONALIDAD DEL CARRUSEL ---------------- */
/* ------------------------------------------------------------ */

// ------ GESTION GLOBAL DE LAS DIAPOSITIVAS DEL CARRUSEL ----- //
const $container = document.querySelector('.container');
const $sidebarItems = Array.from(document.querySelectorAll('.sidebar__item'));
const totalSlideNumber = $slides.length;
var currentSlideNumber = 0;

loadSlide();
function loadSlide(){
  // Activa el slide actual
  $slides.map(($slide, index) => {
    if(currentSlideNumber == index){
      $slide.classList.add('carousel__item--active');
      currentSlideNumber = index;
    } else {
      $slide.classList.remove('carousel__item--active');
    }
  });

  // Verfica si el carrusel es theme-black, en cuyo caso, activa los estilos de manera global 
  if($slides[currentSlideNumber].classList.contains('carousel__item--theme-black')) {
    $container.classList.add('container--theme-black')
  }else{
    $container.classList.remove('container--theme-black')
  }

  // Activa el sidebar item correspondiente al slide actual 
  $sidebarItems.map((siderbarItem, index) => {
    if (currentSlideNumber == index) {
      setTimeout(() => siderbarItem.classList.add('sidebar__item--active'), 1);
    }else{
      siderbarItem.classList.remove('sidebar__item--active');
    }
  })

  // Mueve el scroll a la parte superior por defecto al cambiar slide
  window.scrollTo(0, 0);
}

// --------- CAMBIO DE DIAPOSITIVA MEDIANTE EL SCROLL --------- //
var timerActivated = false;
const scrollSensitivity = 30; 
const slideDuration = 400;
const isFirefox = (/Firefox/i.test(navigator.userAgent));

window.addEventListener('wheel', changeSlideWithScroll, false);

function changeSlideWithScroll(e) {
  if (timerActivated) return;

  // Obtiene atributo "delta" para firefox y todos los demas navegadores
  if (isFirefox) {
    delta = e.deltaY * (-120);
  } else {
    delta = e.wheelDelta;
  }

  // Scroll hacia abajo
  if (delta <= -scrollSensitivity && currentSlideNumber !== totalSlideNumber - 1) {
    // Cambia slide solo si la barra de navegacion (en caso exista) se encuentre al final 
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      setTimeout(() => timerActivated = false, slideDuration);
      timerActivated = true;
      currentSlideNumber++;
      loadSlide();
    }
  }
  // Scroll hacia arriba
  if (delta >= scrollSensitivity && currentSlideNumber !== 0) {
    // Cambia slide solo si la barra de navegacion (en caso exista) se encuentra en el superior
    if (document.documentElement.scrollTop <= 0) {
      setTimeout(() => timerActivated = false, slideDuration);
      timerActivated = true;
      currentSlideNumber--;
      loadSlide();
    }
  }
}

// ---------- CAMBIO DE DIAPOSITIVA MEDIANTE EL TOUCH --------- //
var initialTouchPosition;
const touchSensitivity = 80; 

window.addEventListener('touchstart', (e) => initialTouchPosition = e.touches[0].clientX);
window.addEventListener('touchend', changeSlideWithTouch);

function changeSlideWithTouch(e) {  
  if (timerActivated) return;
  let finishingTouchPosition = e.changedTouches[0].clientX;


  // Touch a la Derecha
  if (initialTouchPosition < finishingTouchPosition - touchSensitivity && currentSlideNumber !== totalSlideNumber - 1){
    currentSlideNumber++;
    loadSlide();
  }
  // Touch a la Izquierda
  if (initialTouchPosition > finishingTouchPosition + touchSensitivity && currentSlideNumber !== 0) {
    currentSlideNumber--;
    loadSlide();
  }
}

// -------- CAMBIO DE DIAPOSITIVA MEDIANTE LAS NAV KEYS ------- //
window.addEventListener('keydown', changeSlideWithNavigationKeys);

function changeSlideWithNavigationKeys(e) {
  if (timerActivated) return;

  // Flecha hacia abajo
  if (e.keyCode == 40 && currentSlideNumber !== totalSlideNumber - 1) {
    currentSlideNumber++;
    loadSlide();
  }
  // Flecha hacia arriba
  if (e.keyCode == 38 && currentSlideNumber !== 0) {
    currentSlideNumber--;
    loadSlide();
  }
}

// ----- CAMBIO DE DIAPOSITIVA DESDE EL MENU DE NAVEGACION ---- //
$sidebarItems.map(siderbarItem => {
  siderbarItem.addEventListener('click', changeSlideWithSidebarItem);
})

function changeSlideWithSidebarItem(e) {
  if (timerActivated) return;

  currentSlideNumber = e.currentTarget.dataset.slide;
  loadSlide();
}