// Muestra el blog solicitado desde la URL
const contenedorDetalleBlog = document.getElementById("contenido-detalle-blog")

if (contenedorDetalleBlog) {
    const idBlog = Number(new URLSearchParams(location.search).get("id"))
    const contenidoBlog = detallesBlogsData[idBlog]

    if (contenidoBlog) {
        contenedorDetalleBlog.outerHTML = contenidoBlog

        const tituloBlog = document.querySelector(".portada-blog h1")
        if (tituloBlog) {
            document.title = `${tituloBlog.textContent} | Gas El Volcán`
        }

        const contenedorBlog = document.querySelector(".pagina-detalle > .contenedor")
        if (contenedorBlog) {
            const bloqueRegreso = document.createElement("div")
            bloqueRegreso.className = "volver-blogs-contenedor"
            bloqueRegreso.innerHTML = '<a href="blogs.html" class="boton boton-azul volver-blogs">← VOLVER A TODOS LOS BLOGS</a>'
            contenedorBlog.appendChild(bloqueRegreso)
        }

        // Prepara los enlaces para compartir el blog que se está consultando
        const enlaceBlog = location.href.split("#")[0]
        let tituloCompartir = "Gas El Volcán"
        if (tituloBlog) {
            tituloCompartir = tituloBlog.textContent
        }

        const enlaceWhatsApp = document.querySelector('[aria-label="Compartir en WhatsApp"]')
        const enlaceCorreo = document.querySelector('[aria-label="Compartir por Email"]')
        const enlaceRedSocial = document.querySelector('[aria-label="Compartir en X"]')
        const enlaceCopiar = document.querySelector('[aria-label="Copiar enlace"]')

        if (enlaceWhatsApp) {
            enlaceWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(tituloCompartir + " " + enlaceBlog)}`
            enlaceWhatsApp.target = "_blank"
            enlaceWhatsApp.rel = "noopener noreferrer"
        }
        if (enlaceCorreo) {
            enlaceCorreo.href = `mailto:?subject=${encodeURIComponent(tituloCompartir)}&body=${encodeURIComponent(enlaceBlog)}`
        }
        if (enlaceRedSocial) {
            enlaceRedSocial.href = `https://x.com/intent/tweet?text=${encodeURIComponent(tituloCompartir)}&url=${encodeURIComponent(enlaceBlog)}`
            enlaceRedSocial.target = "_blank"
            enlaceRedSocial.rel = "noopener noreferrer"
        }
        if (enlaceCopiar) {
            enlaceCopiar.addEventListener("click", function(evento) {
                evento.preventDefault()

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(enlaceBlog).then(function() {
                        alert("Enlace del blog copiado.")
                    }).catch(function() {
                        prompt("Copia el enlace del blog:", enlaceBlog)
                    })
                } else {
                    prompt("Copia el enlace del blog:", enlaceBlog)
                }
            })
        }
    } else {
        contenedorDetalleBlog.innerHTML = '<div class="contenedor"><p>Blog no encontrado. <a href="blogs.html">Volver a blogs</a></p></div>'
    }
}
