// Presentación y controles propios de la página del carrito
// Lógica de manipulación del DOM específica para la vista carrito.html
const contenedorCarrito = document.getElementById("contenedor-items-carrito-js");

if (contenedorCarrito) {
    const montoTotalDOM = document.getElementById("monto-total-carrito-js");
    const btnVaciar = document.getElementById("btn-vaciar-todo-js");
    const inputCupon = document.getElementById("cupon-descuento");
    const btnAplicarCupon = document.getElementById("btn-aplicar-cupon");
    const mensajeCupon = document.getElementById("mensaje-cupon");
    const botonContinuar = document.getElementById("btn-continuar");
    
    let descuentoActivo = 0;

    function renderizarCarrito() {
        contenedorCarrito.innerHTML = "";
        const divAccionesGlobales = document.querySelector(".acciones-globales-carrito");
        
        // Retorna un estado vacío si la longitud del arreglo es cero
        if (carritoVirtual.length === 0) {
            contenedorCarrito.innerHTML = "<div class='mensaje-carrito-vacio'><p>Tu carrito está vacío.</p></div>";
            montoTotalDOM.textContent = "$ 0";
            if (divAccionesGlobales) divAccionesGlobales.hidden = true;
            return;
        }

        if (divAccionesGlobales) divAccionesGlobales.hidden = false;
        let subtotal = 0;

        carritoVirtual.forEach((producto, index) => {
            if (!producto || !Number.isFinite(producto.precioResidencial)) return;

            const precioOriginal = producto.precioResidencial;
            const precioConDescuento = Math.round(precioOriginal * (1 - descuentoActivo));
            subtotal += (Math.round(precioOriginal * producto.cantidad));

            let claseAlertaStock = "";
            let textoAlertaStock = `${producto.stock} disponibles`;
            
            if (producto.stock <= 20) {
                claseAlertaStock = "texto-peligro fw-bold";
                textoAlertaStock = `¡Últimas ${producto.stock} unidades!`;
            }

            let htmlPrecios = "";
            if (descuentoActivo > 0) {
                htmlPrecios = `
                    <span class="precio-tachado">$${precioOriginal.toLocaleString("es-CL")}</span>
                    <span class="precio-con-descuento">$${precioConDescuento.toLocaleString("es-CL")}</span>
                `;
            } else {
                htmlPrecios = `
                    <span class="precio-principal">$${precioOriginal.toLocaleString("es-CL")}</span>
                    <span class="precio-secundario">Comercial: $${producto.precioComercial.toLocaleString("es-CL")}</span>
                `;
            }

            const articulo = document.createElement("article");
            articulo.classList.add("item-carrito");
            
            articulo.innerHTML = `
                <div class="item-imagen">
                    <a href="detalle-producto.html?id=${producto.id}">
                        <img src="${escaparCaracteresHtml(producto.imagen)}" alt="${escaparCaracteresHtml(producto.nombre)}" class="img-producto-carrito">
                    </a>
                </div>
                <div class="item-detalles-texto">
                    <span class="item-categoria">${escaparCaracteresHtml(producto.categoria.toUpperCase())}</span>
                    <h3 class="item-nombre">${escaparCaracteresHtml(producto.nombre)}</h3>
                </div>
                <div class="item-compra">
                    <div class="item-precios">
                        ${htmlPrecios}
                    </div>
                    <div class="item-controles-stock">
                        <div class="control-cantidad-carrito">
                            <button type="button" class="btn-restar btn-restar-carrito" data-index="${index}">-</button>
                            <input type="number" value="${producto.cantidad}" class="input-cantidad" readonly>
                            <button type="button" class="btn-sumar btn-sumar-carrito" data-index="${index}">+</button>
                        </div>
                        <span class="texto-stock ${claseAlertaStock}">${textoAlertaStock}</span>
                    </div>
                </div>
                <div class="item-acciones">
                    <button type="button" class="btn-eliminar-item" data-index="${index}" aria-label="Eliminar producto">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            `;
            contenedorCarrito.appendChild(articulo);
        });

        // Calcula el monto final procesando los descuentos sobre el subtotal
        const totalDescuento = Math.round(subtotal * descuentoActivo);
        const totalFinal = Math.round(subtotal - totalDescuento);
        montoTotalDOM.textContent = "$ " + totalFinal.toLocaleString("es-CL");
    }

    // Restablece el arreglo a su estado inicial
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            vaciarCarrito();
        });
    }

    // Validación de cadenas de texto para la aplicación de cupones promocionales
    if (btnAplicarCupon) {
        btnAplicarCupon.addEventListener("click", () => {
            if (carritoVirtual.length === 0) {
                mensajeCupon.textContent = "Agrega productos antes de aplicar un cupón.";
                mensajeCupon.className = "mensaje-cupon activo error";
                return;
            }

            const cuponStr = inputCupon.value.trim().toUpperCase();
            if (cuponStr === "VOLCAN15") {
                descuentoActivo = 0.15;
                mensajeCupon.textContent = "Cupón del 15% aplicado.";
                mensajeCupon.className = "mensaje-cupon activo exito";
            } else {
                descuentoActivo = 0;
                mensajeCupon.textContent = "Cupón inválido.";
                mensajeCupon.className = "mensaje-cupon activo error";
            }
            renderizarCarrito();
        });
    }

    // Informa que el proceso de compra todavía no está disponible
    if (botonContinuar) {
        botonContinuar.addEventListener("click", function() {
            if (carritoVirtual.length === 0) {
                alert("Tu carrito está vacío. Agrega productos antes de continuar.");
                return;
            }
            alert("La finalización de compras estará disponible próximamente. Tus productos seguirán guardados en el carrito.");
        });
    }

    document.addEventListener("carrito-actualizado", renderizarCarrito);
    renderizarCarrito();
}