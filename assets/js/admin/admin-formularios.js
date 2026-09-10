// Lee el valor de un campo disponible
function obtenerValorCampo(campo) {
    if (campo) {
        return campo.value.trim();
    }
    return "";
}

// Validación estructural de entrada para los formularios de gestión de productos (Crear y Editar)
const inicializarFormularioProducto = (identificadorFormulario) => {
    const formulario = document.getElementById(identificadorFormulario);
    if (!formulario) return;

    const campoIdentificador = document.getElementById("producto-id");
    const codigo = document.getElementById("codigo-producto");
    const nombre = document.getElementById("nombre-producto");
    const categoria = document.getElementById("categoria-producto");
    const precioResidencial = document.getElementById("precio-residencial");
    const precioComercial = document.getElementById("precio-comercial");
    const stock = document.getElementById("stock-actual");
    const descripcion = document.getElementById("descripcion-producto");
    const imagen = document.getElementById("imagen-producto");
    
    const errorCodigo = document.getElementById("error-codigo");
    const errorNombre = document.getElementById("error-nombre");
    const errorCategoria = document.getElementById("error-categoria");
    const errorPrecioResidencial = document.getElementById("error-precio-res");
    const errorPrecioComercial = document.getElementById("error-precio-com");
    const errorStock = document.getElementById("error-stock");
    const errorDescripcion = document.getElementById("error-descripcion");
    const mensajeGeneral = document.getElementById("mensaje-producto");

    // Llenar campos dinámicamente si la vista corresponde a la edición de un registro
    if (identificadorFormulario === "form-editar-producto") {
        const parametrosUrl = new URLSearchParams(location.search);
        const identificadorProductoEditar = Number(parametrosUrl.get("id"))

        const productosActuales = obtenerProductos();
        const productoEncontrado = productosActuales.find(producto => producto.id === identificadorProductoEditar);
        
        if (productoEncontrado) {
            if (campoIdentificador) campoIdentificador.value = productoEncontrado.id;
            if (codigo) { codigo.value = productoEncontrado.codigo; codigo.placeholder = productoEncontrado.codigo; }
            if (nombre) { nombre.value = productoEncontrado.nombre; nombre.placeholder = productoEncontrado.nombre; }
            if (categoria) categoria.value = productoEncontrado.categoria;
            if (precioResidencial) { precioResidencial.value = productoEncontrado.precioResidencial; precioResidencial.placeholder = productoEncontrado.precioResidencial; }
            if (precioComercial) { precioComercial.value = productoEncontrado.precioComercial; precioComercial.placeholder = productoEncontrado.precioComercial; }
            if (stock) { stock.value = productoEncontrado.stock; stock.placeholder = productoEncontrado.stock; }
            if (descripcion) { descripcion.value = productoEncontrado.descripcion || ""; descripcion.placeholder = productoEncontrado.descripcion || "Sin descripción..."; }
            if (imagen) { imagen.value = productoEncontrado.imagen || ""; imagen.placeholder = productoEncontrado.imagen || "Sin imagen..."; }
        } else {
            alert("Producto no encontrado.");
            location.href = "admin-lista-productos.html";
        }
    }

    // Reutiliza las mismas reglas al escribir y al guardar el producto
    function validarCodigoProducto(valor) {
        const codigoIngresado = valor.trim()
        if (codigoIngresado.length < 3) return "El código debe tener al menos 3 caracteres."
        let identificadorActual = 0
        if (campoIdentificador) identificadorActual = Number(campoIdentificador.value)
        const repetido = obtenerProductos().some(producto => {
            return producto.id !== identificadorActual && producto.codigo.toLowerCase() === codigoIngresado.toLowerCase()
        })
        if (repetido) return "Ya existe un producto con ese código."
        return ""
    }

    function validarNombreProducto(valor) {
        if (valor.trim() === "") return "El nombre del producto es obligatorio."
        if (valor.trim().length > 100) return "El nombre debe tener máximo 100 caracteres."
        return ""
    }

    function validarCategoriaProducto(valor) {
        if (valor === "") return "Debe seleccionar una categoría."
        return ""
    }

    function validarPrecioProducto(valor, tipoPrecio) {
        if (valor.trim() === "") return "El precio " + tipoPrecio + " es obligatorio."
        if (!/^\d+(\.\d+)?$/.test(valor.trim())) return "Debe ser un número mayor o igual a 0."
        if (!Number.isFinite(Number(valor))) return "Debe ser un número mayor o igual a 0."
        return ""
    }

    function validarStockProducto(valor) {
        if (valor.trim() === "") return "El stock es obligatorio."
        if (!/^\d+$/.test(valor.trim())) return "Debe ser un número entero mayor o igual a 0."
        if (!Number.isSafeInteger(Number(valor))) return "Debe ser un número entero mayor o igual a 0."
        return ""
    }

    function validarDescripcionProducto(valor) {
        if (valor.trim().length > 500) return "Máximo 500 caracteres permitidos."
        return ""
    }

    const validacionesProducto = [
        [codigo, errorCodigo, validarCodigoProducto, "input"],
        [nombre, errorNombre, validarNombreProducto, "input"],
        [categoria, errorCategoria, validarCategoriaProducto, "change"],
        [precioResidencial, errorPrecioResidencial, valor => validarPrecioProducto(valor, "residencial"), "input"],
        [precioComercial, errorPrecioComercial, valor => validarPrecioProducto(valor, "comercial"), "input"],
        [stock, errorStock, validarStockProducto, "input"],
        [descripcion, errorDescripcion, validarDescripcionProducto, "input"]
    ]

    for (const [campo, elementoError, validar, tipoEvento] of validacionesProducto) {
        observarValidacionCampo(campo, elementoError, validar, tipoEvento)
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault()
        let valido = true
        for (const [campo, elementoError, validar] of validacionesProducto) {
            if (!validarCampoAlEnviar(campo, elementoError, validar)) valido = false
        }

        if (valido) {
            let productosActuales = obtenerProductos();
            
            let categoriaProducto = "sin categoria";
            if (categoria) {
                categoriaProducto = categoria.value;
            }
            let descripcionProducto = "";
            if (descripcion) {
                descripcionProducto = descripcion.value.trim();
            }
            let imagenProducto = "assets/images/logo-volcan.svg";
            if (imagen && imagen.value.trim() !== "") {
                imagenProducto = imagen.value.trim();
            }

            const modeloProducto = {
                codigo: codigo.value.trim(),
                nombre: nombre.value.trim(),
                categoria: categoriaProducto,
                descripcion: descripcionProducto,
                precioResidencial: Number(precioResidencial.value),
                precioComercial: Number(precioComercial.value),
                stock: Number(stock.value),
                imagen: imagenProducto
            };

            if (identificadorFormulario === "form-nuevo-producto") {
                modeloProducto.id = 1;
                if (productosActuales.length > 0) {
                    modeloProducto.id = Math.max(...productosActuales.map(producto => producto.id)) + 1;
                }
                productosActuales.push(modeloProducto);

            } else {
                modeloProducto.id = parseInt(campoIdentificador.value);
                const indice = productosActuales.findIndex(producto => producto.id === modeloProducto.id)
                if (indice === -1) {
                    mensajeGeneral.textContent = "No se encontró el producto que deseas editar."
                    mensajeGeneral.className = "mensaje-final mensaje-error"
                    return
                }
                productosActuales[indice] = modeloProducto

            }
            
            if (guardarProductos(productosActuales)) {
                if (mensajeGeneral) {
                    mensajeGeneral.textContent = "Producto guardado exitosamente.";
                    mensajeGeneral.className = "mensaje-final mensaje-exito";
                }
                if (identificadorFormulario === "form-nuevo-producto") {
                    formulario.reset();
                }
                setTimeout(() => location.href = "admin-lista-productos.html", 1200);
            } else if (mensajeGeneral) {
                mensajeGeneral.textContent = "No se pudieron guardar los cambios en este navegador.";
                mensajeGeneral.className = "mensaje-final mensaje-error";
            }
            
        } else {
            if (mensajeGeneral) {
                mensajeGeneral.textContent = "Revise los campos marcados antes de enviar.";
                mensajeGeneral.className = "mensaje-final mensaje-error";
            }
        }
    });
};

inicializarFormularioProducto("form-nuevo-producto");
inicializarFormularioProducto("form-editar-producto");


// Validación estructural y dependencias geográficas para el registro y edición de usuarios internos
const inicializarFormularioUsuario = (identificadorFormulario) => {
    const formulario = document.getElementById(identificadorFormulario);
    if (!formulario) return;

    const campoIdentificador = document.getElementById("usuario-id");
    const rut = document.getElementById("rut-usuario");
    const nombre = document.getElementById("nombre-usuario");
    const apellidoPaterno = document.getElementById("apellidop-usuario");
    const apellidoMaterno = document.getElementById("apellidom-usuario");
    const correo = document.getElementById("correo-usuario");
    const contrasena = document.getElementById("password-usuario");
    const telefono = document.getElementById("telefono-usuario");
    const direccion = document.getElementById("direccion-usuario");
    const rol = document.getElementById("rol-usuario");
    
    const errorRut = document.getElementById("error-rut");
    const errorNombreUsuario = document.getElementById("error-nombre-usu");
    const errorApellidoPaterno = document.getElementById("error-apellidop-usu");
    const errorCorreo = document.getElementById("error-correo-usu");
    const errorContrasena = document.getElementById("error-pass");
    const errorTelefono = document.getElementById("error-telefono");
    const errorDireccion = document.getElementById("error-direccion");
    const mensajeUsuario = document.getElementById("mensaje-usuario");

    const selectRegionAdmin = document.getElementById("region-admin");
    const selectComunaAdmin = document.getElementById("comuna-admin");
    const errorRegionAdmin = document.getElementById("error-region-admin");
    const errorComunaAdmin = document.getElementById("error-comuna-admin");

    if (selectRegionAdmin && selectComunaAdmin) {
        selectRegionAdmin.addEventListener("change", () => {
            poblarSelectComunas(selectRegionAdmin, selectComunaAdmin)
            mostrarErrorCampo(selectRegionAdmin, errorRegionAdmin, "")
            mostrarErrorCampo(selectComunaAdmin, errorComunaAdmin, "")
        })
        poblarSelectComunas(selectRegionAdmin, selectComunaAdmin)
    }

    // Llenar campos dinámicamente si la vista corresponde a la edición de un registro
    if (identificadorFormulario === "form-editar-usuario") {
        const parametrosUrl = new URLSearchParams(location.search);
        const identificadorUsuarioEditar = Number(parametrosUrl.get("id"))

        const usuariosActuales = obtenerUsuarios();
        const usuarioEncontrado = usuariosActuales.find(usuario => usuario.id === identificadorUsuarioEditar);
        
        if (usuarioEncontrado) {
            if (campoIdentificador) campoIdentificador.value = usuarioEncontrado.id;
            if (rut) { rut.value = usuarioEncontrado.rut; rut.placeholder = usuarioEncontrado.rut; rut.readOnly = true; }
            if (nombre) { nombre.value = usuarioEncontrado.nombre; nombre.placeholder = usuarioEncontrado.nombre; }
            if (apellidoPaterno) { apellidoPaterno.value = usuarioEncontrado.apellidoP || ""; apellidoPaterno.placeholder = usuarioEncontrado.apellidoPaterno || "Sin apellido"; }
            if (apellidoMaterno) { apellidoMaterno.value = usuarioEncontrado.apellidoM || ""; apellidoMaterno.placeholder = usuarioEncontrado.apellidoMaterno || "Sin apellido"; }
            if (correo) { correo.value = usuarioEncontrado.correo; correo.placeholder = usuarioEncontrado.correo; }
            if (telefono) { telefono.value = usuarioEncontrado.telefono || ""; telefono.placeholder = usuarioEncontrado.telefono || "Sin teléfono"; }
            
            if (selectRegionAdmin) {
                selectRegionAdmin.value = usuarioEncontrado.region;
                poblarSelectComunas(selectRegionAdmin, selectComunaAdmin);
                selectComunaAdmin.value = usuarioEncontrado.comuna;
            }
            
            if (direccion) { direccion.value = usuarioEncontrado.direccion; direccion.placeholder = usuarioEncontrado.direccion; }
            if (rol) rol.value = usuarioEncontrado.rol;
        } else {
            alert("Usuario no encontrado.");
            location.href = "admin-lista-usuarios.html";
        }
    }

    // Mantiene las reglas en un solo lugar para validación continua y envío
    function validarNombreUsuario(valor) {
        if (valor.trim() === "") return "El nombre es obligatorio."
        if (valor.trim().length > 50) return "El nombre no puede superar los 50 caracteres."
        return ""
    }

    function validarDireccionUsuario(valor) {
        if (valor.trim() === "") return "La dirección es obligatoria."
        if (valor.trim().length > 300) return "La dirección no puede superar los 300 caracteres."
        return ""
    }

    function validarRutUsuario(valor) {
        const mensaje = validarRut(valor)
        if (mensaje) return mensaje
        let identificadorActual = 0
        if (campoIdentificador) identificadorActual = Number(campoIdentificador.value)
        const repetido = obtenerUsuarios().some(usuario => {
            return usuario.id !== identificadorActual && usuario.rut.toUpperCase() === valor.trim().toUpperCase()
        })
        if (repetido) return "Ya existe un usuario con ese RUT."
        return ""
    }

    function validarCorreoUsuario(valor) {
        const mensaje = validarFormatoCorreo(valor)
        if (mensaje) return mensaje
        let identificadorActual = 0
        if (campoIdentificador) identificadorActual = Number(campoIdentificador.value)
        const repetido = obtenerUsuarios().some(usuario => {
            return usuario.id !== identificadorActual && usuario.correo.toLowerCase() === valor.trim().toLowerCase()
        })
        if (repetido) return "Ya existe un usuario con ese correo."
        return ""
    }

    function validarRolUsuario(valor) {
        if (valor === "") return "Debe seleccionar un tipo de usuario."
        return ""
    }

    const errorApellidoMaterno = document.getElementById("error-apellidom-usu")
    const errorRolUsuario = document.getElementById("error-rol-usuario")
    const validacionesUsuario = [
        [nombre, errorNombreUsuario, validarNombreUsuario, "input"],
        [apellidoPaterno, errorApellidoPaterno, validarApellidoPaterno, "input"],
        [apellidoMaterno, errorApellidoMaterno, validarApellidoMaternoOpcional, "input"],
        [correo, errorCorreo, validarCorreoUsuario, "input"],
        [telefono, errorTelefono, validarTelefonoOpcional, "input"],
        [contrasena, errorContrasena, valor => validarLongitudPassword(valor, identificadorFormulario === "form-nuevo-usuario"), "input"],
        [direccion, errorDireccion, validarDireccionUsuario, "input"],
        [selectRegionAdmin, errorRegionAdmin, validarRegion, "change"],
        [selectComunaAdmin, errorComunaAdmin, validarComuna, "change"],
        [rol, errorRolUsuario, validarRolUsuario, "change"]
    ]
    if (identificadorFormulario === "form-nuevo-usuario") {
        validacionesUsuario.unshift([rut, errorRut, validarRutUsuario, "input"])
    }

    for (const [campo, elementoError, validar, tipoEvento] of validacionesUsuario) {
        observarValidacionCampo(campo, elementoError, validar, tipoEvento)
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault()
        let valido = true
        for (const [campo, elementoError, validar] of validacionesUsuario) {
            if (!validarCampoAlEnviar(campo, elementoError, validar)) valido = false
        }

        if (valido) {
            let usuariosActuales = obtenerUsuarios();
            
            let rolUsuario = "cliente";
            if (rol) {
                rolUsuario = rol.value;
            }
            const modeloUsuario = {
                rut: obtenerValorCampo(rut),
                nombre: obtenerValorCampo(nombre),
                apellidoP: obtenerValorCampo(apellidoPaterno),
                apellidoM: obtenerValorCampo(apellidoMaterno),
                correo: obtenerValorCampo(correo),
                telefono: obtenerValorCampo(telefono),
                region: obtenerValorCampo(selectRegionAdmin),
                comuna: obtenerValorCampo(selectComunaAdmin),
                direccion: obtenerValorCampo(direccion),
                rol: rolUsuario
            };

            if (identificadorFormulario === "form-nuevo-usuario") {
                modeloUsuario.id = 1;
                if (usuariosActuales.length > 0) {
                    modeloUsuario.id = Math.max(...usuariosActuales.map(usuario => usuario.id)) + 1;
                }
                usuariosActuales.push(modeloUsuario);

            } else {
                modeloUsuario.id = parseInt(campoIdentificador.value);
                const indice = usuariosActuales.findIndex(usuario => usuario.id === modeloUsuario.id)
                if (indice === -1) {
                    mensajeUsuario.textContent = "No se encontró el usuario que deseas editar."
                    mensajeUsuario.className = "mensaje-final mensaje-error"
                    return
                }
                modeloUsuario.rut = usuariosActuales[indice].rut
                usuariosActuales[indice] = modeloUsuario

            }
            
            if (guardarUsuarios(usuariosActuales)) {
                if (mensajeUsuario) {
                    mensajeUsuario.textContent = "Usuario guardado exitosamente.";
                    mensajeUsuario.className = "mensaje-final mensaje-exito";
                }
                if (identificadorFormulario === "form-nuevo-usuario") {
                    formulario.reset();
                    if (selectComunaAdmin) {
                        selectComunaAdmin.innerHTML = '<option value="" disabled selected>Seleccione comuna</option>';
                    }
                }
                setTimeout(() => location.href = "admin-lista-usuarios.html", 1200);
            } else if (mensajeUsuario) {
                mensajeUsuario.textContent = "No se pudieron guardar los cambios en este navegador.";
                mensajeUsuario.className = "mensaje-final mensaje-error";
            }
            
        } else {
            if (mensajeUsuario) {
                mensajeUsuario.textContent = "Revise los campos marcados antes de enviar.";
                mensajeUsuario.className = "mensaje-final mensaje-error";
            }
        }
    });
};

inicializarFormularioUsuario("form-nuevo-usuario");
inicializarFormularioUsuario("form-editar-usuario");