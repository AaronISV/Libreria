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
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const accion = document.getElementById('accion').value;
        const bodegaId = document.getElementById('bodegaid').value.trim();
        const nombreBodega = document.getElementById('nombrebodega').value.trim();
        const direccionBodega = document.getElementById('direccionbodega').value.trim();

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

    function crearBodega(bodegaId, nombre, direccion) {
        let bodegas = obtenerBodegasDeLocalStorage();

        // Verifica si la bodega ya existe
        if (bodegas.find(bodega => bodega.id === bodegaId)) {
            alert(`La bodega con ID ${bodegaId} ya existe.`);
            return;
        }

        // Crea un nuevo objeto de bodega
        const nuevaBodega = {
            id: bodegaId,
            nombre: nombre,
            direccion: direccion,
            productos: []  // Puedes añadir más propiedades según tus necesidades
        };

        // Agrega la nueva bodega al array
        bodegas.push(nuevaBodega);

        // Actualiza localStorage
        localStorage.setItem('bodegas', JSON.stringify(bodegas));

        alert(`Bodega con ID ${bodegaId} creada exitosamente.`);
    }

    function modificarBodega(bodegaId, nombre, direccion) {
        let bodegas = obtenerBodegasDeLocalStorage();

        // Busca la bodega por su ID
        const bodega = bodegas.find(bodega => bodega.id === bodegaId);

        if (!bodega) {
            alert(`No se encontró la bodega con ID ${bodegaId}.`);
            return;
        }

        // Modifica las propiedades de la bodega
        bodega.nombre = nombre;
        bodega.direccion = direccion;

        // Actualiza localStorage
        localStorage.setItem('bodegas', JSON.stringify(bodegas));

        alert(`Bodega con ID ${bodegaId} modificada exitosamente.`);
    }

    function eliminarBodega(bodegaId) {
        let bodegas = obtenerBodegasDeLocalStorage();

        // Filtra las bodegas para eliminar la que tiene el ID especificado
        bodegas = bodegas.filter(bodega => bodega.id !== bodegaId);

        // Actualiza localStorage
        localStorage.setItem('bodegas', JSON.stringify(bodegas));

        alert(`Bodega con ID ${bodegaId} eliminada exitosamente.`);
    }

    function obtenerBodegasDeLocalStorage() {
        const bodegas = localStorage.getItem('bodegas');
        return bodegas ? JSON.parse(bodegas) : [];
    }
});

const button_volver = document.getElementById('buttonVolver');
button_volver.addEventListener('click', function(e){
    e.preventDefault()
    console.log('click volver');
    window.location = "../jefebodega.html"
})
