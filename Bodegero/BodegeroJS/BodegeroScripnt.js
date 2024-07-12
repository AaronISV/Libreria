console.log("conectando js");

// DOM se carga cuando el HTML ha sido cargado por completo
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el formulario por su ID
    const form = document.getElementById('formulario');

    // Evento del formulario para enviar datos
    form.addEventListener('submit', (e) => {
        // Anular recarga de página
        e.preventDefault();

        // Obtener valores del formulario
        const origenBodegaNombre = document.getElementById('OrigenBodega').value.trim();
        const destinoBodegaNombre = document.getElementById('destinoBodega').value.trim();
        const user = document.getElementById('user').value.trim();
        const productoNombre = document.getElementById('producto').value.trim();
        const cantidad = parseInt(document.getElementById('cantidad').value.trim());

        // Obtener lista de bodegas desde localStorage
        let bodegas = JSON.parse(localStorage.getItem('bodegas')) || [];

        // Verificar si las bodegas existen
        const bodegaOrigen = bodegas.find(b => b.nombre === origenBodegaNombre);
        const bodegaDestino = bodegas.find(b => b.nombre === destinoBodegaNombre);

        if (!bodegaOrigen) {
            alert('La bodega de origen no existe.');
            return;
        }

        if (!bodegaDestino) {
            alert('La bodega de destino no existe.');
            return;
        }

        // Encontrar el producto en la bodega de origen
        let productoOrigen = bodegaOrigen.productos.find(p => p.nombre === productoNombre);

        if (!productoOrigen || productoOrigen.cantidad < cantidad) {
            alert('No hay suficiente cantidad del producto en la bodega de origen.');
            return;
        }

        // Reducir la cantidad en la bodega de origen
        productoOrigen.cantidad -= cantidad;

        // Encontrar o crear el producto en la bodega de destino
        let productoDestino = bodegaDestino.productos.find(p => p.nombre === productoNombre);

        if (productoDestino) {
            // Aumentar la cantidad en la bodega de destino
            productoDestino.cantidad += cantidad;
        } else {
            // Crear el producto en la bodega de destino con la cantidad especificada
            bodegaDestino.productos.push({
                id: productoOrigen.id,
                nombre: productoOrigen.nombre,
                cantidad: cantidad
            });
        }

        // Guardar la lista actualizada de bodegas en localStorage
        localStorage.setItem('bodegas', JSON.stringify(bodegas));

        // Registrar el movimiento
        registrarMovimiento({
            id: Date.now(), // Usar timestamp como ID único
            origen: origenBodegaNombre,
            destino: destinoBodegaNombre,
            producto: productoNombre,
            cantidad: cantidad,
            usuario: user,
            fecha: new Date().toLocaleString()
        });

        alert(`Producto movido exitosamente!`);
        form.reset();
    });

    // Función para registrar el movimiento en localStorage
    function registrarMovimiento(movimiento) {
        let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
        movimientos.push(movimiento);
        localStorage.setItem('movimientos', JSON.stringify(movimientos));
    }

    // Función botón volver
    const button_volver = document.getElementById('buttonVolver');
    if (button_volver) {
        button_volver.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('click volver');
            window.location.href = "../bodegero.html";
        });
    }
});
