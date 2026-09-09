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
            // Permite ingresar al panel con las credenciales de prueba de la evaluación
            if (correoLogin.value.trim().toLowerCase() === "admin@duoc.cl" && passwordLogin.value === "admin") {
                location.href = "admin-index.html"
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
