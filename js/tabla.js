const dId = document.getElementById("idInput");
const dNombre = document.getElementById("nomInput");
const dEscuela = document.getElementById("escInput");
const dTabla = document.getElementById("table");
const tBody = document.getElementById("tBody");
const bAgregar = document.getElementById("agregar");

function agregarFila() {
    let txtId = dId.value.trim();
    let txtNombre = dNombre.value.trim();
    let txtEscuela = dEscuela.value.trim();

    if (!txtNombre || !txtId || !txtEscuela) {
        alert("Porfavor, completa todos los campos");
        return;
    }

    const fila = document.createElement("tr");

    const celfaId = document.createElement("td");
    celfaId.textContent = txtId;
    fila.appendChild(celfaId);

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = txtNombre;
    fila.appendChild(celdaNombre);

    const celdaEscuela = document.createElement("td");
    celdaEscuela.textContent = txtEscuela;
    fila.appendChild(celdaEscuela);

    tBody.appendChild(fila);
    dTabla.appendChild(tBody);

    document.getElementById("idInput").value = "";
    document.getElementById("nomInput").value = "";
    document.getElementById("escInput").value = "";
}

bAgregar.addEventListener("click", agregarFila);
