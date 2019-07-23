
const navbar = document.getElementById('navbar');
const footer_text = document.querySelector('.footer-text');
const sections = Array.from(document.querySelectorAll('section'));

window.addEventListener('popstate', cargar_datos);

function cargar_datos() {
    let centinela;
    // Itera sobre cada una de las secciones y verifica si su id esta contenido dentro la url del navegador, en cuyo caso la mostrara
    sections.map((section, indice) => {
        if (document.location.href.includes(section.id)) {
            centinela = true
            // Agrega la clase active a la seccion cuyo id se encuentra en la url y al navbar item que hace referencia mediante su indice
            section.classList.add('active');
            navbar.children[indice].classList.add('active');
            // Remueve y agrega los elementos background_color y background_image de su contendor body para asi repetir la animacion definida en sus estilos
            let backgroundColor = document.getElementById('background-color');
            let backgroundImage = document.getElementById('background-image');
            backgroundColor.remove;
            backgroundImage.remove;
            document.body.appendChild(backgroundColor)
            document.body.appendChild(backgroundImage)
            // Añade una clase a los elementos background_color y background_image que tiene el nombre del id de la seccion y define su color e imagen de fondo
            backgroundColor.classList = section.id;
            backgroundImage.classList = section.id;
            // Si la seccion actual no es la 1ra añade una clase 'invisible' al texto en el footer
            if (indice > 0) footer_text.classList.add('invisible')
            else footer_text.classList.remove('invisible')
        } else {
            // Elimina la posible clase active en la seccion y en el navbar item que hace referencia mediante su indice
            section.classList = '';
            navbar.children[indice].classList.remove('active');
        }
    });

    // Si la url de la pagina no tiene asignado ningun id de seccion definira la clase active en la seccion por defecto (culture)
    if (!centinela) {
        sections[0].classList.add('active');
        navbar.children[0].classList.add('active');
    }
}cargar_datos();

window.addEventListener('wheel', redireccionURL);
window.addEventListener('keydown', redireccionURL);

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