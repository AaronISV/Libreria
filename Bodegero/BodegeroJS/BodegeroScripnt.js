document.addEventListener('DOMContentLoaded', () => {
    // obtener el form por su id
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
        const cantidad = document.getElementById('cantidad').value;

        //creacion de objeto producto
        const nuevoProducto = {
            id: generarNuevoID(),
            origenBodega: origenBodega,
            destinoBodega: destinoBodega,
            user: user,
            producto: producto,
            cantidad: cantidad
        };

        //guardar el producto en localStorage
        guardarProductoEnLocalStorage(nuevoProducto);

        //mostrar el id del movimiento
        alert(`Producto movido exitosamente! El ID del movimiento es: ${nuevoProducto.id}`);
        form.reset();
    });

    //funcion generar id incremental
    function generarNuevoID() {
        const productos = obtenerProductosDeLocalStorage();
        if (productos.length === 0) {
            return 1;
        } else {
            return productos[productos.length - 1].id + 1;
        }
    }

    //funcion para guardar productos en localStorage
    function guardarProductoEnLocalStorage(producto) {
        const productos = obtenerProductosDeLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //funcion para obtener los productos del localStorage
    function obtenerProductosDeLocalStorage() {
        const productos = localStorage.getItem('productos');
        return productos ? JSON.parse(productos) : [];
    }
});
