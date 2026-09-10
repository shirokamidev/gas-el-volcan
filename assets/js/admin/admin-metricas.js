// Lógica de renderizado dinámico para las métricas del dashboard principal
const cargarMetricas = () => {
    const contadorProductos = document.getElementById("stat-total-productos");
    const contadorUsuarios = document.getElementById("stat-total-usuarios");

    // Consulta la longitud del arreglo de productos persistido en memoria
    if (contadorProductos && typeof obtenerProductos === "function") {
        const totalProductos = obtenerProductos().length;
        contadorProductos.textContent = totalProductos;
    }

    // Consulta la longitud del arreglo de identidades de usuario
    if (contadorUsuarios && typeof obtenerUsuarios === "function") {
        const totalUsuarios = obtenerUsuarios().length;
        contadorUsuarios.textContent = totalUsuarios;
    }
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cargarMetricas, { once: true });
} else {
    cargarMetricas();
}