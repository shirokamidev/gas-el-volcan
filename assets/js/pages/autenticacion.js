// Configura los iconos de mostrar y ocultar contraseñas en los formularios
const configurarVisibilidadPassword = function(control, campo) {
    if (!control || !campo) return;

    const ojoAbierto = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const ojoCerrado = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

    function actualizarIcono() {
        const visible = campo.type === "text";
        if (visible) {
            control.innerHTML = ojoAbierto;
            control.setAttribute("aria-label", "Ocultar contraseña");
        } else {
            control.innerHTML = ojoCerrado;
            control.setAttribute("aria-label", "Mostrar contraseña");
        }
        control.setAttribute("aria-pressed", String(visible));
    }

    actualizarIcono();
    control.addEventListener("click", () => {
        if (campo.type === "password") {
            campo.type = "text";
        } else {
            campo.type = "password";
        }
        actualizarIcono();
    });
};

// Validación estructural de los formularios de autenticación
const formLogin = document.getElementById("form-login");

if (formLogin) {
    const correoLogin = document.getElementById("correo-login");
    const passwordLogin = document.getElementById("password-login");
    const errorCorreoLogin = document.getElementById("error-correo-login");
    const errorPasswordLogin = document.getElementById("error-password-login");
    const mensajeLogin = document.getElementById("mensaje-login");
    const togglePassword = document.getElementById("toggle-password");
    const enlaceRecuperar = document.getElementById("enlace-recuperar");
    const mensajeRecuperar = document.getElementById("recuperacion-clave");

    if (enlaceRecuperar) {
        enlaceRecuperar.addEventListener("click", (evento) => {
            evento.preventDefault();
            mensajeRecuperar.textContent = "La recuperación de contraseña estará disponible al integrar el servidor.";
            mensajeRecuperar.className = "mensaje-estado-formulario activo error";
        });
    }

    // Permite mostrar u ocultar la contraseña desde el mismo control
    configurarVisibilidadPassword(togglePassword, passwordLogin);

    function validarCorreoLogin(mostrarVacio = true) {
        let error = "";
        if (mostrarVacio || correoLogin.value.trim() !== "") {
            error = validarFormatoCorreo(correoLogin.value);
        }
        errorCorreoLogin.textContent = error;
        if (error) {
            errorCorreoLogin.classList.add("activo");
        } else {
            errorCorreoLogin.classList.remove("activo");
        }
        return error === "";
    }

    function validarPasswordLogin(mostrarVacio = true) {
        const password = passwordLogin.value;

        if (password === "" && !mostrarVacio) {
            errorPasswordLogin.textContent = "";
            errorPasswordLogin.classList.remove("activo");
            return true;
        }
        if (password === "") {
            errorPasswordLogin.textContent = "La contraseña es obligatoria.";
            errorPasswordLogin.classList.add("activo");
            return false;
        }

        if (validarLongitudPassword(password)) {
            errorPasswordLogin.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
            errorPasswordLogin.classList.add("activo");
            return false;
        }

        errorPasswordLogin.textContent = "";
        errorPasswordLogin.classList.remove("activo");
        return true;
    }

    correoLogin.addEventListener("input", () => {
        validarCorreoLogin(false)
        mensajeLogin.classList.remove("activo")
    });
    passwordLogin.addEventListener("input", () => {
        validarPasswordLogin(false)
        mensajeLogin.classList.remove("activo")
    });

    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();

        const correoValido = validarCorreoLogin();
        const passwordValido = validarPasswordLogin();

        if (correoValido && passwordValido) {
            // Valida las credenciales de acceso al panel administrativo
            if (correoLogin.value.trim().toLowerCase() === "admin@duoc.cl" && passwordLogin.value === "admin") {
                try {
                    sessionStorage.setItem("accesoAdministradorVolcan", "activo")
                    location.href = "admin-index.html"
                } catch (error) {
                    mensajeLogin.textContent = "No se pudo iniciar la sesión en este navegador."
                    mensajeLogin.className = "mensaje-estado-formulario activo error"
                }
            } else {
                mensajeLogin.textContent = "Las credenciales de administración no son correctas."
                mensajeLogin.className = "mensaje-estado-formulario activo error"
            }
        } else {
            mensajeLogin.textContent = "Revise los campos marcados antes de continuar.";
            mensajeLogin.className = "mensaje-estado-formulario activo error";
        }
    });
}

// Lógica de registro para el enrolamiento de nuevos clientes
const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
    const rutRegistro = document.getElementById("rut-registro");
    const nombreRegistro = document.getElementById("nombre-registro");
    const apellidoPaternoRegistro = document.getElementById("apellido-p-registro");
    const apellidoMaternoRegistro = document.getElementById("apellido-m-registro");
    const correoRegistro = document.getElementById("correo-registro");
    const correoConfirmRegistro = document.getElementById("correo-confirm-registro");
    const passwordRegistro = document.getElementById("password-registro");
    const passwordConfirmRegistro = document.getElementById("password-confirm-registro");
    const telefonoRegistro = document.getElementById("telefono-registro");
    const calleRegistro = document.getElementById("calle-registro");
    const terminosRegistro = document.getElementById("terminos-registro");
    
    const errorRutRegistro = document.getElementById("error-rut-registro");
    const errorNombreRegistro = document.getElementById("error-nombre-registro");
    const errorApellidoPaternoRegistro = document.getElementById("error-apellido-p-registro");
    const errorApellidoMaternoRegistro = document.getElementById("error-apellido-m-registro");
    const errorCorreoRegistro = document.getElementById("error-correo-registro");
    const errorCorreoConfirmRegistro = document.getElementById("error-correo-confirm-registro");
    const errorPasswordRegistro = document.getElementById("error-password-registro");
    const errorPasswordConfirmRegistro = document.getElementById("error-password-confirm-registro");
    const errorTelefonoRegistro = document.getElementById("error-telefono-registro");
    const errorCalleRegistro = document.getElementById("error-calle-registro");
    const errorTerminosRegistro = document.getElementById("error-terminos-registro");
    const mensajeRegistro = document.getElementById("mensaje-registro");

    const selectRegionRegistro = document.getElementById("region-registro");
    const selectComunaRegistro = document.getElementById("comuna-registro");
    const errorRegionRegistro = document.getElementById("error-region-registro");
    const errorComunaRegistro = document.getElementById("error-comuna-registro");

    if (selectRegionRegistro && selectComunaRegistro) {
        const actualizarComunas = () => poblarSelectComunas(selectRegionRegistro, selectComunaRegistro);
        selectRegionRegistro.addEventListener("change", () => {
            actualizarComunas();
            mostrarErrorRegistro(selectRegionRegistro, "", errorRegionRegistro)
            mostrarErrorRegistro(selectComunaRegistro, "", errorComunaRegistro)
        });
        selectComunaRegistro.addEventListener("change", validarComunaRegistro);
        actualizarComunas();
    }

    const togglePassReg = document.getElementById("toggle-password-registro");
    const togglePassConf = document.getElementById("toggle-password-confirm");

    configurarVisibilidadPassword(togglePassReg, passwordRegistro);
    configurarVisibilidadPassword(togglePassConf, passwordConfirmRegistro);

    function mostrarErrorRegistro(campo, mensaje, elementoError) {
        mostrarErrorCampo(campo, elementoError, mensaje)
    }

    function validarRutRegistro() {
        const mensaje = validarRut(rutRegistro.value);
        mostrarErrorRegistro(rutRegistro, mensaje, errorRutRegistro);
        return mensaje === "";
    }

    function validarRegionRegistro() {
        const mensaje = validarRegion(selectRegionRegistro.value);
        mostrarErrorRegistro(selectRegionRegistro, mensaje, errorRegionRegistro);
        return mensaje === "";
    }

    function validarComunaRegistro() {
        const mensaje = validarComuna(selectComunaRegistro.value);
        mostrarErrorRegistro(selectComunaRegistro, mensaje, errorComunaRegistro);
        return mensaje === "";
    }

    observarValidacionCampo(rutRegistro, errorRutRegistro, validarRut)

    function validarApellidoRegistro(campo, error) {
        const mensaje = validarApellidoPaterno(campo.value);
        mostrarErrorRegistro(campo, mensaje, error);
        return mensaje === "";
    }

    observarValidacionCampo(apellidoPaternoRegistro, errorApellidoPaternoRegistro, validarApellidoPaterno)
    observarValidacionCampo(apellidoMaternoRegistro, errorApellidoMaternoRegistro, validarApellidoMaternoOpcional)

    function validarConfirmacionesRegistro(mostrarVacios = true) {
        const correo = correoRegistro.value.trim();
        const correoConfirm = correoConfirmRegistro.value.trim();
        const clave = passwordRegistro.value;
        const claveConfirm = passwordConfirmRegistro.value;
        let errorCorreo = "";
        if (!correoConfirm && mostrarVacios) {
            errorCorreo = "Debe repetir el correo electrónico.";
        } else if (correoConfirm && correo !== correoConfirm) {
            errorCorreo = "Los correos electrónicos no coinciden.";
        }

        let errorClave = "";
        if (!claveConfirm && mostrarVacios) {
            errorClave = "Debe repetir la contraseña.";
        } else if (claveConfirm && clave !== claveConfirm) {
            errorClave = "Las contraseñas no coinciden.";
        }
        mostrarErrorRegistro(correoConfirmRegistro, errorCorreo, errorCorreoConfirmRegistro);
        mostrarErrorRegistro(passwordConfirmRegistro, errorClave, errorPasswordConfirmRegistro);
        return !errorCorreo && !errorClave;
    }

    function validarLongitudPasswordRegistro() {
        const error = validarLongitudPassword(passwordRegistro.value);
        mostrarErrorRegistro(passwordRegistro, error, errorPasswordRegistro);
        return !error;
    }

    // Los errores de formato se actualizan al escribir, sin exigir valores vacíos
    observarValidacionCampo(nombreRegistro, errorNombreRegistro, valor => {
        if (valor.trim().length > 100) return "El nombre no puede superar los 100 caracteres."
        return ""
    })
    observarValidacionCampo(correoRegistro, errorCorreoRegistro, validarFormatoCorreo)
    observarValidacionCampo(passwordRegistro, errorPasswordRegistro, validarLongitudPassword)
    observarValidacionCampo(calleRegistro, errorCalleRegistro, valor => {
        if (valor.trim().length > 300) return "La dirección no puede superar los 300 caracteres."
        return ""
    })
    for (const campo of [correoRegistro, correoConfirmRegistro, passwordRegistro, passwordConfirmRegistro]) {
        campo.addEventListener("input", () => validarConfirmacionesRegistro(false))
    }
    terminosRegistro.addEventListener("change", () => {
        if (terminosRegistro.checked) {
            errorTerminosRegistro.textContent = ""
            errorTerminosRegistro.classList.remove("activo")
        }
    })

    // Comprueba el teléfono opcional a medida que se escribe
    function validarTelefonoRegistro() {
        const telefono = telefonoRegistro.value.trim();
        const mensaje = validarTelefonoOpcional(telefono);
        errorTelefonoRegistro.textContent = mensaje;
        errorTelefonoRegistro.classList.toggle("activo", Boolean(mensaje));
        telefonoRegistro.classList.toggle("campo-invalido", Boolean(mensaje));
        return !mensaje;
    }

    if (telefonoRegistro) {
        telefonoRegistro.addEventListener("input", validarTelefonoRegistro);
    }

    formRegistro.addEventListener("submit", (event) => {
        event.preventDefault();
        let formularioValido = true;

        if (!validarRutRegistro()) formularioValido = false;

        if (nombreRegistro.value.trim() === "" || nombreRegistro.value.trim().length > 100) {
            if (nombreRegistro.value.trim() === "") {
                errorNombreRegistro.textContent = "El nombre es obligatorio.";
            } else {
                errorNombreRegistro.textContent = "El nombre no puede superar los 100 caracteres.";
            }
            errorNombreRegistro.classList.add("activo");
            formularioValido = false;
        } else {
            errorNombreRegistro.textContent = "";
            errorNombreRegistro.classList.remove("activo");
        }

        if (!validarApellidoRegistro(apellidoPaternoRegistro, errorApellidoPaternoRegistro)) formularioValido = false;
        if (!validarCampoAlEnviar(apellidoMaternoRegistro, errorApellidoMaternoRegistro, validarApellidoMaternoOpcional)) formularioValido = false;

        const errorCorreo = validarFormatoCorreo(correoRegistro.value);
        
        errorCorreoRegistro.textContent = "";
        errorCorreoRegistro.classList.remove("activo");
        errorCorreoConfirmRegistro.textContent = "";
        errorCorreoConfirmRegistro.classList.remove("activo");

        if (errorCorreo !== "") {
            errorCorreoRegistro.textContent = errorCorreo;
            errorCorreoRegistro.classList.add("activo");
            formularioValido = false;
        }

        if (!validarLongitudPasswordRegistro()) formularioValido = false;

        if (!validarConfirmacionesRegistro()) formularioValido = false;

        if (!validarTelefonoRegistro()) {
            formularioValido = false;
        }

        if (!validarRegionRegistro()) formularioValido = false;
        if (!validarComunaRegistro()) formularioValido = false;

        if (calleRegistro.value.trim() === "") {
            errorCalleRegistro.textContent = "La dirección es obligatoria.";
            errorCalleRegistro.classList.add("activo");
            formularioValido = false;
        } else if (calleRegistro.value.trim().length > 300) {
            errorCalleRegistro.textContent = "La dirección no puede superar los 300 caracteres.";
            errorCalleRegistro.classList.add("activo");
            formularioValido = false;
        } else {
            errorCalleRegistro.textContent = "";
            errorCalleRegistro.classList.remove("activo");
        }

        if (!terminosRegistro.checked) {
            errorTerminosRegistro.textContent = "Debes aceptar los términos y condiciones.";
            errorTerminosRegistro.classList.add("activo");
            formularioValido = false;
        } else {
            errorTerminosRegistro.textContent = "";
            errorTerminosRegistro.classList.remove("activo");
        }

        // Destaca los campos que requieren una corrección
        [[rutRegistro, errorRutRegistro], [nombreRegistro, errorNombreRegistro],
            [apellidoPaternoRegistro, errorApellidoPaternoRegistro],
            [apellidoMaternoRegistro, errorApellidoMaternoRegistro],
            [correoRegistro, errorCorreoRegistro], [correoConfirmRegistro, errorCorreoConfirmRegistro],
            [passwordRegistro, errorPasswordRegistro], [passwordConfirmRegistro, errorPasswordConfirmRegistro],
            [telefonoRegistro, errorTelefonoRegistro], [calleRegistro, errorCalleRegistro]].forEach(([campo, error]) => {
            let contenedor = campo;
            if (campo) {
                const caja = campo.closest(".caja-input-flex");
                if (caja) {
                    contenedor = caja;
                }
            }
            if (contenedor && error) {
                contenedor.classList.toggle("campo-invalido", Boolean(error.textContent));
            }
        });

        // Informa que el registro de cuentas es una funcionalidad pendiente
        if (formularioValido) {
            mensajeRegistro.textContent = "El registro de cuentas estará disponible próximamente. No se ha creado ninguna cuenta."
            mensajeRegistro.className = "mensaje-estado-formulario activo error"
            alert("El registro de cuentas estará disponible próximamente.")
        } else {
            mensajeRegistro.textContent = "Revise los campos marcados antes de enviar.";
            mensajeRegistro.className = "mensaje-estado-formulario activo error";
        }
    });
}