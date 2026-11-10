// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

import { firebaseConfig } from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function cargarProductosPorMarca() {
    const dbRef = ref(db, "Automoviles");

    onValue(dbRef, (carros) => {
        const nissan = document.getElementById("contenedorNissan");
        const ford = document.getElementById("contenedorFord");
        const toyota = document.getElementById("contenedorToyota");

        // Limpiar los contenedores
        nissan.innerHTML = "";
        ford.innerHTML = "";
        toyota.innerHTML = "";

        carros.forEach((carro) => {
            const data = carro.val();

            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta";
            tarjeta.innerHTML = `
                <h2 class="modelo">${data.modelo}</h2>
                <img class="img" src="${data.urlImg}">
                <p class="descripcion">${data.descripcion}</p>
                <button class="boton">Más información</button>
            `;

            switch (data.marca.toLowerCase()) {
                case "nissan":
                    nissan.appendChild(tarjeta);
                    break;

                case "ford":
                    ford.appendChild(tarjeta);
                    break;

                case "toyota":
                    toyota.appendChild(tarjeta);
                    break;
            }
        });
    });
}

window.addEventListener("load", cargarProductosPorMarca);
