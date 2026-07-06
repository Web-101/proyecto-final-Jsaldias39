const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id') || 'thebatman';
const peli = peliculas[movieId];
const titulo = peli ? peli.titulo : "Oppenheimer";

document.querySelector('.InfoPeliculaHeader h1').textContent = titulo;

document.querySelector('.HeaderIzquierdo a').href = `DetallePelicula.html?id=${movieId}`;
document.querySelector('.BotonContinuar').href = `pagos.html?id=${movieId}`;

// Selección Interactiva de Asientos
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

        localStorage.setItem('asientosSeleccionados', JSON.stringify(seleccionados));
        localStorage.setItem('totalCompra', (seleccionados.length * precioUnitario).toLocaleString('es-CL'));
    });
});
