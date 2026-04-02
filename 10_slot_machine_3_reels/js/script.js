//inicializar variables globales
let importe = 0
let apuesta = 0
let ganancias = 0
let intervalo;

//variables con los elementos del DOM que necesitaremos modificar
const amount = document.querySelector('#amount') 
const win = document.querySelector('#win')
const bet = document.querySelector('#bet')

//arrays para guardar los premios y las figuras en cada tirada
//               0 1 2 3  4  5  6   7   8    9
const premios = [1,2,3,5,10,20,100,300,500,1000]
let figuras

//activar el botón para girar los rodillos
document.querySelector('#spin').onclick = jugada

//activar el botón para giros automáticos
document.querySelector('#auto').onclick = jugadaAuto

//activar el botón para parar giros automáticos
document.querySelector('#scram').onclick = pararJugadaAuto

function pararJugadaAuto() {
    //desactivar el botón de parar giros automáticos y activar el de giros automáticos
    document.querySelector('#auto').disabled = false    
    document.querySelector('#scram').disabled = true
    //parar el intervalo que ejecuta la función jugada cada 0,5 segundos
    clearInterval(intervalo)
}

function jugadaAuto() {
    //desactivar el botón de giros automáticos y activar el de parar giros automáticos
    document.querySelector('#auto').disabled = true
    document.querySelector('#scram').disabled = false
    //iniciar un intervalo que ejecute la función jugada cada 0,5 segundos
    intervalo = setInterval(jugada, 200)
}

function jugada() {
    //comprobar que el importe puede cubrir la apuesta
    importe = parseInt(amount.value) 
    apuesta = Number(bet.value) 

    if (importe < apuesta) {
        window.alert('Importe insuficiente')
        if (intervalo) {
            pararJugadaAuto()
        }   
        return
    }

    //generar 3 números aleatorios y mostrar las figuras que correspondan a cada uno de ellos
    figuras = [0,0,0,0,0,0,0,0,0,0]

    for (let c = 1; c <= 3; c++) {
        numero = Math.floor(Math.random() * 10)
        document.querySelector(`#reel${c}`).setAttribute('src', `img/${numero}.png`)
        //sumar 1 al contador de figuras
        figuras[numero]++
    }

    //comprobar si las figuras están en la tabla de premios (teniendo en cuenta el comodin)
    ganancias = 0

    for (let c = 0; c < figuras.length; c++) {
        //tres figuras iguales o dos figuras iguales y un comodin o una figura y dos comodines
        if (figuras[c] == 3 || (figuras[c] == 2 && figuras[9] == 1) || (figuras[c] == 1 && figuras[9] == 2)) {
            ganancias = premios[c] * apuesta
            break
        }
    }

    //si hay premio sumar el importe del premio a la cantidad pendiente
    importe += ganancias

    //siempre hay que restar el importe de la apuesta de la cantidad pendiente
    importe -= apuesta

    //trasladar los nuevos datos al documento
    amount.value = importe 
    win.value = ganancias
}