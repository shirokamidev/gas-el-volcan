// Operaciones de renderizado y paginación para la lista de productos
const tbodyProductosAdmin = document.getElementById("tbody-productos-admin");

if (tbodyProductosAdmin && window.productosBD) {
    const btnPag1 = document.getElementById("btn-pag-1");
    const btnPag2 = document.getElementById("btn-pag-2");
    const btnAnt = document.getElementById("btn-pag-ant");
    const btnSig = document.getElementById("btn-pag-sig");
    
    let paginaActual = 1;
    const itemsPorPagina = 7; 

    function renderizarTablaAdmin(pagina) {
        tbodyProductosAdmin.innerHTML = "";
        
        // Define el subconjunto de datos a iterar según el índice de la página
        const inicio = (pagina - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        const productosPagina = window.productosBD.slice(inicio, fin);

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
                    <button type="button" class="btn-accion btn-editar" aria-label="Editar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button type="button" class="btn-accion btn-eliminar" aria-label="Eliminar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </td>
            `;
            tbodyProductosAdmin.appendChild(fila);
        });

        const botonesEliminar = tbodyProductosAdmin.querySelectorAll(".btn-eliminar");
        botonesEliminar.forEach(btn => {
            btn.addEventListener("click", function() {
                if (confirm("¿Eliminar este producto?")) {
                    this.closest("tr").remove();
                }
            });
        });

        // Habilita o deshabilita los controles visuales de paginación
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

    btnPag1.addEventListener("click", () => { paginaActual = 1; renderizarTablaAdmin(paginaActual); });
    btnPag2.addEventListener("click", () => { paginaActual = 2; renderizarTablaAdmin(paginaActual); });
    btnAnt.addEventListener("click", () => { if (paginaActual > 1) { paginaActual--; renderizarTablaAdmin(paginaActual); } });
    btnSig.addEventListener("click", () => { if (paginaActual < 2) { paginaActual++; renderizarTablaAdmin(paginaActual); } });

    renderizarTablaAdmin(paginaActual);
}

// Extensión para evaluar la eliminación de filas en tablas genéricas del administrador
document.addEventListener("DOMContentLoaded", () => {
    const tablasComunes = document.querySelectorAll(".caja-tabla-admin .btn-eliminar");
    tablasComunes.forEach(btn => {
        if (!btn.closest("#tbody-productos-admin")) {
            btn.addEventListener("click", function() {
                if (confirm("¿Seguro que deseas eliminar este registro?")) {
                    const fila = this.closest("tr");
                    if (fila) fila.remove();
                }
            });
        }
    });
});