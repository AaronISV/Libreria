console.log('se conecta script');

const trabajadores = [
    { user: 'trabajador1@libreria.cl', password: '123456' },
    { user: 'trabajador2@libreria.cl', password: '123456' },
    { user: 'trabajador3@libreria.cl', password: '123456' }
];


const jefesBodega = [
    { user: 'jefebodega@libreria.cl', password: '123' }
];



const user_error = document.querySelector('#mail-error');
user_error.innerHTML = "";
const pass_error = document.querySelector('#pass-error');
pass_error.innerHTML = "";



const form = document.querySelector('#formulario');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('haciendo click');

    const user = form['user'].value;
    const password = form['password'].value;
    console.log(user, password); //se comprueba toma de datos

    if (user.trim() === "") {
        user_error.innerHTML = "Campo Vacio";
    } else if (password.trim() === "") {
        pass_error.innerHTML = "Campo Vacio";
    } else {
        // busca en las listas de usuarios
        try{
            // Obtener lista de clientes del localStorage o inicializarla si no existe
            let storedclientes = JSON.parse(localStorage.getItem('clientes')) || [];
            let storedAutores = JSON.parse(localStorage.getItem('autores')) || [];
            let storedBodeguero = JSON.parse(localStorage.getItem('bodegueros')) || []
            const trabajador = trabajadores.find(t => t.user === user && t.password === password);
            const jefeBodega = jefesBodega.find(j => j.user === user && j.password === password);
            const bodeguero = storedBodeguero.find(b => b.user === user && b.password === password);
            const cliente = storedclientes.find(c => c.user === user && c.password === password);
            const autor = storedAutores.find(a => a.user === user && a.password === password)

            if (trabajador) {
                localStorage.setItem('usuario_tipo', 'trabajador');
                window.location = "trabajador.html";
            } else if (jefeBodega) {
                localStorage.setItem('usuario_tipo', 'jefeBodega');
                window.location = "jefebodega.html";
            } else if (bodeguero) {
                localStorage.setItem('usuario_tipo', 'bodeguero');
                window.location = "bodegero.html";
            } else if (cliente) {
                localStorage.setItem('usuario_tipo', 'cliente');
                window.location = "cliente2.html";
            }else if(autor){
                localStorage.setItem('usuario_tipo', 'autor')
                window.location = "cliente2.html"
            }
             else {
                alert('Usuario no existe');
            }
        } catch (error){
            console.error('Error al obtener o parsear los clientes desde localStorage:', error);
            alert('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo nuevamente.');
        }
    }

    setTimeout(() => {
        user_error.innerHTML = "";
        pass_error.innerHTML = "";
    }, 2000);
});

// mostrar password
document.addEventListener('DOMContentLoaded', function() {
    const icon = document.querySelector('#togglePassword');
    icon.addEventListener('click', function() {
        console.log('click icon'); //se comprueba el evento click
        if (form['password'].type === "password") {
            form['password'].type = "text";
            icon.classList.remove('bi-eye-slash'); // Remueve la clase de ojo cerrado
            icon.classList.add('bi-eye'); // Agrega la clase de ojo abierto
        } else {
            form['password'].type = "password";
            icon.classList.remove('bi-eye'); // Remueve la clase de ojo abierto
            icon.classList.add('bi-eye-slash');
        }
    });
});

