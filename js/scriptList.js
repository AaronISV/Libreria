console.log('Conectando list.js');

function cargarTabla(){
    const arrayLibros = JSON.parse(localStorage.getItem('listado')) || [];

    const bodyTabla = document.querySelector('#tableLibreria tbody');

    arrayLibros.forEach(function(element, indice) {
        const row = document.createElement('tr');

        row.innerHTML = `
                        <td>${element.titulo}</td>
                        <td>${element.autor}</td>
                        <td>${element.tipo}</td>
                        <td>${element.precio}</td>
                        <td><img src='${element.imagen}' style='width:100px; heigth:auto'></td>
                        <td>${element.editorial}</td>
                        <td>
                            <a class='btn btn-danger' onclick='eliminarLibro(${indice})'><i class="bi bi-trash"></i></a>
                            <a class='btn btn-warning' href='edit.html?title=${element.titulo}&autor=${element.autor}'><i class="bi bi-pencil-square"></i></a>
                        </td>
                        `;
        bodyTabla.appendChild(row);
    });
};

window.addEventListener('load', cargarTabla);