// Controla las interacciones comunes de las vistas públicas
// Esta primera etapa funciona con scripts clásicos, como la versión definitiva del sitio
const menuHamburguesa = document.getElementById("menu-hamburguesa")
const enlacesPrincipales = document.getElementById("enlaces-principales")

if (menuHamburguesa && enlacesPrincipales) {
    const cerrarMenuPublico = function() {
        menuHamburguesa.checked = false
    }

    // Cierra el menú después de seleccionar un enlace
    enlacesPrincipales.addEventListener("click", function(evento) {
        if (evento.target instanceof Element && evento.target.closest("a")) {
            cerrarMenuPublico()
        }
    })

    // Permite cerrar el menú al seleccionar un área exterior
    document.addEventListener("click", function(evento) {
        if (!menuHamburguesa.checked || evento.target === menuHamburguesa) {
            return
        }

        if (evento.target instanceof Element && !evento.target.closest(".barra-navegacion")) {
            cerrarMenuPublico()
        }
    })

    // Acceso con teclado a la navegación
    document.addEventListener("keydown", function(evento) {
        if (evento.key === "Escape" && menuHamburguesa.checked) {
            cerrarMenuPublico()
            const control = document.querySelector('label[for="menu-hamburguesa"]')
            if (control) {
                control.focus()
            }
        }
    })

    // Restablece el menú abierto al pasar al diseño de escritorio
    const vistaEscritorio = window.matchMedia("(min-width: 992px)")
    vistaEscritorio.addEventListener("change", function(evento) {
        if (evento.matches) {
            cerrarMenuPublico()
        }
    })
}

// Preparación del menú de Sucursal Virtual de la interfaz definitiva
const activarSucursal = document.getElementById("activar-sucursal")
if (activarSucursal) {
    const desplegable = activarSucursal.closest(".menu-desplegable")
    if (desplegable) {
        document.addEventListener("click", function(evento) {
            if (activarSucursal.checked && !desplegable.contains(evento.target)) {
                activarSucursal.checked = false
            }
        })
        document.addEventListener("keydown", function(evento) {
            if (evento.key === "Escape" && activarSucursal.checked) {
                activarSucursal.checked = false
                const etiqueta = desplegable.querySelector('label[for="activar-sucursal"]')
                if (etiqueta) etiqueta.focus()
            }
        })
    }
}
