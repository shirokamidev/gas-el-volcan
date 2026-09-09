// Lógica Global del Carrito de Compras (LocalStorage)
const btnCarritoIcono = document.querySelector(".icono-carrito");
let carritoVirtual = JSON.parse(localStorage.getItem("carritoVolcan")) || [];

// Actualizar el contador del menú superior en todas las vistas
function actualizarContadorMenu() {
  if (btnCarritoIcono) {
    const totalItems = carritoVirtual.reduce((acumulador, item) => acumulador + item.cantidad, 0);
    btnCarritoIcono.textContent = `CARRITO (${totalItems})`;
  }
}

// Guardar los cambios en el navegador
function sincronizarLocalStorage() {
  localStorage.setItem("carritoVolcan", JSON.stringify(carritoVirtual));
  actualizarContadorMenu();
}

// Agregar producto al carrito desde cualquier vista
function agregarAlCarrito(idProducto, cantidadAgregada = 1) {
  // Buscamos el producto en la BD simulada (debe estar cargada en la vista)
  if (typeof productosBD === 'undefined') return;
  
  const productoBuscado = productosBD.find((p) => p.id === idProducto);
  if (!productoBuscado) return;

  const itemExistente = carritoVirtual.find((item) => item.id === idProducto);

  if (itemExistente) {
    itemExistente.cantidad += cantidadAgregada;
    if(itemExistente.cantidad > productoBuscado.stock) itemExistente.cantidad = productoBuscado.stock;
  } else {
    carritoVirtual.push({
      ...productoBuscado,
      cantidad: cantidadAgregada
    });
  }

  sincronizarLocalStorage();
  alert(`${productoBuscado.nombre} agregado al carrito exitosamente.`);
}

// Inicializar estado global
actualizarContadorMenu();