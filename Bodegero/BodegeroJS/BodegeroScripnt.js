console.log("conectando js");

const productos = [];

const origenBodega = document.querySelector('#origenBodega');
const destinoBodega = document.querySelector('#destinoBodega');
const user = document.querySelector('#user');
const cantidad = document.querySelector('#cantidad')
const producto = document.querySelector('#producto')


const form = document.querySelector('#formulario');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("haciendo click");

    const origenBodega = form['origenBodega'].value;
    const destinoBodega = form['destinoBodega'].velue;
    const user = form['user'].value;
    const producto = form['producto'].value
    const cantidad = form['cantidad'].value
    console.log(user, origenBodega, destinoBodega, producto, cantidad);

    if(producto.trim() === ""){
        alert("campos vacios")
    } else {
        try{
            let storeproductos = JSON.parse(localStorage.getItem('productos')) || [];
            
            const pro
        }
    }

})