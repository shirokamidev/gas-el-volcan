// Filtra el listado de noticias sin abandonar la página
const formularioFiltrosBlog = document.getElementById("form-filtros-blog")
const grillaFiltrosBlog = document.getElementById("grilla-blogs-js")

if (formularioFiltrosBlog && grillaFiltrosBlog) {
    const buscarBlog = document.getElementById("buscar-blog")
    const categoriaBlog = document.getElementById("categoria-blog")
    const fechaBlog = document.getElementById("fecha-blog")
    const mensajeBlogs = document.getElementById("mensaje-no-blogs")
    const tarjetasBlog = [...grillaFiltrosBlog.querySelectorAll(".tarjeta-blog")]
    const datosBlog = typeof blogsData !== "undefined" && Array.isArray(blogsData) ? blogsData : []

    // Mantiene los datos editoriales preparados para el renderizado final
    tarjetasBlog.forEach((tarjeta, indice) => {
        const noticia = datosBlog[indice]
        if (!noticia) return
        tarjeta.dataset.categoria = noticia.categoria
        tarjeta.dataset.anio = noticia.fecha
        tarjeta.dataset.busqueda = `${noticia.titulo} ${noticia.resumen}`.toLocaleLowerCase("es")
    })

    function aplicarFiltrosBlogs() {
        const texto = buscarBlog.value.trim().toLocaleLowerCase("es")
        const categoria = categoriaBlog.value
        const anio = fechaBlog.value
        let visibles = 0

        tarjetasBlog.forEach(tarjeta => {
            const contenido = tarjeta.dataset.busqueda || tarjeta.textContent.toLocaleLowerCase("es")
            const mostrar = (!texto || contenido.includes(texto))
                && (categoria === "todas" || tarjeta.dataset.categoria === categoria)
                && (anio === "todos" || tarjeta.dataset.anio === anio)
            tarjeta.hidden = !mostrar
            tarjeta.style.display = mostrar ? "" : "none"
            if (mostrar) visibles++
        })

        if (mensajeBlogs) {
            mensajeBlogs.textContent = visibles
                ? `${visibles} noticia(s) encontradas con los filtros seleccionados.`
                : "No hay noticias para esos filtros. Prueba otra búsqueda."
        }
    }

    formularioFiltrosBlog.addEventListener("submit", function(evento) {
        evento.preventDefault()
        aplicarFiltrosBlogs()
    })
    buscarBlog.addEventListener("input", aplicarFiltrosBlogs)
    categoriaBlog.addEventListener("change", aplicarFiltrosBlogs)
    fechaBlog.addEventListener("change", aplicarFiltrosBlogs)
    document.getElementById("btn-filtrar-cat")?.addEventListener("click", aplicarFiltrosBlogs)
    aplicarFiltrosBlogs()
}
