// Validación estructural de los formularios de autenticación
const formLogin = document.getElementById("form-login");

if (formLogin) {
    const correoLogin = document.getElementById("correo-login");
    const passwordLogin = document.getElementById("password-login");
    const errorCorreoLogin = document.getElementById("error-correo-login");
    const errorPasswordLogin = document.getElementById("error-password-login");
    const mensajeLogin = document.getElementById("mensaje-login");
    const togglePassword = document.getElementById("toggle-password");

    // Reemplaza el tipo de input y el código SVG para habilitar la previsualización de la clave
    if (togglePassword) {
        togglePassword.addEventListener("click", () => {
            const type = passwordLogin.getAttribute("type") === "password" ? "text" : "password";
            passwordLogin.setAttribute("type", type);

            if (type === "text") {
                togglePassword.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
            } else {
                togglePassword.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
            }
        });
    }

    function validarCorreoLogin() {
        const error = window.validarFormatoCorreo(correoLogin.value);
        errorCorreoLogin.textContent = error;
        if (error) {
            errorCorreoLogin.classList.add("activo");
        } else {
            errorCorreoLogin.classList.remove("activo");
        }
        return error === "";
    }

    function validarPasswordLogin() {
        const password = passwordLogin.value;

        if (password === "") {
            errorPasswordLogin.textContent = "La contraseña es obligatoria.";
            errorPasswordLogin.classList.add("activo");
            return false;
        }

        if (password.length < 4 || password.length > 10) {
            errorPasswordLogin.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
            errorPasswordLogin.classList.add("activo");
            return false;
        }

        errorPasswordLogin.textContent = "";
        errorPasswordLogin.classList.remove("activo");
        return true;
    }

    correoLogin.addEventListener("input", validarCorreoLogin);
    passwordLogin.addEventListener("input", validarPasswordLogin);

    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();

        const correoValido = validarCorreoLogin();
        const passwordValido = validarPasswordLogin();

        if (correoValido && passwordValido) {
            // Evalúa credenciales codificadas temporalmente para el entorno de desarrollo
            if (correoLogin.value === "admin@duoc.cl" && passwordLogin.value === "admin") {
                window.location.href = "admin-index.html";
            } else {
                mensajeLogin.textContent = "Inicio de sesión validado correctamente.";
                mensajeLogin.className = "mensaje-estado-formulario activo exito";
                formLogin.reset();
                errorCorreoLogin.classList.remove("activo");
                errorPasswordLogin.classList.remove("activo");
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
    const correoRegistro = document.getElementById("correo-registro");
    const correoConfirmRegistro = document.getElementById("correo-confirm-registro");
    const passwordRegistro = document.getElementById("password-registro");
    const passwordConfirmRegistro = document.getElementById("password-confirm-registro");
    const telefonoRegistro = document.getElementById("telefono-registro");
    const calleRegistro = document.getElementById("calle-registro");
    const terminosRegistro = document.getElementById("terminos-registro");
    
    const errorRutRegistro = document.getElementById("error-rut-registro");
    const errorNombreRegistro = document.getElementById("error-nombre-registro");
    const errorCorreoRegistro = document.getElementById("error-correo-registro");
    const errorCorreoConfirmRegistro = document.getElementById("error-correo-confirm-registro");
    const errorPasswordRegistro = document.getElementById("error-password-registro");
    const errorTelefonoRegistro = document.getElementById("error-telefono-registro");
    const errorCalleRegistro = document.getElementById("error-calle-registro");
    const errorTerminosRegistro = document.getElementById("error-terminos-registro");
    const mensajeRegistro = document.getElementById("mensaje-registro");

    const togglePassReg = document.getElementById("toggle-password-registro");
    const togglePassConf = document.getElementById("toggle-password-confirm");

    function configurarOjito(toggleBtn, inputPass) {
        if (toggleBtn && inputPass) {
            toggleBtn.addEventListener("click", () => {
                const type = inputPass.getAttribute("type") === "password" ? "text" : "password";
                inputPass.setAttribute("type", type);
                
                if (type === "text") {
                    toggleBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
                } else {
                    toggleBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
                }
            });
        }
    }

    configurarOjito(togglePassReg, passwordRegistro);
    configurarOjito(togglePassConf, passwordConfirmRegistro);

    formRegistro.addEventListener("submit", (event) => {
        event.preventDefault();
        let formularioValido = true;

        if (rutRegistro.value.trim() === "" || rutRegistro.value.length < 8) {
            errorRutRegistro.textContent = "Ingrese un RUT válido sin puntos ni guion.";
            errorRutRegistro.classList.add("activo");
            formularioValido = false;
        } else {
            errorRutRegistro.textContent = "";
            errorRutRegistro.classList.remove("activo");
        }

        if (nombreRegistro.value.trim() === "") {
            errorNombreRegistro.textContent = "El nombre es obligatorio.";
            errorNombreRegistro.classList.add("activo");
            formularioValido = false;
        } else {
            errorNombreRegistro.textContent = "";
            errorNombreRegistro.classList.remove("activo");
        }

        const errorCorreo = window.validarFormatoCorreo(correoRegistro.value);
        
        errorCorreoRegistro.textContent = "";
        errorCorreoRegistro.classList.remove("activo");
        errorCorreoConfirmRegistro.textContent = "";
        errorCorreoConfirmRegistro.classList.remove("activo");

        if (errorCorreo !== "") {
            errorCorreoRegistro.textContent = errorCorreo;
            errorCorreoRegistro.classList.add("activo");
            formularioValido = false;
        } else if (correoRegistro.value !== correoConfirmRegistro.value) {
            errorCorreoConfirmRegistro.textContent = "Los correos electrónicos no coinciden.";
            errorCorreoConfirmRegistro.classList.add("activo");
            formularioValido = false;
        }

        if (passwordRegistro.value.length < 4 || passwordRegistro.value.length > 10) {
            errorPasswordRegistro.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
            errorPasswordRegistro.classList.add("activo");
            formularioValido = false;
        } else if (passwordRegistro.value !== passwordConfirmRegistro.value) {
            errorPasswordRegistro.textContent = "Las contraseñas no coinciden.";
            errorPasswordRegistro.classList.add("activo");
            formularioValido = false;
        } else {
            errorPasswordRegistro.textContent = "";
            errorPasswordRegistro.classList.remove("activo");
        }

        if (telefonoRegistro && telefonoRegistro.value.trim() !== "") {
            const regexTel = /^[0-9]{9}$/;
            if (!regexTel.test(telefonoRegistro.value.trim())) {
                errorTelefonoRegistro.textContent = "Debe contener exactamente 9 dígitos numéricos.";
                errorTelefonoRegistro.classList.add("activo");
                formularioValido = false;
            } else {
                errorTelefonoRegistro.textContent = "";
                errorTelefonoRegistro.classList.remove("activo");
            }
        } else if (errorTelefonoRegistro) {
            errorTelefonoRegistro.textContent = "";
            errorTelefonoRegistro.classList.remove("activo");
        }

        if (calleRegistro.value.trim() === "" || calleRegistro.value.trim().length > 300) {
            errorCalleRegistro.textContent = "Obligatorio. Máximo 300 caracteres.";
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

        // Ejecuta la redirección visual basándose en el estado del objeto validador
        if (formularioValido) {
            mensajeRegistro.textContent = "Cuenta registrada exitosamente. Redirigiendo...";
            mensajeRegistro.className = "mensaje-estado-formulario activo exito";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            mensajeRegistro.textContent = "Por favor, corrige los errores antes de continuar.";
            mensajeRegistro.className = "mensaje-estado-formulario activo error";
        }
    });
}