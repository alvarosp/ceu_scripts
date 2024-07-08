// ==UserScript==
// @name         Convalidaciones Bio
// @namespace    http://tampermonkey.net/
// @version      20240708
// @description  Gestiona la convalidación de asignaturas
// @author       You
// @match        https://gestionacademicavirtual.uspceu.es/exps-war/Controlador/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=blackboard.com
// @grant        GM_addStyle
// ==/UserScript==

const DELAY = 500;
const HTMLNewButtonVerConvalidaciones = '<a class="sigBtnFreeHrefXXL" id="buttonVerConvalidaciones">Ver convalidaciones</a>';
const HTMLOverlayString = `<div id="popup1" class="overlay">
    <div class="popup">
        <h2>Asignaturas aprobadas</h2>
        <div id="tablaConvalidaciones"></div>
        <a id="closePopup" class="close" href="#">&times;</a>
        <div class="content" id="content">
            
        </div>
    </div>
    </div>`;
const HTMLTableInit = '<table class="taulainformativa"><thead><tr><th>Asignatura</th><th>Calificación</th></tr></thead><tbody>';
const HTMLTableEnd = '</tbody></table>';
const css = 
    `#buttonSelect{
        margin-right: 50px;
    }

    .overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        visibility: hidden;
        z-index: 999;
    }

    .popup {
        margin: 70px auto;
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        width: 30%;
        position: relative;
      }

    .popup .close {
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 30px;
        font-weight: bold;
        text-decoration: none;
        color: #333;
      }`;

(function() {
    'use strict';
    GM_addStyle(css)
    setTimeout(main, DELAY);
})();

function main(){
  const parser = new DOMParser();
  const parent1 = document.getElementsByClassName('sigAccion')[0];
  AddElement(HTMLNewButtonVerConvalidaciones, parent1);
  document.getElementById('buttonVerConvalidaciones').addEventListener("click",VerConvalidaciones);
  AddElement(HTMLOverlayString, parent1);
  document.getElementById("closePopup").addEventListener('click', closePopup);
  // Process table
  //rows[0].getElementsByTagName('td')[9].innerText;
  const tablaHTML = document.getElementById('tablaConvalidaciones');
  let subjects = [];
  let rows = document.querySelectorAll('#table1 > tbody > tr');
  let HTMLTable = HTMLTableInit;
  rows.forEach((row)=> {
    const cells = row.getElementsByTagName('td');
    let mark = cells[9].innerText;
    if (mark !== "Suspenso" && mark !== 'No Presentado'){
      const name = cells[3].innerText;
      let subject = {name, mark};
      subjects.push(subject);
      HTMLTable += `<tr><td>${name}</td><td>${mark}</td></tr>`
    };
  });
  HTMLTable += HTMLTableEnd;
  AddElement(HTMLTable, tablaHTML, 1);
  console.log(subjects);

  function AddElement(element, parent, position = 0){
    let doc = parser.parseFromString(element, 'text/html');
    const newElement = doc.body.firstChild;
    switch(position){
      case 0: parent.prepend(newElement);
        break;
      case 1: parent.append(newElement);
    }
  }
}

function VerConvalidaciones(){
  console.log("Click Ver Convalidaciones");
  const overlay = document.getElementById("popup1");
  overlay.style.visibility='visible';
}

function closePopup() {
  const overlay = document.getElementById("popup1");
  overlay.style.visibility='hidden';
}
