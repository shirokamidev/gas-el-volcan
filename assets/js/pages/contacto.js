// Validación estructural de los datos de soporte ingresados por el cliente
const formContacto = document.getElementById("form-contacto");

if (formContacto) {
    const nombreContacto = document.getElementById("nombre-contacto");
    const correoContacto = document.getElementById("correo-contacto");
    const comentarioContacto = document.getElementById("comentario-contacto");
    const telefonoContacto = document.getElementById("telefono-contacto");
    const asuntoContacto = document.getElementById("asunto");

    const errorNombreContacto = document.getElementById("error-nombre-contacto");
    const errorCorreoContacto = document.getElementById("error-correo-contacto");
    const errorComentarioContacto = document.getElementById("error-comentario-contacto");
    const errorTelefonoContacto = document.getElementById("error-telefono-contacto");
    const errorAsuntoContacto = document.getElementById("error-asunto-contacto");
    const mensajeContacto = document.getElementById("mensaje-contacto");

    function mostrarErrorContacto(campo, elementoError, mensaje) {
        return mostrarErrorCampo(campo, elementoError, mensaje)
    }

    function validarNombreContacto(mostrarVacio = true) {
        const nombre = nombreContacto.value.trim();
        let mensaje = "";
        if (!nombre && mostrarVacio) mensaje = "El nombre es obligatorio.";
        else if (nombre.length > 100) mensaje = "El nombre no puede superar los 100 caracteres.";
        return mostrarErrorContacto(nombreContacto, errorNombreContacto, mensaje);
    }

    function validarCorreoContacto(mostrarVacio = true) {
        let mensaje = ""
        if (mostrarVacio || correoContacto.value.trim() !== "") {
            mensaje = validarFormatoCorreo(correoContacto.value)
        }
        return mostrarErrorContacto(correoContacto, errorCorreoContacto, mensaje)
    }

    function validarComentarioContacto(mostrarVacio = true) {
        const comentario = comentarioContacto.value.trim();
        let mensaje = "";
        if (!comentario && mostrarVacio) mensaje = "El comentario es obligatorio.";
        else if (comentario.length > 500) mensaje = "El comentario no puede superar los 500 caracteres.";
        return mostrarErrorContacto(comentarioContacto, errorComentarioContacto, mensaje);
    }

    function validarTelefonoContacto() {
        return mostrarErrorContacto(telefonoContacto, errorTelefonoContacto, validarTelefonoOpcional(telefonoContacto.value));
    }

    function validarAsuntoContacto() {
        let mensaje = "";
        if (asuntoContacto.value === "") {
            mensaje = "Debe seleccionar un asunto.";
        }
        return mostrarErrorContacto(asuntoContacto, errorAsuntoContacto, mensaje);
    }

    // Validación continua mediante listener directo
    nombreContacto.addEventListener("input", () => validarNombreContacto(false));
    correoContacto.addEventListener("input", () => validarCorreoContacto(false));
    comentarioContacto.addEventListener("input", () => validarComentarioContacto(false));
    asuntoContacto.addEventListener("change", validarAsuntoContacto);
    
    if (telefonoContacto) {
        telefonoContacto.addEventListener("input", validarTelefonoContacto);
    }

    formContacto.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombreValido = validarNombreContacto();
        const correoValido = validarCorreoContacto();
        const comentarioValido = validarComentarioContacto();
        const telefonoValido = validarTelefonoContacto();
        const asuntoValido = validarAsuntoContacto();

        if (nombreValido && correoValido && comentarioValido && telefonoValido && asuntoValido) {
            mensajeContacto.textContent = "Formulario validado. El envío de mensajes estará disponible próximamente. No se ha enviado ningún mensaje."
            mensajeContacto.className = "mensaje-estado-formulario activo error"
            alert("El formulario es válido, pero el envío de mensajes estará disponible próximamente.")
        } else {
            mensajeContacto.textContent = "Revise los campos marcados antes de enviar.";
            mensajeContacto.className = "mensaje-estado-formulario activo error";
        }
    });
}