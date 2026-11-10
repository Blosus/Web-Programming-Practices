const valor = document.getElementById("valor");
const bInc = document.getElementById("incrementar");
const bDis = document.getElementById("disminuir");
const bRei = document.getElementById("reiniciar");
var contador = 0;

function inc() {
    contador++;
    valor.textContent = contador;
}

function dec() {
    contador--;
    valor.textContent = contador;
}

function rei() {
    contador = 0;
    valor.textContent = contador;
}

bInc.addEventListener("click", inc);
bDis.addEventListener("click", dec);
bRei.addEventListener("click", rei);
