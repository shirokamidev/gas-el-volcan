// Mantiene el selector de comunas según la región elegida
function poblarSelectComunas(selectRegion, selectComuna) {
    const comunaAnterior = selectComuna.value;
    selectComuna.replaceChildren();
    const opcion = document.createElement("option");
    opcion.value = "";
    opcion.disabled = true;
    opcion.selected = true;
    opcion.textContent = "Selecciona tu comuna...";
    selectComuna.appendChild(opcion);

    (diccionarioComunas[selectRegion.value] || []).forEach(comuna => {
        const elemento = document.createElement("option");
        elemento.value = comuna.valor;
        elemento.textContent = comuna.texto;
        selectComuna.appendChild(elemento);
    });
    if (Array.from(selectComuna.options).some(item => item.value === comunaAnterior && comunaAnterior)) {
        selectComuna.value = comunaAnterior;
    }
}
