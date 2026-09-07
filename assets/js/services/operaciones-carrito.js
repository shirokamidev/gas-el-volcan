// Gestiona los productos del carrito y conserva los cambios entre visitas
const CLAVE_CARRITO = "carritoVolcan";

// Comprueba cantidades, precios y stock antes de utilizar los datos guardados
const normalizarItem = (item) => {
    if (!item || typeof item !== "object") {
        return null;
    }

    const id = Number(item.id);
    const precio = Number(item.precioResidencial);
    const stock = Number(item.stock);
    const cantidad = Number(item.cantidad);

    if (!Number.isInteger(id) || id <= 0 || !Number.isFinite(precio) || precio <= 0
        || !Number.isInteger(stock) || stock <= 0 || !Number.isInteger(cantidad) || cantidad <= 0
        || typeof item.nombre !== "string" || item.nombre.trim() === "") {
        return null;
    }

    return {
        ...item,
        id,
        precioResidencial: precio,
        stock,
        cantidad: Math.min(cantidad, stock)
    };
};

// Recupera la información local sin impedir que la página abra si está dañada
const recuperarCarrito = () => {
    try {
        const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || "[]");
        if (!Array.isArray(guardado)) {
            return [];
        }

        const productos = new Map();
        for (const dato of guardado) {
            const item = normalizarItem(dato);
            if (!item) {
                continue;
            }

            const anterior = productos.get(item.id);
            if (anterior) {
                anterior.cantidad = Math.min(anterior.stock, anterior.cantidad + item.cantidad);
            } else {
                productos.set(item.id, item);
            }
        }
        return [...productos.values()];
    } catch (error) {
        console.warn("No fue posible recuperar el carrito guardado.", error);
        return [];
    }
};

let carritoVirtual = recuperarCarrito();

// Sincroniza el estado de compra con las demás vistas
const sincronizarLocalStorage = () => {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carritoVirtual));
    } catch (error) {
        console.warn("No fue posible guardar los cambios del carrito.", error);
    }

    document.dispatchEvent(new Event("carrito-actualizado"));
};

// Incorpora productos respetando el stock, para su futura conexión con Catálogo
const agregarAlCarrito = (producto, cantidadAgregada = 1) => {
    const cantidad = Number(cantidadAgregada);
    const nuevo = normalizarItem({ ...producto, cantidad });
    if (!nuevo) {
        return false;
    }

    const existente = carritoVirtual.find((item) => item.id === nuevo.id);
    if (existente) {
        if (existente.cantidad >= existente.stock) {
            return false;
        }
        existente.cantidad = Math.min(existente.stock, existente.cantidad + nuevo.cantidad);
    } else {
        carritoVirtual.push(nuevo);
    }

    sincronizarLocalStorage();
    return true;
};

// Cambia una unidad de un producto sin permitir cero ni superar el stock
const cambiarCantidadCarrito = (indice, cambio) => {
    const item = carritoVirtual[indice];
    if (!item || !Number.isInteger(cambio)) {
        return false;
    }

    const cantidad = item.cantidad + cambio;
    if (cantidad < 1 || cantidad > item.stock) {
        return false;
    }

    item.cantidad = cantidad;
    sincronizarLocalStorage();
    return true;
};

const eliminarItemCarrito = (indice) => {
    if (!Number.isInteger(indice) || indice < 0 || indice >= carritoVirtual.length) {
        return false;
    }

    carritoVirtual.splice(indice, 1);
    sincronizarLocalStorage();
    return true;
};

const vaciarCarrito = () => {
    carritoVirtual = [];
    sincronizarLocalStorage();
};
