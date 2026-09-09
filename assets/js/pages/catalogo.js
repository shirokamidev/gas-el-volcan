// Construye una tarjeta compartida entre inicio, catálogo y productos relacionados
const productosCatalogo = obtenerProductos();

const crearTarjetaProducto = function(producto, prefijo) {
    const tarjeta = document.createElement("article");
    tarjeta.className = `tarjeta-producto cat-${producto.categoria}`;
    const cantidadId = `${prefijo}-cant-${producto.id}`;
    const precioResidencial = producto.precioResidencial.toLocaleString("es-CL");
    const precioComercial = producto.precioComercial.toLocaleString("es-CL");
    let estadoCantidad = "";
    if (producto.stock <= 0) {
        estadoCantidad = "disabled";
    }

    tarjeta.innerHTML = `
        <a href="detalle-producto.html?id=${producto.id}" class="producto-enlace-img">
            <img src="${escaparCaracteresHtml(producto.imagen)}" alt="${escaparCaracteresHtml(producto.nombre)}" class="producto-img">
        </a>
        <span class="producto-categoria">${escaparCaracteresHtml(producto.categoria.toUpperCase())}</span>
        <h3 class="producto-nombre">${escaparCaracteresHtml(producto.nombre)}</h3>
        <p class="producto-detalle">${escaparCaracteresHtml(producto.descripcion)}</p>
        <div class="producto-precios">
            <h4 class="precio-principal">Residencial: $${precioResidencial}</h4>
            <h5 class="precio-secundario">Comercial: $${precioComercial}</h5>
        </div>
        <div class="producto-controles">
            <div class="control-cantidad">
                <button type="button" class="btn-restar btn-restar-dinamico" data-target="${cantidadId}" aria-label="Restar cantidad" ${estadoCantidad}>−</button>
                <input type="number" value="1" min="1" max="${producto.stock}" class="input-cantidad" id="${cantidadId}" readonly aria-label="Cantidad" ${estadoCantidad}>
                <button type="button" class="btn-sumar btn-sumar-dinamico" data-target="${cantidadId}" data-max="${producto.stock}" aria-label="Sumar cantidad" ${estadoCantidad}>+</button>
            </div>
            <button type="button" class="boton boton-naranja boton-bloque btn-agregar-dinamico" data-id="${producto.id}" data-target="${cantidadId}" ${estadoCantidad}>AGREGAR AL CARRITO</button>
        </div>
    `;
    return tarjeta;
};

// Muestra cuatro productos diferentes cada vez que se carga inicio
const grillaDestacados = document.getElementById("grilla-destacados-js");

if (grillaDestacados) {
    const productosAleatorios = [...productosCatalogo];

    for (let indice = productosAleatorios.length - 1; indice > 0; indice--) {
        const posicion = Math.floor(Math.random() * (indice + 1));
        [productosAleatorios[indice], productosAleatorios[posicion]] = [productosAleatorios[posicion], productosAleatorios[indice]];
    }

    productosAleatorios.slice(0, 4).forEach(producto => {
        grillaDestacados.appendChild(crearTarjetaProducto(producto, "dest"));
    });
}

// Aplica búsqueda y selección de categoría sin duplicar tarjetas
const grillaProductos = document.getElementById("grilla-productos-js");

if (grillaProductos) {
    const textoResultados = document.getElementById("texto-resultados-js");
    const buscadorInput = document.getElementById("buscador-productos");
    const btnBuscar = document.getElementById("btn-buscar-productos");
    const btnMostrarMovil = document.getElementById("btn-mostrar-movil");
    const enlaceRestablecer = document.getElementById("enlace-restablecer-filtros");
    const radiosCategorias = document.querySelectorAll('input[name="filtro-categoria"]');

    function categoriaActual() {
        const categoriaSeleccionada = document.querySelector('input[name="filtro-categoria"]:checked');
        if (categoriaSeleccionada) {
            return categoriaSeleccionada.id.replace("cat-", "");
        }
        return "todos";
    }

    function normalizarTexto(texto) {
        return String(texto).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    function aplicarFiltros(mostrarAlerta = false) {
        const categoria = categoriaActual();
        const busqueda = normalizarTexto(buscadorInput.value);
        const productos = productosCatalogo.filter(producto => {
            const categoriaValida = categoria === "todos" || producto.categoria === categoria;
            return categoriaValida && normalizarTexto(producto.nombre).includes(busqueda);
        });

        if (mostrarAlerta && busqueda === "" && categoria === "todos") {
            alert("Ingresa el nombre de un producto para buscar.");
            return;
        }
        if (mostrarAlerta && productos.length === 0) {
            alert("No se encontraron productos para esta búsqueda.");
        }

        grillaProductos.replaceChildren();
        productos.forEach(producto => grillaProductos.appendChild(crearTarjetaProducto(producto, "cat")));
        if (productos.length === 0) {
            const aviso = document.createElement("p");
            aviso.className = "mensaje-vacio-catalogo";
            aviso.textContent = "No se encontraron productos.";
            grillaProductos.appendChild(aviso);
        }

        const descripcionCategoria = nombresCategorias[categoria];
        let mensajeResultados = `Mostrando ${productos.length} resultado(s)`;
        if (descripcionCategoria) {
            mensajeResultados += ` en ${descripcionCategoria}`;
        }
        textoResultados.textContent = mensajeResultados;
        textoResultados.classList.add("activo");
        enlaceRestablecer.hidden = categoria === "todos" && busqueda === "";
    }

    function irAlBuscador() {
        const herramientas = document.getElementById("herramientas-catalogo");
        if (herramientas) {
            herramientas.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    radiosCategorias.forEach(radio => {
        radio.addEventListener("change", () => {
            if (document.documentElement.clientWidth >= 992) {
                aplicarFiltros();
            }
        });
    });

    if (btnMostrarMovil) {
        btnMostrarMovil.addEventListener("click", () => {
            aplicarFiltros();
            document.getElementById("toggle-filtros-movil").checked = false;
            requestAnimationFrame(irAlBuscador);
        });
    }

    grillaProductos.addEventListener("click", (evento) => {
        const enlaceProducto = evento.target.closest(".producto-enlace-img");
        if (enlaceProducto) {
            history.replaceState(null, "", location.pathname + location.search + "#herramientas-catalogo");
        }
    });

    if (btnBuscar) {
        btnBuscar.addEventListener("click", () => aplicarFiltros(true));
    }
    if (buscadorInput) {
        buscadorInput.addEventListener("keydown", evento => {
            if (evento.key === "Enter") aplicarFiltros(true);
        });
    }

    if (enlaceRestablecer) {
        enlaceRestablecer.addEventListener("click", evento => {
            evento.preventDefault();
            document.getElementById("cat-todos").checked = true;
            buscadorInput.value = "";
            aplicarFiltros();
        });
    }

    const categoriaUrl = new URLSearchParams(location.search).get("categoria");
    const radioUrl = document.getElementById(`cat-${categoriaUrl}`);
    if (radioUrl && radioUrl.name === "filtro-categoria") {
        radioUrl.checked = true;
    }
    aplicarFiltros();
    if (location.hash === "#herramientas-catalogo") {
        requestAnimationFrame(irAlBuscador);
        addEventListener("load", irAlBuscador, { once: true });
    }
}

// Imprime el catálogo desde su página
const botonImprimirCatalogo = document.getElementById("btn-imprimir-catalogo");
if (botonImprimirCatalogo) {
    botonImprimirCatalogo.addEventListener("click", function() {
        print();
    });
}
