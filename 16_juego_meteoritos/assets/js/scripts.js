//constantes y variables del juego
const paso = 10; // cantidad de píxeles que se mueve la nave
const max_meteoritos = 100; // número máximo de meteoritos en pantalla
const velocidad = 2; // velocidad de avance (en pixeles) del meteorito 
const velocidadCaida = 20 //velocidad de caida de cada meteorito
const intervaloMeteoritos = 800 //intervalo de aparicion de meteoritos
const numeroEstrellas = 200 //densidad del cielo estrellado

//variables globales
let naveX, naveY, intervalo, puntos
let meteoritos = []

// recuperar tablero de juego
const tablero = document.getElementById("tablero");

// crear nave
const nave = document.createElement("div");
nave.classList.add("nave");
tablero.appendChild(nave);

// escuchar evento de teclado para mover la nave
document.addEventListener("keydown", moverNave);  

// escuchar evento de teclado para iniciar el juego
document.querySelector('button').addEventListener("click", inicializar);

// recuperar secciones de puntos y mensajes
const areaPuntos = document.querySelector('#puntos span')
const areaMensajes = document.querySelector('#mensajes')

ponerEstrellas()

function ponerEstrellas() {

    // crear un fragmento de documento para mejorar el rendimiento al añadir múltiples elementos (el appendChild en el DOM se realiza una sola vez al final)
    const fragmento = document.createDocumentFragment();
    
    for (e=1; e<=numeroEstrellas; e++) {
        let coordX = Math.floor(Math.random() * tablero.clientWidth) + 1
        let coordY = Math.floor(Math.random() * tablero.clientHeight) + 1

        const estrellita = document.createElement('div');
        estrellita.classList.add('estrellita')

        estrellita.style.left = `${coordX}px`;
        estrellita.style.bottom = `${coordY}px`

        fragmento.appendChild(estrellita);
    }
    
    tablero.appendChild(fragmento);
    
}

function inicializar() {
    // posición inicial de la nave
    naveX = 275;
    naveY = 5;
    nave.style.left = `${naveX}px`;
    nave.style.bottom = `${naveY}px`;

    puntos = 0 // contador de puntos

    // inicializar secciones en el documento
    areaPuntos.textContent = 0
    areaMensajes.textContent = ''

    //remover los meteoritos que queden en el tablero
    Array.from(meteoritos).forEach(meteorito => {
        meteorito.remove();
    });

    // crear meteoritos
    meteoritos = [];

    intervalo = setInterval(crearMeteorito, intervaloMeteoritos); // crear un meteorito cada segundo
}

// función para mover la nave
function moverNave(event) {
    if (event.key === "ArrowLeft" && naveX > 0) {
        naveX -= paso;
    } else if (event.key === "ArrowRight" && naveX < tablero.clientWidth - nave.clientWidth) {
        naveX += paso;
    } 
    // else if (event.key === "ArrowUp" && naveY < tablero.clientHeight - nave.clientHeight) {
    //     naveY += paso;
    // } else if (event.key === "ArrowDown" && naveY > 0) {
    //     naveY -= paso;
    // }   

    nave.style.left = `${naveX}px`;
    nave.style.bottom = `${naveY}px`;

}
    
function crearMeteorito() {
    const meteorito = document.createElement("div");
    meteorito.classList.add("meteorito");
    tablero.appendChild(meteorito);

    meteorito.style.left = `${Math.random() * (tablero.clientWidth - 30)}px`;
    meteorito.style.top = "0px";

    meteoritos.push(meteorito);

    if (meteoritos.length >= max_meteoritos) {
        clearInterval(intervalo);
    }

    moverMeteorito(meteorito);
}

// función para mover meteoritos   

function moverMeteorito(meteorito) {
    let meteoritoY = 0;
    
    const movimiento = setInterval(() => {
        meteoritoY += velocidad;
        meteorito.style.top = `${meteoritoY}px`;
        if (meteoritoY > tablero.clientHeight) {
            clearInterval(movimiento);
            tablero.removeChild(meteorito);
            meteoritos = meteoritos.filter(m => m !== meteorito);
            puntos+=100
            areaPuntos.textContent = puntos
        }   
        // detectar colisión con la nave
        if (colision(nave, meteorito)) {
            areaPuntos.textContent = puntos
            areaMensajes.textContent = '¡Has sido alcanzado por un meteorito! Fin del juego.'

            clearInterval(movimiento);
            clearInterval(intervalo);
        }   
    }, velocidadCaida);
}

// función para detectar colisión entre la nave y un meteorito
function colision(nave, meteorito) {
    const naveRect = nave.getBoundingClientRect();
    const meteoritoRect = meteorito.getBoundingClientRect();
    return !(
        naveRect.right < meteoritoRect.left ||
        naveRect.left > meteoritoRect.right ||  
        naveRect.bottom < meteoritoRect.top ||
        naveRect.top > meteoritoRect.bottom
    );
}   

