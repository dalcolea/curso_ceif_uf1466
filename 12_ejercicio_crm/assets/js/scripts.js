// inicialización de variables
const tabla = document.getElementsByTagName('tbody')[0]

const contactos = recuperarStorage()
actualizarLista()

// modelo de contacto
/*
{
    id: number,
    nombre: string,
    telefono: string,
    email: string,
    empresa: string
}
*/

function nuevoContacto(tipo = 'n') {
    // recoger datos del formulario
    const nombre = document.getElementById('nombre').value.trim()
    const telefono = document.getElementById('telefono').value.trim()
    const email = document.getElementById('email').value.trim()
    const empresa = document.getElementById('empresa').value.trim()

    // validatión de datos
    if (nombre === '' || telefono === '' || email === '' || empresa === '') {
        alert('Por favor, rellena todos los campos')
        return
    }

    // crear nuevo objeto cliente
    const nuevoCliente = {
        id: contactos.length + 1,
        nombre: nombre,
        telefono: telefono,
        email: email,
        empresa: empresa
    }

    // añadir cliente al array
    if (tipo === 'u') {
        contactos.unshift(nuevoCliente) // añadir al principio de la lista
    } else {
        contactos.push(nuevoCliente) // añadir al final de la lista
    }

    // actualizar la lista de contactos
    actualizarLista()

    guardarStorage()
}

function borrarContacto(tipo = 'p') {
    if (tipo === 'p') {
        //borrar primero
        contactos.shift()
    } else {
        //borrar último
        contactos.pop()
    }
    
    actualizarLista()

    guardarStorage()
}

function borrarContactoSeleccionado() {
    let id = document.getElementById('idcontacto').value

    let indiceABorrar = contactos.findIndex((contacto) => contacto.id == id)

   //borrar elemento del array
   contactos.splice(indiceABorrar,1)

   actualizarLista()

   guardarStorage()
}

function modificarContacto() {
    const id = document.getElementById('idcontacto').value

    // recoger datos del formulario
    const nombre = document.getElementById('nombre').value.trim()
    const telefono = document.getElementById('telefono').value.trim()
    const email = document.getElementById('email').value.trim()
    const empresa = document.getElementById('empresa').value.trim()

    // validatión de datos
    if (nombre === '' || telefono === '' || email === '' || empresa === '') {
        alert('Por favor, rellena todos los campos')
        return
    }

    let indiceAModificar = contactos.findIndex((contacto) => contacto.id == id)

    // modificar el contacto en el array
    contactos[indiceAModificar].nombre = nombre
    contactos[indiceAModificar].telefono = telefono
    contactos[indiceAModificar].email = email
    contactos[indiceAModificar].empresa = empresa

    // actualizar la lista de contactos
    actualizarLista()

    guardarStorage()

}

function seleccionarContacto(id) {
    // buscar el contacto seleccionado en el array
    let contacto = contactos.find(cliente => cliente.id === id)

    document.getElementById('nombre').value = contacto.nombre
    document.getElementById('telefono').value = contacto.telefono
    document.getElementById('email').value = contacto.email
    document.getElementById('empresa').value = contacto.empresa

    document.getElementById('idcontacto').value = contacto.id
}

function guardarStorage() {
    //guardar contactos en el storage
    localStorage.setItem('contactos', JSON.stringify(contactos))
}

function recuperarStorage() {
    //recuperar contactos en el storage
    return localStorage.getItem('contactos') 
    ? JSON.parse(localStorage.getItem('contactos'))
    : []
}

function actualizarLista() {
    tabla.innerHTML = '' // limpiar la tabla antes de actualizarla  
    contactos.forEach(cliente => {
        const fila = `<tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.email}</td>
            <td>${cliente.empresa}</td>
            <td>
                <button type="button" class="btn btn-info" onclick="seleccionarContacto(${cliente.id})">Seleccionar</button>
            </td>
        </tr>`
        tabla.innerHTML += fila
    })
}
