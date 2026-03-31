const nivlesSeguridad = ["junior", "mid", "senior"];
let errores, continuar;

do {
    do {
        errores = ""

        // solicitar info al usuario
        let edad = Number(prompt("Ingrese la edad:"));
        let nivel = prompt("Ingrese el nivel de seguridad (junior, mid, senior):")?.toLowerCase();
        let numero = Number(prompt("Ingrese un número del 1 al 9:"));

        console.log("Edad:", edad, "Nivel:", nivel, "Número:", numero);

        // validar info
        if (isNaN(edad) || edad < 1 || edad > 120) {
            errores = "La edad debe ser un número entre 1 y 120.\n";
        }

        if (!nivlesSeguridad.includes(nivel)) {
            errores += "El nivel de seguridad debe ser 'junior', 'mid' o 'senior'.\n";
        }

        if (isNaN(numero) || numero < 1 || numero > 9) {
            errores += "El número debe ser un número entre 1 y 9.\n";
        }

        if (errores) {
            alert("Errores:\n" + errores);
        } else {
            // generar código de seguridad
            let codigoSeguridad = "";

            if (edad < 18) {
                codigoSeguridad += "X";
            } else if (edad >= 18 && edad <= 35) {
                codigoSeguridad += "A";
            } else if (edad > 35 && edad <= 60) {
                codigoSeguridad += "B";
            } else {
                codigoSeguridad += "C";
            }

            codigoSeguridad += nivlesSeguridad.indexOf(nivel) + 1

            codigoSeguridad += numero % 2 == 0 ? numero * 2 : numero + 5;

            alert("El código es: " + codigoSeguridad);
        }

    } while (errores)
        
    continuar = confirm("¿Desea ingresar otro conjunto de datos?"); 
} while (continuar)


