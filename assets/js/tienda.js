// Logica del catalogo de productos
const grillaProductos = document.getElementById("grilla-productos-js");

if (grillaProductos) {
  const textoResultados = document.getElementById("texto-resultados-js");
  const buscadorInput = document.getElementById("buscador-productos");
  const btnBuscar = document.getElementById("btn-buscar-productos");
  const btnMostrarMovil = document.getElementById("btn-mostrar-movil");
  const radiosCategorias = document.querySelectorAll('input[name="filtro-categoria"]');

  function mostrarProductos(listaDeProductos) {
    grillaProductos.innerHTML = "";

    if (listaDeProductos.length === 0) {
      grillaProductos.innerHTML = "<p style='grid-column: 1/-1; text-align: center; padding: 2rem; color: #666; font-weight: 600;'>No se encontraron productos.</p>";
      textoResultados.textContent = "Mostrando 0 resultados";
      textoResultados.style.display = "block";
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
                <button type="button" class="btn-restar" onclick="var inp=document.getElementById('cat-cant-${producto.id}'); inp.value=Math.max(1, parseInt(inp.value)-1);">-</button>
                <input type="number" value="1" min="1" max="${producto.stock}" class="input-cantidad" id="cat-cant-${producto.id}" readonly />
                <button type="button" class="btn-sumar" onclick="var inp=document.getElementById('cat-cant-${producto.id}'); inp.value=Math.min(${producto.stock}, parseInt(inp.value)+1);">+</button>
            </div>
            <button type="button" class="boton boton-naranja boton-bloque btn-agregar-carrito" onclick="window.agregarAlCarrito(${producto.id}, parseInt(document.getElementById('cat-cant-${producto.id}').value))">AGREGAR AL CARRITO</button>
        </div>
      `;
      grillaProductos.appendChild(tarjeta);
    });

    textoResultados.textContent = `Mostrando ${listaDeProductos.length} resultado(s)`;
  }

  function aplicarFiltros() {
    let categoriaSeleccionada = "todos";
    
    radiosCategorias.forEach(radio => {
      if (radio.checked) {
        categoriaSeleccionada = radio.id.replace("cat-", "");
      }
    });

    const terminoBusqueda = buscadorInput.value.toLowerCase().trim();

    const productosFiltrados = window.productosBD.filter(producto => {
      const coincideCategoria = categoriaSeleccionada === "todos" || producto.categoria === categoriaSeleccionada;
      const coincideBusqueda = producto.nombre.toLowerCase().includes(terminoBusqueda);
      
      return coincideCategoria && coincideBusqueda;
    });

    mostrarProductos(productosFiltrados);
    textoResultados.style.display = "block";
  }

  radiosCategorias.forEach(radio => {
    radio.addEventListener("change", () => {
      if (window.innerWidth > 768) {
        aplicarFiltros();
      }
    });
  });

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

  mostrarProductos(window.productosBD);
  textoResultados.style.display = "block";
}

// Logica visual de la pagina del carrito
const contenedorCarrito = document.getElementById("contenedor-items-carrito-js");

if (contenedorCarrito) {
  const montoTotalDOM = document.getElementById("monto-total-carrito-js");
  const btnVaciar = document.getElementById("btn-vaciar-todo-js");
  const inputCupon = document.getElementById("cupon-descuento");
  const btnAplicarCupon = document.getElementById("btn-aplicar-cupon");
  const mensajeCupon = document.getElementById("mensaje-cupon");
  let descuentoActivo = 0;

  window.renderizarCarrito = function() {
    contenedorCarrito.innerHTML = "";
    const divAccionesGlobales = document.querySelector(".acciones-globales-carrito");
    
    if (window.carritoVirtual.length === 0) {
      contenedorCarrito.innerHTML = "<div style='display: flex; justify-content: center; padding: 3rem; width: 100%;'><p style='font-weight: 600; color: #555;'>Tu carrito está vacío.</p></div>";
      montoTotalDOM.textContent = "$ 0";
      if (divAccionesGlobales) divAccionesGlobales.style.display = "none";
      return;
    }

    if (divAccionesGlobales) divAccionesGlobales.style.display = "flex";
    let subtotal = 0;

    window.carritoVirtual.forEach((producto, index) => {
      if (!producto || !producto.precioResidencial) return;

      const precioUnitarioOriginal = producto.precioResidencial;
      const precioUnitarioEfectivo = Math.round(precioUnitarioOriginal * (1 - descuentoActivo));
      const totalItem = precioUnitarioEfectivo * producto.cantidad;
      subtotal += (Math.round(precioUnitarioOriginal * producto.cantidad));

      let claseAlertaStock = "";
      let textoAlertaStock = `${producto.stock} disponibles`;
      
      if (producto.stock <= 20) {
          claseAlertaStock = "texto-peligro fw-bold";
          textoAlertaStock = `¡Últimas ${producto.stock} unidades!`;
      }

      let htmlPrecios = "";
      if (descuentoActivo > 0) {
          htmlPrecios = `
            <span class="precio-tachado">$${precioUnitarioOriginal.toLocaleString("es-CL")}</span>
            <span class="precio-con-descuento">$${precioUnitarioEfectivo.toLocaleString("es-CL")}</span>
          `;
      } else {
          htmlPrecios = `
            <span class="precio-principal">$${precioUnitarioOriginal.toLocaleString("es-CL")}</span>
            <span class="precio-secundario">Comercial: $${producto.precioComercial.toLocaleString("es-CL")}</span>
          `;
      }

      const articulo = document.createElement("article");
      articulo.classList.add("item-carrito");
      
      articulo.innerHTML = `
        <div class="item-imagen">
            <a href="detalle-productos.html">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto-carrito">
            </a>
        </div>
        <div class="item-detalles-texto">
            <span class="item-categoria">${producto.categoria.toUpperCase()}</span>
            <h3 class="item-nombre">${producto.nombre}</h3>
        </div>
        <div class="item-precios">
            ${htmlPrecios}
        </div>
        <div class="item-controles-stock">
            <div class="control-cantidad-carrito">
                <button type="button" class="btn-restar" onclick="window.cambiarCantidadCarrito(${index}, -1)">-</button>
                <input type="number" value="${producto.cantidad}" class="input-cantidad" readonly>
                <button type="button" class="btn-sumar" onclick="window.cambiarCantidadCarrito(${index}, 1)">+</button>
            </div>
            <span class="texto-stock ${claseAlertaStock}">${textoAlertaStock}</span>
        </div>
        <div class="item-acciones">
            <button type="button" class="btn-eliminar-item" onclick="window.eliminarItemCarrito(${index})" aria-label="Eliminar producto">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </div>
      `;
      contenedorCarrito.appendChild(articulo);
    });

    const subtotalReal = window.carritoVirtual.reduce((acc, p) => acc + (p.precioResidencial * p.cantidad), 0);
    const totalDescuento = Math.round(subtotalReal * descuentoActivo);
    const totalFinal = Math.round(subtotalReal - totalDescuento);
    montoTotalDOM.textContent = "$ " + totalFinal.toLocaleString("es-CL");
  };

  window.cambiarCantidadCarrito = function(index, cambio) {
    const nuevoValor = window.carritoVirtual[index].cantidad + cambio;
    if (nuevoValor >= 1 && nuevoValor <= window.carritoVirtual[index].stock) {
      window.carritoVirtual[index].cantidad = nuevoValor;
      window.sincronizarLocalStorage();
      window.renderizarCarrito();
    }
  };

  window.eliminarItemCarrito = function(index) {
    window.carritoVirtual.splice(index, 1);
    window.sincronizarLocalStorage();
    window.renderizarCarrito();
  };

  if(btnVaciar){
    btnVaciar.addEventListener("click", () => {
      window.carritoVirtual = [];
      window.sincronizarLocalStorage();
      window.renderizarCarrito();
    });
  }

  if(btnAplicarCupon){
    btnAplicarCupon.addEventListener("click", () => {
      if (window.carritoVirtual.length === 0) {
        mensajeCupon.textContent = "Agrega productos antes de aplicar un cupón.";
        mensajeCupon.style.color = "#dc3545";
        mensajeCupon.style.display = "block";
        return;
      }

      const cuponStr = inputCupon.value.trim().toUpperCase();
      if(cuponStr === "VOLCAN15") {
        descuentoActivo = 0.15;
        mensajeCupon.textContent = "Cupón del 15% aplicado.";
        mensajeCupon.style.color = "var(--volcan-azul)";
      } else {
        descuentoActivo = 0;
        mensajeCupon.textContent = "Cupón inválido.";
        mensajeCupon.style.color = "#dc3545";
      }
      mensajeCupon.style.display = "block";
      window.renderizarCarrito();
    });
  }

  window.renderizarCarrito();
}

// Logica de sucursales
const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");
const btnBuscarSucursal = document.getElementById("btn-buscar-sucursal");

if (selectRegion && selectComuna) {
  const comunasPorRegion = {
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

  function poblarComunas(regionSeleccionada) {
    selectComuna.innerHTML = '<option value="" disabled selected>Selecciona tu comuna...</option>';
    if (comunasPorRegion[regionSeleccionada]) {
      comunasPorRegion[regionSeleccionada].forEach(comuna => {
        const option = document.createElement("option");
        option.value = comuna.valor;
        option.textContent = comuna.texto;
        selectComuna.appendChild(option);
      });
    }
  }

  selectRegion.addEventListener("change", function() {
    poblarComunas(this.value);
  });

  const busquedaPrevia = localStorage.getItem("busquedaIndexVolcan");
  if (busquedaPrevia) {
    const busqueda = busquedaPrevia.toLowerCase();
    let regionDestino = ""; 
    let comunaDestino = ""; 
    let radioSucursalDestino = "";

    if (busqueda.includes("chillan") || busqueda.includes("chillán") || busqueda.includes("centro") || busqueda.includes("viejo") || busqueda.includes("oriente") || busqueda.includes("comercial") || busqueda.includes("industrial")) {
        regionDestino = "nuble";
        if (busqueda.includes("viejo") || busqueda.includes("oriente")) { comunaDestino = "chillan-viejo"; radioSucursalDestino = "suc-2"; }
        else if (busqueda.includes("comercial") || busqueda.includes("industrial")) { comunaDestino = "chillan"; radioSucursalDestino = "suc-5"; }
        else { comunaDestino = "chillan"; radioSucursalDestino = "suc-1"; }
    } else if (busqueda.includes("pinto") || busqueda.includes("carmen") || busqueda.includes("ignacio") || busqueda.includes("rural")) {
        regionDestino = "nuble"; comunaDestino = "pinto"; radioSucursalDestino = "suc-3";
    } else if (busqueda.includes("bulnes") || busqueda.includes("quillon") || busqueda.includes("quillón") || busqueda.includes("sur")) {
        regionDestino = "nuble"; comunaDestino = "bulnes"; radioSucursalDestino = "suc-4";
    }

    if (regionDestino !== "") {
        selectRegion.value = regionDestino;
        poblarComunas(regionDestino);
        if (comunaDestino !== "") selectComuna.value = comunaDestino;
        if (radioSucursalDestino !== "") {
            const radioEl = document.getElementById(radioSucursalDestino);
            if (radioEl) radioEl.checked = true;
        }
    }
    localStorage.removeItem("busquedaIndexVolcan");
  }

  if (btnBuscarSucursal) {
    btnBuscarSucursal.addEventListener("click", () => {
        const comuna = selectComuna.value;
        if (!comuna) {
            alert("Por favor selecciona una región y comuna.");
            return;
        }

        if (comuna === "chillan") document.getElementById("suc-1").checked = true;
        else if (comuna === "chillan-viejo") document.getElementById("suc-2").checked = true;
        else if (comuna === "el-carmen" || comuna === "pinto" || comuna === "san-ignacio") document.getElementById("suc-3").checked = true;
        else if (comuna === "bulnes" || comuna === "quillon") document.getElementById("suc-4").checked = true;
        else alert("Actualmente no contamos con Punto Volcán en esta comuna.");
    });
  }
}

// Logica del buscador del index
const inputBuscadorIndex = document.getElementById("input-buscador-index");
const btnBuscadorIndex = document.getElementById("btn-buscador-index");

if (inputBuscadorIndex && btnBuscadorIndex) {
  function irASucursales(e) {
    e.preventDefault();
    const valor = inputBuscadorIndex.value.trim().toLowerCase();
    
    if (!valor) {
        alert("Por favor ingresa una comuna o zona para buscar.");
        return;
    }

    const tieneChillan = valor.includes("chillan") || valor.includes("chillán") || valor.includes("centro") || valor.includes("viejo") || valor.includes("oriente") || valor.includes("comercial") || valor.includes("industrial");
    const tieneRural = valor.includes("pinto") || valor.includes("carmen") || valor.includes("ignacio") || valor.includes("rural");
    const tieneSur = valor.includes("bulnes") || valor.includes("quillon") || valor.includes("quillón") || valor.includes("sur");
    const tieneBiobio = valor.includes("concepcion") || valor.includes("concepción") || valor.includes("talcahuano") || valor.includes("angeles") || valor.includes("ángeles") || valor.includes("biobio") || valor.includes("biobío");

    if (tieneChillan || tieneRural || tieneSur || tieneBiobio) {
      localStorage.setItem("busquedaIndexVolcan", valor);
      window.location.href = "punto-volcan.html#seccion-busqueda";
    } else {
      alert("Actualmente no contamos con Punto Volcán para esta búsqueda.");
    }
  }

  btnBuscadorIndex.addEventListener("click", irASucursales);
  inputBuscadorIndex.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      irASucursales(e);
    }
  });
}

// Logica de busqueda de blogs
const grillaBlogs = document.getElementById("grilla-blogs-js");

if (grillaBlogs) {
  const articulosBlog = grillaBlogs.querySelectorAll(".tarjeta-blog");
  const btnLupa = document.getElementById("btn-buscar-lupa");
  const inputBuscarBlog = document.getElementById("buscar-blog");
  const btnFiltrarCat = document.getElementById("btn-filtrar-cat");
  
  let mensajeError = document.getElementById("mensaje-no-blogs");
  if (!mensajeError) {
      mensajeError = document.createElement("p");
      mensajeError.id = "mensaje-no-blogs";
      mensajeError.style.display = "none";
      mensajeError.style.textAlign = "center";
      mensajeError.style.width = "100%";
      mensajeError.style.padding = "3rem";
      mensajeError.style.color = "#666666";
      mensajeError.style.fontWeight = "600";
      mensajeError.textContent = "No se encontraron noticias con los filtros seleccionados.";
      grillaBlogs.parentNode.insertBefore(mensajeError, grillaBlogs);
  }

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
        articulo.style.display = "flex";
        encontrados++;
      } else {
        articulo.style.display = "none";
      }
    });

    if (mensajeError) {
        mensajeError.style.display = encontrados === 0 ? "block" : "none";
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