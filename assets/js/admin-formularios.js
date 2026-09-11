// Validación estructural de entrada para el formulario de nuevo producto
const formNuevoProducto = document.getElementById("form-nuevo-producto");

if (formNuevoProducto) {
    const codigo = document.getElementById("codigo-producto");
    const nombre = document.getElementById("nombre-producto");
    const precioRes = document.getElementById("precio-residencial");
    const precioCom = document.getElementById("precio-comercial");
    const stock = document.getElementById("stock-actual");
    
    const errCodigo = document.getElementById("error-codigo");
    const errNombre = document.getElementById("error-nombre");
    const errPrecioRes = document.getElementById("error-precio-res");
    const errPrecioCom = document.getElementById("error-precio-com");
    const errStock = document.getElementById("error-stock");
    const mensajeGeneral = document.getElementById("mensaje-producto");

    formNuevoProducto.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;
        
        // Verifica la extensión del código verificador corporativo
        if (codigo.value.trim().length < 3) {
            errCodigo.textContent = "El código debe tener al menos 3 caracteres.";
            valido = false;
        } else { errCodigo.textContent = ""; }

        if (nombre.value.trim() === "" || nombre.value.trim().length > 100) {
            errNombre.textContent = "Obligatorio. Máximo 100 caracteres.";
            valido = false;
        } else { errNombre.textContent = ""; }

        // Evita inconsistencias numéricas y precios negativos
        if (precioRes.value === "" || Number(precioRes.value) < 0) {
            errPrecioRes.textContent = "Debe ser un número entero mayor o igual a 0.";
            valido = false;
        } else { errPrecioRes.textContent = ""; }

        if (precioCom.value === "" || Number(precioCom.value) < 0) {
            errPrecioCom.textContent = "Debe ser un número entero mayor o igual a 0.";
            valido = false;
        } else { errPrecioCom.textContent = ""; }

        if (stock.value === "" || Number(stock.value) < 0) {
            errStock.textContent = "Debe ser un número entero mayor o igual a 0.";
            valido = false;
        } else { errStock.textContent = ""; }

        if (valido) {
            mensajeGeneral.textContent = "Producto guardado exitosamente.";
            mensajeGeneral.style.color = "var(--volcan-azul)";
            formNuevoProducto.reset();
        } else {
            mensajeGeneral.textContent = "Revise los campos marcados antes de enviar.";
            mensajeGeneral.style.color = "#dc3545";
        }
    });
}

// Validación estructural y dependencias geográficas para el registro de usuarios internos
const formNuevoUsuario = document.getElementById("form-nuevo-usuario");

if (formNuevoUsuario) {
    const rut = document.getElementById("rut-usuario");
    const nombre = document.getElementById("nombre-usuario");
    const correo = document.getElementById("correo-usuario");
    const pass = document.getElementById("password-usuario");
    const direccion = document.getElementById("direccion-usuario");
    
    const errRut = document.getElementById("error-rut");
    const errNombreUsu = document.getElementById("error-nombre-usu");
    const errCorreo = document.getElementById("error-correo-usu");
    const errPass = document.getElementById("error-pass");
    const errDireccion = document.getElementById("error-direccion");
    const mensajeUsu = document.getElementById("mensaje-usuario");

    const selectRegionAdmin = document.getElementById("region-admin");
    const selectComunaAdmin = document.getElementById("comuna-admin");

    if (selectRegionAdmin && selectComunaAdmin) {
        selectRegionAdmin.addEventListener("change", function() {
            const region = this.value;
            selectComunaAdmin.innerHTML = '<option value="" disabled selected>Seleccione comuna</option>';
            
            // Consume el diccionario global mapeado en main.js
            if (window.diccionarioComunas && window.diccionarioComunas[region]) {
                window.diccionarioComunas[region].forEach(c => {
                    const opt = document.createElement("option");
                    opt.value = c.valor;
                    opt.textContent = c.texto;
                    selectComunaAdmin.appendChild(opt);
                });
            }
        });
    }

    formNuevoUsuario.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;

        if (rut.value.trim().length < 7 || rut.value.trim().length > 9) {
            errRut.textContent = "Sin puntos ni guion, Ej: 19011022K";
            valido = false;
        } else { errRut.textContent = ""; }

        if (nombre.value.trim() === "" || nombre.value.trim().length > 50) {
            errNombreUsu.textContent = "Obligatorio. Máximo 50 caracteres.";
            valido = false;
        } else { errNombreUsu.textContent = ""; }

        const errorDelCorreo = window.validarFormatoCorreo ? window.validarFormatoCorreo(correo.value) : "";
        if (errorDelCorreo !== "") {
            errCorreo.textContent = "Use correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            valido = false;
        } else { errCorreo.textContent = ""; }

        if (pass.value.length < 4 || pass.value.length > 10) {
            errPass.textContent = "Entre 4 a 10 caracteres.";
            valido = false;
        } else { errPass.textContent = ""; }

        if (direccion.value.trim() === "" || direccion.value.trim().length > 300) {
            errDireccion.textContent = "Obligatorio. Máximo 300 caracteres.";
            valido = false;
        } else { errDireccion.textContent = ""; }

        if (valido) {
            mensajeUsu.textContent = "Usuario creado exitosamente.";
            mensajeUsu.style.color = "var(--volcan-azul)";
            formNuevoUsuario.reset();
            if(selectComunaAdmin) selectComunaAdmin.innerHTML = '<option value="" disabled selected>Seleccione comuna</option>';
        } else {
            mensajeUsu.textContent = "Revise los campos marcados antes de enviar.";
            mensajeUsu.style.color = "#dc3545";
        }
    });
}