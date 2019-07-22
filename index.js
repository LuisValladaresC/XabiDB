const sections = Array.from(document.querySelectorAll('section'));
const navbar = document.getElementById('navbar');
const footer_text = document.querySelector('.footer-text');

cargar_datos();
window.addEventListener('popstate', cargar_datos);

function cargar_datos() {
    var centinela;

    sections.map((section, indice) => {
        if (document.location.href.includes(section.id)) {
            centinela = true
            section.classList.add('active');
            // setTimeout(() => section.classList.add('rsu'), 1);
            navbar.children[indice].classList.add('active');

            if (indice > 0) footer_text.classList.add('invisible')
            else footer_text.classList.remove('invisible')
        } else {
            section.classList = '';
            navbar.children[indice].classList.remove('active');
        }
    });

    if (!centinela) {
        sections[0].classList.add('active');
        navbar.children[0].classList.add('active');
    }
}

window.addEventListener('wheel', redireccionURL);
window.addEventListener('keydown', redireccionURL);
// window.addEventListener("touchmove", (e) => {});

function redireccionURL(e) {
    window.removeEventListener('wheel', redireccionURL)
    var seccionActual = document.querySelector('section.active')

    switch (seccionActual.id) {
        case 'culture':
            if (e.deltaY > 0 || e.keyCode == 40) document.location.href = '#track_planner'
            break;
        case 'track_planner':
            if (e.deltaY < 0 || e.keyCode == 38) document.location.href = '#culture'
            if (e.deltaY > 0 || e.keyCode == 40) document.location.href = '#spin_trowel'
            break;
        case 'spin_trowel':
            if (e.deltaY < 0 || e.keyCode == 38) document.location.href = '#track_planner'
            if (e.deltaY > 0 || e.keyCode == 40) document.location.href = '#oiz_it'
            break;
        case 'oiz_it':
            if (e.deltaY < 0 || e.keyCode == 38) document.location.href = '#spin_trowel'
            if (e.deltaY > 0 || e.keyCode == 40) document.location.href = '#onda'
            break;
        case 'onda':
            if (e.deltaY < 0 || e.keyCode == 38) document.location.href = '#oiz_it'
            if (e.deltaY > 0 || e.keyCode == 40) document.location.href = '#xabidb'
            break;
        case 'xabidb':
            if (e.deltaY < 0 || e.keyCode == 38) document.location.href = '#onda'
            break;
    }

    setTimeout(() => window.addEventListener('wheel', redireccionURL), 100);
}

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