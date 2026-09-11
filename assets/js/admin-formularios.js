// Validación estructural de entrada para los formularios de gestión de productos (Crear y Editar)
const inicializarFormularioProducto = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputId = document.getElementById("producto-id");
    const codigo = document.getElementById("codigo-producto");
    const nombre = document.getElementById("nombre-producto");
    const categoria = document.getElementById("categoria-producto");
    const precioRes = document.getElementById("precio-residencial");
    const precioCom = document.getElementById("precio-comercial");
    const stock = document.getElementById("stock-actual");
    const descripcion = document.getElementById("descripcion-producto");
    const imagen = document.getElementById("imagen-producto");
    
    const errCodigo = document.getElementById("error-codigo");
    const errNombre = document.getElementById("error-nombre");
    const errPrecioRes = document.getElementById("error-precio-res");
    const errPrecioCom = document.getElementById("error-precio-com");
    const errStock = document.getElementById("error-stock");
    const errDescripcion = document.getElementById("error-descripcion");
    const mensajeGeneral = document.getElementById("mensaje-producto");

    // Llenar campos dinámicamente si la vista corresponde a la edición de un registro
    if (formId === "form-editar-producto") {
        const urlParams = new URLSearchParams(window.location.search);
        let idProdEditar = parseInt(urlParams.get("id"));
        
        if (isNaN(idProdEditar)) idProdEditar = 1;

        const productosActuales = window.obtenerProductos();
        const productoEncontrado = productosActuales.find(p => p.id === idProdEditar);
        
        if (productoEncontrado) {
            if (inputId) inputId.value = productoEncontrado.id;
            if (codigo) { codigo.value = productoEncontrado.codigo; codigo.placeholder = productoEncontrado.codigo; }
            if (nombre) { nombre.value = productoEncontrado.nombre; nombre.placeholder = productoEncontrado.nombre; }
            if (categoria) categoria.value = productoEncontrado.categoria;
            if (precioRes) { precioRes.value = productoEncontrado.precioResidencial; precioRes.placeholder = productoEncontrado.precioResidencial; }
            if (precioCom) { precioCom.value = productoEncontrado.precioComercial; precioCom.placeholder = productoEncontrado.precioComercial; }
            if (stock) { stock.value = productoEncontrado.stock; stock.placeholder = productoEncontrado.stock; }
            if (descripcion) { descripcion.value = productoEncontrado.descripcion || ""; descripcion.placeholder = productoEncontrado.descripcion || "Sin descripción..."; }
            if (imagen) { imagen.value = productoEncontrado.imagen || ""; imagen.placeholder = productoEncontrado.imagen || "Sin imagen..."; }
        } else {
            alert("Producto no encontrado.");
            window.location.href = "admin-lista-productos.html";
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;
        
        // Verifica la extensión del código verificador corporativo
        if (codigo && codigo.value.trim().length < 3) {
            if (errCodigo) errCodigo.textContent = "El código debe tener al menos 3 caracteres.";
            valido = false;
        } else if (errCodigo) { 
            errCodigo.textContent = ""; 
        }

        if (nombre && (nombre.value.trim() === "" || nombre.value.trim().length > 100)) {
            if (errNombre) errNombre.textContent = "Obligatorio. Máximo 100 caracteres.";
            valido = false;
        } else if (errNombre) { 
            errNombre.textContent = ""; 
        }

        // Evita inconsistencias numéricas y precios negativos
        if (precioRes && (precioRes.value === "" || Number(precioRes.value) < 0)) {
            if (errPrecioRes) errPrecioRes.textContent = "Debe ser un número entero mayor o igual a 0.";
            valido = false;
        } else if (errPrecioRes) { 
            errPrecioRes.textContent = ""; 
        }

        if (precioCom && (precioCom.value === "" || Number(precioCom.value) < 0)) {
            if (errPrecioCom) errPrecioCom.textContent = "Debe ser un número entero mayor o igual a 0.";
            valido = false;
        } else if (errPrecioCom) { 
            errPrecioCom.textContent = ""; 
        }

        if (stock && (stock.value === "" || Number(stock.value) < 0)) {
            if (errStock) errStock.textContent = "Debe ser un número entero mayor o igual a 0.";
            valido = false;
        } else if (errStock) { 
            errStock.textContent = ""; 
        }

        if (descripcion && descripcion.value.trim().length > 500) {
            if (errDescripcion) errDescripcion.textContent = "Máximo 500 caracteres permitidos.";
            valido = false;
        } else if (errDescripcion) {
            errDescripcion.textContent = "";
        }

        if (valido) {
            let productosActuales = window.obtenerProductos();
            
            const modeloProducto = {
                codigo: codigo.value.trim(),
                nombre: nombre.value.trim(),
                categoria: categoria ? categoria.value : "sin categoria",
                descripcion: descripcion ? descripcion.value.trim() : "",
                precioResidencial: parseInt(precioRes.value),
                precioComercial: parseInt(precioCom.value),
                stock: parseInt(stock.value),
                imagen: imagen && imagen.value.trim() !== "" ? imagen.value.trim() : "assets/img/productos/default.svg"
            };

            if (formId === "form-nuevo-producto") {
                modeloProducto.id = productosActuales.length ? Math.max(...productosActuales.map(p => p.id)) + 1 : 1;
                productosActuales.push(modeloProducto);
                if (mensajeGeneral) {
                    mensajeGeneral.textContent = "Producto guardado exitosamente.";
                    mensajeGeneral.style.color = "var(--volcan-azul)";
                }
                form.reset();
            } else {
                modeloProducto.id = parseInt(inputId.value);
                const indice = productosActuales.findIndex(p => p.id === modeloProducto.id);
                if (indice !== -1) productosActuales[indice] = modeloProducto;
                if (mensajeGeneral) {
                    mensajeGeneral.textContent = "Cambios guardados exitosamente.";
                    mensajeGeneral.style.color = "var(--volcan-azul)";
                }
            }
            
            window.guardarProductos(productosActuales);
            setTimeout(() => window.location.href = "admin-lista-productos.html", 1200);
            
        } else {
            if (mensajeGeneral) {
                mensajeGeneral.textContent = "Revise los campos marcados antes de enviar.";
                mensajeGeneral.style.color = "#dc3545";
            }
        }
    });
};

inicializarFormularioProducto("form-nuevo-producto");
inicializarFormularioProducto("form-editar-producto");


// Validación estructural y dependencias geográficas para el registro y edición de usuarios internos
const inicializarFormularioUsuario = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputId = document.getElementById("usuario-id");
    const rut = document.getElementById("rut-usuario");
    const nombre = document.getElementById("nombre-usuario");
    const apellidoP = document.getElementById("apellidop-usuario");
    const apellidoM = document.getElementById("apellidom-usuario");
    const correo = document.getElementById("correo-usuario");
    const pass = document.getElementById("password-usuario");
    const telefono = document.getElementById("telefono-usuario");
    const direccion = document.getElementById("direccion-usuario");
    const rol = document.getElementById("rol-usuario");
    
    const errRut = document.getElementById("error-rut");
    const errNombreUsu = document.getElementById("error-nombre-usu");
    const errCorreo = document.getElementById("error-correo-usu");
    const errPass = document.getElementById("error-pass");
    const errTelefono = document.getElementById("error-telefono");
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

    // Llenar campos dinámicamente si la vista corresponde a la edición de un registro
    if (formId === "form-editar-usuario") {
        const urlParams = new URLSearchParams(window.location.search);
        let idUsuEditar = parseInt(urlParams.get("id"));
        
        if (isNaN(idUsuEditar)) idUsuEditar = 1;

        const usuariosActuales = window.obtenerUsuarios();
        const usuarioEncontrado = usuariosActuales.find(u => u.id === idUsuEditar);
        
        if (usuarioEncontrado) {
            if (inputId) inputId.value = usuarioEncontrado.id;
            if (rut) { rut.value = usuarioEncontrado.rut; rut.placeholder = usuarioEncontrado.rut; }
            if (nombre) { nombre.value = usuarioEncontrado.nombre; nombre.placeholder = usuarioEncontrado.nombre; }
            if (apellidoP) { apellidoP.value = usuarioEncontrado.apellidoP || ""; apellidoP.placeholder = usuarioEncontrado.apellidoP || "Sin apellido"; }
            if (apellidoM) { apellidoM.value = usuarioEncontrado.apellidoM || ""; apellidoM.placeholder = usuarioEncontrado.apellidoM || "Sin apellido"; }
            if (correo) { correo.value = usuarioEncontrado.correo; correo.placeholder = usuarioEncontrado.correo; }
            if (telefono) { telefono.value = usuarioEncontrado.telefono || ""; telefono.placeholder = usuarioEncontrado.telefono || "Sin teléfono"; }
            
            if (selectRegionAdmin) {
                selectRegionAdmin.value = usuarioEncontrado.region;
                if (window.diccionarioComunas && window.diccionarioComunas[usuarioEncontrado.region]) {
                    selectComunaAdmin.innerHTML = '<option value="" disabled selected>Seleccione comuna</option>';
                    window.diccionarioComunas[usuarioEncontrado.region].forEach(c => {
                        const opt = document.createElement("option");
                        opt.value = c.valor;
                        opt.textContent = c.texto;
                        selectComunaAdmin.appendChild(opt);
                    });
                    selectComunaAdmin.value = usuarioEncontrado.comuna;
                }
            }
            
            if (direccion) { direccion.value = usuarioEncontrado.direccion; direccion.placeholder = usuarioEncontrado.direccion; }
            if (rol) rol.value = usuarioEncontrado.rol;
        } else {
            alert("Usuario no encontrado.");
            window.location.href = "admin-lista-usuarios.html";
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;

        if (formId === "form-nuevo-usuario" && rut) {
            if (rut.value.trim().length < 7 || rut.value.trim().length > 9) {
                if (errRut) errRut.textContent = "Sin puntos ni guion, Ej: 19011022K";
                valido = false;
            } else if (errRut) { 
                errRut.textContent = ""; 
            }
        }

        if (nombre && (nombre.value.trim() === "" || nombre.value.trim().length > 50)) {
            if (errNombreUsu) errNombreUsu.textContent = "Obligatorio. Máximo 50 caracteres.";
            valido = false;
        } else if (errNombreUsu) { 
            errNombreUsu.textContent = ""; 
        }

        const errorDelCorreo = window.validarFormatoCorreo ? window.validarFormatoCorreo(correo.value) : "";
        if (errorDelCorreo !== "") {
            if (errCorreo) errCorreo.textContent = "Use correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            valido = false;
        } else if (errCorreo) { 
            errCorreo.textContent = ""; 
        }

        if (telefono && telefono.value.trim() !== "") {
            const telRegex = /^[0-9]{9}$/;
            if (!telRegex.test(telefono.value.trim())) {
                if (errTelefono) errTelefono.textContent = "Debe contener exactamente 9 dígitos numéricos.";
                valido = false;
            } else if (errTelefono) {
                errTelefono.textContent = "";
            }
        } else if (errTelefono) {
            errTelefono.textContent = "";
        }

        if (pass && (formId === "form-nuevo-usuario" || pass.value.length > 0)) {
            if (pass.value.length < 4 || pass.value.length > 10) {
                if (errPass) errPass.textContent = "Entre 4 a 10 caracteres.";
                valido = false;
            } else if (errPass) { 
                errPass.textContent = ""; 
            }
        } else if (errPass) {
            errPass.textContent = "";
        }

        if (direccion && (direccion.value.trim() === "" || direccion.value.trim().length > 300)) {
            if (errDireccion) errDireccion.textContent = "Obligatorio. Máximo 300 caracteres.";
            valido = false;
        } else if (errDireccion) { 
            errDireccion.textContent = ""; 
        }

        if (valido) {
            let usuariosActuales = window.obtenerUsuarios();
            
            const modeloUsuario = {
                rut: rut ? rut.value.trim() : "",
                nombre: nombre ? nombre.value.trim() : "",
                apellidoP: apellidoP ? apellidoP.value.trim() : "",
                apellidoM: apellidoM ? apellidoM.value.trim() : "",
                correo: correo ? correo.value.trim() : "",
                telefono: telefono ? telefono.value.trim() : "",
                region: selectRegionAdmin ? selectRegionAdmin.value : "",
                comuna: selectComunaAdmin ? selectComunaAdmin.value : "",
                direccion: direccion ? direccion.value.trim() : "",
                rol: rol ? rol.value : "cliente"
            };

            if (formId === "form-nuevo-usuario") {
                modeloUsuario.id = usuariosActuales.length ? Math.max(...usuariosActuales.map(u => u.id)) + 1 : 1;
                usuariosActuales.push(modeloUsuario);
                if (mensajeUsu) {
                    mensajeUsu.textContent = "Usuario creado exitosamente.";
                    mensajeUsu.style.color = "var(--volcan-azul)";
                }
                form.reset();
                if(selectComunaAdmin) selectComunaAdmin.innerHTML = '<option value="" disabled selected>Seleccione comuna</option>';
            } else {
                modeloUsuario.id = parseInt(inputId.value);
                const indice = usuariosActuales.findIndex(u => u.id === modeloUsuario.id);
                if (indice !== -1) {
                    modeloUsuario.rut = usuariosActuales[indice].rut; 
                    usuariosActuales[indice] = modeloUsuario;
                }
                if (mensajeUsu) {
                    mensajeUsu.textContent = "Cambios guardados exitosamente.";
                    mensajeUsu.style.color = "var(--volcan-azul)";
                }
            }
            
            window.guardarUsuarios(usuariosActuales);
            setTimeout(() => window.location.href = "admin-lista-usuarios.html", 1200);
            
        } else {
            if (mensajeUsu) {
                mensajeUsu.textContent = "Revise los campos marcados antes de enviar.";
                mensajeUsu.style.color = "#dc3545";
            }
        }
    });
};

inicializarFormularioUsuario("form-nuevo-usuario");
inicializarFormularioUsuario("form-editar-usuario");