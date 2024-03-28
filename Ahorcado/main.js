/*
El juego del ahorcado con una interfaz gráfica sencilla
*/
//Almacena los distintos estados del muñeco
var estados = [
  "/Imágenes/Estado_final.jpg",
  "/Imágenes/Quinto_estado.jpg",
  "/Imágenes/Cuarto_estado.jpg",
  "/Imágenes/Tercer_estado.jpg",
  "/Imágenes/Segundo_estado.jpg",
  "/Imágenes/Estado_inicial.jpg"
]

//Almacena los lenguajes de programación
var lenguajes = ["C++", "Kotlin", "Python", "Java", "JavaScript", "C", "C#", "Ruby", "Swift", "PHP", "Go", "Rust", "Assembly", "Visual-Basic", "TypeScript", "Perl", "Lisp", "Haskell", "Objective-C", "MATLAB", "R", "Fortran", "Scala", "Lua", "Groovy", "Bash", "Cobol", "Ada", "Prolog", "Pascal", "Smalltalk", "Erlang"];

let intentos = 5;
let lenguaje= aleatorio(lenguajes);

//Para dar pistas sobre el lenguaje
let espacios= "";
  for(var i = 0; i < lenguaje.length; i++) {
   espacios+= "_ ";
    }


//Función para que cargue completamente la página antes de ejecutar el código
window.onload = iniciar;

function iniciar() {
  
  let btnProbar = document.getElementById("btnProbar");
  btnProbar.addEventListener("click",clickBtnProbar);
  
  mostrarDatos(intentos,espacios);
 
}

//Función que ayuda a mostrar los estados del muñeco
function mostrarDatos(intentos, espacios) {
  let muñeco = document.getElementById("muñeco");
  let valores = `<img src="${estados[intentos]}">`;
  muñeco.innerHTML = valores;
  
  let intentosMostrar = document.getElementById("intentos");
  intentosMostrar.innerText= `Número de intentos: ${intentos}`;
  
  let completados= document.getElementById("espacios");
  completados.innerText = espacios;
}

//Función que ayuda a sacar un lenguaje aleatorio
function aleatorio(array) {
  return array[Math.round(Math.random() * (array.length-1))];
}

//Función que pone el evento a la escucha del evento
function clickBtnProbar() {
  let letra = document.getElementById("txtLetra").value.charAt(0);
  
  //Dado que las cadenas son inmutables, se convierte a un array para tratarls
  let nuevo_espacios = espacios.split(" ");
  
  let contador=-1;
  
  //Analiza si coincide una o mas veces
  for(let i = 0; i < lenguaje.length;i++){
      if(lenguaje[i].toLowerCase() == letra.toLowerCase()){
        nuevo_espacios[i] = lenguaje[i];
        contador++;
      }
    }
   
   //Se vuelve a convertir en cadena 
    espacios = nuevo_espacios.join(" ");
    
    comprobar(contador,espacios);
    
  }
  
  //Función que ayuda a analizar los distintos estados a mostrar si se deben restar intentos, etcétera 
  function comprobar(contador,espacios) {
    if(contador < 0){
      intentos--;
      if(intentos > 0){
      mostrarDatos(intentos,espacios);
      }else{
        let resultado = document.getElementById("resultado");
        resultado.innerHTML = `<div id="game-over">Game Over<div>`;
      }
    }else{
      let comparador = espacios.split(" ");
      let completo;
      for (var i = 0; i < lenguaje.length; i++) {
        completo = comparador.some(a => a == lenguaje[i]);
        if(!completo){
          break;
        }
      }
      
      if(!completo){
        mostrarDatos(intentos,espacios);
      }else{
        let resultado = document.getElementById("resultado");
        resultado.innerHTML = `<div id="congratulations">Felicidades<div>`;
      }
    }
  }