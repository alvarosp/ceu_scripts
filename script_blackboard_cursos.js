// ==UserScript==
// @name         Blackboard Cursos
// @namespace    http://tampermonkey.net/
// @version      20240204
// @description  Intenta cargar lo antes posible la pestaña de Cursos de Blackboard
// @author       You
// @match        https://ceu.blackboard.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=blackboard.com
// @grant        none
// ==/UserScript==

const initDelay = 600;
const delay = 100;

(function() {
    'use strict';
    setTimeout(checkURL, initDelay);
})();

function checkURL(){
    if (window.location.pathname.includes("institution-page")){
        window.location.href = "https://ceu.blackboard.com/ultra/course";
    } else {
        setTimeout(checkURL, delay);
    }
}