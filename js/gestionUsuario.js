console.log('Se conecta script');

document.addEventListener('DOMContentLoaded', function() {
    const actionSelect = document.getElementById('seleccion');
    const crearForm = document.getElementById('crearUser');
    const modificarForm = document.getElementById('modificarUser');
    const eliminarForm = document.getElementById('eliminarUser');

    actionSelect.addEventListener('change', function() {
        // Ocultar todos los formularios
        crearForm.style.display = 'none';
        modificarForm.style.display = 'none';
        eliminarForm.style.display = 'none';
        //Se activara al momento que el usuario selecione la opcion, por eso el evento change se esta utilizando
        
        // Mostrar el formulario correspondiente
        const selectedAction = actionSelect.value;
        if (selectedAction === 'create') {
            crearForm.style.display = 'block';
        } else if (selectedAction === 'modify') {
            modificarForm.style.display = 'block';
        } else if (selectedAction === 'delete') {
            eliminarForm.style.display = 'block';
        }
    });
});
