console.log('Conectando script');
document.addEventListener('DOMContentLoaded',function(){
    const formEditorial = document.querySelector('#formularioEditorial');
    formEditorial.addEventListener('submit', function(e){
        e.preventDefault();
        const nomEditorial = formEditorial['nombreEditorial'].value;
        const direcEditorial = formEditorial['direccionEditorial'].value;
        const phoneEditorial = formEditorial['telefonoEditorial'].value;
        if(nomEditorial.trim() === ""){
            alert('Completar campo')
        }
        else if(direcEditorial.trim() === ""){
            alert('Completar campo')
        }
        else if(phoneEditorial.trim() === "" ){
            alert('Completar campo')
        }
        else{
            let storedEditorial = JSON.parse(localStorage.getItem('editoriales')) || [];
            const editorialExist = storedEditorial.find(e => e.name === nomEditorial);
            if(editorialExist){
                alert('editorial ya esta registrada')
            }
            else{
                storedEditorial.push({name:nomEditorial, address:direcEditorial, phone:phoneEditorial});
                localStorage.setItem('editoriales', JSON.stringify(storedEditorial));
                alert('Se creo nueva editorial')
                formEditorial['nombreEditorial'].value = "";
                formEditorial['direccionEditorial'].value = "";
                formEditorial['telefonoEditorial'].value = "";
            }
        }
    })
    const btnGestion = document.querySelector('#gestionEditorial');
    btnGestion.addEventListener('click', function(e){
        e.preventDefault();
        window.location = "revisionEditoriales.html";

    });
    const btnVolver = document.getElementById('volver');
    btnVolver.addEventListener('click', function(e){
        e.preventDefault();
        window.location = "../jefebodega.html";
    })
})
