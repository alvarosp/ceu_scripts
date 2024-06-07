// ==UserScript==
// @name         Intranet
// @namespace    http://tampermonkey.net/
// @version      20240204
// @description  Cambia la posición de la barra "A un solo clic"
// @author       You
// @match        https://intranet.ceu.es/es-es/Paginas/inicio.aspx
// @match        https://intranet.ceu.es/en-us/Pages/inicio.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ceu.es
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("DeltaPlaceHolderMain").style.setProperty("display", "flex");
    document.getElementById("DeltaPlaceHolderMain").style.setProperty("flex-flow", "column");
    document.getElementsByClassName("margen-contenido")[0].style.setProperty("order", -1)
})();