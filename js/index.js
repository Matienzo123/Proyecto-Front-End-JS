// import { productos } from './productos.js';
import { agregarProducto } from './funcionesCarrito.js';
import { obtenerCarrito } from './storage.js';
import { actualizarContador } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-productos')

    const carrito = obtenerCarrito()
    actualizarContador(carrito)

    fetch('./data/productos.json')
    .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error(`Error HTTP status: ${respuesta.status}`);
        }
        return respuesta.json();
    })

    .then(data => {
        data.forEach((producto) => {
        // Crear tarjeta de producto
        const tarjeta = document.createElement('article')
        tarjeta.classList.add('tarjeta-producto');

        // Crear elementos de la tarjeta
        const img = document.createElement('img')
        img.src = producto.img
        img.alt = producto.nombre

        const titulo = document.createElement('h3')
        titulo.textContent = producto.nombre

        const precio = document.createElement('p')
        precio.textContent = `Precio: U$S ${producto.precio}`

        const boton = document.createElement('button')
        boton.classList.add('btn');
        boton.textContent = 'Agregar al Carrito';
        // Funcionalidad del botón (evento click)
        boton.addEventListener('click', () => {
            agregarProducto(producto)
        })

        // Ensamblar la tarjeta
        tarjeta.appendChild(img)
        tarjeta.appendChild(titulo)
        tarjeta.appendChild(precio)
        tarjeta.appendChild(boton)

        contenedor.appendChild(tarjeta)
        });
    })

    .catch((error) => {
        console.error('Error al cargar los productos:', error);
    });    

})