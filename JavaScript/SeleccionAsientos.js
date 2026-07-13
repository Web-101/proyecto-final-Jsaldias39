/* Selección de asientos interactiva y sincronización con el servidor */
(async () => {
    // Cargar películas y configurar metadatos iniciales
    await cargarPeliculas();
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id') || 'thebatman';
    const peli = peliculas[movieId];
    const titulo = peli ? peli.titulo : "Oppenheimer";

    document.querySelector('.InfoPeliculaHeader h1').textContent = titulo;
    
    document.querySelector('.HeaderIzquierdo a').href = `DetallePelicula.html?id=${movieId}`;
    document.querySelector('.BotonContinuar').href = `pagos.html?id=${movieId}`;

    // Obtener asientos ocupados de la función seleccionada desde el backend
    const hora = localStorage.getItem('horaSeleccionada') || '18:30 HS';
    const funcion = peli && peli.funciones ? peli.funciones.find(f => f.hora === hora) : null;
    const ocupados = funcion ? funcion.ocupados : [];

    // Marcar visualmente los asientos ocupados según el estado del backend
    const todosLosAsientos = document.querySelectorAll('.Asiento');
    todosLosAsientos.forEach((asiento) => {
        const fila = asiento.parentElement.parentElement.querySelector('.LetraFila').textContent;
        const hermanos = Array.from(asiento.parentElement.children);
        const numero = hermanos.indexOf(asiento) + 1;
        const nombreAsiento = `${fila}${numero}`;

        if (ocupados.includes(nombreAsiento)) {
            asiento.classList.add('Ocupado');
        } else {
            asiento.classList.remove('Ocupado');
        }
    });

    // Control de selección de asientos y cálculo del total a pagar
    const asientos = document.querySelectorAll('.Asiento:not(.Ocupado)');
    const cantSeleccion = document.querySelector('.CantidadSeleccion');
    const precioTotal = document.querySelector('.PrecioTotal');
    const precioUnitario = 9250;

    let seleccionados = [];

    asientos.forEach((asiento) => {
        const fila = asiento.parentElement.parentElement.querySelector('.LetraFila').textContent;
        const hermanos = Array.from(asiento.parentElement.children);
        const numero = hermanos.indexOf(asiento) + 1;
        const nombreAsiento = `${fila}${numero}`;

        asiento.addEventListener('click', () => {
            asiento.classList.toggle('Seleccionado');
            if (asiento.classList.contains('Seleccionado')) {
                seleccionados.push(nombreAsiento);
            } else {
                seleccionados = seleccionados.filter(item => item !== nombreAsiento);
            }

            cantSeleccion.textContent = seleccionados.length > 0 ? seleccionados.join(', ') : 'Ninguno';
            precioTotal.textContent = `$${(seleccionados.length * precioUnitario).toLocaleString('es-CL')}`;

            // Guardar selección temporalmente para el formulario de pago
            localStorage.setItem('asientosSeleccionados', JSON.stringify(seleccionados));
            localStorage.setItem('totalCompra', (seleccionados.length * precioUnitario).toLocaleString('es-CL'));
        });
    });
})();
