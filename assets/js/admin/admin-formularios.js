// Mantiene la creación y edición de productos separadas del controlador de las tablas
function iniciarFormularioAdminProductos() {
    const formulario = document.getElementById("form-nuevo-producto") || document.getElementById("form-editar-producto")
    if (!formulario) {
        return
    }

    const esEdicion = formulario.id === "form-editar-producto"
    const mensaje = document.getElementById("mensaje-producto")
    const campo = id => document.getElementById(id)
    const campos = {
        codigo: campo("codigo-producto"),
        nombre: campo("nombre-producto"),
        categoria: campo("categoria-producto"),
        precioResidencial: campo("precio-residencial"),
        precioComercial: campo("precio-comercial"),
        stock: campo("stock-actual"),
        descripcion: campo("descripcion-producto"),
        imagen: campo("imagen-producto")
    }
    const botonGuardar = formulario.querySelector('button[type="submit"]')
    const categoriasPermitidas = ["cilindros", "reguladores", "mangueras", "accesorios"]
    let identificadorEdicion = null

    function mostrarMensaje(texto, correcto) {
        if (!mensaje) {
            return
        }
        mensaje.textContent = texto
        mensaje.classList.remove("estado-error", "estado-exito")
        mensaje.classList.add(correcto ? "estado-exito" : "estado-error")
    }

    function establecerValor(nombre, valor) {
        if (campos[nombre]) {
            campos[nombre].value = String(valor ?? "")
        }
    }

    if (esEdicion) {
        const parametro = new URLSearchParams(location.search).get("id")
        const id = Number(parametro)
        const producto = parametro && Number.isInteger(id) && id > 0
            ? obtenerProductos().find(item => item.id === id)
            : null

        if (!producto) {
            botonGuardar.disabled = true
            mostrarMensaje("No se encontró el producto. Regresa al listado y selecciónalo nuevamente.", false)
            return
        }

        identificadorEdicion = producto.id
        Object.keys(campos).forEach(nombre => establecerValor(nombre, producto[nombre]))
        campos.codigo.readOnly = true
        mostrarMensaje("Editando " + producto.nombre + ". Revisa los campos antes de guardar.", true)
    } else {
        mostrarMensaje("Completa los campos obligatorios para registrar un producto.", true)
    }

    // Revisa los datos del inventario al escribir, antes del envío
    function validarDatoProducto(campo) {
        if (!campo || campo.readOnly) return true
        const valor = campo.value.trim()
        let valido = true

        if (campo === campos.codigo && valor) {
            const codigo = valor.toUpperCase()
            valido = /^[A-Z0-9-]{3,20}$/.test(codigo)
                && !obtenerProductos().some(producto =>
                    producto.codigo.toUpperCase() === codigo && producto.id !== identificadorEdicion)
        } else if ([campos.precioResidencial, campos.precioComercial, campos.stock].includes(campo) && valor !== "") {
            const cantidad = Number(valor)
            valido = Number.isSafeInteger(cantidad) && cantidad >= 0
        } else if (campo === campos.imagen && valor) {
            valido = valor.startsWith("assets/images/") && !valor.includes("..")
        }

        campo.classList.toggle("campo-producto-invalido", !valido)
        campo.setAttribute("aria-invalid", String(!valido))
        return valido
    }

    Object.values(campos).forEach(campo => {
        if (!campo) return
        campo.addEventListener("input", () => validarDatoProducto(campo))
        campo.addEventListener("change", () => validarDatoProducto(campo))
    })

    const enlaceInventario = document.getElementById("enlace-inventario-productos")

    formulario.addEventListener("submit", evento => {
        if (enlaceInventario) enlaceInventario.hidden = true
        evento.preventDefault()
        const productos = obtenerProductos()
        const codigo = campos.codigo.value.trim().toUpperCase()
        const nombre = campos.nombre.value.trim()
        const categoria = campos.categoria.value
        const precioResidencial = Number(campos.precioResidencial.value)
        const precioComercial = Number(campos.precioComercial.value)
        const stock = Number(campos.stock.value)
        const descripcion = campos.descripcion.value.trim()
        const imagen = campos.imagen.value.trim()

        const camposValidos = Object.values(campos).every(campo => validarDatoProducto(campo))
        if (!camposValidos) {
            mostrarMensaje("Corrige el código, los valores numéricos o la ruta de la imagen.", false)
            return
        }

        if (!formulario.checkValidity()) {
            formulario.reportValidity()
            mostrarMensaje("Revisa los campos obligatorios y sus formatos.", false)
            return
        }

        if (!/^[A-Z0-9-]{3,20}$/.test(codigo) || !nombre || !categoriasPermitidas.includes(categoria)) {
            mostrarMensaje("Verifica el código, nombre y categoría del producto.", false)
            return
        }

        if (![precioResidencial, precioComercial, stock].every(valor => Number.isSafeInteger(valor) && valor >= 0)) {
            mostrarMensaje("Los precios y el stock deben ser números enteros iguales o mayores que cero.", false)
            return
        }

        if (productos.some(producto => producto.codigo.toUpperCase() === codigo && producto.id !== identificadorEdicion)) {
            mostrarMensaje("Ya existe un producto con ese código.", false)
            return
        }

        const datos = {
            codigo,
            nombre,
            categoria,
            descripcion,
            precioResidencial,
            precioComercial,
            stock,
            imagen: imagen || "assets/images/logo-volcan.svg"
        }

        let listaActualizada = productos
        if (esEdicion) {
            if (!productos.some(producto => producto.id === identificadorEdicion)) {
                mostrarMensaje("El producto ya no existe en el inventario.", false)
                return
            }
            listaActualizada = productos.map(producto => producto.id === identificadorEdicion ? { ...producto, ...datos } : producto)
        } else {
            const nuevoId = productos.reduce((maximo, producto) => Math.max(maximo, producto.id), 0) + 1
            listaActualizada = [...productos, { id: nuevoId, ...datos }]
        }

        if (!guardarProductos(listaActualizada)) {
            mostrarMensaje("No se pudieron guardar los cambios en este navegador.", false)
            return
        }

        if (!esEdicion) {
            formulario.reset()
            mostrarMensaje("Producto registrado correctamente. Ya aparece en el inventario.", true)
            if (enlaceInventario) enlaceInventario.hidden = false
        } else {
            mostrarMensaje("Producto actualizado correctamente. Los cambios se guardaron en el inventario.", true)
            if (enlaceInventario) enlaceInventario.hidden = false
        }
    })
}

iniciarFormularioAdminProductos()
