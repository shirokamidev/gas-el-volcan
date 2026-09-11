// Renderizado de la sección de productos destacados en la vista de inicio
const grillaDestacados = document.getElementById("grilla-destacados-js");

if (grillaDestacados && window.productosBD) {
    function renderizarDestacados() {
        grillaDestacados.innerHTML = "";
        
        // Filtra exclusivamente la categoría de cilindros y limita la muestra a 4 elementos
        const productosDestacados = window.productosBD.filter(p => p.categoria === "cilindros").slice(0, 4);

        productosDestacados.forEach((producto) => {
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("tarjeta-producto");

            tarjeta.innerHTML = `
                <a href="detalle-productos.html" class="producto-enlace-img">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" />
                </a>
                <span class="producto-categoria">${producto.categoria.toUpperCase()}</span>
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-detalle">${producto.descripcion}</p>
                <div class="producto-precios">
                    <h4 class="precio-principal">Residencial: $${producto.precioResidencial.toLocaleString("es-CL")}</h4>
                    <h5 class="precio-secundario">Comercial: $${producto.precioComercial.toLocaleString("es-CL")}</h5>
                </div>
                <div class="producto-controles">
                    <div class="control-cantidad">
                        <button type="button" class="btn-restar btn-restar-dinamico" data-target="dest-cant-${producto.id}">-</button>
                        <input type="number" value="1" min="1" max="${producto.stock}" class="input-cantidad" id="dest-cant-${producto.id}" readonly />
                        <button type="button" class="btn-sumar btn-sumar-dinamico" data-target="dest-cant-${producto.id}" data-max="${producto.stock}">+</button>
                    </div>
                    <button type="button" class="boton boton-naranja boton-bloque btn-agregar-dinamico" data-id="${producto.id}" data-target="dest-cant-${producto.id}">AGREGAR AL CARRITO</button>
                </div>
            `;
            grillaDestacados.appendChild(tarjeta);
        });
    }

    renderizarDestacados();
}

// Procesamiento de datos y renderizado dinámico para la grilla de productos
const grillaProductos = document.getElementById("grilla-productos-js");

if (grillaProductos) {
    const textoResultados = document.getElementById("texto-resultados-js");
    const buscadorInput = document.getElementById("buscador-productos");
    const btnBuscar = document.getElementById("btn-buscar-productos");
    const btnMostrarMovil = document.getElementById("btn-mostrar-movil");
    const radiosCategorias = document.querySelectorAll('input[name="filtro-categoria"]');

    // Construye el HTML de cada tarjeta iterando sobre el arreglo proporcionado
    function mostrarProductos(listaDeProductos) {
        grillaProductos.innerHTML = "";

        // Interrumpe la ejecución y muestra el texto de contingencia si no hay resultados
        if (listaDeProductos.length === 0) {
            grillaProductos.innerHTML = "<p class='mensaje-vacio-catalogo'>No se encontraron productos.</p>";
            textoResultados.textContent = "Mostrando 0 resultados";
            textoResultados.classList.add("activo");
            return;
        }

        listaDeProductos.forEach((producto) => {
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("tarjeta-producto", `cat-${producto.categoria}`);

            tarjeta.innerHTML = `
                <a href="detalle-productos.html" class="producto-enlace-img">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" />
                </a>
                <span class="producto-categoria">${producto.categoria.toUpperCase()}</span>
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-detalle">${producto.descripcion}</p>
                <div class="producto-precios">
                    <h4 class="precio-principal">Residencial: $${producto.precioResidencial.toLocaleString("es-CL")}</h4>
                    <h5 class="precio-secundario">Comercial: $${producto.precioComercial.toLocaleString("es-CL")}</h5>
                </div>
                <div class="producto-controles">
                    <div class="control-cantidad">
                        <button type="button" class="btn-restar btn-restar-dinamico" data-target="cat-cant-${producto.id}">-</button>
                        <input type="number" value="1" min="1" max="${producto.stock}" class="input-cantidad" id="cat-cant-${producto.id}" readonly />
                        <button type="button" class="btn-sumar btn-sumar-dinamico" data-target="cat-cant-${producto.id}" data-max="${producto.stock}">+</button>
                    </div>
                    <button type="button" class="boton boton-naranja boton-bloque btn-agregar-dinamico" data-id="${producto.id}" data-target="cat-cant-${producto.id}">AGREGAR AL CARRITO</button>
                </div>
            `;
            grillaProductos.appendChild(tarjeta);
        });

        textoResultados.textContent = `Mostrando ${listaDeProductos.length} resultado(s)`;
    }

    // Evalúa las condiciones ingresadas por el usuario para filtrar la matriz original
    function aplicarFiltros() {
        let categoriaSeleccionada = "todos";
        
        radiosCategorias.forEach(radio => {
            if (radio.checked) {
                categoriaSeleccionada = radio.id.replace("cat-", "");
            }
        });

        const terminoBusqueda = buscadorInput.value.toLowerCase().trim();

        // Filtra comparando las variables seleccionadas con las propiedades del objeto
        const productosFiltrados = window.productosBD.filter(producto => {
            const coincideCategoria = categoriaSeleccionada === "todos" || producto.categoria === categoriaSeleccionada;
            const coincideBusqueda = producto.nombre.toLowerCase().includes(terminoBusqueda);
            
            return coincideCategoria && coincideBusqueda;
        });

        mostrarProductos(productosFiltrados);
        textoResultados.classList.add("activo");
    }

    // Ejecuta el filtro automáticamente al cambiar el radio button en vista de escritorio
    radiosCategorias.forEach(radio => {
        radio.addEventListener("change", () => {
            if (window.innerWidth > 768) {
                aplicarFiltros();
            }
        });
    });

    // En dispositivos móviles, la actualización del DOM se condiciona al botón
    if (btnMostrarMovil) {
        btnMostrarMovil.addEventListener("click", () => {
            aplicarFiltros();
            
            const cajaHerramientas = document.querySelector(".herramientas-catalogo");
            if (cajaHerramientas) {
                const rect = cajaHerramientas.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                window.scrollTo({
                    top: rect.top + scrollTop - 100,
                    behavior: "smooth"
                });
            }
        });
    }

    if (btnBuscar) {
        btnBuscar.addEventListener("click", aplicarFiltros);
        buscadorInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") aplicarFiltros();
        });
    }

    // Carga inicial del documento
    mostrarProductos(window.productosBD);
    textoResultados.classList.add("activo");
}