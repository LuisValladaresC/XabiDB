/* -------------------------------------------------------------------------------------------------- */
/* DEFINE LA SECCION QUE MOSTRARA EL HOME APLICANDO Y REMOVIENDO LA CLASE ACTIVE CUANDO CAMBIA LA URL */
/* -------------------------------------------------------------------------------------------------- */

const sections = Array.from(document.querySelectorAll('.hero'));

window.addEventListener('popstate', cargar_datos);

function cargar_datos() {
    let centinela;
    // Itera sobre cada una de las secciones y verifica si su id esta contenido dentro la url del navegador, en cuyo caso la mostrara
    sections.map(section => {
        if (document.location.href.includes(section.id)) {
            centinela = true
            // Agrega la clase active a la seccion cuyo id se encuentra en la url
            section.parentElement.classList.add('active');
        } else {
            // Elimina la posible clase active en la seccion
            section.parentElement.classList.remove('active');
        }
    });

    // Si la url de la pagina no tiene asignado ningun id de seccion definira la clase active en la seccion por defecto (culture)
    if (!centinela) {
        sections[0].parentElement.classList.add('active');
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
    if (e.type == 'wheel') window.removeEventListener('wheel', redireccionURL)
    let seccionActual = document.querySelector('.active .hero')
    
    if (e.type == 'touchend') var touchFinal = e.changedTouches[0].clientY;

    switch (seccionActual.id) {
        case 'culture':
            if (e.deltaY > 0 || e.keyCode == 40 || touchInitial > touchFinal + 5) document.location.href = '#spin_trowel'
            break;
        case 'spin_trowel':
            if (e.deltaY < 0 || e.keyCode == 38 || touchInitial < touchFinal - 5) document.location.href = '#culture'
            if (e.deltaY > 0 || e.keyCode == 40 || touchInitial > touchFinal + 5) document.location.href = '#orbea_oiz'
            break;
        case 'orbea_oiz':
            if (e.deltaY < 0 || e.keyCode == 38 || touchInitial < touchFinal - 5) document.location.href = '#spin_trowel'
            if (e.deltaY > 0 || e.keyCode == 40 || touchInitial > touchFinal + 5) document.location.href = '#onda_bench'
            break;
        case 'onda_bench':
            if (e.deltaY < 0 || e.keyCode == 38 || touchInitial < touchFinal - 5) document.location.href = '#orbea_oiz'
            if (e.deltaY > 0 || e.keyCode == 40 || touchInitial > touchFinal + 5) document.location.href = '#xabidb'
            break;
        case 'xabidb':
            if (e.deltaY < 0 || e.keyCode == 38 || touchInitial < touchFinal - 5) document.location.href = '#onda_bench'
            break;
    }

    if (e.type == 'wheel') setTimeout(() => window.addEventListener('wheel', redireccionURL), 500);
}