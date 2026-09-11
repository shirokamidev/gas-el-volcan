// Lógica de renderizado dinámico para las métricas del dashboard principal
document.addEventListener("DOMContentLoaded", () => {
    const contadorProductos = document.getElementById("stat-total-productos");
    const contadorUsuarios = document.getElementById("stat-total-usuarios");

    // Consulta la longitud del arreglo de productos persistido en memoria
    if (contadorProductos && typeof window.obtenerProductos === "function") {
        const totalProductos = window.obtenerProductos().length;
        contadorProductos.textContent = totalProductos;
    }

    // Consulta la longitud del arreglo de identidades de usuario
    if (contadorUsuarios && typeof window.obtenerUsuarios === "function") {
        const totalUsuarios = window.obtenerUsuarios().length;
        contadorUsuarios.textContent = totalUsuarios;
    }
});