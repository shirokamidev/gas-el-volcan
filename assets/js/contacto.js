// Validación estructural de los datos de soporte ingresados por el cliente
const formContacto = document.getElementById("form-contacto");

if (formContacto) {
    const nombreContacto = document.getElementById("nombre-contacto");
    const correoContacto = document.getElementById("correo-contacto");
    const comentarioContacto = document.getElementById("comentario-contacto");

    const errorNombreContacto = document.getElementById("error-nombre-contacto");
    const errorCorreoContacto = document.getElementById("error-correo-contacto");
    const errorComentarioContacto = document.getElementById("error-comentario-contacto");
    const mensajeContacto = document.getElementById("mensaje-contacto");

    function validarNombreContacto() {
        const nombre = nombreContacto.value.trim();

        if (nombre === "") {
            errorNombreContacto.textContent = "El nombre es obligatorio.";
            errorNombreContacto.classList.add("activo");
            return false;
        }

        if (nombre.length > 100) {
            errorNombreContacto.textContent = "El nombre no puede superar los 100 caracteres.";
            errorNombreContacto.classList.add("activo");
            return false;
        }

        errorNombreContacto.textContent = "";
        errorNombreContacto.classList.remove("activo");
        return true;
    }

    function validarCorreoContacto() {
        // Consumo de la utilidad global declarada en main.js
        const error = window.validarFormatoCorreo(correoContacto.value);
        errorCorreoContacto.textContent = error;
        if (error) {
            errorCorreoContacto.classList.add("activo");
        } else {
            errorCorreoContacto.classList.remove("activo");
        }
        return error === "";
    }

    function validarComentarioContacto() {
        const comentario = comentarioContacto.value.trim();

        if (comentario === "") {
            errorComentarioContacto.textContent = "El comentario es obligatorio.";
            errorComentarioContacto.classList.add("activo");
            return false;
        }

        if (comentario.length > 500) {
            errorComentarioContacto.textContent = "El comentario no puede superar los 500 caracteres.";
            errorComentarioContacto.classList.add("activo");
            return false;
        }

        errorComentarioContacto.textContent = "";
        errorComentarioContacto.classList.remove("activo");
        return true;
    }

    // Validación continua mediante listener directo
    nombreContacto.addEventListener("input", validarNombreContacto);
    correoContacto.addEventListener("input", validarCorreoContacto);
    comentarioContacto.addEventListener("input", validarComentarioContacto);

    formContacto.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombreValido = validarNombreContacto();
        const correoValido = validarCorreoContacto();
        const comentarioValido = validarComentarioContacto();

        if (nombreValido && correoValido && comentarioValido) {
            mensajeContacto.textContent = "Mensaje enviado correctamente. Gracias por contactarnos.";
            mensajeContacto.className = "mensaje-estado-formulario activo exito";
            formContacto.reset();
            errorNombreContacto.classList.remove("activo");
            errorCorreoContacto.classList.remove("activo");
            errorComentarioContacto.classList.remove("activo");
        } else {
            mensajeContacto.textContent = "Revise los campos marcados antes de enviar.";
            mensajeContacto.className = "mensaje-estado-formulario activo error";
        }
    });
}