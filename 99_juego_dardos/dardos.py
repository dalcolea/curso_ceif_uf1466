# inicializar variables

jugadores = []
max_jugadores = 4
num_rondas = 3
ganadores = []
max_puntos = 121

# solicitar el nombre de los jugadores
for i in range(max_jugadores):
    nombre = input(f"Ingrese el nombre del jugador {i + 1}: ")
    if nombre:
        jugadores.append({"nombre": nombre, "puntos": max_puntos})

# comenzar las rondas del juego
for ronda in range(1, num_rondas + 1):
    print(f"Ronda {ronda} - Comienza el juego!")
    for jugador in jugadores:
        puntos = int(input(f"{jugador['nombre']}, ingresa tus puntos para esta ronda: "))
        
        if puntos > 0 and puntos <= max_puntos:
            jugador["puntos"] -= puntos
            if jugador["puntos"] <= 0:
                jugador["puntos"] = 0
                ganadores.append({"nombre": jugador["nombre"], "puntos": jugador["puntos"]})

    if ganadores:
        print(f"Ganadores de la ronda {ronda}: {', '.join(g['nombre'] for g in ganadores)}")
        break

if not ganadores:
    print("No hay ganadores después de todas las rondas. ¡Inténtalo de nuevo!")