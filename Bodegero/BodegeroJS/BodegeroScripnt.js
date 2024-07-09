console.log("conectando js");

const productos = [];

const origenBodega = document.querySelector('#origenBodega');
const destinoBodega = document.querySelector('#destinoBodega');
const user = document.querySelector('#user');


const form = document.querySelector('#formulario');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("haciendo click");

    const origenBodega = form['origenBodega'].value;
    const destinoBodega = form['destinoBodega'].velue;
    const user = form['user'].value;

})