import { obtenerCarrito } from "./storage.js"; 
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

const  renderizarCarrito = () => {
    // Obtener el carrito desde el almacenamiento para renderizarlo
    const carrito = obtenerCarrito() || [];
    actualizarContador(carrito);

    // Acceder a los contenedores del carrito
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    // Botones de acciones del carrito
    const divAcciones = document.getElementById('acciones-carrito');

    // Limpiar contenedores antes de renderizar
    contenedorCarrito.innerHTML = '';
    divAcciones.innerHTML = '';

    // Mostrar mensaje si el carrito está vacío
    if (carrito.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.classList.add('mensaje-carrito-vacio');
        mensaje.textContent = 'No hay productos en el carrito.';
        contenedorCarrito.appendChild(mensaje);
        return; // Salir de la función si el carrito está vacío
    }

    // Renderizar productos en el carrito (si hay productos)
    carrito.forEach((producto, indice) => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-producto');

        const img = document.createElement('img');
        img.src = `../${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement('h3');
        titulo.textContent = producto.nombre;   

        const precio = document.createElement('p');
        precio.textContent = `Precio: U$S ${producto.precio}`;  

        const botonEliminar = document.createElement('button');
        botonEliminar.classList.add('btn');
        botonEliminar.classList.add('btn-eliminar-carrito');

        botonEliminar.textContent = 'Eliminar del Carrito';
        botonEliminar.type = 'button';
        botonEliminar.addEventListener('click', () => {
            eliminarProducto(indice);
            renderizarCarrito();
            mostrarMensaje('Producto eliminado del carrito');
        });

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(botonEliminar);

        contenedorCarrito.appendChild(tarjeta);
    });

    // Botón para vaciar el carrito
    const botonVaciar = document.createElement('button');
    botonVaciar.classList.add('btn');
    botonVaciar.classList.add('btn-vaciar-carrito');
    botonVaciar.textContent = 'Vaciar Carrito';
    botonVaciar.type = 'button';
    botonVaciar.addEventListener('click', () => {
        vaciarCarrito();
        renderizarCarrito();
        mostrarMensaje('Carrito vaciado');
    });

    divAcciones.appendChild(botonVaciar);

    // Renderizar resumen (total)
    const resumen = document.getElementById('resumen-carrito');
    resumen.classList.add('resumen-carrito');
    if (resumen) {
        const total = carrito.reduce((acc, p) => acc + (Number(p.precio) || 0), 0);
        const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' });
        resumen.innerHTML = `<p class="resumen-total">Total: ${formatter.format(total)}</p>`;
    }
};

document.addEventListener('DOMContentLoaded', renderizarCarrito);