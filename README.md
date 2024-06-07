# Scripts

## Introducción
Este repositorio contiene unos cuantos scripts que facilitan un poco la vida en Blackboard, Intranet y otros. Para que funcionen primero hay que instalar Tampermonkey, una extensión del navegador que permite ejecutar Javascript propio (funciona en Chrome, Firefox, Safari, Edge y otros navegadores).

## Instalación y uso de Tampermonkey

![Icono Tampermonkey](https://www.tampermonkey.net/images/icon48.png)

Vete a la siguiente página e instala la extensión [Tampermonkey](https://www.tampermonkey.net/)

Una vez instalada, aparecerá el icono en la sección de extensiones del navegador (por ejemplo, arriba a la derecha en Chrome) y podrás agregar nuevos scripts pulsando en el icono y luego en "Agregar nuevo script". En esta pantalla tendrás que pegar el código (ver siguiente sección).

Puedes ver todos los scripts que tienes instalados y activarlos / desactivarlos pulsando en el icono y yendo al Dashboard.

Si estás en una página en la que esté activo algún script que tengas instalado aparecerá junto al icono de Tampermonkey un número con fondo rojo indicando cuántos scripts están activos en la página actual.

## Código

### Script guías docentes
Este script cambia el tamaño del hueco para editar las guías docentes y además añade dos botones para expandir y colapsar todas las secciones. Modificad las constantes WIDTH y HEIGHT a vuestro gusto para configurar el tamaño que queráis.

Copia el siguiente código en un nuevo script en Tampermonkey y dale a Archivo > Guardar (o Ctrl + S):

https://github.com/alvarosp/ceu_scripts/blob/79e927e717c427fcddba50948a9107faf7b63564/script_guias_docentes.js#L1-L60

### Script Blackboard cursos
Este script carga la pestaña de cursos al cargar la página de Blackboard.

Copia el siguiente código en un nuevo script en Tampermonkey y dale a Archivo > Guardar (o Ctrl + S):

https://github.com/alvarosp/ceu_scripts/blob/79e927e717c427fcddba50948a9107faf7b63564/script_blackboard_cursos.js#L1-L26

### Script Intranet
Este script cambia la posición de la barra "A un solo clic" para que aparezca antes del *carousel*. De esta forma, si las imágenes tardan en cargar, el botón "Campus Virtual" está más accesible.

Copia el siguiente código en un nuevo script en Tampermonkey y dale a Archivo > Guardar (o Ctrl + S):

https://github.com/alvarosp/ceu_scripts/blob/79e927e717c427fcddba50948a9107faf7b63564/script_intranet.js#L1-L18

## Otros

Aquí puedes encontrar información sobre cómo activar la selección de texto, y por tanto el copiar y pegar, en aquellas páginas web que lo bloquean: [Referencia](https://alanhogan.com/code/text-selection-bookmarklet)
