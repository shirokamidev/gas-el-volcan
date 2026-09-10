// Controla los botones de cantidad y carrito desde un solo evento
function actualizarCantidadProducto(boton, cambio) {
    const identificadorCantidad = boton.getAttribute("data-target");
    const campoCantidad = document.getElementById(identificadorCantidad);

    if (!campoCantidad) return;

    const cantidadMaxima = Number(boton.getAttribute("data-max")) || Number(campoCantidad.max) || 999;
    const nuevaCantidad = Number(campoCantidad.value) + cambio;
    campoCantidad.value = Math.min(cantidadMaxima, Math.max(1, nuevaCantidad));
}

document.addEventListener("click", (evento) => {
    const botonRestar = evento.target.closest(".btn-restar-estatico, .btn-restar-dinamico");
    const botonSumar = evento.target.closest(".btn-sumar-estatico, .btn-sumar-dinamico");
    const botonAgregar = evento.target.closest(".btn-agregar-estatico, .btn-agregar-dinamico");
    const botonRestarCarrito = evento.target.closest(".btn-restar-carrito");
    const botonSumarCarrito = evento.target.closest(".btn-sumar-carrito");
    const botonEliminarCarrito = evento.target.closest(".btn-eliminar-item");

    if (botonRestar) {
        actualizarCantidadProducto(botonRestar, -1);
    } else if (botonSumar) {
        actualizarCantidadProducto(botonSumar, 1);
    } else if (botonAgregar) {
        const identificadorProducto = Number(botonAgregar.getAttribute("data-id"));
        const identificadorCantidad = botonAgregar.getAttribute("data-target");
        const campoCantidad = document.getElementById(identificadorCantidad);
        if (campoCantidad) {
            agregarAlCarrito(identificadorProducto, Number(campoCantidad.value));
        }
    } else if (botonRestarCarrito) {
        cambiarCantidadCarrito(Number(botonRestarCarrito.getAttribute("data-index")), -1);
    } else if (botonSumarCarrito) {
        cambiarCantidadCarrito(Number(botonSumarCarrito.getAttribute("data-index")), 1);
    } else if (botonEliminarCarrito) {
        eliminarItemCarrito(Number(botonEliminarCarrito.getAttribute("data-index")));
    }
});
