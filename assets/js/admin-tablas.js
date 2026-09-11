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
        const productosTotales = window.obtenerProductos();
        
        // Define el subconjunto de datos a iterar según el índice de la página
        const inicio = (pagina - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        const productosPagina = productosTotales.slice(inicio, fin);

        productosPagina.forEach((producto) => {
            const claseStock = producto.stock <= 20 ? "texto-peligro fw-bold" : "";

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="texto-secundario">#${producto.codigo}</td>
                <td>${producto.categoria.toUpperCase()}</td>
                <td class="fw-bold">${producto.nombre}</td>
                <td class="columna-descripcion">${producto.descripcion}</td>
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
        document.querySelectorAll("#tbody-productos-admin .btn-eliminar").forEach(btn => {
            btn.addEventListener("click", function() {
                if (confirm("¿Seguro que deseas eliminar este producto?")) {
                    const idEliminar = parseInt(this.getAttribute("data-id"));
                    let arr = window.obtenerProductos();
                    arr = arr.filter(p => p.id !== idEliminar);
                    window.guardarProductos(arr);
                    
                    const maxPaginas = Math.ceil(arr.length / itemsPorPagina);
                    if (paginaActual > maxPaginas && maxPaginas > 0) paginaActual = maxPaginas;
                    renderizarTablaAdminProductos(paginaActual);
                }
            });
        });

        // Habilita o deshabilita los controles visuales de paginación
        if (btnPag1 && btnPag2 && btnAnt && btnSig) {
            if (pagina === 1) {
                btnPag1.classList.add("activo");
                btnPag2.classList.remove("activo");
                btnAnt.disabled = true;
                btnSig.disabled = false;
            } else {
                btnPag1.classList.remove("activo");
                btnPag2.classList.add("activo");
                btnAnt.disabled = false;
                btnSig.disabled = true;
            }
        }
    }

    if (btnPag1) btnPag1.addEventListener("click", () => { paginaActual = 1; renderizarTablaAdminProductos(paginaActual); });
    if (btnPag2) btnPag2.addEventListener("click", () => { paginaActual = 2; renderizarTablaAdminProductos(paginaActual); });
    if (btnAnt) btnAnt.addEventListener("click", () => { if (paginaActual > 1) { paginaActual--; renderizarTablaAdminProductos(paginaActual); } });
    if (btnSig) btnSig.addEventListener("click", () => { if (paginaActual < 2) { paginaActual++; renderizarTablaAdminProductos(paginaActual); } });

    renderizarTablaAdminProductos(paginaActual);
}

// Renderizado de tabla de usuarios en el administrador
const tbodyUsuariosAdmin = document.getElementById("tbody-usuarios-admin");

if (tbodyUsuariosAdmin) {
    const renderizarTablaUsuarios = () => {
        tbodyUsuariosAdmin.innerHTML = "";
        const usuariosTotales = window.obtenerUsuarios();
        
        usuariosTotales.forEach(usuario => {
            const arrNombres = [usuario.nombre, usuario.apellidoP, usuario.apellidoM].filter(n => n && n.trim() !== "");
            const nombreCompleto = arrNombres.join(" ");
            
            const comunaTexto = usuario.comuna ? usuario.comuna.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) : "";
            const regionTexto = usuario.region === "biobio" ? "Región del Biobío" : (usuario.region === "nuble" ? "Región de Ñuble" : "");
            
            let claseRol = "rol-cliente";
            if (usuario.rol === "administrador") claseRol = "rol-admin";
            if (usuario.rol === "vendedor") claseRol = "rol-vendedor";

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="texto-secundario">${usuario.rut}</td>
                <td class="fw-bold">${nombreCompleto}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.telefono || "N/A"}</td>
                <td>${regionTexto}</td>
                <td>${comunaTexto}</td>
                <td>${usuario.direccion}</td>
                <td><span class="etiqueta-rol ${claseRol}">${usuario.rol}</span></td>
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
        document.querySelectorAll("#tbody-usuarios-admin .btn-eliminar").forEach(btn => {
            btn.addEventListener("click", function() {
                if (confirm("¿Seguro que deseas eliminar este usuario?")) {
                    const idEliminar = parseInt(this.getAttribute("data-id"));
                    let arr = window.obtenerUsuarios();
                    arr = arr.filter(u => u.id !== idEliminar);
                    window.guardarUsuarios(arr);
                    renderizarTablaUsuarios();
                }
            });
        });
    };
    
    renderizarTablaUsuarios();
}