console.log('Conectando Script');

document.addEventListener('DOMContentLoaded', function() {
    const tableUsers = document.getElementById('tableUsers').getElementsByTagName('tbody')[0];

    // Obtener datos de autores y bodegueros desde localStorage
    let autores = JSON.parse(localStorage.getItem('autores')) || [];
    let bodegueros = JSON.parse(localStorage.getItem('bodegueros')) || [];

    // Función para agregar filas a la tabla
    function renderTableRows(data, rol) {
        data.forEach((user, index) => {
            let row = tableUsers.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.user}</td>
                <td>${rol}</td>
            `;
        });
    }

    // Renderizar filas para autores
    renderTableRows(autores, 'Autor');

    // Renderizar filas para bodegueros
    renderTableRows(bodegueros, 'Bodeguero');
});
