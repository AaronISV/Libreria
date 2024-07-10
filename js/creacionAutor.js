console.log('conectando script');

const formulario = document.querySelector('#formAut');
const name_error = document.querySelector('#name_error');
name_error.innerHTML = "";
const correo_error = document.querySelector('#mailAut_error');
correo_error.innerHTML = "";
const clave_error = document.querySelector('#passAut_error');
clave_error.innerHTML = "";

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    const nameAut = formulario['authorName'].value;
    const correoAut = formulario['correoAuthor'].value;
    const passAut = formulario['passAuthor'].value;
    console.log(nameAut,correoAut,passAut);
    if(nameAut.trim() === ""){
        name_error.innerHTML = "Completar Campo"
    }
    else if(correoAut.trim() === ""){
        correo_error.innerHTML = "Completar Campo"
    }
    else if(passAut.trim() === ""){
        clave_error.innerHTML = "Completar Campo"
    }
    else{
        let storedAutores = JSON.parse(localStorage.getItem('autores')) || [
            {user:'pericolospalotes@gmail.com', password: '123456'}
        ];
        const autoresExistentes = storedAutores.find(a => a.user === correoAut);
        if(autoresExistentes){
            alert('Autor ya existe')
        }
        else{
            storedAutores.push({user:correoAut, password:passAut })
            localStorage.setItem('autores', JSON.stringify(storedAutores))
            alert('Autor guardado con exito')
            formulario['authorName'].value = "";
            formulario['correoAuthor'].value = "";
            formulario['passAuthor'].value = "";
            
        }
    }
    setTimeout(() => {
        name_error.innerHTML = "";
        correo_error.innerHTML = "";
        clave_error.innerHTML = "";
    }, 2000);
})

const button_volver = document.getElementById('buttonVolver');
button_volver.addEventListener('click', function(e){
    e.preventDefault()
    console.log('click volver');
    window.location = "../jefebodega.html"
})