/*
Contexto (narrativa):

Has llegado al núcleo de La Cámara de la Lógica.

El sistema central está bloqueado por un algoritmo de control que solo responde a decisiones lógicas correctas.

Cada intento incorrecto acerca el sistema al colapso.
Solo un código bien estructurado permitirá desbloquear la puerta.
*/

/*
Objetivo del reto

Crear un programa en JavaScript que simule un sistema de acceso inteligente, usando exclusivamente conceptos del Tema 1:
    ● Variables y tipos
    ● Operadores
    ● Control de flujo
    ● Bucles
    ● break y continue
*/

/*
Reglas técnicas (OBLIGATORIAS)

No se permite usar funciones
No se permite usar arrays ni objetos
No se permite usar métodos avanzados
*/

/*
Enunciado del reto

El sistema realiza 10 ciclos de verificación, numerados del 1 al 10.

En cada ciclo:
    1. Si el número de ciclo es múltiplo de 4
    👉 mostrar "Chequeo de seguridad"
    2. Si el número de ciclo es múltiplo de 6
    👉 mostrar "Alerta del sistema"
    3. Si el número de ciclo es múltiplo de 4 y de 6
    👉 mostrar "ALERTA CRÍTICA"
    4. Si el ciclo es igual a 9
    👉 mostrar "Sistema bloqueado" 👉 detener completamente la ejecución
    5. En cualquier otro caso
    👉 mostrar "Ciclo X operativo"
*/

//inicialización de variables
let numCiclos = 10

//bucle de verificación teniendo en cuanta que las condiciones más restrictivas se deben evaluar antes 
for (let ciclo = 1; ciclo <= numCiclos; ciclo++) {
    if (ciclo === 9) {
        console.log("Sistema bloqueado");
        break;
    }   else 
        if (ciclo % 4 === 0 && ciclo % 6 === 0) {
        console.log("ALERTA CRÍTICA");
    }   else if (ciclo % 6 === 0) {
        console.log("Alerta del sistema");
    }   else if (ciclo % 4 === 0) { 
        console.log("Chequeo de seguridad");
    }   else {
        console.log("Ciclo " + ciclo + " operativo");
    }   
}

// NOTA: El enunciado no es del todo correcto porque en sólo 10 ciclos no existe un nùmero que cumpla las dos condiciones de ser múltiplo de 4 y de 6, por lo que la condición de "ALERTA CRÍTICA" nunca se cumplirá. Para que se cumpla esa condición, el número de ciclo debería ser al menos 12 y, por tanto, el mensaje de "Sistema bloqueado" debería mostrarse en el ciclo posterior.