// Manejo de dependencias para los selectores de ubicación geográfica
const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");
const btnBuscarSucursal = document.getElementById("btn-buscar-sucursal");

if (selectRegion && selectComuna) {
    // Rellena las opciones del select secundario basándose en el valor del select primario
    function poblarComunas(regionSeleccionada) {
        selectComuna.innerHTML = '<option value="" disabled selected>Selecciona tu comuna...</option>';
        if (window.diccionarioComunas && window.diccionarioComunas[regionSeleccionada]) {
            window.diccionarioComunas[regionSeleccionada].forEach(comuna => {
                const option = document.createElement("option");
                option.value = comuna.valor;
                option.textContent = comuna.texto;
                selectComuna.appendChild(option);
            });
        }
    }

    selectRegion.addEventListener("change", function() {
        poblarComunas(this.value);
    });

    // Recupera parámetros de enrutamiento provenientes del input en index.html
    const busquedaPrevia = localStorage.getItem("busquedaIndexVolcan");
    if (busquedaPrevia) {
        const busqueda = busquedaPrevia.toLowerCase();
        let regionDestino = ""; 
        let comunaDestino = ""; 
        let radioSucursalDestino = "";

        if (busqueda.includes("chillan") || busqueda.includes("chillán") || busqueda.includes("centro") || busqueda.includes("viejo") || busqueda.includes("oriente") || busqueda.includes("comercial") || busqueda.includes("industrial")) {
            regionDestino = "nuble";
            if (busqueda.includes("viejo") || busqueda.includes("oriente")) { comunaDestino = "chillan-viejo"; radioSucursalDestino = "suc-2"; }
            else if (busqueda.includes("comercial") || busqueda.includes("industrial")) { comunaDestino = "chillan"; radioSucursalDestino = "suc-5"; }
            else { comunaDestino = "chillan"; radioSucursalDestino = "suc-1"; }
        } else if (busqueda.includes("pinto") || busqueda.includes("carmen") || busqueda.includes("ignacio") || busqueda.includes("rural")) {
            regionDestino = "nuble"; comunaDestino = "pinto"; radioSucursalDestino = "suc-3";
        } else if (busqueda.includes("bulnes") || busqueda.includes("quillon") || busqueda.includes("quillón") || busqueda.includes("sur")) {
            regionDestino = "nuble"; comunaDestino = "bulnes"; radioSucursalDestino = "suc-4";
        }

        if (regionDestino !== "") {
            selectRegion.value = regionDestino;
            poblarComunas(regionDestino);
            if (comunaDestino !== "") selectComuna.value = comunaDestino;
            if (radioSucursalDestino !== "") {
                const radioEl = document.getElementById(radioSucursalDestino);
                if (radioEl) radioEl.checked = true;
            }
        }
        
        // Limpia el registro para evitar conflictos en futuras recargas
        localStorage.removeItem("busquedaIndexVolcan");
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
            else alert("Actualmente no contamos con Punto Volcán en esta comuna.");
        });
    }
}

// Lógica de enrutamiento para el input ubicado en el componente Hero de index.html
const inputBuscadorIndex = document.getElementById("input-buscador-index");
const btnBuscadorIndex = document.getElementById("btn-buscador-index");

if (inputBuscadorIndex && btnBuscadorIndex) {
    function irASucursales(e) {
        e.preventDefault();
        const valor = inputBuscadorIndex.value.trim().toLowerCase();
        
        if (!valor) {
            alert("Por favor ingresa una comuna o zona para buscar.");
            return;
        }

        const tieneChillan = valor.includes("chillan") || valor.includes("chillán") || valor.includes("centro") || valor.includes("viejo") || valor.includes("oriente") || valor.includes("comercial") || valor.includes("industrial");
        const tieneRural = valor.includes("pinto") || valor.includes("carmen") || valor.includes("ignacio") || valor.includes("rural");
        const tieneSur = valor.includes("bulnes") || valor.includes("quillon") || valor.includes("quillón") || valor.includes("sur");
        const tieneBiobio = valor.includes("concepcion") || valor.includes("concepción") || valor.includes("talcahuano") || valor.includes("angeles") || valor.includes("ángeles") || valor.includes("biobio") || valor.includes("biobío");

        // Almacena el criterio y redirige a la vista correspondiente
        if (tieneChillan || tieneRural || tieneSur || tieneBiobio) {
            localStorage.setItem("busquedaIndexVolcan", valor);
            window.location.href = "punto-volcan.html#seccion-busqueda";
        } else {
            alert("Actualmente no contamos con Punto Volcán para esta búsqueda.");
        }
    }

    btnBuscadorIndex.addEventListener("click", irASucursales);
    inputBuscadorIndex.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            irASucursales(e);
        }
    });
}