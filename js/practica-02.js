const operaciones = document.getElementById("Operaciones");
const operador = document.getElementById("lblOp");
const txtNum1 = document.getElementById("txtNum1");
const txtNum2 = document.getElementById("txtNum2");
const resultado = document.getElementById("resultado");
const btnCalcular = document.getElementById("btnCalcular");

// Declarar funciones

// Funcion para actualizar el operador

function mostrarOperador() {
    const item = parseInt(operaciones.value);

    switch (item) {
        case 1:
            operador.textContent = "+";
            break;
        case 2:
            operador.textContent = "-";
            break;
        case 3:
            operador.textContent = "*";
            break;
        case 4:
            operador.textContent = "/";
            break;
        default:
            operador.textContent = "";
            break;
    }
}

function calcular() {
    const num1 = parseFloat(txtNum1.value);
    const num2 = parseFloat(txtNum2.value);
    const item = parseInt(operaciones.value);
    var resultados;

    if (!isNaN(item)) {
        if (isNaN(num1) || isNaN(num2)) {
            resultado.textContent = "Favor de ingresar dos numeros";
            return;
        }

        switch (item) {
            case 1:
                resultados = num1 + num2;
                break;
            case 2:
                resultados = num1 - num2;
                break;
            case 3:
                resultados = num1 * num2;
                break;
            case 4:
                resultados = num1 / num2;
                break;
        }

        resultado.textContent = "Aqui esta el resultado " + resultados;
    }
}

// codificar los eventos
operaciones.addEventListener("change", mostrarOperador);
btnCalcular.addEventListener("click", calcular);
