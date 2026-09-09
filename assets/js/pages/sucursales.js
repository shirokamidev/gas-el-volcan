// Controla el buscador de zonas de atención sin depender de un servidor
const formularioSucursales = document.querySelector(".formulario-buscador")
const regionSucursales = document.getElementById("region")
const comunaSucursales = document.getElementById("comuna")
const avisoSucursales = document.getElementById("aviso-buscador")
const resetSucursales = document.getElementById("reset-sucursal")

if (formularioSucursales && regionSucursales && comunaSucursales && typeof poblarSelectComunas === "function") {
    const tarjetasSucursales = [...document.querySelectorAll(".tarjeta-zona")]
    const comunasPorZona = {
        "Zona Centro": ["chillan"],
        "Zona Oriente": ["chillan", "chillan-viejo"],
        "Zona Rural": ["el-carmen", "pinto", "san-ignacio"],
        "Zona Sur": ["bulnes", "quillon"],
        "Zona Comercial": ["chillan"],
        "Zona Concepción": ["concepcion"],
        "Zona Talcahuano": ["talcahuano"],
        "Zona Los Ángeles": ["los-angeles"]
    }

    function mostrarAvisoSucursales(mensaje) {
        if (avisoSucursales) avisoSucursales.textContent = mensaje
    }

    function mostrarTodasSucursales() {
        tarjetasSucursales.forEach(tarjeta => { tarjeta.hidden = false; tarjeta.style.display = "" })
        mostrarAvisoSucursales("Se muestran todas las zonas de atención disponibles.")
    }

    regionSucursales.addEventListener("change", function() {
        poblarSelectComunas(regionSucursales, comunaSucursales)
        comunaSucursales.disabled = !regionSucursales.value
        mostrarTodasSucursales()
    })

    formularioSucursales.addEventListener("submit", function(evento) {
        evento.preventDefault()
        const region = regionSucursales.value
        const comuna = comunaSucursales.value
        if (!region || !comuna) {
            mostrarAvisoSucursales("Selecciona una región y una comuna antes de buscar.")
            return
        }

        let encontrados = 0
        tarjetasSucursales.forEach(tarjeta => {
            const titulo = tarjeta.querySelector("h3")?.textContent.trim() || ""
            const regionTarjeta = tarjeta.querySelector(".etiqueta-zona")?.textContent || ""
            const regionCoincide = region === "nuble" ? regionTarjeta.includes("Ñuble") : regionTarjeta.includes("Biobío")
            const coincide = regionCoincide && (comunasPorZona[titulo] || []).includes(comuna)
            tarjeta.hidden = !coincide
            tarjeta.style.display = coincide ? "" : "none"
            if (coincide) encontrados++
        })
        mostrarAvisoSucursales(encontrados
            ? `${encontrados} zona(s) de atención encontradas para la comuna seleccionada.`
            : "No encontramos puntos para esa comuna. Prueba otra ubicación o muestra todas las zonas.")
    })

    resetSucursales?.addEventListener("click", function() {
        regionSucursales.value = ""
        comunaSucursales.value = ""
        comunaSucursales.disabled = true
        poblarSelectComunas(regionSucursales, comunaSucursales)
        mostrarTodasSucursales()
    })
}
