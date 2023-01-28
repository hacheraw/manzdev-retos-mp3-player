# manzdev-retos-mp3-player

🌍 **URL del reto**: *https://lenguajejs.com/retos/nivel-medio/mp3-player/*

## Datos

- 🦄 **Desarrollador/a:** *Hache_raw*
- 🐇 **Link a red social:** *https://twitter.com/hache_raw*
- 🦾 **Perfil:** *Avanzado*
- 💬 **Un comentario breve o frase ingeniosa**: *¿Porfa please recubierto de nata?*

## Observaciones

Sirve como introducción básica a los eventos.

~~La barra de progreso la he hecho con `<progress></progress>` pero hay que meter demasiado CSS para que los navegadores no la pinten a su manera.
Seguramente la termine cambiando por un div contenedor e hijo.~~

Al final terminé haciendo la barra de progreso con divs.

La playlist me pareció que debía ser un `<ol></ol>` pero en el reto, los elementos de la playlist tienen un borde inferior y terminé haciéndolo con `<div></div>` y un `::before` para la autonumeración con css.

**9 meses después...**

He vuelto al proyecto después de 9 meses ya que me faltaba cambiar los botones por iconos. Me he dado cuenta de dos cosas:
- Estoy oxidado.
- Con microlibrerías reactivas como [Alpine.js](https://alpinejs.dev/), esto sería sencillísimo.

### Mis añadidos:

El reto dice que si es la primera canción o la final, los botones de anterior y siguiente respectivamente estarán deshabilitados.
Pero, ¿y si el usuario quiere escuchar la lista en bucle? Pues para eso he añadido un botón arriba a la izquierda, que por defecto está deshabilitado.

En la playlist el número de la canción actual se va marcando en negrita.

> Puedes encontrar otros retos de Manz.dev en: <br>▶ https://lenguajejs.com/retos/
