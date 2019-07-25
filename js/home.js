/* -------------------------------------------------------------------------------------------------- */
/* DEFINE LA SECCION QUE MOSTRARA EL HOME APLICANDO Y REMOVIENDO LA CLASE ACTIVE CUANDO CAMBIA LA URL */
/* -------------------------------------------------------------------------------------------------- */

const sections = Array.from(document.querySelectorAll('section'));

window.addEventListener('popstate', cargar_datos);

function cargar_datos() {
    let centinela;
    // Itera sobre cada una de las secciones y verifica si su id esta contenido dentro la url del navegador, en cuyo caso la mostrara
    sections.map(section => {
        if (document.location.href.includes(section.id)) {
            centinela = true
            // Agrega la clase active a la seccion cuyo id se encuentra en la url
            section.classList.add('active');
        } else {
            // Elimina la posible clase active en la seccion
            section.classList = '';
        }
    });

    // Si la url de la pagina no tiene asignado ningun id de seccion definira la clase active en la seccion por defecto (culture)
    if (!centinela) {
        sections[0].classList.add('active');
    }
}cargar_datos();

/* -------------------------------------------------------------------------------------------- */
/* DEFINE LOS EVENTOS (SCROLL, TECLAS ▲ ▼ & TOUCH ▲ ▼) QUE CAMBIARAN EL ID AL QUE APUNTA LA URL */
/* -------------------------------------------------------------------------------------------- */

window.addEventListener('wheel', redireccionURL);
window.addEventListener('keydown', redireccionURL);

var touchInitial;
window.addEventListener('touchstart', e => touchInitial = e.touches[0].clientY);
window.addEventListener('touchend', redireccionURL);

function redireccionURL(e) {
    window.removeEventListener('wheel', redireccionURL)
    const seccionActual = document.querySelector('section.active')
    
    if (e.type == 'touchend') var touchFinal = e.changedTouches[0].clientY;

    switch (seccionActual.id) {
        case 'culture':
            if (e.deltaY > 0 || e.keyCode == 40 || touchInitial > touchFinal + 5) document.location.href = '#track_planner'
            break;
        case 'track_planner':
            if (e.deltaY < 0 || e.keyCode == 38 || touchInitial < touchFinal - 5) document.location.href = '#culture'
            if (e.deltaY > 0 || e.keyCode == 40 || touchInitial > touchFinal + 5) document.location.href = '#spin_trowel'
            break;
        case 'spin_trowel':
            if (e.deltaY < 0 || e.keyCode == 38 || touchInitial < touchFinal - 5) document.location.href = '#track_planner'
            if (e.deltaY > 0 || e.keyCode == 40 || touchInitial > touchFinal + 5) document.location.href = '#oiz_it'
            break;
        case 'oiz_it':
            if (e.deltaY < 0 || e.keyCode == 38 || touchInitial < touchFinal - 5) document.location.href = '#spin_trowel'
            if (e.deltaY > 0 || e.keyCode == 40 || touchInitial > touchFinal + 5) document.location.href = '#onda'
            break;
        case 'onda':
            if (e.deltaY < 0 || e.keyCode == 38 || touchInitial < touchFinal - 5) document.location.href = '#oiz_it'
            if (e.deltaY > 0 || e.keyCode == 40 || touchInitial > touchFinal + 5) document.location.href = '#xabidb'
            break;
        case 'xabidb':
            if (e.deltaY < 0 || e.keyCode == 38 || touchInitial < touchFinal - 5) document.location.href = '#onda'
            break;
    }

    setTimeout(() => window.addEventListener('wheel', redireccionURL), 100);
}

/* -------------------------------------------------------------------------------------------------- */
/* OBTIENE EL VH REAL DEL BODY CUANDO SE ESTA EN UN NAVEGADOR MOVIL, DEBIDO A PROBLEMAS EN LOS MISMOS */
/* -------------------------------------------------------------------------------------------------- */

if( navigator.userAgent.match(/Android/i)
|| navigator.userAgent.match(/webOS/i)
|| navigator.userAgent.match(/iPhone/i)
|| navigator.userAgent.match(/iPad/i)
|| navigator.userAgent.match(/iPod/i)
|| navigator.userAgent.match(/BlackBerry/i)
|| navigator.userAgent.match(/Windows Phone/i)
|| typeof window.orientation !== "undefined") {
    calcularViewportHeight();
    window.addEventListener('onorientationchange', calcularViewportHeight, true);
    window.addEventListener('resize', calcularViewportHeight, true);
}

// Funcion de evento que calcula el alto real del VH y lo asigna al body
function calcularViewportHeight() {
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    document.body.style.height = viewportHeight + "px";
}