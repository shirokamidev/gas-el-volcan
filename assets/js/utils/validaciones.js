// Convierte caracteres especiales en texto seguro al mostrar datos en HTML
function escaparCaracteresHtml(valor) {
    return String(valor).replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

// Expresión regular para validar correos corporativos y de uso estándar
const patronCorreo = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

// Función global para validar la estructura del correo electrónico en los formularios
const validarFormatoCorreo = function(correo) {
    correo = String(correo || "").trim();

    if (correo === "") {
        return "El correo es obligatorio.";
    }
    if (correo.length > 100) {
        return "El correo no puede superar los 100 caracteres.";
    }
    if (!patronCorreo.test(correo)) {
        return "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return "";
};


// Validaciones compartidas de contacto y acceso
function validarTelefonoOpcional(valor) {
    const telefono = String(valor || "").trim();
    if (!telefono) return "";
    if (/^[-−]/.test(telefono)) return "El teléfono no puede ser un número negativo.";
    if (/[a-záéíóúüñ]/i.test(telefono)) return "El teléfono no puede contener letras.";
    if (/[^0-9]/.test(telefono)) return "El teléfono solo debe contener números, sin espacios ni símbolos.";
    if (telefono.length !== 9) return "Debe contener exactamente 9 dígitos numéricos.";
    return "";
}

function validarLongitudPassword(valor, obligatorio = true) {
    if (!valor && !obligatorio) return "";
    if (!valor) return "La contraseña es obligatoria.";
    if (valor.length < 4 || valor.length > 10) {
        return "La contraseña debe tener entre 4 y 10 caracteres.";
    }
    return "";
}

// Validación compartida del apellido paterno en registro y administración
function validarApellidoPaterno(valor) {
    if (valor.trim() === "") return "El apellido paterno es obligatorio.";
    if (valor.trim().length > 100) return "El apellido no puede superar los 100 caracteres.";
    return "";
}

// Comprueba el límite del apellido materno opcional
function validarApellidoMaternoOpcional(valor) {
    if (valor.trim().length > 100) return "El apellido materno no puede superar los 100 caracteres."
    return ""
}

// Mensajes comunes para los selectores de ubicación
function validarRegion(valor) {
    if (!valor) return "Debe seleccionar una región.";
    return "";
}

function validarComuna(valor) {
    if (!valor) return "Debe seleccionar una comuna.";
    return "";
}

// Verifica la entrada del RUT antes de comprobar su formato
function validarRut(valor) {
    const rut = String(valor || "").trim().toUpperCase()
    if (!rut) return "El RUT es obligatorio."
    if (!/^[0-9]{7,8}[0-9K]$/.test(rut)) return "Ingrese un RUT válido sin puntos ni guion."

    // Comprueba el dígito verificador del RUT chileno
    const numeros = rut.slice(0, rut.length - 1)
    let suma = 0
    let multiplicador = 2
    for (const digito of numeros.split("").reverse()) {
        suma += Number(digito) * multiplicador
        multiplicador++
        if (multiplicador > 7) {
            multiplicador = 2
        }
    }
    const resultado = 11 - (suma % 11)
    let digitoEsperado = String(resultado)
    if (resultado === 11) {
        digitoEsperado = "0"
    } else if (resultado === 10) {
        digitoEsperado = "K"
    }
    if (rut[rut.length - 1] !== digitoEsperado) {
        return "El dígito verificador del RUT no es válido."
    }
    return ""
}

// Muestra el mensaje de validación junto al campo correspondiente
function mostrarErrorCampo(campo, elementoError, mensaje) {
    if (elementoError) {
        elementoError.textContent = mensaje
        elementoError.classList.toggle("activo", mensaje !== "")
    }
    if (campo) {
        let contenedor = campo
        const cajaContrasena = campo.closest(".caja-input-flex")
        if (cajaContrasena) {
            contenedor = cajaContrasena
        }
        contenedor.classList.toggle("campo-invalido", mensaje !== "")
    }
    return mensaje === ""
}

// Comprueba el formato mientras se escribe, sin exigir campos vacíos antes de enviar
function observarValidacionCampo(campo, elementoError, validar, tipoEvento = "input") {
    if (!campo) return
    campo.addEventListener(tipoEvento, function() {
        let mensaje = ""
        if (String(campo.value).trim() !== "") {
            mensaje = validar(campo.value)
        }
        mostrarErrorCampo(campo, elementoError, mensaje)
    })
}

// Al enviar, también comprueba los campos obligatorios
function validarCampoAlEnviar(campo, elementoError, validar) {
    return mostrarErrorCampo(campo, elementoError, validar(campo.value))
}
