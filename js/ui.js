// Función para actualizar el contador del carrito en la interfaz
export const actualizarContador = (carrito) => {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = carrito.length
    }
}

// Función para mostrar un mensaje al usuario
export const mostrarMensaje = (texto) => {
    alert(texto)
}