// Muestra el detalle correspondiente al identificador de la URL
const contenedorDetalle = document.getElementById("detalle-producto-js")

if (contenedorDetalle) {
    const productosCatalogo = obtenerProductos()
    const idProducto = Number(new URLSearchParams(location.search).get("id")) || 1
    const producto = productosCatalogo.find(item => item.id === idProducto)
    const grillaRelacionados = document.getElementById("grilla-relacionados-js")
    const seccionRelacionados = document.getElementById("seccion-relacionados-js")

    if (!producto) {
        contenedorDetalle.innerHTML = `<p class="mensaje-vacio-catalogo">Producto no encontrado. <a href="catalogo.html#herramientas-catalogo">Volver al catálogo</a></p>`
        seccionRelacionados.hidden = true
    } else {
        const nombreCategoria = nombresCategorias[producto.categoria] || producto.categoria
        const rutaCategoria = `catalogo.html?categoria=${encodeURIComponent(producto.categoria)}#herramientas-catalogo`
        const nombreProducto = producto.nombre
        const formatoPrecio = valor => `$${valor.toLocaleString("es-CL")}`
        // Presenta únicamente los datos que identifica el catálogo
        const caracteristicas = [
            ["Tipo", producto.tipo || producto.categoria.charAt(0).toUpperCase() + producto.categoria.slice(1)],
            ["Código", producto.codigo],
            ["Categoría", nombreCategoria]
        ].filter(([, valor]) => valor)

        const listaCaracteristicas = caracteristicas.map(([etiqueta, valor]) => `
            <li><strong>${escaparCaracteresHtml(etiqueta)}:</strong> ${escaparCaracteresHtml(valor)}</li>
        `).join("")
        let avisoStock = '<span class="alerta-stock">Sin stock disponible</span>'
        if (producto.stock > 20) {
            avisoStock = `<span>Disponibles: ${producto.stock} unidades</span>`
        } else if (producto.stock > 0) {
            avisoStock = `<span class="alerta-stock">¡Últimas ${producto.stock} unidades!</span>`
        }

        let estadoCantidad = ""
        if (producto.stock === 0) {
            estadoCantidad = "disabled"
        }

        document.title = `${nombreProducto} | Gas El Volcán`
        contenedorDetalle.innerHTML = `
            <nav class="ruta-navegacion" aria-label="Ruta de navegación">
                <a href="index.html">Inicio</a>
                <span aria-hidden="true">›</span>
                <a href="catalogo.html#herramientas-catalogo">Productos</a>
                <span aria-hidden="true">›</span>
                <a href="${rutaCategoria}">${escaparCaracteresHtml(nombreCategoria)}</a>
                <span aria-hidden="true">›</span>
                <span aria-current="page">${escaparCaracteresHtml(nombreProducto)}</span>
            </nav>

            <div class="detalle-principal">
                <div class="bloque-imagen-detalle">
                    <img src="${escaparCaracteresHtml(producto.imagen)}" alt="${escaparCaracteresHtml(nombreProducto)}" class="imagen-detalle-producto">
                </div>

                <div class="columna-informacion">
                    <span class="categoria-detalle fw-bold">${escaparCaracteresHtml(nombreCategoria)}</span>
                    <h1 class="titulo-detalle fw-bold">${escaparCaracteresHtml(nombreProducto)}</h1>
                    <p class="descripcion-detalle">${escaparCaracteresHtml(producto.descripcion)}</p>

                    <div class="bloque-precios-detalle">
                        <p class="precio-residencial-detalle">${formatoPrecio(producto.precioResidencial)}</p>
                        <p class="precio-comercial-detalle">Precio comercial: ${formatoPrecio(producto.precioComercial)}</p>
                    </div>

                    <p class="meta-producto">${avisoStock}</p>

                    <div class="bloque-controles-detalle">
                        <label for="cant-detalle" class="etiqueta-cantidad-detalle">Cantidad</label>
                        <div class="control-cantidad-detalle">
                            <button type="button" class="btn-restar-detalle btn-restar-dinamico" data-target="cant-detalle" aria-label="Restar cantidad" ${estadoCantidad}>−</button>
                            <input type="number" id="cant-detalle" value="1" min="1" max="${producto.stock}" class="input-cantidad-detalle" readonly aria-label="Cantidad" ${estadoCantidad}>
                            <button type="button" class="btn-sumar-detalle btn-sumar-dinamico" data-target="cant-detalle" data-max="${producto.stock}" aria-label="Sumar cantidad" ${estadoCantidad}>+</button>
                        </div>
                        <button type="button" class="boton boton-naranja boton-bloque btn-agregar-dinamico" data-id="${producto.id}" data-target="cant-detalle" ${estadoCantidad}>AGREGAR AL CARRITO</button>
                    </div>
                </div>
            </div>

            <section class="ficha-caracteristicas" aria-labelledby="titulo-caracteristicas">
                <h2 id="titulo-caracteristicas" class="subtitulo-detalle">Características del producto</h2>
                <ul class="lista-especificaciones">${listaCaracteristicas}</ul>
            </section>
        `

        const relacionados = productosCatalogo
            .filter(item => item.categoria === producto.categoria && item.id !== producto.id)
            .slice(0, 3)

        seccionRelacionados.hidden = relacionados.length === 0
        relacionados.forEach(item => grillaRelacionados.appendChild(crearTarjetaProducto(item, "rel")))
    }
}
