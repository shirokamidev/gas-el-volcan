// Base de datos simulada de productos
const productosBD = [
  {
    id: 1,
    codigo: "CL001",
    nombre: "Cilindro GLP 5 kg",
    categoria: "cilindros",
    descripcion: "Para uso residencial (cocina, calefacción pequeña).",
    precioResidencial: 6500,
    precioComercial: 6000,
    stock: 80,
    imagen: "assets/img/productos/cilindros/cilindro-5kg.svg"
  },
  {
    id: 2,
    codigo: "CL002",
    nombre: "Cilindro GLP 11 kg",
    categoria: "cilindros",
    descripcion: "Cilindro estándar doméstico. El más utilizado en hogares.",
    precioResidencial: 12000,
    precioComercial: 11000,
    stock: 200,
    imagen: "assets/img/productos/cilindros/cilindro-11kg.svg"
  },
  {
    id: 3,
    codigo: "CL003",
    nombre: "Cilindro GLP 15 kg",
    categoria: "cilindros",
    descripcion: "Cilindro de mayor capacidad para hogares de alto consumo.",
    precioResidencial: 16000,
    precioComercial: 14500,
    stock: 90,
    imagen: "assets/img/productos/cilindros/cilindro-15kg.svg"
  },
  {
    id: 4,
    codigo: "CL004",
    nombre: "Cilindro GLP 45 kg",
    categoria: "cilindros",
    descripcion: "Cilindro industrial. Uso comercial: restaurantes y locales.",
    precioResidencial: 45000,
    precioComercial: 40000,
    stock: 30,
    imagen: "assets/img/productos/cilindros/cilindro-45kg.svg"
  },
  {
    id: 5,
    codigo: "RG001",
    nombre: "Regulador doméstico",
    categoria: "reguladores",
    descripcion: "Regulador de 1 etapa para cilindros 5, 11 y 15 kg.",
    precioResidencial: 8990,
    precioComercial: 8200,
    stock: 45,
    imagen: "assets/img/productos/reguladores/regulador-estandar.svg"
  },
  {
    id: 6,
    codigo: "RG002",
    nombre: "Regulador alta presión",
    categoria: "reguladores",
    descripcion: "Para cocinas industriales o equipos de mayor consumo.",
    precioResidencial: 18990,
    precioComercial: 17000,
    stock: 12,
    imagen: "assets/img/productos/reguladores/regulador-alta-presion.svg"
  },
  {
    id: 7,
    codigo: "RG003",
    nombre: "Regulador dual (2 salidas)",
    categoria: "reguladores",
    descripcion: "Permite conectar dos artefactos simultáneamente.",
    precioResidencial: 14990,
    precioComercial: 13500,
    stock: 18,
    imagen: "assets/img/productos/reguladores/regulador-dual.svg"
  },
  {
    id: 8,
    codigo: "MG001",
    nombre: "Manguera gas 1.5 m",
    categoria: "mangueras",
    descripcion: "Manguera flexible homologada. Diámetro interior 9mm.",
    precioResidencial: 3990,
    precioComercial: 3500,
    stock: 150,
    imagen: "assets/img/productos/mangueras/manguera-1-5m.svg"
  },
  {
    id: 9,
    codigo: "MG002",
    nombre: "Manguera gas 3 m",
    categoria: "mangueras",
    descripcion: "Manguera larga para artefactos alejados del cilindro.",
    precioResidencial: 6990,
    precioComercial: 6200,
    stock: 60,
    imagen: "assets/img/productos/mangueras/manguera-3m.svg"
  },
  {
    id: 10,
    codigo: "AC001",
    nombre: "Abrazadera metálica",
    categoria: "mangueras",
    descripcion: "De acero para asegurar la conexión manguera-regulador.",
    precioResidencial: 990,
    precioComercial: 800,
    stock: 500,
    imagen: "assets/img/productos/mangueras/abrazadera.svg"
  },
  {
    id: 11,
    codigo: "KT001",
    nombre: "Kit conexión completo",
    categoria: "mangueras",
    descripcion: "Regulador, manguera 1.5m y abrazaderas necesarias.",
    precioResidencial: 12990,
    precioComercial: 11500,
    stock: 85,
    imagen: "assets/img/productos/mangueras/kit-conexion.svg"
  },
  {
    id: 12,
    codigo: "AC002",
    nombre: "Carro porta cilindro",
    categoria: "accesorios",
    descripcion: "Carro metálico para transportar cilindros 11/15 kg.",
    precioResidencial: 12990,
    precioComercial: 11000,
    stock: 25,
    imagen: "assets/img/productos/accesorios/carro-cilindro.svg"
  },
  {
    id: 13,
    codigo: "AC003",
    nombre: "Tapa protectora",
    categoria: "accesorios",
    descripcion: "Plástico ABS para proteger la válvula en el transporte.",
    precioResidencial: 1490,
    precioComercial: 1200,
    stock: 300,
    imagen: "assets/img/productos/accesorios/tapa-valvula.svg"
  },
  {
    id: 14,
    codigo: "AC004",
    nombre: "Detector de gas a batería",
    categoria: "accesorios",
    descripcion: "Sensor electroquímico. Alarma sonora ante fugas de gas.",
    precioResidencial: 19990,
    precioComercial: 17000,
    stock: 15,
    imagen: "assets/img/productos/accesorios/detector-gas.svg"
  }
];

// Lógica de renderizado y filtros del catálogo
const grillaProductos = document.getElementById("grilla-productos-js");

if (grillaProductos) {
  const textoResultados = document.getElementById("texto-resultados-js");
  const buscadorInput = document.getElementById("buscador-productos");
  const btnBuscar = document.getElementById("btn-buscar-productos");
  const btnMostrarMovil = document.getElementById("btn-mostrar-movil");
  const radiosCategorias = document.querySelectorAll('input[name="filtro-categoria"]');

  // Construir las tarjetas de producto en el DOM
  function mostrarProductos(listaDeProductos) {
    grillaProductos.innerHTML = "";

    // Mensaje en caso de que la búsqueda no arroje resultados
    if (listaDeProductos.length === 0) {
      grillaProductos.innerHTML = "<p style='grid-column: 1/-1; text-align: center; padding: 2rem;'>No se encontraron productos que coincidan con tu búsqueda.</p>";
      textoResultados.textContent = "Mostrando 0 resultados";
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
                <button type="button" class="btn-restar" onclick="this.nextElementSibling.stepDown()">-</button>
                <input type="number" value="1" min="1" max="${producto.stock}" class="input-cantidad" id="cant-${producto.id}" readonly />
                <button type="button" class="btn-sumar" onclick="this.previousElementSibling.stepUp()">+</button>
            </div>
            <button type="button" class="boton boton-naranja boton-bloque btn-agregar-carrito" data-id="${producto.id}">AGREGAR AL CARRITO</button>
        </div>
      `;

      grillaProductos.appendChild(tarjeta);
    });

    textoResultados.textContent = `Mostrando ${listaDeProductos.length} resultado(s)`;
  }

  // Filtrar el arreglo según búsqueda y categoría seleccionada
  function aplicarFiltros() {
    let categoriaSeleccionada = "todos";
    
    radiosCategorias.forEach(radio => {
      if (radio.checked) {
        categoriaSeleccionada = radio.id.replace("cat-", "");
      }
    });

    const terminoBusqueda = buscadorInput.value.toLowerCase().trim();

    const productosFiltrados = productosBD.filter(producto => {
      const coincideCategoria = categoriaSeleccionada === "todos" || producto.categoria === categoriaSeleccionada;
      const coincideBusqueda = producto.nombre.toLowerCase().includes(terminoBusqueda);
      
      return coincideCategoria && coincideBusqueda;
    });

    mostrarProductos(productosFiltrados);
  }

  // Escuchar cambios en las categorías
  radiosCategorias.forEach(radio => {
    radio.addEventListener("change", () => {
      // Si la pantalla es ancha (PC), filtra de inmediato
      if (window.innerWidth > 768) {
        aplicarFiltros();
      }
    });
  });

  // Botón para confirmar filtros en la vista móvil
  if (btnMostrarMovil) {
    btnMostrarMovil.addEventListener("click", aplicarFiltros);
  }

  // Escuchar cambios en el buscador por texto
  btnBuscar.addEventListener("click", aplicarFiltros);
  buscadorInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") aplicarFiltros();
  });

  // Render inicial al cargar la página
  mostrarProductos(productosBD);
}