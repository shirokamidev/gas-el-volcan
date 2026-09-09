// Categorías disponibles para organizar el catálogo
const categoriasData = [
    { id: 1, valor: "cilindros", nombre: "Cilindros de Gas" },
    { id: 2, valor: "reguladores", nombre: "Reguladores" },
    { id: 3, valor: "mangueras", nombre: "Mangueras y Conexiones" },
    { id: 4, valor: "accesorios", nombre: "Accesorios" }
];

// Etiquetas utilizadas por los filtros y la ficha de cada producto
const nombresCategorias = {};
categoriasData.forEach(categoria => {
    nombresCategorias[categoria.valor] = categoria.nombre;
});
