// Carga los datos y funciones compartidas de la aplicación
const archivosCompartidos = [
    "assets/js/data/categoriasData.js",
    "assets/js/data/productosData.js",
    "assets/js/data/usuariosData.js",
    "assets/js/data/sucursalesData.js",
    "assets/js/data/blogsData.js",
    "assets/js/data/detallesBlogsData.js",
    "assets/js/services/almacenamiento-local.js",
    "assets/js/services/operaciones-carrito.js",
    "assets/js/utils/validaciones.js",
    "assets/js/utils/ubicaciones.js",
    "assets/js/utils/interacciones-productos.js"
];

// Selecciona solamente los archivos necesarios para cada página
const archivosPorPagina = {
    "index.html": ["pages/catalogo.js", "pages/sucursales.js"],
    "catalogo.html": ["pages/catalogo.js"],
    "carrito.html": ["pages/interfaz-carrito.js"],
    "detalle-producto.html": ["pages/catalogo.js", "pages/detalle-productos.js"],
    "sucursales.html": ["pages/sucursales.js"],
    "contacto.html": ["pages/contacto.js"],
    "login.html": ["pages/autenticacion.js"],
    "registro.html": ["pages/autenticacion.js"],
    "blogs.html": ["pages/blogs.js"],
    "detalle-blog.html": ["pages/detalle-blog.js"],
    "admin-index.html": ["admin/admin-metricas.js"],
    "admin-lista-productos.html": ["admin/admin-tablas.js"],
    "admin-lista-usuarios.html": ["admin/admin-tablas.js"],
    "admin-nuevo-producto.html": ["admin/admin-formularios.js"],
    "admin-editar-producto.html": ["admin/admin-formularios.js"],
    "admin-nuevo-usuario.html": ["admin/admin-formularios.js"],
    "admin-editar-usuario.html": ["admin/admin-formularios.js"]
};

const nombrePagina = location.pathname.split("/").pop() || "index.html";
const archivosPagina = (archivosPorPagina[nombrePagina] || []).map(ruta => "assets/js/" + ruta);
const archivosSitio = [...archivosCompartidos, ...archivosPagina];

// Carga cada archivo en orden para que sus funciones estén disponibles
function cargarArchivo(indice) {
    if (indice >= archivosSitio.length) {
        iniciarFormulariosSuscripcion()
        return;
    }

    const archivo = document.createElement("script");
    archivo.src = archivosSitio[indice];
    archivo.onload = function() {
        cargarArchivo(indice + 1);
    };
    archivo.onerror = function() {
        console.error("No se pudo cargar el archivo:", archivosSitio[indice]);
    };
    document.body.appendChild(archivo);
}

// Comprueba la sesión antes de cargar los datos de administración
const esPaginaAdministracion = nombrePagina.startsWith("admin-")
let accesoAdministradorPermitido = true

if (esPaginaAdministracion) {
    try {
        accesoAdministradorPermitido = sessionStorage.getItem("accesoAdministradorVolcan") === "activo"
    } catch (error) {
        accesoAdministradorPermitido = false
    }
}

if (!accesoAdministradorPermitido) {
    document.documentElement.hidden = true
    location.replace("login.html")
} else {
    cargarArchivo(0)
}

// Finaliza la sesión cuando se utiliza el enlace Salir
const enlaceSalirAdministracion = document.querySelector(".btn-salir")
if (enlaceSalirAdministracion) {
    enlaceSalirAdministracion.addEventListener("click", function() {
        try {
            sessionStorage.removeItem("accesoAdministradorVolcan")
        } catch (error) {
            console.warn("No se pudo limpiar la sesión administrativa.", error)
        }
    })
}

// Cierra el menú de Sucursal Virtual al seleccionar cualquier zona externa
const activarSucursal = document.getElementById("activar-sucursal");
if (activarSucursal) {
    const menuSucursal = activarSucursal.closest(".menu-desplegable");

    document.addEventListener("click", (evento) => {
        if (activarSucursal.checked && !menuSucursal.contains(evento.target)) {
            activarSucursal.checked = false;
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && activarSucursal.checked) {
            activarSucursal.checked = false;
            const etiquetaSucursal = menuSucursal.querySelector("label[for='activar-sucursal']");
            if (etiquetaSucursal) {
                etiquetaSucursal.focus();
            }
        }
    });
}

// Informa que el seguimiento de pedidos estará disponible próximamente
const enlacesRastrearPedido = document.querySelectorAll('[data-accion="rastrear-pedido"]');
for (const enlace of enlacesRastrearPedido) {
    enlace.addEventListener("click", (evento) => {
        evento.preventDefault();
        alert("El seguimiento de pedidos estará disponible en una próxima actualización de la plataforma.");
    });
}

// Adapta el mensaje del correo vacío al formulario de suscripción
function validarCorreoSuscripcion(correo) {
    if (correo.trim() === "") {
        return "Ingresa tu correo para recibir nuestras novedades, ofertas y promociones."
    }
    return validarFormatoCorreo(correo)
}

// Muestra debajo del formulario los mismos errores de correo que en el login
function mostrarValidacionSuscripcion(mensajeSuscripcion, errorCorreo) {
    mensajeSuscripcion.textContent = errorCorreo

    if (errorCorreo) {
        mensajeSuscripcion.classList.add("activo")
    } else {
        mensajeSuscripcion.classList.remove("activo")
    }
}

// Valida la suscripción sin mensajes flotantes ni cambios de página
function iniciarFormulariosSuscripcion() {
    const formulariosSuscripcion = document.querySelectorAll("[data-formulario-suscripcion]")
    for (const formularioSuscripcion of formulariosSuscripcion) {
        const correoSuscripcion = formularioSuscripcion.querySelector('input[type="email"]')
        const mensajeSuscripcion = formularioSuscripcion.parentElement.querySelector(".mensaje-suscripcion")

        if (!correoSuscripcion || !mensajeSuscripcion) {
            continue
        }

        // Validación del correo al escribir y del campo obligatorio al enviar
        correoSuscripcion.addEventListener("input", function() {
            let errorCorreo = ""
            if (correoSuscripcion.value.trim() !== "") {
                errorCorreo = validarCorreoSuscripcion(correoSuscripcion.value)
            }
            mostrarValidacionSuscripcion(mensajeSuscripcion, errorCorreo)
        })

        formularioSuscripcion.addEventListener("submit", function(evento) {
            evento.preventDefault()

            const errorCorreo = validarCorreoSuscripcion(correoSuscripcion.value)
            mostrarValidacionSuscripcion(mensajeSuscripcion, errorCorreo)

            if (errorCorreo) {
                return
            }

            alert("La suscripción a nuestras novedades estará disponible próximamente. No se ha registrado tu correo.")
        })
    }

    // Cierra los avisos al hacer clic fuera del formulario de suscripción
    document.addEventListener("click", function(evento) {
        for (const formularioSuscripcion of formulariosSuscripcion) {
            if (formularioSuscripcion.contains(evento.target)) {
                continue
            }

            const mensajeSuscripcion = formularioSuscripcion.parentElement.querySelector(".mensaje-suscripcion")
            if (mensajeSuscripcion && mensajeSuscripcion.classList.contains("activo")) {
                mostrarValidacionSuscripcion(mensajeSuscripcion, "")
            }
        }
    })
}
