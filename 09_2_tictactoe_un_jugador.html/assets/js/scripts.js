// inicialización variables
const divs = document.getElementsByTagName('div')
const mensajes = document.getElementsByTagName('h5')[0]
const combinacionesGanadoras = [
    [0,1,2],[3,4,5],[6,7,8], //filas
    [0,3,6],[1,4,7],[2,5,8], //columnas
    [0,4,8],[2,4,6] //diagonales    
]
let turno, jugador, casillasMarcadas

// activación de listener boton restaurar juego
document.getElementsByTagName('button')[0].addEventListener('click', restaurarJuego)

restaurarJuego()

//funciones
function restaurarJuego() {
    // vaciar casillas y reactivar listeners
    Array.from(divs).forEach(div => {
        div.innerText = ""
        div.addEventListener('click', marcarCasilla)
    })

    //restaurar variables de juego
    turno = 1
    jugador = true
    casillasMarcadas = [0,0,0,0,0,0,0,0,0]
    mensajes.innerText = ""
}

function marcarCasilla(ev) {
    //buscar el índice de la casilla marcada
    let indice = buscarElemento(ev.target)
    
    //comprobar jugador
    if (jugador) {
        ev.target.innerText = 'X'
        casillasMarcadas[indice] = 1
    } else {
        ev.target.innerText = 'O'
        casillasMarcadas[indice] = -1
    }

    //comprobar si hay ganador a partir del turno 5
    if (turno >= 5 && comprobarGanador()) {
        //desactivar eventos
        Array.from(divs).forEach(div => {
            div.removeEventListener('click', marcarCasilla)
        })

        mensajes.innerText = `Enhorabuena, has ganado en el turno ${turno}`

        return
    } else {
        //desactivar casilla marcada y sumar 1 a contador de turnos
        ev.target.removeEventListener('click', marcarCasilla)
        turno++

        //cambiar jugador
        jugador = !jugador
    }

    if (turno > 9) {
        mensajes.innerText = `Se han agotado los turnos y nadie ha ganado`
    }
}

function buscarElemento(casilla) {
    return Array.from(casilla.parentNode.children).indexOf(casilla);
}

function comprobarGanador() {
    let ganador = false
    
    combinacionesGanadoras.map(combinacion => {
        let sumaCasillas = casillasMarcadas[combinacion[0]] + casillasMarcadas[combinacion[1]] + casillasMarcadas[combinacion[2]]

        if (Math.abs(sumaCasillas) == 3) {
           ganador = true
           return
        }
    })

    return ganador
}