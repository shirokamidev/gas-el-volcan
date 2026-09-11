// Interceptamos los eventos de clic a nivel de documento para delegar las acciones
document.addEventListener("click", (e) => {
    
    // Decrementa el valor del input numérico asociado al botón
    if (e.target.closest(".btn-restar-estatico") || e.target.closest(".btn-restar-dinamico")) {
        const btn = e.target.closest("button");
        const inputId = btn.getAttribute("data-target");
        if (inputId) {
            const input = document.getElementById(inputId);
            if (input) input.value = Math.max(1, parseInt(input.value) - 1);
        }
    }

    // Incrementa el valor del input numérico asociado al botón evaluando el atributo max
    if (e.target.closest(".btn-sumar-estatico") || e.target.closest(".btn-sumar-dinamico")) {
        const btn = e.target.closest("button");
        const inputId = btn.getAttribute("data-target");
        const maximo = parseInt(btn.getAttribute("data-max")) || 999;
        if (inputId) {
            const input = document.getElementById(inputId);
            if (input) input.value = Math.min(maximo, parseInt(input.value) + 1);
        }
    }

    // Captura los datos del producto y deriva la acción hacia la función de carrito.js
    if (e.target.closest(".btn-agregar-estatico") || e.target.closest(".btn-agregar-dinamico")) {
        const btn = e.target.closest("button");
        const idProducto = parseInt(btn.getAttribute("data-id"));
        const inputId = btn.getAttribute("data-target");
        
        if (inputId && window.agregarAlCarrito) {
            const input = document.getElementById(inputId);
            if (input) window.agregarAlCarrito(idProducto, parseInt(input.value));
        }
    }

    // Controles de cantidad específicos para la vista del carrito
    if (e.target.closest(".btn-restar-carrito")) {
        const btn = e.target.closest(".btn-restar-carrito");
        const index = parseInt(btn.getAttribute("data-index"));
        if (window.cambiarCantidadCarrito) window.cambiarCantidadCarrito(index, -1);
    }

    if (e.target.closest(".btn-sumar-carrito")) {
        const btn = e.target.closest(".btn-sumar-carrito");
        const index = parseInt(btn.getAttribute("data-index"));
        if (window.cambiarCantidadCarrito) window.cambiarCantidadCarrito(index, 1);
    }

    // Eliminación de una fila completa en la vista del carrito
    if (e.target.closest(".btn-eliminar-item")) {
        const btn = e.target.closest(".btn-eliminar-item");
        const index = parseInt(btn.getAttribute("data-index"));
        if (window.eliminarItemCarrito) window.eliminarItemCarrito(index);
    }

    // Acciona el componente de impresión nativo del navegador
    if (e.target.closest("#btn-imprimir-catalogo")) {
        window.print();
    }
});