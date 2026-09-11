// Arreglo global para gestionar el estado temporal del carrito de compras
window.carritoVirtual = [];

// Bloque try-catch para prevenir fallos al recuperar información residual de localStorage
try {
    const carritoGuardado = localStorage.getItem("carritoVolcan");
    if (carritoGuardado) {
        const dataParseada = JSON.parse(carritoGuardado);
        
        // Verifica la integridad del arreglo antes de asignarlo a la variable global
        if (Array.isArray(dataParseada)) {
            if (dataParseada.length > 0 && dataParseada[0].precioResidencial) {
                window.carritoVirtual = dataParseada;
            } else if (dataParseada.length > 0) {
                localStorage.setItem("carritoVolcan", "[]");
            }
        }
    }
} catch (error) {
    localStorage.setItem("carritoVolcan", "[]");
}

// Actualiza el indicador numérico del menú principal
window.actualizarContadorMenu = function() {
    const btnCarritoIcono = document.querySelector(".icono-carrito");
    if (btnCarritoIcono) {
        const totalItems = window.carritoVirtual.reduce((total, item) => total + item.cantidad, 0);
        btnCarritoIcono.textContent = `CARRITO (${totalItems})`;
    }
};

// Sincroniza el estado actual del arreglo con localStorage
window.sincronizarLocalStorage = function() {
    localStorage.setItem("carritoVolcan", JSON.stringify(window.carritoVirtual));
    window.actualizarContadorMenu();
};

// Integra un nuevo artículo al carrito respetando el límite de stock disponible
window.agregarAlCarrito = function(idProducto, cantidadAgregada) {
    const productoBuscado = window.productosBD.find(p => p.id === idProducto);
    if (!productoBuscado) return;

    const itemExistente = window.carritoVirtual.find(item => item.id === idProducto);

    if (itemExistente) {
        itemExistente.cantidad += cantidadAgregada;
        if (itemExistente.cantidad > productoBuscado.stock) {
            itemExistente.cantidad = productoBuscado.stock;
        }
    } else {
        window.carritoVirtual.push({
            ...productoBuscado,
            cantidad: cantidadAgregada
        });
    }

    window.sincronizarLocalStorage();
    alert(`${productoBuscado.nombre} agregado al carrito exitosamente.`);
    
    // Fuerza el renderizado del DOM si el usuario se encuentra en la vista del carrito
    if (typeof window.renderizarCarrito === "function") {
        window.renderizarCarrito();
    }
};

window.actualizarContadorMenu();

// Lógica de manipulación del DOM específica para la vista carrito.html
const contenedorCarrito = document.getElementById("contenedor-items-carrito-js");

if (contenedorCarrito) {
    const montoTotalDOM = document.getElementById("monto-total-carrito-js");
    const btnVaciar = document.getElementById("btn-vaciar-todo-js");
    const inputCupon = document.getElementById("cupon-descuento");
    const btnAplicarCupon = document.getElementById("btn-aplicar-cupon");
    const mensajeCupon = document.getElementById("mensaje-cupon");
    
    let descuentoActivo = 0;

    window.renderizarCarrito = function() {
        contenedorCarrito.innerHTML = "";
        const divAccionesGlobales = document.querySelector(".acciones-globales-carrito");
        
        // Retorna un estado vacío si la longitud del arreglo es cero
        if (window.carritoVirtual.length === 0) {
            contenedorCarrito.innerHTML = "<div class='mensaje-carrito-vacio'><p>Tu carrito está vacío.</p></div>";
            montoTotalDOM.textContent = "$ 0";
            if (divAccionesGlobales) divAccionesGlobales.style.display = "none";
            return;
        }

        if (divAccionesGlobales) divAccionesGlobales.style.display = "flex";
        let subtotal = 0;

        window.carritoVirtual.forEach((producto, index) => {
            if (!producto || !producto.precioResidencial) return;

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
                    <a href="detalle-productos.html">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto-carrito">
                    </a>
                </div>
                <div class="item-detalles-texto">
                    <span class="item-categoria">${producto.categoria.toUpperCase()}</span>
                    <h3 class="item-nombre">${producto.nombre}</h3>
                </div>
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
                <div class="item-acciones">
                    <button type="button" class="btn-eliminar-item" data-index="${index}" aria-label="Eliminar producto">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;">
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
    };

    // Modifica la cantidad de un artículo existente validando los límites de inventario
    window.cambiarCantidadCarrito = function(index, cambio) {
        const nuevoValor = window.carritoVirtual[index].cantidad + cambio;
        if (nuevoValor >= 1 && nuevoValor <= window.carritoVirtual[index].stock) {
            window.carritoVirtual[index].cantidad = nuevoValor;
            window.sincronizarLocalStorage();
            window.renderizarCarrito();
        }
    };

    // Remueve un elemento específico del arreglo
    window.eliminarItemCarrito = function(index) {
        window.carritoVirtual.splice(index, 1);
        window.sincronizarLocalStorage();
        window.renderizarCarrito();
    };

    // Restablece el arreglo a su estado inicial
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            window.carritoVirtual = [];
            window.sincronizarLocalStorage();
            window.renderizarCarrito();
        });
    }

    // Validación de cadenas de texto para la aplicación de cupones promocionales
    if (btnAplicarCupon) {
        btnAplicarCupon.addEventListener("click", () => {
            if (window.carritoVirtual.length === 0) {
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
            window.renderizarCarrito();
        });
    }

    window.renderizarCarrito();
}