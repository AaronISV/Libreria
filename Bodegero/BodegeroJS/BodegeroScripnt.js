console.log("conectando js");
//DOM se carga cuando el html a sido cargado por completo
document.addEventListener('DOMContentLoaded', () => {
    //obtener el form por su id
    const form = document.getElementById('formulario');

    //evento del form para enviar datos
    form.addEventListener('submit', (e) => {
        //anular recarga de pag
        e.preventDefault();

        //obtener valores del form
        const origenBodega = document.getElementById('OrigenBodega').value;
        const destinoBodega = document.getElementById('destinoBodega').value;
        const user = document.getElementById('user').value;
        const producto = document.getElementById('producto').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);

        //obtener lista de bodegas y productos desde localStorage
        let bodegas = JSON.parse(localStorage.getItem('warehouses')) || [];
        let productos = JSON.parse(localStorage.getItem('products')) || [];

        //verificar si las bodegas existen
        const bodegaOrigenExiste = bodegas.some(bodega => bodega.name === origenBodega);
        const bodegaDestinoExiste = bodegas.some(bodega => bodega.name === destinoBodega);

        if (!bodegaOrigenExiste) {
            alert('La bodega de origen no existe.');
            return;
        }

        if (!bodegaDestinoExiste) {
            alert('La bodega de destino no existe.');
            return;
        }

        //encontrar el producto en la bodega de origen
        let productoOrigen = productos.find(p => p.name === producto && p.bodega === origenBodega);

        if (!productoOrigen || productoOrigen.cantidad < cantidad) {
            alert('No hay suficiente cantidad del producto en la bodega de origen.');
            return;
        }

        //reducir la cantidad en la bodega de origen
        productoOrigen.cantidad -= cantidad;

        //encontrar el producto en la bodega de destino
        let productoDestino = productos.find(p => p.name === producto && p.bodega === destinoBodega);

        if (productoDestino) {
            //aumentar la cantidad en la bodega de destino
            productoDestino.cantidad += cantidad;
        } else {
            //crear el producto en la bodega de destino
            productos.push({
                id: productoOrigen.id,
                name: productoOrigen.name,
                tipoProducto: productoOrigen.tipoProducto,
                Editorial: productoOrigen.Editorial,
                Autores: productoOrigen.Autores,
                Descripcion: productoOrigen.Descripcion,
                cantidad: cantidad,
                bodega: destinoBodega
            });
        }

        //guardar la lista actualizada de productos en localStorage
        localStorage.setItem('products', JSON.stringify(productos));

        alert(`Producto movido exitosamente! El ID del movimiento es: ${productoOrigen.id}`);
        form.reset();
    });

    //trae los productos del localstrage
    function obtenerProductosDeLocalStorage() {
        const productos = localStorage.getItem('productos');
        return productos ? JSON.parse(productos) : [];
    }
});

//funcion botn volver
const button_volver = document.getElementById('buttonVolver');
if (button_volver) {
    button_volver.addEventListener('click', function(e){
        e.preventDefault();
        console.log('click volver');
        window.location.href = "../bodegero.html";
    });
}
