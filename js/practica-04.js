const dPeso = document.getElementById("peso");
const dAltura = document.getElementById("altura");
const dResultado = document.getElementById("resultado");
const bCalcular = document.getElementById("calcular");

function calcular() {
    let peso = parseFloat(dPeso.value);
    let altura = parseFloat(dAltura.value);

    if (isNaN(peso) || isNaN(altura)) {
        dResultado.innerHTML = "Ingrese peso y altura validos";
    }

    if (peso <= 0 || altura <= 0) {
        dResultado.innerHTML = "Ingrese peso y altura mayores a 0";
    }

    const imc = peso / (altura * altura);
    let nivel = "";

    if (imc < 18.5) {
        nivel = "bajo peso";
    } else if (imc < 24.9) {
        nivel = "Normal";
    } else if (imc < 24.9) {
        nivel = "Normal";
    } else if (imc < 29.9) {
        nivel = "Sobrepeso";
    } else {
        nivel = "Obesidad";
    }

    dResultado.innerHTML = "Tu IMC es :<Strong>" + imc.toFixed(2) + "</strong>  Nivel:<Strong> " + nivel + "</strong>";
}

bCalcular.addEventListener("click", calcular);
