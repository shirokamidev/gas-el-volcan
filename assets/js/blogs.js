// Evaluación de criterios de búsqueda para las tarjetas informativas
const grillaBlogs = document.getElementById("grilla-blogs-js");

if (grillaBlogs) {
    const articulosBlog = grillaBlogs.querySelectorAll(".tarjeta-blog");
    const btnLupa = document.getElementById("btn-buscar-lupa");
    const inputBuscarBlog = document.getElementById("buscar-blog");
    const btnFiltrarCat = document.getElementById("btn-filtrar-cat");
    
    // Inyección condicional del elemento de control si la plantilla original no lo define
    let mensajeError = document.getElementById("mensaje-no-blogs");
    if (!mensajeError) {
        mensajeError = document.createElement("p");
        mensajeError.id = "mensaje-no-blogs";
        mensajeError.className = "mensaje-vacio-blogs";
        mensajeError.textContent = "No se encontraron noticias con los filtros seleccionados.";
        grillaBlogs.parentNode.insertBefore(mensajeError, grillaBlogs);
    }

    // Itera sobre el DOM ocultando o mostrando elementos según coincidan con los inputs
    function filtrarBlogs() {
        const texto = inputBuscarBlog.value.toLowerCase().trim();
        const cat = document.getElementById("categoria-blog").value;
        const fecha = document.getElementById("fecha-blog").value;
        let encontrados = 0;

        articulosBlog.forEach(articulo => {
            const titulo = articulo.querySelector(".blog-titulo").textContent.toLowerCase();
            const resumen = articulo.querySelector(".blog-resumen").textContent.toLowerCase();
            const catHTML = articulo.dataset.categoria;
            const fechaHTML = articulo.dataset.fecha;

            const coincideTexto = texto === "" || titulo.includes(texto) || resumen.includes(texto);
            const coincideCat = cat === "todas" || catHTML === cat;
            const coincideFecha = fecha === "todos" || fechaHTML === fecha;

            if (coincideTexto && coincideCat && coincideFecha) {
                articulo.classList.remove("oculto");
                encontrados++;
            } else {
                articulo.classList.add("oculto");
            }
        });

        // Habilita el mensaje de error visual si el contador de coincidencias es nulo
        if (mensajeError) {
            if (encontrados === 0) {
                mensajeError.classList.add("activo");
            } else {
                mensajeError.classList.remove("activo");
            }
        }
    }

    if (btnLupa) {
        btnLupa.addEventListener("click", (e) => {
            e.preventDefault();
            filtrarBlogs();
        });
        inputBuscarBlog.addEventListener("keyup", (e) => {
            if (e.key === "Enter") filtrarBlogs();
        });
    }

    if (btnFiltrarCat) {
        btnFiltrarCat.addEventListener("click", (e) => {
            e.preventDefault();
            filtrarBlogs();
        });
    }
}