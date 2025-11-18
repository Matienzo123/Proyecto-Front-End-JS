const KEY = "carrito";

// Función para guardar el carrito en el localStorage
export const guardarCarrito = (carrito) => {
    localStorage.setItem(KEY, JSON.stringify(carrito))
}

// Función para obtener el carrito desde el localStorage
export const obtenerCarrito = () => {
    return JSON.parse(localStorage.getItem(KEY)) || []
}

// Función para vaciar el carrito en el localStorage
export const vaciarCarritoStorage = () => {
    localStorage.removeItem(KEY)
}