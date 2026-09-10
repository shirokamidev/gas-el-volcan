// Validacion de formulario de nuevo producto
const formNuevoProducto = document.getElementById("form-nuevo-producto");

if (formNuevoProducto) {
  const codigo = document.getElementById("codigo-producto");
  const nombre = document.getElementById("nombre-producto");
  const precioRes = document.getElementById("precio-residencial");
  const precioCom = document.getElementById("precio-comercial");
  const stock = document.getElementById("stock-actual");
  
  const errCodigo = document.getElementById("error-codigo");
  const errNombre = document.getElementById("error-nombre");
  const errPrecioRes = document.getElementById("error-precio-res");
  const errPrecioCom = document.getElementById("error-precio-com");
  const errStock = document.getElementById("error-stock");
  const mensajeGeneral = document.getElementById("mensaje-producto");

  formNuevoProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;
    
    // Validar codigo
    if (codigo.value.trim().length < 3) {
      errCodigo.textContent = "El código debe tener al menos 3 caracteres.";
      valido = false;
    } else { errCodigo.textContent = ""; }

    // Validar nombre
    if (nombre.value.trim() === "" || nombre.value.trim().length > 100) {
      errNombre.textContent = "Obligatorio. Máximo 100 caracteres.";
      valido = false;
    } else { errNombre.textContent = ""; }

    // Validar precio residencial
    if (precioRes.value === "" || Number(precioRes.value) < 0) {
      errPrecioRes.textContent = "Debe ser un número entero mayor o igual a 0.";
      valido = false;
    } else { errPrecioRes.textContent = ""; }

    // Validar precio comercial
    if (precioCom.value === "" || Number(precioCom.value) < 0) {
      errPrecioCom.textContent = "Debe ser un número entero mayor o igual a 0.";
      valido = false;
    } else { errPrecioCom.textContent = ""; }

    // Validar stock
    if (stock.value === "" || Number(stock.value) < 0) {
      errStock.textContent = "Debe ser un número entero mayor o igual a 0.";
      valido = false;
    } else { errStock.textContent = ""; }

    // Resultado final de producto
    if (valido) {
      mensajeGeneral.textContent = "Producto guardado exitosamente.";
      mensajeGeneral.style.color = "var(--volcan-azul)";
      formNuevoProducto.reset();
    } else {
      mensajeGeneral.textContent = "Revise los campos marcados antes de enviar.";
      mensajeGeneral.style.color = "#dc3545";
    }
  });
}

// Validacion de formulario de nuevo usuario
const formNuevoUsuario = document.getElementById("form-nuevo-usuario");

if (formNuevoUsuario) {
  const rut = document.getElementById("rut-usuario");
  const nombre = document.getElementById("nombre-usuario");
  const correo = document.getElementById("correo-usuario");
  const pass = document.getElementById("password-usuario");
  const direccion = document.getElementById("direccion-usuario");
  
  const errRut = document.getElementById("error-rut");
  const errNombreUsu = document.getElementById("error-nombre-usu");
  const errCorreo = document.getElementById("error-correo-usu");
  const errPass = document.getElementById("error-pass");
  const errDireccion = document.getElementById("error-direccion");
  const mensajeUsu = document.getElementById("mensaje-usuario");

  // Selects encadenados de region y comuna
  const selectRegion = document.getElementById("region-admin");
  const selectComuna = document.getElementById("comuna-admin");

  const comunasAdmin = {
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

  if (selectRegion && selectComuna) {
      selectRegion.addEventListener("change", function() {
        const region = this.value;
        selectComuna.innerHTML = '<option value="" disabled selected>Seleccione comuna</option>';
        if (comunasAdmin[region]) {
          comunasAdmin[region].forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.valor;
            opt.textContent = c.texto;
            selectComuna.appendChild(opt);
          });
        }
      });
  }

  formNuevoUsuario.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    // Validar rut
    if (rut.value.trim().length < 7 || rut.value.trim().length > 9) {
      errRut.textContent = "Sin puntos ni guion, Ej: 19011022K";
      valido = false;
    } else { errRut.textContent = ""; }

    // Validar nombre
    if (nombre.value.trim() === "" || nombre.value.trim().length > 50) {
      errNombreUsu.textContent = "Obligatorio. Máximo 50 caracteres.";
      valido = false;
    } else { errNombreUsu.textContent = ""; }

    // Validar correo
    const patronCorreo = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!patronCorreo.test(correo.value)) {
      errCorreo.textContent = "Use correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      valido = false;
    } else { errCorreo.textContent = ""; }

    // Validar password
    if (pass.value.length < 4 || pass.value.length > 10) {
      errPass.textContent = "Entre 4 a 10 caracteres.";
      valido = false;
    } else { errPass.textContent = ""; }

    // Validar direccion
    if (direccion.value.trim() === "" || direccion.value.trim().length > 300) {
      errDireccion.textContent = "Obligatorio. Máximo 300 caracteres.";
      valido = false;
    } else { errDireccion.textContent = ""; }

    // Resultado final de usuario
    if (valido) {
      mensajeUsu.textContent = "Usuario creado exitosamente.";
      mensajeUsu.style.color = "var(--volcan-azul)";
      formNuevoUsuario.reset();
      if(selectComuna) selectComuna.innerHTML = '<option value="" disabled selected>Seleccione comuna</option>';
    } else {
      mensajeUsu.textContent = "Revise los campos marcados antes de enviar.";
      mensajeUsu.style.color = "#dc3545";
    }
  });
}

// Logica visual para tabla de productos
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

// Logica global para eliminar filas en la lista de usuarios
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