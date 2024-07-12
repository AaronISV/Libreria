document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const idMovimientoInput = document.getElementById('IdMovimiento');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const idMovimiento = parseInt(idMovimientoInput.value.trim());
        if (!idMovimiento || isNaN(idMovimiento)) {
            alert('Por favor, ingrese un ID válido.');
            return;
        }

        const movimientoEncontrado = buscarMovimientoPorId(idMovimiento);

        if (!movimientoEncontrado) {
            alert('El movimiento con el ID especificado no existe.');
            return;
        }

        // Mostrar el detalle del movimiento encontrado
        mostrarDetalleMovimiento(movimientoEncontrado);
    });

    function buscarMovimientoPorId(id) {
        let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
        return movimientos.find(movimiento => movimiento.id === id);
    }

    function mostrarDetalleMovimiento(movimiento) {
        // Lógica para mostrar los detalles del movimiento en pantalla
        const detalleMovimiento = `
            <h2>Detalles del Movimiento</h2>
            <p><strong>ID de Movimiento:</strong> ${movimiento.id}</p>
            <p><strong>Bodega de Origen:</strong> ${movimiento.origen}</p>
            <p><strong>Bodega de Destino:</strong> ${movimiento.destino}</p>
            <p><strong>Usuario:</strong> ${movimiento.usuario}</p>
            <p><strong>Producto:</strong> ${movimiento.producto}</p>
            <p><strong>Cantidad:</strong> ${movimiento.cantidad}</p>
        `;

        // Mostrar el detalle en el cuerpo del documento
        const detalleContainer = document.getElementById('detalleMovimiento');
        detalleContainer.innerHTML = detalleMovimiento;
    }
});

//funcion boton volver
const button_volver = document.getElementById('buttonVolver');
button_volver.addEventListener('click', function(e){
    e.preventDefault()
    console.log('click volver');
    window.location = "../bodegero.html"});