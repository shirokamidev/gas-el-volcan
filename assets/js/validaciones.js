// Expresiones regulares comunes
const patronCorreo = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

function validarCorreo(correo) {
  if (correo.trim() === "") {
    return "El correo es obligatorio.";
  }
  if (correo.length > 100) {
    return "El correo no puede superar los 100 caracteres.";
  }
  if (!patronCorreo.test(correo)) {
    return "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }
  return "";
}

// Validación del formulario de inicio de sesión
const formLogin = document.getElementById("form-login");

if (formLogin) {
  const correoLogin = document.getElementById("correo-login");
  const passwordLogin = document.getElementById("password-login");
  const errorCorreoLogin = document.getElementById("error-correo-login");
  const errorPasswordLogin = document.getElementById("error-password-login");
  const mensajeLogin = document.getElementById("mensaje-login");
  const togglePassword = document.getElementById("toggle-password");

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
    const error = validarCorreo(correoLogin.value);
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

// Validación del formulario de contacto
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
    const error = validarCorreo(correoContacto.value);
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

// Validación del formulario de registro
const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
  const rutRegistro = document.getElementById("rut-registro");
  const nombreRegistro = document.getElementById("nombre-registro");
  const correoRegistro = document.getElementById("correo-registro");
  const correoConfirmRegistro = document.getElementById("correo-confirm-registro");
  const passwordRegistro = document.getElementById("password-registro");
  const passwordConfirmRegistro = document.getElementById("password-confirm-registro");
  const terminosRegistro = document.getElementById("terminos-registro");
  
  const errorRutRegistro = document.getElementById("error-rut-registro");
  const errorNombreRegistro = document.getElementById("error-nombre-registro");
  const errorCorreoRegistro = document.getElementById("error-correo-registro");
  const errorPasswordRegistro = document.getElementById("error-password-registro");
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

    const errorCorreo = validarCorreo(correoRegistro.value);
    if (errorCorreo !== "") {
      errorCorreoRegistro.textContent = errorCorreo;
      errorCorreoRegistro.classList.add("activo");
      formularioValido = false;
    } else if (correoRegistro.value !== correoConfirmRegistro.value) {
      errorCorreoRegistro.textContent = "Los correos electrónicos no coinciden.";
      errorCorreoRegistro.classList.add("activo");
      formularioValido = false;
    } else {
      errorCorreoRegistro.textContent = "";
      errorCorreoRegistro.classList.remove("activo");
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

    if (!terminosRegistro.checked) {
      errorTerminosRegistro.textContent = "Debes aceptar los términos y condiciones.";
      errorTerminosRegistro.classList.add("activo");
      formularioValido = false;
    } else {
      errorTerminosRegistro.textContent = "";
      errorTerminosRegistro.classList.remove("activo");
    }

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