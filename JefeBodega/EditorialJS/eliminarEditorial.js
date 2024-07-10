function eliminarEditorial(index){
    let arrayEditorial = JSON.parse(localStorage.getItem('editoriales')) || [];
    //Se utiliza Swal.fire() para mostrar un cuadro de diálogo de confirmación,con un mensaje de advertencia y botones para confirmar o cancelar
    Swal.fire({
        title: "Seguro que deseas eliminar?",
        text: "No podras revertir lo eliminado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
    }).then((result) => {
        //then() espera la respuesta del usuario (result). Si el usuario confirma (result.isConfirmed es true)
        //se ejecuta la lógica para eliminar el elemento del array y actualizar el localStorage
        if(result.isConfirmed){
            arrayEditorial.splice(index,1);
            localStorage.setItem('editoriales', JSON.stringify(arrayEditorial));
            window.location = "revisionEditoriales.html";
            Swal.fire({
                title: "Eliminada",
                text: "Tu editorial ha sido eliminada exitosamente",
                icon: "success"
            })
        }

    })

}