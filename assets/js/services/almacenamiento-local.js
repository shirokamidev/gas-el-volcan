// Comprueba si localStorage está disponible
const localStorageDisponible = function() {
    try {
        const prueba = "__volcan_storage_test__";
        localStorage.setItem(prueba, "ok");
        localStorage.removeItem(prueba);
        return true;
    } catch (error) {
        console.warn("LocalStorage no está disponible en este navegador/origen.", error);
        return false;
    }
};

// Lee un dato JSON de localStorage de forma segura
const leerLocalStorageJSON = function(clave) {
    if (!localStorageDisponible()) {
        return null;
    }
    try {
        const dato = localStorage.getItem(clave);
        if (dato === null || dato === "" || dato === "undefined") {
            return null;
        }
        return JSON.parse(dato);
    } catch (error) {
        console.warn(`El dato almacenado en "${clave}" no es válido. Se recuperará la información base.`, error);
        return null;
    }
};

// Guarda un objeto o arreglo como JSON en localStorage
const guardarLocalStorageJSON = function(clave, dato) {
    if (!localStorageDisponible()) {
        console.warn(`No se pudo guardar "${clave}" porque localStorage no está disponible.`);
        return false;
    }
    try {
        localStorage.setItem(clave, JSON.stringify(dato));
        return true;
    } catch (error) {
        console.error(`Error al guardar "${clave}" en localStorage:`, error);
        return false;
    }
};

// Completa la información de los productos guardados anteriormente
const normalizarProducto = function(producto) {
    let productoActualizado = producto

    if (typeof productoActualizado.imagen === "string" && productoActualizado.imagen.startsWith("assets/img/")) {
        productoActualizado = { ...productoActualizado, imagen: productoActualizado.imagen.replace("assets/img/", "assets/images/") }
    }

    if (!Number.isSafeInteger(productoActualizado.stockCritico) || productoActualizado.stockCritico < 0) {
        const productoInicial = productosData.find(registro => registro.id === productoActualizado.id && registro.codigo === productoActualizado.codigo)
        let stockCriticoInicial = 0
        if (productoInicial) {
            stockCriticoInicial = productoInicial.stockCritico
        }
        productoActualizado = { ...productoActualizado, stockCritico: stockCriticoInicial }
    }

    return productoActualizado
}

// Obtiene el umbral crítico configurado para un producto
const obtenerStockCritico = function(producto) {
    if (Number.isSafeInteger(producto.stockCritico) && producto.stockCritico >= 0) {
        return producto.stockCritico
    }
    return 0
}

// Obtiene los productos guardados o recurre a la base estática
const obtenerProductos = function() {
    const productosGuardados = leerLocalStorageJSON("productosVolcan");
    if (Array.isArray(productosGuardados)) {
        const productosActualizados = productosGuardados.map(normalizarProducto);

        if (productosActualizados.some((producto, indice) => producto !== productosGuardados[indice])) {
            guardarProductos(productosActualizados);
        }
        return productosActualizados;
    }
    if (Array.isArray(productosData)) {
        return [...productosData];
    }
    return [];
};

// Guarda la lista de productos
const guardarProductos = function(productos) {
    if (!Array.isArray(productos)) {
        console.error("guardarProductos recibió un valor que no es un arreglo.");
        return false;
    }
    return guardarLocalStorageJSON("productosVolcan", productos);
};

// Obtiene los usuarios guardados o recurre a la base estática
const obtenerUsuarios = function() {
    const usuariosGuardados = leerLocalStorageJSON("usuariosVolcan");
    if (Array.isArray(usuariosGuardados)) {
        return usuariosGuardados.map(usuario => {
            const usuarioActualizado = { ...usuario }
            if (!usuarioActualizado.apellidoP && usuarioActualizado.apellidoPaterno) {
                usuarioActualizado.apellidoP = usuarioActualizado.apellidoPaterno
            }
            if (!usuarioActualizado.apellidoM && usuarioActualizado.apellidoMaterno) {
                usuarioActualizado.apellidoM = usuarioActualizado.apellidoMaterno
            }
            return usuarioActualizado
        })
    }
    if (Array.isArray(usuariosData)) {
        return [...usuariosData];
    }
    return [];
};

// Guarda la lista de usuarios
const guardarUsuarios = function(usuarios) {
    if (!Array.isArray(usuarios)) {
        console.error("guardarUsuarios recibió un valor que no es un arreglo.");
        return false;
    }
    return guardarLocalStorageJSON("usuariosVolcan", usuarios);
};

// Inicializa la base de datos local al cargar el DOM
const inicializarBaseDatos = function() {
    const productosGuardados = leerLocalStorageJSON("productosVolcan");
    if (!Array.isArray(productosGuardados) && Array.isArray(productosData)) {
        guardarProductos(productosData);
    }

    const usuariosGuardados = leerLocalStorageJSON("usuariosVolcan");
    if (!Array.isArray(usuariosGuardados) && Array.isArray(usuariosData)) {
        guardarUsuarios(usuariosData);
    }
};

// Ejecuta la inicialización de la base de datos de manera segura en el DOMContentLoaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarBaseDatos, { once: true });
} else {
    inicializarBaseDatos();
}
// Facilita el teclado numérico sin bloquear los mensajes de validación
const configurarTelefonos = function() {
    document.querySelectorAll('input[type="tel"]').forEach(campo => {
        campo.setAttribute("inputmode", "numeric");
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", configurarTelefonos, { once: true });
} else {
    configurarTelefonos();
}
