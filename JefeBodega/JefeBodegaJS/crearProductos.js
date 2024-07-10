console.log("conectando js");

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // previene envio de form

        //trae valores de form
        const tipoProducto = document.getElementById('tipoProducto').value;
        const Editorial = document.getElementById('Editorial').value;
        const Autores = document.getElementById('Autores').value;
        const Descripcion = document.getElementById('Descripcion').value;

        //obtiene lista de localStorage
        let products = JSON.parse(localStorage.getItem('products')) || [];

        //creacion de objeto Producto
        const nuevoProducto = {
            id: generarNuevoID(products),
            tipoProducto,
            Editorial,
            Autores,
            Descripcion
        };

        //agregar producto a lista
        products.push(nuevoProducto);

        //guardar la lista en localstorage
        localStorage.setItem('products', JSON.stringify(products));

        alert('Producto creado exitosamente.');
        form.reset(); //limpiar form
    });

    //función para generar ID incremental
    function generarNuevoID(products) {
        if (products.length === 0) {
            return 1;
        } else {
            return products[products.length - 1].id + 1;
        }
    }
});

const button_volver = document.getElementById('buttonVolver');
if (button_volver) {
    button_volver.addEventListener('click', function(e){
        e.preventDefault();
        console.log('click volver');
        window.location.href = "../jefebodega.html";
    });
}
