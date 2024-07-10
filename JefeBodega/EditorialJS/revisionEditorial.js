console.log('conectando Script')
function cargarEditoriales() {
    const arrayEditorial = JSON.parse(localStorage.getItem('editoriales')) || [];
    const bodyTable = document.querySelector('#tableEditoriales tbody');
    
    arrayEditorial.forEach(function(element, indice) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${indice + 1}</td>
            <td>${element.name}</td>
            <td>${element.address}</td>
            <td>${element.phone}</td>
            <td>
                <a class="btn btn-danger" onclick='eliminarEditorial(${indice})'><i class="bi bi-trash3"></i></a>
                <a class="btn btn-primary" href='editarEditorial.html?name=${element.name}'><i class="bi bi-pencil"></i></a>
            </td>
        `;
        bodyTable.appendChild(row);
    });
}

window.addEventListener('load', cargarEditoriales);
const btnVolver = document.getElementById('btnVolver');
btnVolver.addEventListener('click', function(e){
    e.preventDefault()
    window.location = "registroDeEditoriales.html"
})