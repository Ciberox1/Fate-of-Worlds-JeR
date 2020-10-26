# Título: Fate of Worlds
 
### Estudio/Diseñadores

#### Special Kode


-Adrián Salgado Jimeno


-Jonás Martín Carasa


-Alejandro García-Muñoz Muñoz


-Alejandro García Ochoa


-Mario Simón Soto 

### Género

Plataformas, Acción

### Plataforma

PC/Web

### Versión

v0.0.1

### Sinopsis del Juego

Dos personajes se embarcan en una aventura entre dimensiones a punto de destruirse, el objetivo es superar obstáculos, matar monstruos y cooperar entre vosotros para poder sobrevivir.

### Categoría

Twins Minigame es parecido en cuanto a tener dos pantallas con diferentes obstáculos.

### Licencia

El juego es completamente original y no se ha cogido la base de ningún libro ni película.

### Core Game Loop

Correr, saltar, disparar a los enemigos, superar puzles sencillos, y cooperar con tu amigo para pasaros objetos e incluso enemigos.

### Público

Todos los públicos.

## Historial de Versiones

#### v0.0.1

- Esta es la primera versión del GDD.

#### v0.0.2

- Se han diseñado el resumen y la visión general del juego.
- Se han diseñado las mecánicas del juego.
- Se han diseñado las dinámicas del juego.

#### v0.0.3

- Se ha establecido el flujo de pantallas durante el juego.
- Se han establecido las distintas interfaces del juego.

#### v0.0.4

- Se han diseñado los distintos personajes y enemigos del juego.
- Se ha diseñado el primer (y en principio, único) nivel del videojuego.

## Visión General del Juego

Juego cooperativo para dos jugadores en el que cada uno controlará a un personaje y en el que deberán ir completando niveles en los que se enfrentarán a distintos puzles y enemigos para poder salvar sus dos universos. Cada nivel se compondrá de dos espacios jugables, uno en la parte superior y otro en la inferior, dentro de los cuales se moverán los jugadores.

### Cámara

Se va a visualizar en 2D, con un scroll lateral.

### Periféricos

Principalmente se usarán como periféricos ratón y teclado.

### Controles

Se ofrecen dos configuraciones de controles entre las que el jugador podrá elegir. Se muestran a continuación:


- Movimiento: WASD / Flechas de movimiento
- Interactuar: K / E
- Arma: J / W
- Soltar objeto: L / Q
- Colapso dimensional: Spacebar

## Mecánicas del Juego

- Los dos personajes pueden moverse hacia la izquierda o la derecha y saltar.
- Cada personaje actúa en su universo.
- Cada nivel se compondrá de dos espacios jugables asociados cada uno a un jugador, uno en la parte superior y otro en la inferior.
- Los objetos con los que colisionan de ambos espacios son los mismos, a pesar de que la ambientación de cada espacio sea diferente.
- Los personajes solo pueden atacar si tienen el arma (sólo hay una en el juego).
- Cada personaje puede provocar un colapso de universos, en el cual pueden mezclar sus dos espacios, durante un tiempo limitado.
- Durante los colapsos se pueden transferir objetos y enemigos.
- Puedes saltar sobre los enemigos para aturdirlos.
- Ambos personajes comparten la característica de vida, si un personaje se hace daño, ambos personajes pierden vida.
- Para disparar se pulsará una tecla y el disparo irá en la dirección a la que mire el jugador.

## Dinámica del Juego

- Los jugadores se mueven hasta el final del nivel lo más rápido posible.
- Para evadir a los enemigos, uno de los jugadores tendrá que ganar tiempo mientras el otro jugador consigue avanzar en el nivel.
- Uno de los dos jugadores puede aprovechar el colapso para enviar objetos o enemigos al otro jugador si se encuentra en apuros.
- Los jugadores deberán actuar con rapidez para deshacerse de las oleadas de enemigos.
- Los jugadores intentarán sobrevivir el máximo tiempo posible.

## Flujo de Pantallas y Estados 

## Interfaz

### Menú Principal

Es la pantalla de inicio al comenzar a jugar al videojuego. Consta de un botón para comenzar a jugar.

### Menú de Opciones

Es la pantalla que permite realizar ajustes, como cambiar los controles, ajustar el volumen de la música y los efectos de sonido u otros ajustes externos al juego.

### Menú de Pausa

Sirve para que los jugadores puedan detener el juego cuando no quieran seguir jugando o quieran hacer una pausa. Consta de un botón para continuar, un botón para abandonar y un botón para ajustar opciones.

### H.U.D.

El H.U.D. sirve al jugador para mostrar información rápida y persistente que los jugadores quieren conocer durante el transcurso de la partida. Entre otras cosas, se muestra el nombre de los jugadores, su salud y el estado en el que se encuentra el colapso.

## Nivel

### Descripción
En principio el juego consistiría en un único nivel grande. En este nivel no habría checkpoints (puntos de control), por lo que en caso de morir habría que empezar desde el comienzo. No obstante, el nivel si contaría con lugares en los recuperar la salud.


Visualmente el nivel sería una una instalación de investigación. A medida que los jugadores avancen irían encontrando más anomalías provocadas por el choque entre mundos. Siendo universos paralelos, los niveles que experimentarían ambos jugadores serían similares, pero con suficientes diferencias como para que se sientan como lugares distintos.

### Objetivos

- Cooperar en las distintas situaciones en las que tengan que resolver acertijos sencillos.
- Deshacerse de las distintas oleadas de enemigos.
- Llegar hasta el final del nivel.

### Progreso

Describir qué ocurre cuando el jugador termina el nivel.

### Enemigos

El nivel tendrá enemigos que enfrentar que se diseñarán más adelante.

### Items

- Arma.
- Objetos curativos (estáticos)
- Objetos consumibles (granadas, colapso portátil, agujero negro portátil)
- Objetos clave.

### Personajes

Mario 1 y Mario 2

### Música y efectos de sonido

Describir la música de este nivel al igual que los efectos de sonido de ambiente que contiene.


- Música sin copyright.
- Efectos de sonido sin copyright.

## Personajes

### Mario 1
#### Descripción
Científico con figura humanoide y atuendos de color rojo. Tiene un alter ego con atuendos de color verde en otra dimensión.

(Falta insertar imagen de Mario)

#### Concepto
Científico obsesionado con encontrar la clave para cambiar de dimensión, egocéntrico, y completamente antisocial. Centrado en ver la vida como una constante huida de organizaciones misteriosas y teorías conspiranoicas. Su objetivo es encontrar la clave del cambio dimensional antes que nadie, y evitar que el supuesto experimento acabe en malas manos.

#### Momento
Al comienzo (personaje jugable).

#### Habilidades
Moverse, aturdir enemigos y utilizar objetos.

#### Armas
Puede equipar el arma del videojuego, pero no la lleva con él por defecto. Además, no puede coger objetos si lleva el arma equipada.

#### Objetos
Puede coger objetos, pero no puede llevar más de un objeto a la vez. Además, no puede equipar el arma mientras tiene un objeto en las manos.

### Mario 2
#### Descripción
Científico con figura humanoide y atuendos de color verde. Tiene un alter ego con atuendos de color rojo en otra dimensión.

(Falta insertar imagen de Mario)

#### Concepto
Científico obsesionado que encontró la clave del cambio dimensional y se arrepiente de las consecuencias que llevó eso,por lo que busca destruir todo rastro de ese experimento. Es  humilde y popular entre la gente. Su objetivo es hacer desaparecer la clave del cambio dimensional antes que la situación empeore.

#### Momento
Al comienzo (personaje jugable).

#### Habilidades
Moverse, aturdir enemigos y utilizar objetos.

#### Armas
Puede equipar el arma del videojuego, pero no la lleva con él por defecto. Además, no puede coger objetos si lleva el arma equipada.

#### Objetos
Puede coger objetos, pero no puede llevar más de un objeto a la vez. Además, no puede equipar el arma mientras tiene un objeto en las manos. 

## Enemigos

### Amalgama

#### Descripción
Figura oscura y amorfa producto de la fusión de una persona con parte del mobiliario u otra persona como resultado de un colapso dimensional desafortunado.


(Falta insertar imagen de la amalgama)

#### Concepto

#### Momento
Se pueden encontrar varios a lo largo del nivel.

#### Habilidades
Moverse y dañar a los personajes.

#### Armas
Armas naturales.

#### Objetos
Las amalgamas no pueden utilizar objetos.
