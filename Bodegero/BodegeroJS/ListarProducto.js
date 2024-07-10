//DOM carga cuando el html ha sido completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    //obtiene el form
    const form = document.querySelector('form');

    //agrega evento para envio de datos
    form.addEventListener('submit', (e) => {
        //evita la recarga de pag
        e.preventDefault();

        //obtiene campo de entrada de form
        const idMovimiento = document.getElementById('IdMovimiento').value;
        //busca si el producto es encontrdo segun el id
        const producto = obtenerProductoPorID(idMovimiento);

        //si el producto se encontro lo muestra en pag
        if (producto) {
            mostrarProducto(producto);
        } else {
            //sino salta la alerta
            alert('Producto no encontrado');
        }
    });

    //busca y retorna producto por su id
    function obtenerProductoPorID(id) {
        const productos = localStorage.getItem('productos');
        if (!productos) return null;

        const productosArray = JSON.parse(productos);
        return productosArray.find(producto => producto.id == id);
    }

    //muestra los detalles del producto en pag
    function mostrarProducto(producto) {
        //crea elemento div
        const productoDiv = document.createElement('div');
        //inserta los datos en div
        productoDiv.innerHTML = `
            <p>ID: ${producto.id}</p>
            <p>Origen Bodega: ${producto.origenBodega}</p>
            <p>Destino Bodega: ${producto.destinoBodega}</p>
            <p>Usuario: ${producto.user}</p>
            <p>Producto: ${producto.producto}</p>
            <p>Cantidad: ${producto.cantidad}</p>
        `;
        //anade el div al html
        document.body.appendChild(productoDiv);
    }
});

//funcion boton volver
const button_volver = document.getElementById('buttonVolver');
button_volver.addEventListener('click', function(e){
    e.preventDefault()
    console.log('click volver');
    window.location = "../bodegero.html"
})