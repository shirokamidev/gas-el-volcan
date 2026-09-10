// Operaciones de renderizado y paginación para la lista de productos
const tbodyProductosAdmin = document.getElementById("tbody-productos-admin");

if (tbodyProductosAdmin) {
    const btnPag1 = document.getElementById("btn-pag-1");
    const btnPag2 = document.getElementById("btn-pag-2");
    const btnAnt = document.getElementById("btn-pag-ant");
    const btnSig = document.getElementById("btn-pag-sig");
    
    let paginaActual = 1;
    const itemsPorPagina = 7; 

    function renderizarTablaAdminProductos(pagina) {
        tbodyProductosAdmin.innerHTML = "";
        const productosTotales = obtenerProductos();
        
        // Define el subconjunto de datos a iterar según el índice de la página
        const inicio = (pagina - 1) * itemsPorPagina;
        const indiceFinal = inicio + itemsPorPagina;
        const productosPagina = productosTotales.slice(inicio, indiceFinal);

        productosPagina.forEach((producto) => {
            let claseStock = "";
            if (producto.stock <= 20) {
                claseStock = "texto-peligro fw-bold";
            }

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="texto-secundario">#${escaparCaracteresHtml(producto.codigo)}</td>
                <td>${escaparCaracteresHtml(producto.categoria.toUpperCase())}</td>
                <td class="fw-bold">${escaparCaracteresHtml(producto.nombre)}</td>
                <td class="columna-descripcion">${escaparCaracteresHtml(producto.descripcion)}</td>
                <td>Unidad</td>
                <td class="fw-bold">$${producto.precioResidencial.toLocaleString("es-CL")}</td>
                <td class="texto-secundario">$${producto.precioComercial.toLocaleString("es-CL")}</td>
                <td class="${claseStock}">${producto.stock}</td>
                <td class="celda-acciones">
                    <a href="admin-editar-producto.html?id=${producto.id}" class="btn-accion btn-editar" aria-label="Editar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </a>
                    <button type="button" class="btn-accion btn-eliminar" data-id="${producto.id}" aria-label="Eliminar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </td>
            `;
            tbodyProductosAdmin.appendChild(fila);
        });

        // Lógica de eliminación de producto
        document.querySelectorAll("#tbody-productos-admin .btn-eliminar").forEach(boton => {
            boton.addEventListener("click", function() {
                if (confirm("¿Seguro que deseas eliminar este producto?")) {
                    const idEliminar = parseInt(this.getAttribute("data-id"));
                    const productosActualizados = obtenerProductos().filter(producto => producto.id !== idEliminar);
                    if (!guardarProductos(productosActualizados)) {
                        alert("No se pudo eliminar el producto porque el navegador no permite guardar los cambios.")
                        return
                    }

                    const maxPaginas = Math.ceil(productosActualizados.length / itemsPorPagina);
                    if (paginaActual > maxPaginas) paginaActual = Math.max(1, maxPaginas);
                    renderizarTablaAdminProductos(paginaActual);
                }
            });
        });

        // Ajusta la paginación según los productos guardados
        const totalPaginas = Math.max(1, Math.ceil(productosTotales.length / itemsPorPagina));
        const contenedorPaginacion = document.querySelector(".paginacion-admin");
        if (contenedorPaginacion) {
            contenedorPaginacion.querySelectorAll(".btn-pagina-generada").forEach(boton => boton.remove());
            btnPag1.classList.toggle("activo", pagina === 1);
            btnPag2.hidden = totalPaginas < 2;
            btnPag2.classList.toggle("activo", pagina === 2);
            btnAnt.disabled = pagina <= 1;
            btnSig.disabled = pagina >= totalPaginas;

            for (let numeroPagina = 3; numeroPagina <= totalPaginas; numeroPagina++) {
                const botonPagina = document.createElement("button");
                botonPagina.type = "button";
                botonPagina.className = "btn-pagina btn-pagina-generada";
                botonPagina.textContent = String(numeroPagina);
                botonPagina.classList.toggle("activo", pagina === numeroPagina);
                botonPagina.addEventListener("click", () => {
                    paginaActual = numeroPagina;
                    renderizarTablaAdminProductos(paginaActual);
                });
                contenedorPaginacion.insertBefore(botonPagina, btnSig);
            }
        }
    }

    btnPag1.addEventListener("click", () => { paginaActual = 1; renderizarTablaAdminProductos(paginaActual); });
    btnPag2.addEventListener("click", () => { paginaActual = 2; renderizarTablaAdminProductos(paginaActual); });
    btnAnt.addEventListener("click", () => { if (paginaActual > 1) { paginaActual--; renderizarTablaAdminProductos(paginaActual); } });
    btnSig.addEventListener("click", () => {
        const totalPaginas = Math.max(1, Math.ceil(obtenerProductos().length / itemsPorPagina));
        if (paginaActual < totalPaginas) {
            paginaActual++;
            renderizarTablaAdminProductos(paginaActual);
        }
    });

    renderizarTablaAdminProductos(paginaActual);
}

// Renderizado de tabla de usuarios en el administrador
const tbodyUsuariosAdmin = document.getElementById("tbody-usuarios-admin");

if (tbodyUsuariosAdmin) {
    const renderizarTablaUsuarios = () => {
        tbodyUsuariosAdmin.innerHTML = "";
        const usuariosTotales = obtenerUsuarios();
        
        usuariosTotales.forEach(usuario => {
            const nombresUsuario = [usuario.nombre, usuario.apellidoP, usuario.apellidoM].filter(nombre => nombre && nombre.trim() !== "");
            const nombreCompleto = nombresUsuario.join(" ");
            
            let comunaTexto = "";
            if (usuario.comuna) {
                comunaTexto = usuario.comuna.replace("-", " ").replace(/\b\w/g, letra => letra.toUpperCase());
            }

            let regionTexto = "";
            if (usuario.region === "biobio") {
                regionTexto = "Región del Biobío";
            } else if (usuario.region === "nuble") {
                regionTexto = "Región de Ñuble";
            }
            
            let claseRol = "rol-cliente";
            if (usuario.rol === "administrador") claseRol = "rol-admin";
            if (usuario.rol === "vendedor") claseRol = "rol-vendedor";

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="texto-secundario">${escaparCaracteresHtml(usuario.rut)}</td>
                <td class="fw-bold">${escaparCaracteresHtml(nombreCompleto)}</td>
                <td>${escaparCaracteresHtml(usuario.correo)}</td>
                <td>${escaparCaracteresHtml(usuario.telefono || "N/A")}</td>
                <td>${escaparCaracteresHtml(regionTexto)}</td>
                <td>${escaparCaracteresHtml(comunaTexto)}</td>
                <td>${escaparCaracteresHtml(usuario.direccion)}</td>
                <td><span class="etiqueta-rol ${claseRol}">${escaparCaracteresHtml(usuario.rol)}</span></td>
                <td class="celda-acciones">
                    <a href="admin-editar-usuario.html?id=${usuario.id}" class="btn-accion btn-editar" aria-label="Editar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </a>
                    <button type="button" class="btn-accion btn-eliminar" data-id="${usuario.id}" aria-label="Eliminar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </td>
            `;
            tbodyUsuariosAdmin.appendChild(fila);
        });

        // Lógica de eliminación de usuario
        document.querySelectorAll("#tbody-usuarios-admin .btn-eliminar").forEach(boton => {
            boton.addEventListener("click", function() {
                if (confirm("¿Seguro que deseas eliminar este usuario?")) {
                    const idEliminar = parseInt(this.getAttribute("data-id"));
                    const usuariosActualizados = obtenerUsuarios().filter(usuario => usuario.id !== idEliminar);
                    if (!guardarUsuarios(usuariosActualizados)) {
                        alert("No se pudo eliminar el usuario porque el navegador no permite guardar los cambios.")
                        return
                    }
                    renderizarTablaUsuarios();
                }
            });
        });
    };
    
    renderizarTablaUsuarios();
}