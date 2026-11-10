/* obtener los objetos */

const parrafo = document.getElementById("parrafo");
const btnMay = document.getElementById("btnMay");
const btnMin = document.getElementById("btnMin");
const btnAgregar = document.getElementById("btnAgregar");

var col = parrafo.style.color;
var tm = parrafo.style.fontSize;
var cf = parrafo.style.backgroundColor;

function cambiar() {
    parrafo.style.color = "red";
    parrafo.style.fontSize = "30px";
    parrafo.style.backgroundColor = "yellow";
}

function normal() {
    parrafo.style.color = col;
    parrafo.style.fontSize = tm;
    parrafo.style.backgroundColor = cf;
}

function mayuscula() {
    parrafo.textContent = parrafo.textContent.toUpperCase();
}

function minuscula() {
    parrafo.textContent = parrafo.textContent.toLowerCase();
}

function agregarTexto() {
    let txt = txtTexto.value;
    parrafo.innerText = parrafo.innerText + txt;
}

function justificar() {
    parrafo.style.textAlign = "justify";
    parrafo.style.margin = "10em";
}

// codificar los eventos del parrafo
parrafo.addEventListener("mouseover", cambiar);
parrafo.addEventListener("mouseout", normal);
btnMay.addEventListener("click", mayuscula);
btnMin.addEventListener("click", minuscula);
btnAgregar.addEventListener("click", agregarTexto);

/* agregar un boton donde se codifique el evento click y 
llame a la funcion justificar, que justificara el texto del
parrafo y le dara un margen 3em */

btnJustificar.addEventListener("click", justificar);
