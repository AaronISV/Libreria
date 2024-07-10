console.log('Se conecta script');

document.addEventListener('DOMContentLoaded', function() {
    const mensajeVer = document.querySelector("#mensajeError");
    mensajeVer.innerHTML = "";
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
        const usuario = crearForm['username'].value;
        const contra = crearForm['password'].value
        if((usuario.trim() === "") || (contra.trim() === "")){
            alert('Debe llenar los campos');
        }
        else{
            const mensajeValidacion = validarPassword(contra);
            if(mensajeValidacion !== ""){
                mensajeVer.innerHTML = mensajeValidacion
            }
            else{
                let storedBodeguero = JSON.parse(localStorage.getItem('bodegueros')) || [
                    {user: 'bodeguero1@gmail.com', password: 'B12345678' }
                ];
                const userExist = storedBodeguero.find(b => b.user === usuario);
                if(userExist){
                    alert('Trabajor ya esta registrado')
                }
                else{
                    storedBodeguero.push({user:usuario, password:contra});
                    localStorage.setItem('bodegueros', JSON.stringify(storedBodeguero));
                    alert('Trabajador agregado exitosamente')
                    crearForm['username'].value = "";
                    crearForm['password'].value = "";
                }
            }
        }
        setTimeout(() => {
            mensajeVer.innerHTML = "";
            
        }, 2000);
    })
    modificarForm.addEventListener('submit', function(e){
        e.preventDefault()
    })
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
});

