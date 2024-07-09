console.log('conectando script');
const user_error = document.querySelector('#mail-error');
user_error.innerHTML = "";
const pass_error = document.querySelector('#pass-error');
pass_error.innerHTML = "";
const pass_igual = document.querySelector('#pass-identica');
pass_igual.innerHTML = "";
const registroForm = document.querySelector('#formulario-registro')
if(registroForm){
    
    registroForm.addEventListener('submit', function(e){
        e.preventDefault();
        const user = registroForm['user'].value;
        const password = registroForm['password'].value;
        const confirmPass = registroForm['password-confirm'].value;
        if (user.trim() === "") {
            user_error.innerHTML = "Campo Vacio";
        } else if (password.trim() === "") {
            pass_error.innerHTML = "Campo Vacio";
        } else if (password !== confirmPass) {
            pass_igual.innerHTML = "Las contraseñas no coinciden";
        } else {
            // Verificar si esta dentro de la lista
            const mensajeValidacion = validarPassword(password);
            if (mensajeValidacion !== "") {
                pass_error.innerHTML = mensajeValidacion;
            }
            else{
                let storedclientes = JSON.parse(localStorage.getItem('clientes')) || [
                    { user: 'alguien1@gmail.com', password: '123456' },
                    { user: 'alguien2@gmail.com', password: '123456' }
                ];
                // Verificar si el usuario ya existe
                const userExistentes = storedclientes.some(u => u.user === user);  
                if(userExistentes){
                    alert('Usuario ya existe')
                }
                else{
                    storedclientes.push({user:user, password:password});
                    localStorage.setItem('clientes', JSON.stringify(storedclientes));
                    alert('Usuario registrado con exito');
                    window.location.href = "login.html"
                }
            }
        }
        setTimeout(() => {
            user_error.innerHTML = "";
            pass_error.innerHTML = "";
            pass_igual.innerHTML = "";
        }, 2000);
    })
}
// Función para validar la fortaleza de la contraseña
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

// Mostrar contraseñas al hacer clic en los íconos correspondientes
const togglePassword1 = document.querySelector('#togglePassword1');
const togglePassword2 = document.querySelector('#togglePassword2');

// Agregar eventos de clic a los íconos para mostrar/ocultar contraseña
if (togglePassword1) {
    togglePassword1.addEventListener('click', function() {
        togglePasswordVisibility(registroForm['password'], togglePassword1);
    });
}

if (togglePassword2) {
    togglePassword2.addEventListener('click', function() {
        togglePasswordVisibility(registroForm['password-confirm'], togglePassword2);
    });
}


// Función para alternar la visibilidad de la contraseña y cambiar el ícono correspondiente
function togglePasswordVisibility(passwordField, toggleIcon) {
    if (passwordField.type === "password") {
    // Si es contraseña oculta, cambiar a texto visible
    passwordField.type = "text";
    toggleIcon.classList.remove('bi-eye-slash');
    toggleIcon.classList.add('bi-eye');
    } else {
    // Si es texto visible, cambiar a contraseña oculta
    passwordField.type = "password";
    toggleIcon.classList.remove('bi-eye');
    toggleIcon.classList.add('bi-eye-slash');
    }
}


