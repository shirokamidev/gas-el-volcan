// Presenta el carrito guardado y gestiona las acciones de sus productos
const contenedor = document.getElementById("contenedor-items-carrito-js");
const plantilla = document.getElementById("plantilla-item-carrito");
const montoTotal = document.getElementById("monto-total-carrito-js");
const botonVaciar = document.getElementById("btn-vaciar-todo-js");
const accionesGlobales = document.querySelector(".acciones-globales-carrito");
const cupon = document.getElementById("cupon-descuento");
const botonCupon = document.getElementById("btn-aplicar-cupon");
const mensajeCupon = document.getElementById("mensaje-cupon");
const estadoVacio = document.getElementById("carrito-estado-vacio");
const formatoPesos = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
});

let descuentoActivo = 0;

const obtenerTotal = () => carritoVirtual.reduce((suma, item) => {
    return suma + item.precioResidencial * item.cantidad;
}, 0);

// Construye cada tarjeta desde la plantilla HTML, sin insertar datos como código HTML
const construirTarjeta = (producto, indice) => {
    const tarjeta = plantilla.content.firstElementChild.cloneNode(true);
    tarjeta.dataset.productoId = String(producto.id);

    const imagen = tarjeta.querySelector(".item-imagen");
    if (typeof producto.imagen === "string" && producto.imagen.startsWith("assets/images/")) {
        imagen.src = producto.imagen;
    }
    imagen.alt = producto.nombre;

    tarjeta.querySelector(".item-nombre").textContent = producto.nombre;
    tarjeta.querySelector(".item-precio-unitario span").textContent = formatoPesos.format(producto.precioResidencial);
    tarjeta.querySelector(".item-cantidad").textContent = String(producto.cantidad);
    tarjeta.querySelector(".item-subtotal strong").textContent = formatoPesos.format(producto.precioResidencial * producto.cantidad);

    const disminuir = tarjeta.querySelector(".item-disminuir");
    const aumentar = tarjeta.querySelector(".item-aumentar");
    const eliminar = tarjeta.querySelector(".item-eliminar");

    disminuir.disabled = producto.cantidad <= 1;
    aumentar.disabled = producto.cantidad >= producto.stock;
    eliminar.disabled = false;

    disminuir.dataset.indice = String(indice);
    aumentar.dataset.indice = String(indice);
    eliminar.dataset.indice = String(indice);
    return tarjeta;
};

const renderizarCarrito = () => {
    if (!contenedor || !plantilla || !montoTotal) {
        return;
    }

    // Mantiene visible el estado vacío que incluye el enlace hacia el catálogo
    if (carritoVirtual.length === 0) {
        contenedor.replaceChildren();
        if (estadoVacio) {
            contenedor.appendChild(estadoVacio);
        } else {
            const aviso = document.createElement("p");
            aviso.textContent = "Tu carrito está vacío. Explora nuestro catálogo para comenzar.";
            contenedor.appendChild(aviso);
        }
    } else {
        const fragmento = document.createDocumentFragment();
        carritoVirtual.forEach((producto, indice) => {
            fragmento.appendChild(construirTarjeta(producto, indice));
        });
        contenedor.replaceChildren(fragmento);
    }

    const hayProductos = carritoVirtual.length > 0;
    if (accionesGlobales) {
        accionesGlobales.hidden = !hayProductos;
    }
    if (botonVaciar) {
        botonVaciar.disabled = !hayProductos;
    }
    if (cupon) {
        cupon.disabled = !hayProductos;
    }
    if (botonCupon) {
        botonCupon.disabled = !hayProductos;
    }
    if (!hayProductos) {
        descuentoActivo = 0;
        if (cupon) {
            cupon.value = "";
        }
        if (mensajeCupon) {
            mensajeCupon.textContent = "Agrega productos para aplicar un cupón.";
        }
    }

    montoTotal.textContent = formatoPesos.format(Math.round(obtenerTotal() * (1 - descuentoActivo)));
};

if (contenedor && plantilla) {
    // Un único escuchador controla todas las tarjetas, incluso después de actualizarlas
    contenedor.addEventListener("click", (evento) => {
        const boton = evento.target.closest("button[data-indice]");
        if (!boton) {
            return;
        }
        const indice = Number(boton.dataset.indice);
        if (boton.classList.contains("item-aumentar")) {
            cambiarCantidadCarrito(indice, 1);
        } else if (boton.classList.contains("item-disminuir")) {
            cambiarCantidadCarrito(indice, -1);
        } else if (boton.classList.contains("item-eliminar")) {
            eliminarItemCarrito(indice);
        }
    });

    botonVaciar?.addEventListener("click", vaciarCarrito);

    botonCupon?.addEventListener("click", () => {
        const codigo = cupon.value.trim().toUpperCase();
        descuentoActivo = codigo === "VOLCAN15" ? 0.15 : 0;
        mensajeCupon.textContent = descuentoActivo ? "Cupón VOLCAN15 aplicado: 15% de descuento." : "Cupón no válido.";
        mensajeCupon.className = descuentoActivo ? "mensaje-cupon activo exito" : "mensaje-cupon activo error";
        renderizarCarrito();
    });

    document.addEventListener("carrito-actualizado", renderizarCarrito);
    renderizarCarrito();
}
