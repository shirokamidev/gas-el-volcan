// Presentación y filtros del listado de blogs
const grillaBlogs = document.getElementById("grilla-blogs-js");

if (grillaBlogs) {
    let blogs = [];
    if (Array.isArray(blogsData)) {
        blogs = blogsData;
    }
    const mensajeError = document.getElementById("mensaje-no-blogs");
    const tituloListado = document.getElementById("titulo-listado-blogs");
    const inputBuscarBlog = document.getElementById("buscar-blog");
    const selectCategoria = document.getElementById("categoria-blog");
    const selectFecha = document.getElementById("fecha-blog");

    function crearTarjetaBlog(blog) {
        const articulo = document.createElement("article");
        articulo.className = "tarjeta-blog";
        articulo.dataset.id = String(blog.id);
        articulo.dataset.categoria = blog.categoria;
        articulo.dataset.fecha = blog.fecha;
        articulo.innerHTML = `
            <a class="blog-enlace-img" href="${blog.enlace}">
                <img class="blog-img" src="${blog.imagen}" alt="${blog.descripcionImagen}">
            </a>
            <div class="blog-cuerpo">
                <div class="blog-meta">
                    <span class="meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                            <path d="M8 2v4M16 2v4M3 10h18"></path>
                        </svg>
                        ${blog.fechaPublicacion}
                    </span>
                    <span class="meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <circle cx="12" cy="7" r="4"></circle>
                            <path d="M4 22v-2a8 8 0 0 1 16 0v2"></path>
                        </svg>
                        ${blog.nombreCategoria}
                    </span>
                </div>
                <h3 class="blog-titulo"></h3>
                <p class="blog-resumen"></p>
                <a class="blog-enlace-leer" href="${blog.enlace}">Seguir leyendo
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="m10 8 4 4-4 4M8 12h6"></path>
                    </svg>
                </a>
            </div>
        `;
        articulo.querySelector(".blog-titulo").textContent = blog.titulo;
        articulo.querySelector(".blog-resumen").textContent = blog.resumen;
        return articulo;
    }

    blogs.forEach(blog => grillaBlogs.appendChild(crearTarjetaBlog(blog)));

    function filtrarBlogs(mostrarAlerta = false) {
        const texto = inputBuscarBlog.value.toLocaleLowerCase("es").trim();
        const categoria = selectCategoria.value;
        const fecha = selectFecha.value;
        const filtrosActivos = texto !== "" || categoria !== "todas" || fecha !== "todos";
        let encontrados = 0;

        grillaBlogs.querySelectorAll(".tarjeta-blog").forEach(articulo => {
            const contenido = articulo.textContent.toLocaleLowerCase("es");
            const coincideTexto = !texto || contenido.includes(texto);
            const coincideCategoria = categoria === "todas" || articulo.dataset.categoria === categoria;
            const coincideFecha = fecha === "todos" || articulo.dataset.fecha === fecha;
            const visible = coincideTexto && coincideCategoria && coincideFecha;
            articulo.classList.toggle("oculto", !visible);
            if (visible) encontrados++;
        });
        tituloListado.hidden = filtrosActivos;
        mensajeError.classList.toggle("activo", encontrados === 0);
        if (mostrarAlerta && texto === "" && categoria === "todas" && fecha === "todos") {
            alert("Ingresa un término o selecciona un filtro para buscar.");
        } else if (mostrarAlerta && encontrados === 0) {
            alert("No se encontraron blogs para esta búsqueda.");
        }
    }

    const parametrosUrl = new URLSearchParams(location.search);
    const categoriaUrl = parametrosUrl.get("categoria");
    const fechaUrl = parametrosUrl.get("fecha");

    if (categoriaUrl && Array.from(selectCategoria.options).some(opcion => opcion.value === categoriaUrl)) {
        selectCategoria.value = categoriaUrl;
    }
    if (fechaUrl && Array.from(selectFecha.options).some(opcion => opcion.value === fechaUrl)) {
        selectFecha.value = fechaUrl;
    }
    filtrarBlogs();

    // Al volver desde un blog, ubica los filtros en pantalla
    if (location.hash === "#filtros-blogs") {
        requestAnimationFrame(() => {
            const seccionFiltros = document.getElementById("filtros-blogs");
            if (seccionFiltros) {
                seccionFiltros.scrollIntoView({ block: "start" });
            }
        });
    }

    // Actualiza los resultados mientras se escribe o se cambian las opciones
    inputBuscarBlog.addEventListener("input", () => filtrarBlogs());
    selectCategoria.addEventListener("change", () => filtrarBlogs());
    selectFecha.addEventListener("change", () => filtrarBlogs());

    const botonBuscar = document.getElementById("btn-buscar-lupa");
    const botonFiltrar = document.getElementById("btn-filtrar-cat");
    if (botonBuscar) {
        botonBuscar.addEventListener("click", () => filtrarBlogs(true));
    }
    if (botonFiltrar) {
        botonFiltrar.addEventListener("click", () => filtrarBlogs(true));
    }
    if (inputBuscarBlog) {
        inputBuscarBlog.addEventListener("keydown", evento => {
            if (evento.key === "Enter") {
                evento.preventDefault();
                filtrarBlogs(true);
            }
        });
    }
}
