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

  // Mostrar u ocultar la contraseña
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const type = passwordLogin.getAttribute("type") === "password" ? "text" : "password";
      passwordLogin.setAttribute("type", type);

      // Cambia el icono dependiendo de si se ve o no
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
    return error === "";
  }

  function validarPasswordLogin() {
    const password = passwordLogin.value;

    if (password === "") {
      errorPasswordLogin.textContent = "La contraseña es obligatoria.";
      return false;
    }

    if (password.length < 4 || password.length > 10) {
      errorPasswordLogin.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
      return false;
    }

    errorPasswordLogin.textContent = "";
    return true;
  }

  correoLogin.addEventListener("input", validarCorreoLogin);
  passwordLogin.addEventListener("input", validarPasswordLogin);

  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    const correoValido = validarCorreoLogin();
    const passwordValido = validarPasswordLogin();

    if (correoValido && passwordValido) {
      // Redirección especial para el administrador
      if (correoLogin.value === "admin@duoc.cl" && passwordLogin.value === "admin") {
        window.location.href = "admin-index.html";
      } else {
        mensajeLogin.textContent = "Inicio de sesión validado correctamente.";
        mensajeLogin.style.color = "var(--volcan-azul)";
        formLogin.reset();
        errorCorreoLogin.textContent = "";
        errorPasswordLogin.textContent = "";
      }
    } else {
      mensajeLogin.textContent = "Revise los campos marcados antes de continuar.";
      mensajeLogin.style.color = "#dc3545";
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
      return false;
    }

    if (nombre.length > 100) {
      errorNombreContacto.textContent = "El nombre no puede superar los 100 caracteres.";
      return false;
    }

    errorNombreContacto.textContent = "";
    return true;
  }

  function validarCorreoContacto() {
    const error = validarCorreo(correoContacto.value);
    errorCorreoContacto.textContent = error;
    return error === "";
  }

  function validarComentarioContacto() {
    const comentario = comentarioContacto.value.trim();

    if (comentario === "") {
      errorComentarioContacto.textContent = "El comentario es obligatorio.";
      return false;
    }

    if (comentario.length > 500) {
      errorComentarioContacto.textContent = "El comentario no puede superar los 500 caracteres.";
      return false;
    }

    errorComentarioContacto.textContent = "";
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
      mensajeContacto.style.color = "var(--volcan-azul)";
      formContacto.reset();
      errorNombreContacto.textContent = "";
      errorCorreoContacto.textContent = "";
      errorComentarioContacto.textContent = "";
    } else {
      mensajeContacto.textContent = "Revise los campos marcados antes de enviar.";
      mensajeContacto.style.color = "#dc3545";
    }
  });
}