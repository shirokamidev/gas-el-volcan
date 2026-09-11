// Expresión regular para validar correos corporativos y de uso estándar
window.patronCorreo = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

// Función global para validar la estructura del correo electrónico en los formularios
window.validarFormatoCorreo = function(correo) {
    correo = String(correo || "").trim();

    if (correo === "") {
        return "El correo es obligatorio.";
    }
    if (correo.length > 100) {
        return "El correo no puede superar los 100 caracteres.";
    }
    if (!window.patronCorreo.test(correo)) {
        return "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return "";
};

// Diccionario geográfico estático para poblar los selectores de comunas
window.diccionarioComunas = {
    nuble: [
        { valor: "chillan", texto: "Chillán" },
        { valor: "chillan-viejo", texto: "Chillán Viejo" },
        { valor: "bulnes", texto: "Bulnes" },
        { valor: "el-carmen", texto: "El Carmen" },
        { valor: "pinto", texto: "Pinto" },
        { valor: "san-ignacio", texto: "San Ignacio" },
        { valor: "quillon", texto: "Quillón" }
    ],
    biobio: [
        { valor: "concepcion", texto: "Concepción" },
        { valor: "talcahuano", texto: "Talcahuano" },
        { valor: "los-angeles", texto: "Los Ángeles" }
    ]
};

// Comprueba si localStorage está disponible
window.localStorageDisponible = function() {
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
window.leerLocalStorageJSON = function(clave) {
    if (!window.localStorageDisponible()) {
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
window.guardarLocalStorageJSON = function(clave, dato) {
    if (!window.localStorageDisponible()) {
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

// Obtiene los productos guardados o recurre a la base estática
window.obtenerProductos = function() {
    const productosGuardados = window.leerLocalStorageJSON("productosVolcan");
    if (Array.isArray(productosGuardados)) {
        return productosGuardados;
    }
    if (Array.isArray(window.productosBD)) {
        return [...window.productosBD];
    }
    return [];
};

// Guarda la lista de productos
window.guardarProductos = function(productos) {
    if (!Array.isArray(productos)) {
        console.error("guardarProductos recibió un valor que no es un arreglo.");
        return false;
    }
    return window.guardarLocalStorageJSON("productosVolcan", productos);
};

// Obtiene los usuarios guardados o recurre a la base estática
window.obtenerUsuarios = function() {
    const usuariosGuardados = window.leerLocalStorageJSON("usuariosVolcan");
    if (Array.isArray(usuariosGuardados)) {
        return usuariosGuardados;
    }
    if (Array.isArray(window.usuariosBD)) {
        return [...window.usuariosBD];
    }
    return [];
};

// Guarda la lista de usuarios
window.guardarUsuarios = function(usuarios) {
    if (!Array.isArray(usuarios)) {
        console.error("guardarUsuarios recibió un valor que no es un arreglo.");
        return false;
    }
    return window.guardarLocalStorageJSON("usuariosVolcan", usuarios);
};

// Inicializa la base de datos local al cargar el DOM
window.inicializarBaseDatos = function() {
    const productosGuardados = window.leerLocalStorageJSON("productosVolcan");
    if (!Array.isArray(productosGuardados) && Array.isArray(window.productosBD)) {
        window.guardarProductos(window.productosBD);
    }

    const usuariosGuardados = window.leerLocalStorageJSON("usuariosVolcan");
    if (!Array.isArray(usuariosGuardados) && Array.isArray(window.usuariosBD)) {
        window.guardarUsuarios(window.usuariosBD);
    }
};

// Ejecuta la inicialización de la base de datos de manera segura en el DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    window.inicializarBaseDatos();
});