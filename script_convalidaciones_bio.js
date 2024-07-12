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
        <h1>Convalidaciones</h1>
        <div id="tablaConvalidaciones"></div>
        <h1>Creditos Sobrantes</h1>
        <div id="tablaCreditos"></div>
        <a id="closePopup" class="close" href="#">&times;</a>
        <div class="content" id="content">
            
        </div>
    </div>
    </div>`;
const HTMLTableInit = '<table class="taulainformativa"><thead><tr><th>Antigua</th><th>Nueva</th></tr></thead><tbody>';
const HTMLTableCreditosInit = '<table class="taulainformativa"><thead><tr><th>Asignatura</th><th>Creditos restantes</th></tr></thead><tbody>';
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
const CONV = {
  17: {
    orig:[],
    cred:[],
    conv:[]
  }
};

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
  const tablaCreditosHTML = document.getElementById('tablaCreditos');
  let subjects = [];
  let rows = document.querySelectorAll('#table1 > tbody > tr');
  //let HTMLTable = HTMLTableInit;
  rows.forEach((row)=> {
    const cells = row.getElementsByTagName('td');
    let mark = cells[9].innerText;
    if (mark !== "Suspenso" && mark !== 'No Presentado'){
      const name = cells[3].innerText;
      const creditos = parseFloat(cells[4].innerText);
      let subject = {name, mark, creditos, creditosMax: creditos};
      subjects[name] = subject;
      //HTMLTable += `<tr><td>${name}</td><td>${mark}</td></tr>`;
    };
  });
  //HTMLTable += HTMLTableEnd;
  //AddElement(HTMLTable, tablaHTML, 1);
  console.log(subjects);
  CheckConvalidaciones(subjects);
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
  function VerConvalidaciones(){
    console.log("Click Ver Convalidaciones");
    const overlay = document.getElementById("popup1");
    overlay.style.visibility='visible';
  }

  function closePopup() {
    const overlay = document.getElementById("popup1");
    overlay.style.visibility='hidden';
  }

  function CheckConvalidaciones(subjects){
    let HTMLTable = HTMLTableInit;
    if(subjects.hasOwnProperty('Inglés')){
      HTMLTable += `<tr><td>Inglés</td><td>Vida Universitaria</td></tr>`;
      subjects['Inglés'].creditos -= 6;
    }

    if(subjects.hasOwnProperty('Sistemas Digitales')){ //19
      HTMLTable += `<tr><td>Sistemas Digitales</td><td>Sistemas empotrados en biomedicina</td></tr>`;
      subjects['Sistemas Digitales'].creditos -= 6;
    }

    if(subjects.hasOwnProperty('Técnicas de Imagen en Biomedicina') && 
      subjects.hasOwnProperty('Tratamiento Digital de Imágenes')){ //35
      HTMLTable += `<tr><td>Técnicas de Imagen en Biomedicina<br>
        Tratamiento Digital de Imágenes</td><td>
        Técnicas de imagen en biomedicina<br>
        Tratamiento digital de Imágenes</td></tr>`;
      subjects['Técnicas de Imagen en Biomedicina'].creditos -= 3;
      subjects['Tratamiento Digital de Imágenes'].creditos -= 6;
    } else if (subjects.hasOwnProperty('Tratamiento Digital de Imágenes')) { //27
      HTMLTable += `<tr><td>Tratamiento Digital de Imágenes</td><td>Tratamiento digital de imágenes</td></tr>`;
      subjects['Tratamiento Digital de Imágenes'].creditos -= 4.5;
    } else if (subjects.hasOwnProperty('Técnicas de Imagen en Biomedicina') &&
      subjects.hasOwnProperty('Proyectos en Ingeniería Biomédica I')){ //28
      HTMLTable += `<tr><td>Técnicas de Imagen en Biomedicina<br>
        Proyectos en Ingeniería Biomédica I</td><td>
        Técnicas de imagen en biomedicina</td></tr>`;
      subjects['Técnicas de Imagen en Biomedicina'].creditos -= 3;
      subjects['Proyectos en Ingeniería Biomédica I'].creditos -= 1.5;
    }
    if(subjects.hasOwnProperty('Proyectos en Ingeniería Biomédica I')){ //36
      HTMLTable += `<tr><td>Proyectos en Ingeniería Biomédica I</td><td>
        Empresas y emprendimiento</td></tr>`;
      subjects['Proyectos en Ingeniería Biomédica I'].creditos -= 4.5;
    }

    if(subjects.hasOwnProperty('Telemedicina') &&
      subjects.hasOwnProperty('Señales Biomédicas') &&
      subjects.hasOwnProperty('Instrumentación Biomédica') &&
      subjects.hasOwnProperty('Proyectos en Ingeniería Biomédica I') &&
      subjects.hasOwnProperty('Fundamentos Matemáticos de la Ingeniería Biomédica III') &&
      subjects.hasOwnProperty('Fisiopatología y Patología General')){ //33
      HTMLTable += `<tr><td>Telemedicina<br>
        Señales Biomédicas<br>
        Instrumentación Biomédica<br>
        Proyectos en Ingeniería Biomédica I<br>
        Fundamentos Matemáticos de la Ingeniería Biomédica III<br>
        Fisiopatología y Patología General</td><td>
        Telemedicina<br>
        Electrónica analógica aplicada a la ingeniería biomédica<br>
        Señales Biomédicas</td></tr>`;
      subjects['Telemedicina'].creditos -= 3;
      subjects['Señales Biomédicas'].creditos -= 3;
      subjects['Instrumentación Biomédica'].creditos -= 3;
      subjects['Proyectos en Ingeniería Biomédica I'].creditos -= 1.5;
      subjects['Fundamentos Matemáticos de la Ingeniería Biomédica III'].creditos -= 2;
      subjects['Fisiopatología y Patología General'].creditos -= 1;
    } else {
      if (subjects.hasOwnProperty('Telemedicina') &&
        subjects.hasOwnProperty('Señales Biomédicas') &&
        subjects.hasOwnProperty('Instrumentación Biomédica')){ //32
        HTMLTable += `<tr><td>Telemedicina<br>
          Señales Biomédicas<br>
          Instrumentación Biomédica</td><td>
          Telemedicina<br>
          Electrónica analógica aplicada a la ingeniería biomédica</td></tr>`;
        subjects['Telemedicina'].creditos -= 3;
        subjects['Señales Biomédicas'].creditos -= 3;
        subjects['Instrumentación Biomédica'].creditos -= 3;
      } else if (subjects.hasOwnProperty('Instrumentación Biomédica') &&
        subjects.hasOwnProperty('Señales Biomédicas') &&
        subjects.hasOwnProperty('Fundamentos Matemáticos de la Ingeniería Biomédica III') &&
        subjects.hasOwnProperty('Proyectos en Ingeniería Biomédica I')){ //40
        HTMLTable += `<tr><td>Instrumentación Biomédica<br>
          Señales Biomédicas<br>
          Fundamentos Matemáticos de la Ingeniería Biomédica III<br>
          Proyectos en Ingeniería Biomédica I</td><td>      
          Electrónica analógica aplicada a la ingeniería biomédica<br>
          Señales Biomédicas</td></tr>`;
        subjects['Instrumentación Biomédica'].creditos -= 3;
        subjects['Señales Biomédicas'].creditos -= 3;
        subjects['Fundamentos Matemáticos de la Ingeniería Biomédica III'].creditos -= 2;
        subjects['Proyectos en Ingeniería Biomédica I'].creditos -= 1;
      } else if (subjects.hasOwnProperty('Instrumentación Biomédica') &&
        subjects.hasOwnProperty('Señales Biomédicas')){ //39
        HTMLTable += `<tr><td>Instrumentación Biomédica<br>
          Señales Biomédicas</td><td>      
          Electrónica analógica aplicada a la ingeniería biomédica</td></tr>`;
        subjects['Instrumentación Biomédica'].creditos -= 3;
        subjects['Señales Biomédicas'].creditos -= 3;
      } else if (subjects.hasOwnProperty('Telemedicina') &&
        subjects.hasOwnProperty('Señales Biomédicas')){ //41
        HTMLTable += `<tr><td>Telemedicina<br>
          Señales Biomédicas</td><td>
          Telemedicina</td></tr>`;
        subjects['Telemedicina'].creditos -= 3;
        subjects['Señales Biomédicas'].creditos -= 3;
      }
      if(subjects.hasOwnProperty('Fisiopatología y Patología General')){ //29
        HTMLTable += `<tr><td>Fisiopatología y Patología General</td><td>
          Fisiopatología y patología general</td></tr>`;
        subjects['Fisiopatología y Patología General'].creditos -= 6;
      }
    }

    if(subjects.hasOwnProperty('Sistemas de Soporte a la Decisión') &&
      subjects.hasOwnProperty('Minería de Datos en Biomedicina') &&
      subjects.hasOwnProperty('Fundamentos Matemáticos de la Ingeniería Biomédica III')){ //34
      HTMLTable += `<tr><td>Sistemas de Soporte a la Decisión<br>
        Minería de Datos en Biomedicina<br>
        Fundamentos Matemáticos de la Ingeniería Biomédica III</td><td>
        Aprendizaje automático en biomedicina<br>
        Sistemas de Soporte a la Decisión</td></tr>`;
      subjects['Sistemas de Soporte a la Decisión'].creditos -= 4.5;
      subjects['Minería de Datos en Biomedicina'].creditos -= 4.5;
      subjects['Fundamentos Matemáticos de la Ingeniería Biomédica III'].creditos -= 3;
    }

    if(subjects.hasOwnProperty('Métodos Numéricos en Ingeniería Biomédica') &&
      subjects.hasOwnProperty('Fundamentos Matemáticos de la Ingeniería Biomédica III')){ //42
      HTMLTable += `<tr><td>Métodos Numéricos en Ingeniería Biomédica<br>
        Fundamentos Matemáticos de la Ingeniería Biomédica III</td><td>
        Métodos Numéricos en Ingeniería Biomédica</td></tr>`;
      subjects['Métodos Numéricos en Ingeniería Biomédica'].creditos -= 4.5;
      subjects['Fundamentos Matemáticos de la Ingeniería Biomédica III'].creditos -= 3;
    }
    HTMLTable += HTMLTableEnd;
    AddElement(HTMLTable, tablaHTML, 1);

    HTMLTable = HTMLTableCreditosInit;
    for (const subject in subjects){
      const data = subjects[subject];
      if (data.creditos != data.creditosMax && data.creditos != 0){
        let subjectName = data.name;
        if(data.creditos < 0){
          subjectName += " ¡¡REVISAR!!";
        }
        HTMLTable += `<tr><td>${subjectName}</td><td>${data.creditos}</td></tr>`;
      }
    }
    if(subjects.hasOwnProperty('Fundamentos Matemáticos de la Ingeniería Biomédica III')){
      const fm3Data = subjects['Fundamentos Matemáticos de la Ingeniería Biomédica III'];
      if(fm3Data.creditos == fm3Data.creditosMax){
        HTMLTable += `<tr><td>${fm3Data.name}</td><td>${fm3Data.creditos}</td></tr>`;
      }
    }
    HTMLTable += HTMLTableEnd;
    AddElement(HTMLTable, tablaCreditosHTML, 1);
  }
}