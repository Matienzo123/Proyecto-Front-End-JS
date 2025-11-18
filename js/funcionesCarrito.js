// Funciones relacionadas con la gestión del carrito de compras
import { guardarCarrito, obtenerCarrito, vaciarCarritoStorage } from './storage.js';
// Funciones de la interfaz de usuario
import { actualizarContador, mostrarMensaje } from './ui.js';

// Función para agregar un producto al carrito
export const agregarProducto = (producto) => {
    const carrito = obtenerCarrito()
    carrito.push(producto)

    guardarCarrito(carrito)
    actualizarContador(carrito)
    mostrarMensaje('Producto agregado al carrito.')
}

// Función para eliminar un producto del carrito por su índice/Id
export const eliminarProducto = (indice) => {
    const carrito = obtenerCarrito()
    carrito.splice(indice, 1)

    guardarCarrito(carrito)
    actualizarContador(carrito)
    mostrarMensaje('Producto eliminado del carrito.')
}

// Función para vaciar el carrito
export const vaciarCarrito = () => {
    vaciarCarritoStorage()
    actualizarContador([])
    mostrarMensaje('El carrito ha sido vaciado.')
}
