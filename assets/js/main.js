// Expresión regular para validar correos corporativos y de uso estándar
window.patronCorreo = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

// Función global para validar la estructura del correo electrónico en los formularios
window.validarFormatoCorreo = function(correo) {
    if (correo.trim() === "") {
        return "El correo es obligatorio.";
    }
    if (correo.length > 100) {
        return "El correo no puede superar los 100 caracteres.";
    }
    if (!window.patronCorreo.test(correo)) {
        return "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    return "";
};

// Diccionario geográfico estático para poblar los selectores de comunas
window.diccionarioComunas = {
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