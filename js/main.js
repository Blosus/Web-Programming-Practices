// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    get,
    child,
    update,
    remove,
    onValue,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

import { firebaseConfig, cloudinaryConfig } from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// declarar unas variables global
var numSerie = 0;
var marca = "";
var modelo = "";
var descripcion = "";
var urlImg = "";

// funciones
function LeerInputs() {
    numSerie = document.getElementById("txtNumSerie").value;
    marca = document.getElementById("txtMarca").value;
    modelo = document.getElementById("txtModelo").value;
    descripcion = document.getElementById("txtDescripcion").value;
    urlImg = document.getElementById("txtUrl").value;
}

function mostrarMensaje(mensaje) {
    var mensajeElement = document.getElementById("mensaje");
    mensajeElement.textContent = mensaje;
    mensajeElement.style.display = "block";
    setTimeout(() => {
        mensajeElement.style.display = "none";
    }, 1000);
}

function insertarProducto() {
    LeerInputs();

    // Validar que todos los campos estén llenos
    if (numSerie === "" || marca === "" || modelo === "" || descripcion === "" || urlImg === "") {
        mostrarMensaje("Faltaron datos por capturar");
        return;
    }

    // Función de Firebase para agregar registro
    set(ref(db, "Automoviles/" + numSerie), {
        numSerie: numSerie,
        marca: marca,
        modelo: modelo,
        descripcion: descripcion,
        urlImg: urlImg,
    })
        .then(() => {
            mostrarMensaje("Se agregó con éxito");
            limpiarInputs();
            Listarproductos(); // si tienes la función de listar, actualiza la tabla
        })
        .catch((error) => {
            mostrarMensaje("Ocurrió un error: " + error.message);
        });
}

// codifica el boton de buscar
// agregar las siguientes funciones

function limpiarInputs() {
    document.getElementById("txtNumSerie").value = "";
    document.getElementById("txtModelo").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtUrl").value = "";
}

function escribirInputs() {
    document.getElementById("txtModelo").value = modelo;
    document.getElementById("txtMarca").value = marca;
    document.getElementById("txtDescripcion").value = descripcion;
    document.getElementById("txtUrl").value = urlImg;
}

function buscarProducto() {
    let numSerie = document.getElementById("txtNumSerie").value.trim();
    if (numSerie === "") {
        mostrarMensaje("No se ingresó Num Serie");
        return;
    }

    const dbref = ref(db);
    get(child(dbref, "Automoviles/" + numSerie)).then((snapshot) => {
        if (snapshot.exists()) {
            marca = snapshot.val().marca;
            modelo = snapshot.val().modelo;
            descripcion = snapshot.val().descripcion;
            urlImg = snapshot.val().urlImg;
            escribirInputs();
        } else {
            limpiarInputs();
            mostrarMensaje("El producto con código " + numSerie + " no existe.");
        }
    });
}

// Listar productos
function Listarproductos() {
    const dbRef = ref(db, "Automoviles");
    const tabla = document.getElementById("tablaProductos");
    const tbody = tabla.querySelector("tbody");
    tbody.innerHTML = "";

    onValue(
        dbRef,
        (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const data = childSnapshot.val();
                var fila = document.createElement("tr");

                var celdaCodigo = document.createElement("td");
                celdaCodigo.textContent = childKey;
                fila.appendChild(celdaCodigo);

                var celdaNombre = document.createElement("td");
                celdaNombre.textContent = data.marca;
                fila.appendChild(celdaNombre);

                var celdaPrecio = document.createElement("td");
                celdaPrecio.textContent = data.modelo;
                fila.appendChild(celdaPrecio);

                var celdaCantidad = document.createElement("td");
                celdaCantidad.textContent = data.descripcion;
                fila.appendChild(celdaCantidad);

                var celdaImagen = document.createElement("td");
                var imagen = document.createElement("img");
                imagen.src = data.urlImg;
                imagen.width = 100;
                celdaImagen.appendChild(imagen);
                fila.appendChild(celdaImagen);

                tbody.appendChild(fila);
            });
        },
        { onlyOnce: true },
    );
}

// Se agregó la función actualizar
function actualizarAutomovil() {
    LeerInputs();
    if (numSerie === "" || marca === "" || modelo === "" || descripcion === "") {
        mostrarMensaje("Favor de capturar toda la información.");
        return;
    }

    update(ref(db, "Automoviles/" + numSerie), {
        numSerie: numSerie,
        marca: marca,
        modelo: modelo,
        descripcion: descripcion,
        urlImg: urlImg,
    })
        .then(() => {
            mostrarMensaje("Se actualizó con éxito.");
            limpiarInputs();
            Listarproductos();
        })
        .catch((error) => {
            mostrarMensaje("Ocurrió un error: " + error);
        });
}

function eliminarAutomovil() {
    let numSerie = document.getElementById("txtNumSerie").value.trim();
    if (numSerie === "") {
        mostrarMensaje("No se ingresó un Código válido.");
        return;
    }

    const dbref = ref(db);
    get(child(dbref, "Automoviles/" + numSerie)).then((snapshot) => {
        if (snapshot.exists()) {
            remove(ref(db, "Automoviles/" + numSerie))
                .then(() => {
                    mostrarMensaje("Producto eliminado con éxito.");
                    limpiarInputs();
                    Listarproductos();
                })
                .catch((error) => {
                    mostrarMensaje("Ocurrió un error al eliminar el producto: " + error);
                });
        } else {
            limpiarInputs();
            mostrarMensaje("El producto con ID " + numSerie + " no existe.");
        }
    });

    Listarproductos();
}


const imageInput = document.getElementById("imageInput");

const uploadButton = document.getElementById("uploadButton");

uploadButton.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = imageInput.files[0];

    if (!file) {
        alert("Selecciona una imagen antes de subir.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {
            document.getElementById("txtUrl").value = data.secure_url;

            alert("Imagen subida correctamente ");
        } else {
            alert("Error al subir la imagen ");
            console.error(data);
        }
    } catch (error) {
        console.error("Error al subir a Cloudinary:", error);
        alert("Ocurrió un error al subir la imagen.");
    }
});

const btnRecargar = document.getElementById("btnRecargar");
btnRecargar.addEventListener("click", Listarproductos);

const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", insertarProducto);

const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", buscarProducto);

const btnActualizar = document.getElementById("btnActualizar");
btnActualizar.addEventListener("click", actualizarAutomovil);

const btnBorrar = document.getElementById("btnBorrar");
btnBorrar.addEventListener("click", eliminarAutomovil);
