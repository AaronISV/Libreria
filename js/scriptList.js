console.log('Conectando list.js');

function cargarTabla() {
    // Obtener productos desde localStorage
    const arrayProductos = JSON.parse(localStorage.getItem('products')) || [];

    // Obtener el cuerpo de la tabla
    const bodyTabla = document.querySelector('#tableLibreria tbody');

    // Limpiar el contenido previo del cuerpo de la tabla
    bodyTabla.innerHTML = '';

    // Recorrer cada producto y crear una fila en la tabla
    arrayProductos.forEach(function(element, indice) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${element.tipoProducto}</td>
            <td>${element.Editorial}</td>
            <td>${element.Autores}</td>
            <td>${element.Descripcion}</td>
        `;

        // Agregar la fila al cuerpo de la tabla
        bodyTabla.appendChild(row);
    });
}


//agregar a lista 
//          <td>
//            <a class='btn btn-danger' onclick='eliminarProducto(${indice})'><i class="bi bi-trash"></i></a>
//            <a class='btn btn-warning' href='edit.html?id=${element.id}'><i class="bi bi-pencil-square"></i></a>
//          </td>

//function eliminarProducto(indice) {
    // Obtener productos desde localStorage
//    let arrayProductos = JSON.parse(localStorage.getItem('products')) || [];

    // Eliminar el producto del array
//    arrayProductos.splice(indice, 1);

    // Guardar el array actualizado en localStorage
//    localStorage.setItem('products', JSON.stringify(arrayProductos));

    // Recargar la tabla para reflejar los cambios
//    cargarTabla();
//}

// Escuchar el evento de carga de la ventana para cargar la tabla
window.addEventListener('load', cargarTabla);
