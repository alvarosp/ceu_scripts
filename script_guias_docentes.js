// ==UserScript==
// @name         Edición Guías Docentes
// @namespace    http://tampermonkey.net/
// @version      20240607
// @description  Cambia el tamaño de los inputs en las guías docentes
// @author       ASaP
// @match        https://gestionacademicavirtual.uspceu.es/doa/control/mtoConsultarEditarGuiDocBs
// @icon         
// @grant        none
// ==/UserScript==

const WIDTH = 1400; // Modificar para cambiar el ancho
const HEIGHT = 600; // Modificar para cambiar el alto

const DELAY = 500;
const newButtonCollapseString = '<a class="btn btn-primary" id="collapseAll">Colapsar</a>';
const newButtonExpandString = '<a class="btn btn-primary" id="expandAll">Expandir</a>';

(function() {
  'use strict';
  setTimeout(main, DELAY);
})();

function main(){
  const parser = new DOMParser();
  const accordiones = document.getElementById('accordiones');
  let list = document.getElementsByClassName("mce-tinymce");
  let collapseList = document.getElementsByClassName("panel-collapse");
  let iframes = document.querySelectorAll('iframe[id^=_ficha_txt]');

  for (let item of list) {
    item.style = `width: ${WIDTH}px;`;
  }
  for (let item of iframes) {
    item.style = `width: 100%; height: ${HEIGHT}px; display: block;`;
  }
  
  AddButton(newButtonExpandString);
  AddButton(newButtonCollapseString);
  
  document.getElementById('collapseAll').addEventListener("click",Collapse);
  document.getElementById('expandAll').addEventListener("click",Expand);
  
  function AddButton(string){
    let doc = parser.parseFromString(string, 'text/html');
    const newButton = doc.body.firstChild;
    accordiones.before(newButton);
  }

  async function Collapse() {
    for (let item of collapseList) {
      item.classList.add("collapse");
    }
  }
  async function Expand() {
    for (let item of collapseList) {
      item.classList.remove("collapse");
    }
  }
}