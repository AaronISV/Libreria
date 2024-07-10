console.log("conectando js");

//estructura de bodegas con productos
//{
//    bodegaid:{id},
//    nombre:{nombreBodega},
//    direccion:{direccionBodega},
//    productos:[
//        {
//            idProducto:{idProducto},
//            nombreProducto:{nombreProducto},
//            autorProducto:{autorProducto},
//            editorialProducto:{editorialProducto}
//        }
//    ]
//}
//el DOM carga cuando el html esta completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    //mandar datos de form
    form.addEventListener('submit', (e) => {
        //evita que se recarge la pag
        e.preventDefault();

        //trae elementos del form
        const accion = document.getElementById('accion').value;
        const bodegaId = document.getElementById('bodegaid').value.trim();
        const nombreBodega = document.getElementById('nombrebodega').value.trim();
        const direccionBodega = document.getElementById('direccionbodega').value.trim();

        //si completa los camos ejecua la opcion que se selecciono
        if (accion === 'crear') {
            if (!bodegaId || !nombreBodega || !direccionBodega) {
                alert('Por favor completa todos los campos para crear la nueva bodega.');
                return;
            }
            crearBodega(bodegaId, nombreBodega, direccionBodega);

        } else if (accion === 'modificar') {
            if (!bodegaId) {
                alert('Por favor ingresa el ID de la bodega que deseas modificar.');
                return;
            }
            modificarBodega(bodegaId, nombreBodega, direccionBodega);

        } else if (accion === 'eliminar') {
            if (!bodegaId) {
                alert('Por favor ingresa el ID de la bodega que deseas eliminar.');
                return;
            }
            eliminarBodega(bodegaId);
        }
    });

    //funcion para crear bodega 
    function crearBodega(bodegaId, nombre, direccion) {
        let bodegas = obtenerBodegasDeLocalStorage();

        //verifica si la bodega ya existe
        if (bodegas.find(bodega => bodega.id === bodegaId)) {
            alert(`La bodega con ID ${bodegaId} ya existe.`);
            return;
        }

        //crea un nuevo objeto de bodega
        const nuevaBodega = {
            id: bodegaId,
            nombre: nombre,
            direccion: direccion,
            productos: []//se crea lista para agregar productos
        };

        //agrega la nueva bodega al array
        bodegas.push(nuevaBodega);

        //actualiza localStorage
        localStorage.setItem('bodegas', JSON.stringify(bodegas));

        alert(`Bodega con ID ${bodegaId} creada exitosamente.`);
    }

    //funcion para modificar bodegas
    function modificarBodega(bodegaId, nombre, direccion) {
        let bodegas = obtenerBodegasDeLocalStorage();

        //busca la bodega por su ID
        const bodega = bodegas.find(bodega => bodega.id === bodegaId);

        if (!bodega) {
            alert(`No se encontró la bodega con ID ${bodegaId}.`);
            return;
        }

        //modifica las propiedades de la bodega
        bodega.nombre = nombre;
        bodega.direccion = direccion;

        //actualiza localStorage
        localStorage.setItem('bodegas', JSON.stringify(bodegas));

        alert(`Bodega con ID ${bodegaId} modificada exitosamente.`);
    }

    //funcion para eliminar bodegas
    function eliminarBodega(bodegaId) {
        let bodegas = obtenerBodegasDeLocalStorage();

        //filtra las bodegas para eliminar la que tiene el ID especificado
        bodegas = bodegas.filter(bodega => bodega.id !== bodegaId);

        //actualiza localStorage
        localStorage.setItem('bodegas', JSON.stringify(bodegas));

        alert(`Bodega con ID ${bodegaId} eliminada exitosamente.`);
    }

    //funcion para obtener las bodegas creadas en localstorage
    function obtenerBodegasDeLocalStorage() {
        const bodegas = localStorage.getItem('bodegas');
        return bodegas ? JSON.parse(bodegas) : [];
    }
});

//funcion boton volver
const button_volver = document.getElementById('buttonVolver');
button_volver.addEventListener('click', function(e){
    e.preventDefault()
    console.log('click volver');
    window.location = "../jefebodega.html"
})
