const arrayEditorial = JSON.parse(localStorage.getItem('editoriales')) || [];

// Función para cargar los datos de la editorial a editar
let originalName
function cargar_datos() {
    console.log('Conectando script de edición');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    originalName = urlParams.get('name');

    // Busca la editorial por el nombre recibido en la URL
    const editorial = arrayEditorial.find(e => e.name === originalName);

    if (editorial) {
        document.getElementById('name').value = editorial.name; // Establece el nombre de la editorial en el campo correspondiente
        document.getElementById('address').placeholder = editorial.address; // Muestra la dirección actual como placeholder
        document.getElementById('phone').placeholder = editorial.phone; // Muestra el teléfono actual como placeholder
    } else {
        alert('No se encontró la editorial');
    }
}

window.addEventListener('load', cargar_datos);

// Event listener para el envío del formulario de edición
const formEdit = document.querySelector('#formEdit');
formEdit.addEventListener('submit', function(e){
    e.preventDefault();

    const newName = document.getElementById('nameBusqueda').value; // Nuevo nombre de la editorial (no editable)
    const newAddress = document.getElementById('address').value; // Nueva dirección ingresada
    const newPhone = document.getElementById('phone').value; // Nuevo teléfono ingresado
    if(newName.trim() === ""){
        alert('Debe completar el formulario')
    }
    else if(newAddress.trim() === ""){
        alert('Debe completar el formulario')
    }
    else if(newPhone.trim() === ""){
        alert('Debe completar el formulario')
    }
    else{
        // Busca la editorial por el nombre original en el array
        const index = arrayEditorial.findIndex(e => e.name === originalName);

        if (index !== -1) {
            // Actualiza los datos de la editorial encontrada
            arrayEditorial[index].name = newName
            arrayEditorial[index].address = newAddress;
            arrayEditorial[index].phone = newPhone;

            // Guarda el array actualizado en localStorage
            localStorage.setItem('editoriales', JSON.stringify(arrayEditorial));

            alert('Editorial modificada exitosamente');
            window.location.href = 'revisionEditoriales.html';
        } else {
            alert('No se encontró la editorial');
        }
    }
});
