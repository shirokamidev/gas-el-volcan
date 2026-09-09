// Valida el formulario público sin simular un envío al servidor
const formularioContacto = document.getElementById("form-contacto")

if (formularioContacto) {
    const buscarCampo = id => document.getElementById(id)
    const controles = {
        nombre: buscarCampo("nombre-contacto"),
        correo: buscarCampo("correo-contacto"),
        telefono: buscarCampo("telefono-contacto"),
        asunto: buscarCampo("asunto"),
        comentario: buscarCampo("comentario-contacto")
    }
    const errores = {
        nombre: buscarCampo("error-nombre-contacto"),
        correo: buscarCampo("error-correo-contacto"),
        telefono: buscarCampo("error-telefono-contacto"),
        asunto: buscarCampo("error-asunto-contacto"),
        comentario: buscarCampo("error-comentario-contacto")
    }
    const mensajeGeneral = buscarCampo("mensaje-contacto")
    const patronCorreoContacto = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i

    function mensajeCampo(nombre) {
        const valor = controles[nombre].value.trim()
        if (nombre === "nombre") {
            if (!valor) return "El nombre es obligatorio."
            if (valor.length > 100) return "El nombre no puede superar 100 caracteres."
        }
        if (nombre === "correo") {
            if (!valor) return "El correo es obligatorio."
            if (!patronCorreoContacto.test(valor)) return "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
        }
        if (nombre === "telefono" && valor) {
            if (!/^\d{9}$/.test(valor)) return "El teléfono debe tener exactamente 9 dígitos."
        }
        if (nombre === "asunto" && !valor) return "Debe seleccionar un asunto."
        if (nombre === "comentario") {
            if (!valor) return "El comentario es obligatorio."
            if (valor.length > 500) return "El comentario no puede superar 500 caracteres."
        }
        return ""
    }

    function comprobarCampo(nombre) {
        const error = mensajeCampo(nombre)
        errores[nombre].textContent = error
        errores[nombre].classList.toggle("activo", Boolean(error))
        controles[nombre].setAttribute("aria-invalid", String(Boolean(error)))
        return !error
    }

    Object.keys(controles).forEach(nombre => {
        const evento = nombre === "asunto" ? "change" : "input"
        controles[nombre].addEventListener(evento, () => {
            comprobarCampo(nombre)
            mensajeGeneral.classList.remove("activo")
        })
    })

    formularioContacto.addEventListener("submit", evento => {
        evento.preventDefault()
        let valido = true
        Object.keys(controles).forEach(nombre => {
            if (!comprobarCampo(nombre)) valido = false
        })

        mensajeGeneral.className = "mensaje-estado-formulario activo error"
        mensajeGeneral.textContent = valido
            ? "Los datos son válidos, pero el envío no está disponible todavía. No se ha enviado ningún mensaje."
            : "Revisa los campos marcados antes de continuar."
    })
}
