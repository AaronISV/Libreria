document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ingresoForm');
    const bodegaSelect = document.getElementById('bodega');
    const productoSelect = document.getElementById('producto');

    // Cargar bodegas y productos al cargar la página
    cargarBodegas();
    cargarProductos();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const bodegaId = bodegaSelect.value;
        const productoId = productoSelect.value;
        const cantidad = parseInt(document.getElementById('cantidad').value.trim());

        if (!bodegaId || !productoId || isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor complete todos los campos correctamente.');
            return;
        }

        agregarProductoABodega(bodegaId, productoId, cantidad);
    });

    function cargarBodegas() {
        let bodegas = JSON.parse(localStorage.getItem('bodegas')) || [];
        bodegas.forEach(bodega => {
            let option = document.createElement('option');
            option.value = bodega.id;
            option.text = bodega.nombre;
            bodegaSelect.add(option);
        });
    }

    function cargarProductos() {
        let productos = JSON.parse(localStorage.getItem('products')) || [];
        productos.forEach(producto => {
            let option = document.createElement('option');
            option.value = producto.id;
            option.text = producto.tipoProducto; // Asegúrate de que esto es lo que quieres mostrar
            productoSelect.add(option);
        });
    }

    function agregarProductoABodega(bodegaId, productoId, cantidad) {
        let bodegas = JSON.parse(localStorage.getItem('bodegas')) || [];
        let productos = JSON.parse(localStorage.getItem('products')) || [];

        // Buscar la bodega
        let bodega = bodegas.find(b => b.id === bodegaId);
        if (!bodega) {
            alert('La bodega seleccionada no existe.');
            return;
        }

        // Buscar el producto en la lista general de productos
        let productoGeneral = productos.find(p => p.id === parseInt(productoId));
        if (!productoGeneral) {
            alert('El producto seleccionado no existe.');
            return;
        }

        // Verificar si la bodega ya tiene este producto
        let productoEnBodega = bodega.productos.find(p => p.id === parseInt(productoId));
        if (productoEnBodega) {
            // Aumentar la cantidad del producto en la bodega
            productoEnBodega.cantidad += cantidad;
        } else {
            // Crear el producto en la bodega con la cantidad especificada
            bodega.productos.push({
                id: productoGeneral.id,
                nombre: productoGeneral.tipoProducto, // Asegúrate de que esto es correcto
                cantidad: cantidad
            });
        }

        // Guardar los cambios en localStorage
        localStorage.setItem('bodegas', JSON.stringify(bodegas));
        alert(`Producto agregado exitosamente a la bodega ${bodega.nombre}.`);
        form.reset();
    }
});

//funcion boton volver
const button_volver = document.getElementById('buttonVolver');
button_volver.addEventListener('click', function(e){
    e.preventDefault()
    console.log('click volver');
    window.location = "../bodegero.html"});