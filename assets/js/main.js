// Base de datos global de productos
window.productosBD = [
  { id: 1, codigo: "CL001", nombre: "Cilindro GLP 5 kg", categoria: "cilindros", descripcion: "Cilindro de gas licuado de petróleo 5 kg. Para uso residencial (cocina, calefacción pequeña).", precioResidencial: 6500, precioComercial: 6000, stock: 80, imagen: "assets/img/productos/cilindros/cilindro-5kg.svg" },
  { id: 2, codigo: "CL002", nombre: "Cilindro GLP 11 kg", categoria: "cilindros", descripcion: "Cilindro estándar doméstico. El más utilizado en hogares chilenos. Compatible con reguladores estándar.", precioResidencial: 12000, precioComercial: 11000, stock: 200, imagen: "assets/img/productos/cilindros/cilindro-11kg.svg" },
  { id: 3, codigo: "CL003", nombre: "Cilindro GLP 15 kg", categoria: "cilindros", descripcion: "Cilindro de mayor capacidad para hogares de alto consumo o locales pequeños.", precioResidencial: 16000, precioComercial: 14500, stock: 90, imagen: "assets/img/productos/cilindros/cilindro-15kg.svg" },
  { id: 4, codigo: "CL004", nombre: "Cilindro GLP 45 kg", categoria: "cilindros", descripcion: "Cilindro industrial. Uso comercial: restaurantes, talleres, calefacción de locales.", precioResidencial: 45000, precioComercial: 40000, stock: 30, imagen: "assets/img/productos/cilindros/cilindro-45kg.svg" },
  { id: 5, codigo: "RG001", nombre: "Regulador doméstico estándar", categoria: "reguladores", descripcion: "Regulador de 1 etapa para cilindros 5, 11 y 15 kg. Presión de salida 28 mbar.", precioResidencial: 8990, precioComercial: 8200, stock: 45, imagen: "assets/img/productos/reguladores/regulador-estandar.svg" },
  { id: 6, codigo: "RG002", nombre: "Regulador de alta presión", categoria: "reguladores", descripcion: "Regulador para cocinas industriales o equipos de mayor consumo. Presión regulable.", precioResidencial: 18990, precioComercial: 17000, stock: 12, imagen: "assets/img/productos/reguladores/regulador-alta-presion.svg" },
  { id: 7, codigo: "RG003", nombre: "Regulador dual (2 salidas)", categoria: "reguladores", descripcion: "Permite conectar dos artefactos simultáneamente al mismo cilindro.", precioResidencial: 14990, precioComercial: 13500, stock: 18, imagen: "assets/img/productos/reguladores/regulador-dual.svg" },
  { id: 8, codigo: "MG001", nombre: "Manguera gas 1.5 m", categoria: "mangueras", descripcion: "Manguera flexible homologada. Diámetro interior 9mm. Compatible con reguladores estándar.", precioResidencial: 3990, precioComercial: 3500, stock: 80, imagen: "assets/img/productos/mangueras/manguera-1-5m.svg" },
  { id: 9, codigo: "MG002", nombre: "Manguera gas 3 m", categoria: "mangueras", descripcion: "Manguera larga para instalaciones donde el artefacto está alejado del cilindro.", precioResidencial: 6990, precioComercial: 6200, stock: 50, imagen: "assets/img/productos/mangueras/manguera-3m.svg" },
  { id: 10, codigo: "MG003", nombre: "Abrazadera metálica", categoria: "mangueras", descripcion: "Abrazadera de acero para asegurar la conexión manguera-regulador y manguera-artefacto.", precioResidencial: 990, precioComercial: 800, stock: 200, imagen: "assets/img/productos/mangueras/abrazadera.svg" },
  { id: 11, codigo: "MG004", nombre: "Kit conexión completo (regulador + manguera 1.5m + abrazaderas)", categoria: "mangueras", descripcion: "Todo lo necesario para instalar un cilindro nuevo.", precioResidencial: 12990, precioComercial: 11500, stock: 25, imagen: "assets/img/productos/mangueras/kit-conexion.svg" },
  { id: 12, codigo: "AC001", nombre: "Carro porta cilindro 11/15 kg", categoria: "accesorios", descripcion: "Carro metálico con ruedas para transportar cilindros dentro del hogar con seguridad.", precioResidencial: 12990, precioComercial: 11000, stock: 20, imagen: "assets/img/productos/accesorios/carro-cilindro.svg" },
  { id: 13, codigo: "AC002", nombre: "Tapa protectora para válvula", categoria: "accesorios", descripcion: "Tapa de plástico ABS para proteger la válvula del cilindro durante el transporte.", precioResidencial: 1490, precioComercial: 1200, stock: 60, imagen: "assets/img/productos/accesorios/tapa-valvula.svg" },
  { id: 14, codigo: "AC003", nombre: "Detector de gas a batería", categoria: "accesorios", descripcion: "Sensor electroquímico. Alarma sonora y visual ante fuga de gas GLP o metano.", precioResidencial: 19990, precioComercial: 17000, stock: 8, imagen: "assets/img/productos/accesorios/detector-gas.svg" }
];

// Arreglo del carrito
window.carritoVirtual = [];

// Prevenir errores si hay datos antiguos guardados en el navegador
try {
  const carritoGuardado = localStorage.getItem("carritoVolcan");
  if (carritoGuardado) {
    const dataParseada = JSON.parse(carritoGuardado);
    if (Array.isArray(dataParseada)) {
      if (dataParseada.length > 0 && dataParseada[0].precioResidencial) {
        window.carritoVirtual = dataParseada;
      } else if (dataParseada.length > 0) {
        localStorage.setItem("carritoVolcan", "[]");
      }
    }
  }
} catch (error) {
  localStorage.setItem("carritoVolcan", "[]");
}

window.actualizarContadorMenu = function() {
  const btnCarritoIcono = document.querySelector(".icono-carrito");
  if (btnCarritoIcono) {
    const totalItems = window.carritoVirtual.reduce((acc, item) => acc + item.cantidad, 0);
    btnCarritoIcono.textContent = `CARRITO (${totalItems})`;
  }
};

window.sincronizarLocalStorage = function() {
  localStorage.setItem("carritoVolcan", JSON.stringify(window.carritoVirtual));
  window.actualizarContadorMenu();
};

window.agregarAlCarrito = function(idProducto, cantidadAgregada) {
  const productoBuscado = window.productosBD.find(p => p.id === idProducto);
  if (!productoBuscado) return;

  const itemExistente = window.carritoVirtual.find(item => item.id === idProducto);

  if (itemExistente) {
    itemExistente.cantidad += cantidadAgregada;
    if (itemExistente.cantidad > productoBuscado.stock) {
      itemExistente.cantidad = productoBuscado.stock;
    }
  } else {
    window.carritoVirtual.push({
      ...productoBuscado,
      cantidad: cantidadAgregada
    });
  }

  window.sincronizarLocalStorage();
  alert(`${productoBuscado.nombre} agregado al carrito exitosamente.`);
  
  if (typeof window.renderizarCarrito === "function") {
     window.renderizarCarrito();
  }
};

// Cargar el contador en todas las vistas al iniciar
window.actualizarContadorMenu();