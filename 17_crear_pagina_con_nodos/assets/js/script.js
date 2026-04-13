import { alojamientos } from './datos.js';

/* 
podríamos confeccionar toda la hoja de estilos con javascript (que sería una puta locura) utilizando 
const estilos=document.createElement('style')
estilos.textContent = `relacion de selectores y propiedades`
document.head.appendChild(estilos)
*/

/* crear el header */
const header = document.createElement('header');
const h1 = document.createElement('h1');
h1.textContent = 'Apartamentos disponibles';
header.appendChild(h1);
document.body.appendChild(header);

/* crear boton de busqueda */
const searchInput = document.createElement('input')
searchInput.setAttribute('type', 'text')
searchInput.setAttribute('placeholder', 'Buscar apartamento')
searchInput.classList.add('search')

searchInput.addEventListener('input', function(ev) {
    let filtro = ev.target.value.toLowerCase()

    crearCardsAlojamientos(filtro)
})

document.body.appendChild(searchInput)

/* crear caja contenedora */
const container = document.createElement('div')
container.classList.add('container')
document.body.appendChild(container)

/* crear las cajas de los apartamentos */
crearCardsAlojamientos()

function crearCardsAlojamientos(filtro=null) {
    // como paso previo eliminaremos todas las cards
    // document.getElementsByClassName("container")[0].innerHTML = ''

    const contenedor = document.getElementsByClassName("container")[0];

    // Convertimos la lista de nodos hijos a array para recorrerlo y eliminar, uno a uno, cada card
    Array.from(contenedor.children).forEach(child => child.remove());

    //confeccionamos todas las cards utilizando fragmentos para evitar el renderizado continuo en el DOM de cada elemento (el renderizado se realiza en memoria y, al final, se hace un único renderizado de todos los elementos a la vez en el DOM real)
    const fragmento = document.createDocumentFragment();

    //comprobamos si tenemos que mostrar solo las cards que cumplan las condiciones del filtro de busqueda
    const alojamientosFiltrados = filtro ? alojamientos.filter(alojamiento => alojamiento.titulo.toLowerCase().includes(filtro)) : alojamientos
    
    alojamientosFiltrados.forEach(alojamiento => {
        const card = document.createElement('div');
        card.classList.add('card')

        const imagen = document.createElement('img')
        imagen.setAttribute('src', alojamiento.img)
        imagen.setAttribute('alt', alojamiento.titulo)

        const titulo = document.createElement('h2')
        titulo.textContent = alojamiento.titulo

        const precio = document.createElement('p')
        precio.textContent = alojamiento.precio

        card.appendChild(imagen)
        card.appendChild(titulo)
        card.appendChild(precio)

        //activar escuchador para cada card
        card.addEventListener('click', function() {
            alert('click en la tarjeta')
        })

        fragmento.appendChild(card);
    })

    container.appendChild(fragmento);
}

/* boton dia/noche */
const dianoche = document.createElement('button')
dianoche.textContent = 'Cambiar modo dia/noche'
dianoche.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme')
})

document.body.appendChild(dianoche)

// Implementar sistemas de votación a través de 5 estrellas por cada card (alojamiento) al pulsar en la valoracion almacenar en array el numero de alojamiento y star pulsada.
