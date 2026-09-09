// Recupera el carrito y actualiza los datos de los productos que siguen disponibles
let carritoVirtual = []
const carritoGuardado = leerLocalStorageJSON("carritoVolcan")

if (Array.isArray(carritoGuardado)) {
    const productosDisponibles = obtenerProductos()

    carritoGuardado.forEach(productoGuardado => {
        if (!productoGuardado || !Number.isInteger(productoGuardado.id)) {
            return
        }

        const productoActual = productosDisponibles.find(producto => producto.id === productoGuardado.id)
        if (!productoActual || productoActual.stock <= 0) {
            return
        }

        const cantidadGuardada = Number(productoGuardado.cantidad)
        if (!Number.isInteger(cantidadGuardada) || cantidadGuardada < 1) {
            return
        }

        const cantidadPermitida = Math.min(cantidadGuardada, productoActual.stock)
        const productoEnCarrito = { ...productoActual, cantidad: cantidadPermitida }
        carritoVirtual.push(productoEnCarrito)
    })
}

// Actualiza el indicador numérico del menú principal
const actualizarContadorMenu = function() {
    const btnCarritoIcono = document.querySelector(".icono-carrito");
    if (btnCarritoIcono) {
        const totalItems = carritoVirtual.reduce((total, item) => total + item.cantidad, 0);
        btnCarritoIcono.textContent = `CARRITO (${totalItems})`;
    }
};

// Sincroniza el estado actual del arreglo con localStorage
const sincronizarLocalStorage = function() {
    const guardadoCorrecto = guardarLocalStorageJSON("carritoVolcan", carritoVirtual);
    actualizarContadorMenu();
    document.dispatchEvent(new Event("carrito-actualizado"));
    return guardadoCorrecto;
};

// Integra un nuevo artículo al carrito respetando el límite de stock disponible
const agregarAlCarrito = function(idProducto, cantidadAgregada) {
    const productoBuscado = obtenerProductos().find(producto => producto.id === idProducto);
    if (!productoBuscado) return;

    const itemExistente = carritoVirtual.find(item => item.id === idProducto);
    let cantidadEnCarrito = 0;
    if (itemExistente) {
        cantidadEnCarrito = itemExistente.cantidad;
    }
    const stockDisponible = Math.max(0, productoBuscado.stock - cantidadEnCarrito);

    if (stockDisponible === 0) {
        alert(`Ya tienes todas las unidades disponibles de ${productoBuscado.nombre} en tu carrito.`);
        return;
    }

    const cantidadSolicitada = Math.max(1, Number(cantidadAgregada) || 1);
    const cantidadPermitida = Math.min(cantidadSolicitada, stockDisponible);

    if (itemExistente) {
        itemExistente.cantidad += cantidadPermitida;
    } else {
        carritoVirtual.push({ ...productoBuscado, cantidad: cantidadPermitida });
    }

    const guardadoCorrecto = sincronizarLocalStorage();
    if (!guardadoCorrecto) {
        alert("El producto se agregó temporalmente, pero el navegador no permite guardar el carrito para otras páginas.");
        return;
    }
    if (cantidadPermitida < cantidadSolicitada) {
        alert(`Solo quedan ${stockDisponible} unidad(es) de ${productoBuscado.nombre}. Se agregaron las disponibles.`);
    } else {
        alert(`${productoBuscado.nombre} agregado al carrito exitosamente.`);
    }

};

if (Array.isArray(carritoGuardado) && JSON.stringify(carritoGuardado) !== JSON.stringify(carritoVirtual)) {
    guardarLocalStorageJSON("carritoVolcan", carritoVirtual)
}
actualizarContadorMenu();

// Modifica la cantidad de un artículo sin sobrepasar el stock
function cambiarCantidadCarrito(index, cambio) {
    const producto = carritoVirtual[index];
    if (!producto) return;
    const nuevoValor = producto.cantidad + cambio;
    const productoActual = obtenerProductos().find(item => item.id === producto.id);
    if (productoActual && nuevoValor >= 1 && nuevoValor <= productoActual.stock) {
        producto.cantidad = nuevoValor;
        sincronizarLocalStorage();
    }
}

// Elimina un artículo del carrito
function eliminarItemCarrito(index) {
    if (index < 0 || index >= carritoVirtual.length) return;
    carritoVirtual.splice(index, 1);
    sincronizarLocalStorage();
}

// Vacía el carrito conservando su almacenamiento sincronizado
function vaciarCarrito() {
    carritoVirtual = [];
    sincronizarLocalStorage();
}
