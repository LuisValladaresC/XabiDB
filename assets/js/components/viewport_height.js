/* ------------------------------------------------------------------------------------------------- */
/* CALCULA LA ALTURA REAL DE LA PANTALLA (VH) Y LA ASIGNA AL BODY (NECESARIO EN NAVEGADORES MOVILES) */
/* ------------------------------------------------------------------------------------------------- */

if( navigator.userAgent.match(/Android/i)
|| navigator.userAgent.match(/webOS/i)
|| navigator.userAgent.match(/iPhone/i)
|| navigator.userAgent.match(/iPad/i)
|| navigator.userAgent.match(/iPod/i)
|| navigator.userAgent.match(/BlackBerry/i)
|| navigator.userAgent.match(/Windows Phone/i)
|| typeof window.orientation !== "undefined") {
  setViewportHeightToBody();
  window.addEventListener('onorientationchange', setViewportHeightToBody, true);
  window.addEventListener('resize', setViewportHeightToBody, true);
}

// Funcion de evento que calcula el alto real del VH y lo asigna al body
function setViewportHeightToBody() {
  let viewportHeight = document.documentElement.clientHeight;
  document.body.style.minHeight = viewportHeight + "px";
}