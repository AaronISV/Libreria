console.log('Se conecta script');

document.addEventListener('DOMContentLoaded', function() {
    const mensajeVer = document.querySelector("#mensajeError");
    mensajeVer.innerHTML = "";
    const mensajeBodeguero = document.querySelector("#mensajeBodeguero")
    mensajeBodeguero.innerHTML =""
    const listaUser = document.getElementById('tipoUser');
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

    listaUser.addEventListener('change', function(){ //evento para que el jefe de bodega no cree autores, ya que hay una seccion para ello
        if (listaUser.value === 'Autores') {
            const createOption = actionSelect.querySelector('option[value="create"]');
            createOption.disabled = true;
        } else {
            const createOption = actionSelect.querySelector('option[value="create"]');
            createOption.disabled = false;
            
        }
    });

    crearForm.addEventListener('submit', function(e){
        e.preventDefault()
        const nameUser = crearForm['nameUser'].value;
        const usuario = crearForm['username'].value;
        const contra = crearForm['password'].value
        if((usuario.trim() === "") || (nameUser.trim() === "")){
            alert('Debe llenar los campos');
        }
        else if(contra.trim() === ""){
            alert('Debe llenar campo')
        }
        else{
            const mensajeValidacion = validarPassword(contra);
            if(mensajeValidacion !== ""){
                mensajeVer.innerHTML = mensajeValidacion
            }
            else{
                let storedBodeguero = JSON.parse(localStorage.getItem('bodegueros')) || [
                    {name: 'Perico los palotes', user: 'bodeguero1@gmail.com', password: 'B12345678' }
                ];
                const userExist = storedBodeguero.find(b => b.user === usuario);
                if(userExist){
                    alert('Trabajor ya esta registrado');
                }
                else{
                    storedBodeguero.push({name: nameUser, user:usuario, password:contra});
                    localStorage.setItem('bodegueros', JSON.stringify(storedBodeguero));
                    alert('Trabajador agregado exitosamente')
                    crearForm['nameUser'].value = "";
                    crearForm['username'].value = "";
                    crearForm['password'].value = "";
                }
            }
        }
        setTimeout(() => {
            mensajeVer.innerHTML = "";
            
        }, 2000);
    });
    
    modificarForm.addEventListener('submit', function(e){
        e.preventDefault()
        const lista = listaUser.value;
        const userAct = modificarForm['usuarioEx'].value;
        const newUser = modificarForm['newUser'].value;
        const newPass = modificarForm['passwordNew'].value;
        if(userAct.trim() === ""){
            alert('Debe completar el campo usuario')
        }
        else if(newUser.trim() === ""){
            alert('Debe completar el campo nuevo usuario')
        }
        else if(newPass.trim === ""){
            alert('Debe completar el campo nueva contraseña')
        }
        else{
            const mensajeValidacion = validarPassword(newPass)
            if(mensajeValidacion !== ""){
                mensajeVer.innerHTML = mensajeValidacion
            }
            else{
                if(lista === "Autores"){
                    let storedAutores = JSON.parse(localStorage.getItem('autores')) || [];
                    const index = storedAutores.findIndex(a => a.user === userAct);
                    if(index !== -1){
                        storedAutores[index].user = newUser;
                        storedAutores[index].password = newPass
                        localStorage.setItem('autores', JSON.stringify(storedAutores))
                        alert('Autor modificado exitosamente')
                        modificarForm['usuarioEx'].value = ""
                        modificarForm['newUser'].value = ""
                        modificarForm['newPass'].value = ""
                    }
                    else{
                        alert('Usuario no encontrado en la lista Autores')
                    }
                }
                else if(lista === "Bodegueros"){
                    //Llamamos a lista bodegueros del localStorage
                    let storedBodeguero = JSON.parse(localStorage.getItem('bodegueros')) || [];
                    //Definimos index, con el valor del indice del usuario bodeguero
                    const index = storedBodeguero.findIndex(b => b.user === userAct);
                    //Vemos que Index sea distinto a -1 para poder modificarlo
                    if(index !== -1){
                        //en base al indice de la lista bodeguero, el usuario se cambio por el nuevo usuario al igual que la clave
                        storedBodeguero[index].user = newUser;
                        storedBodeguero[index].password = newPass;
                        localStorage.setItem('bodegueros', JSON.stringify(storedBodeguero))
                        alert('Bodeguero modificado exitosamente')
                        modificarForm['usuarioEx'].value = ""
                        modificarForm['newUser'].value = ""
                        modificarForm['newPass'].value = ""
                    }
                    else{
                        alert('Usuario no encontrado en la lista bodegueros')
                    };

                }
                else{
                    alert('Usuario no pertenece a ninguna de las dos listas')
                }
                
                
                
            };
        };
        setTimeout(() => {
            mensajeBodeguero.innerHTML = "";
            
        }, 2000);
    });
    eliminarForm.addEventListener('submit', function(e){
        e.preventDefault();
    const lista = listaUser.value;
    const usuarioEliminar = eliminarForm['eliminarUsuario'].value;
    if (usuarioEliminar.trim() === ""){
        alert('Completar campo');
    } else {
        // Mostrar confirmación al usuario
        const confirmacion = confirm(`¿Estás seguro de eliminar al usuario '${usuarioEliminar}' de la lista de ${lista}?`);
        
        if (confirmacion) {
            let found = false;
            if (lista === "Autores"){
                let storedAutores = JSON.parse(localStorage.getItem('autores')) || [];
                const index = storedAutores.findIndex(a => a.user === usuarioEliminar);
                if (index !== -1){
                    storedAutores.splice(index, 1);
                    localStorage.setItem('autores', JSON.stringify(storedAutores));
                    alert('Autor eliminado exitosamente');
                    eliminarForm['eliminarUsuario'].value = ""
                    found = true;
                }
            } else if (lista === 'Bodegueros'){
                let storedBodeguero = JSON.parse(localStorage.getItem('bodegueros')) || [];
                const index = storedBodeguero.findIndex(b => b.user === usuarioEliminar);
                if (index !== -1){
                    storedBodeguero.splice(index, 1);
                    localStorage.setItem('bodegueros', JSON.stringify(storedBodeguero));
                    alert('Bodeguero eliminado exitosamente');
                    eliminarForm['eliminarUsuario'].value = ""
                    found = true;
                }
            }
            if (!found){
                alert('Usuario no encontrado en la lista de ' + lista);
            }
        } else {
            alert('Operación de eliminación cancelada.');
        }
    }
    });
    function validarPassword(password) {
        let mensajeError = "";

        // Al menos 8 caracteres
        if (password.length < 8) {
            mensajeError += "La contraseña debe tener al menos 8 caracteres. ";
        }
        // Al menos una letra mayúscula
        if (!/[A-Z]/.test(password)) {
            mensajeError += "La contraseña debe incluir al menos una letra mayúscula. ";
        }
        // Al menos un número
        if (!/\d/.test(password)) {
            mensajeError += "La contraseña debe incluir al menos un número. ";
        }

        return mensajeError.trim();
    }
    const btnVolver = document.getElementById('btnVolver');
    btnVolver.addEventListener('click', function(e){
        e.preventDefault();
        window.location = "../jefebodega.html";
    })
    const btnListado = document.getElementById('btnListado');
    btnListado.addEventListener('click', function(e){
        e.preventDefault();
        window.location = "listadoUsuarios.html"
    })
});

