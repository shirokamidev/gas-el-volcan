// Normaliza los nombres para aceptar comunas y regiones con o sin tildes
function normalizarBusquedaUbicacion(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

// Relaciona la búsqueda con las regiones y zonas disponibles
function obtenerDestinoUbicacion(texto) {
    const busqueda = normalizarBusquedaUbicacion(texto);

    if (busqueda.includes("chillan viejo") || busqueda.includes("oriente")) {
        return { region: "nuble", comuna: "chillan-viejo", zona: "suc-2" };
    }
    if (busqueda.includes("comercial") || busqueda.includes("industrial")) {
        return { region: "nuble", comuna: "chillan", zona: "suc-5" };
    }
    if (busqueda.includes("chillan") || busqueda.includes("centro") || busqueda.includes("norte")) {
        return { region: "nuble", comuna: "chillan", zona: "suc-1" };
    }
    if (busqueda.includes("el carmen") || busqueda.includes("carmen")) {
        return { region: "nuble", comuna: "el-carmen", zona: "suc-3" };
    }
    if (busqueda.includes("san ignacio") || busqueda.includes("ignacio")) {
        return { region: "nuble", comuna: "san-ignacio", zona: "suc-3" };
    }
    if (busqueda.includes("pinto") || busqueda.includes("rural")) {
        return { region: "nuble", comuna: "pinto", zona: "suc-3" };
    }
    if (busqueda.includes("quillon")) {
        return { region: "nuble", comuna: "quillon", zona: "suc-4" };
    }
    if (busqueda.includes("bulnes") || busqueda.includes("zona sur") || busqueda === "sur") {
        return { region: "nuble", comuna: "bulnes", zona: "suc-4" };
    }
    if (busqueda.includes("concepcion")) {
        return { region: "biobio", comuna: "concepcion", zona: "suc-6" };
    }
    if (busqueda.includes("talcahuano")) {
        return { region: "biobio", comuna: "talcahuano", zona: "suc-7" };
    }
    if (busqueda.includes("los angeles") || busqueda === "angeles") {
        return { region: "biobio", comuna: "los-angeles", zona: "suc-8" };
    }
    if (busqueda.includes("nuble")) {
        return { region: "nuble", comuna: "", zona: "" };
    }
    if (busqueda.includes("biobio") || busqueda.includes("bio bio")) {
        return { region: "biobio", comuna: "", zona: "" };
    }
    return null;
}

// Manejo de dependencias para los selectores de ubicación geográfica
const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");
const btnBuscarSucursal = document.getElementById("btn-buscar-sucursal");

if (selectRegion && selectComuna) {
    const poblarComunas = (region) => {
        poblarSelectComunas({ value: region }, selectComuna);
    };

    const mostrarZonasRegion = () => {
        const regionActual = selectRegion.value;
        document.querySelectorAll(".tarjeta-resumen").forEach(tarjeta => {
            tarjeta.hidden = false;
            if (regionActual === "biobio") {
                tarjeta.hidden = tarjeta.dataset.region !== "biobio";
            } else if (regionActual !== "") {
                tarjeta.hidden = tarjeta.dataset.region === "biobio";
            }
        });
        const reset = document.getElementById("reset-sucursal");
        if (reset) reset.checked = true;
    };
    selectRegion.addEventListener("change", () => {
        poblarComunas(selectRegion.value);
        mostrarZonasRegion();
    });
    poblarComunas(selectRegion.value);
    mostrarZonasRegion();

    // Recupera la región y comuna buscadas desde Inicio
    const busquedaPrevia = leerLocalStorageJSON("busquedaIndexVolcan") || new URLSearchParams(location.search).get("buscar");
    if (busquedaPrevia) {
        const destino = obtenerDestinoUbicacion(busquedaPrevia);
        if (destino) {
            selectRegion.value = destino.region;
            poblarComunas(destino.region);
            mostrarZonasRegion();
            if (destino.comuna !== "") {
                selectComuna.value = destino.comuna;
            }
            if (destino.zona !== "") {
                const radioZona = document.getElementById(destino.zona);
                if (radioZona) radioZona.checked = true;
            }
        }
        if (localStorageDisponible()) {
            localStorage.removeItem("busquedaIndexVolcan");
        }
    }

    if (btnBuscarSucursal) {
        btnBuscarSucursal.addEventListener("click", () => {
            const comuna = selectComuna.value;
            if (!comuna) {
                alert("Por favor selecciona una región y comuna.");
                return;
            }

            if (comuna === "chillan") document.getElementById("suc-1").checked = true;
            else if (comuna === "chillan-viejo") document.getElementById("suc-2").checked = true;
            else if (comuna === "el-carmen" || comuna === "pinto" || comuna === "san-ignacio") document.getElementById("suc-3").checked = true;
            else if (comuna === "bulnes" || comuna === "quillon") document.getElementById("suc-4").checked = true;
            else if (comuna === "concepcion") document.getElementById("suc-6").checked = true;
            else if (comuna === "talcahuano") document.getElementById("suc-7").checked = true;
            else if (comuna === "los-angeles") document.getElementById("suc-8").checked = true;
            else alert("Actualmente no contamos con Punto Volcán en esta comuna.");
        });
    }
}

// Lógica de enrutamiento para el input ubicado en el componente Hero de index.html
const inputBuscadorIndex = document.getElementById("input-buscador-index");
const btnBuscadorIndex = document.getElementById("btn-buscador-index");

if (inputBuscadorIndex && btnBuscadorIndex) {
    function irASucursales(evento) {
        evento.preventDefault();
        const valor = inputBuscadorIndex.value.trim().toLowerCase();
        
        if (!valor) {
            alert("Por favor ingresa una comuna o zona para buscar.");
            return;
        }

        // Valida que el destino exista antes de redirigir
        const destino = obtenerDestinoUbicacion(valor);
        if (destino) {
            guardarLocalStorageJSON("busquedaIndexVolcan", valor);
            location.href = `sucursales.html?buscar=${encodeURIComponent(valor)}#seccion-busqueda`;
        } else {
            alert("Actualmente no contamos con Punto Volcán para esta búsqueda.");
        }
    }

    btnBuscadorIndex.addEventListener("click", irASucursales);
    inputBuscadorIndex.addEventListener("keyup", (evento) => {
        if (evento.key === "Enter") {
            irASucursales(evento);
        }
    });
}
// Regresa al buscador y al listado de zonas sin cambiar de página
const enlacesVolverZonas = document.querySelectorAll(".enlace-volver-zonas");
enlacesVolverZonas.forEach(enlace => {
    enlace.addEventListener("click", (evento) => {
        evento.preventDefault();

        const reset = document.getElementById("reset-sucursal");
        if (reset) {
            reset.checked = true;
        }

        const seccionBusqueda = document.getElementById("seccion-busqueda");
        if (seccionBusqueda) {
            seccionBusqueda.scrollIntoView({ block: "start" });
        }
    });
});

// Desplaza a la tarjeta seleccionada en celular y al mapa en pantallas más grandes
const tarjetasZonas = document.querySelectorAll(".tarjeta-resumen");
tarjetasZonas.forEach(tarjeta => {
    const radioZona = document.getElementById(tarjeta.htmlFor);
    if (!radioZona) {
        return;
    }

    radioZona.addEventListener("change", () => {
        if (!radioZona.checked) {
            return;
        }

        let destino = document.querySelector(".columna-mapa");
        if (window.innerWidth < 768) {
            const numeroZona = radioZona.id.replace("suc-", "");
            destino = document.getElementById("detalle-" + numeroZona);
        }

        if (destino) {
            requestAnimationFrame(() => {
                destino.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }
    });
});
