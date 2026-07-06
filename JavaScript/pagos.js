const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id') || 'thebatman';
const peli = peliculas[movieId];

if (peli) {
    document.querySelector('.InfoResumenPelicula h3').textContent = peli.titulo;
    document.querySelector('.PosterResumen img').src = peli.imagen;
    document.querySelector('.PosterResumen img').alt = peli.titulo;
}

// Recuperar datos de asientos de localStorage
const asientos = JSON.parse(localStorage.getItem('asientosSeleccionados')) || [];
const total = localStorage.getItem('totalCompra') || "0";

const items = document.querySelectorAll('.DetallesResumen li');
if (items.length >= 3) {
    items[1].querySelector('span:last-child').textContent = `Asientos: ${asientos.join(', ') || 'Ninguno'}`;
    items[2].querySelector('span:last-child').textContent = `${asientos.length} x Entradas General`;
}
document.querySelector('.PrecioTotalResumen').textContent = `$${total}`;

// Guardar nombre y actualizar el enlace al hacer clic
const btnFinalizar = document.querySelector('.BotonFinalizarCompra');
if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        const nombreInput = document.querySelector('.GrupoInput input[type="text"]').value;
        localStorage.setItem('nombreCliente', nombreInput || "Cliente");
        btnFinalizar.href = `ConfirmacionCompra.html?id=${movieId}`;
    });
}

// Mantener contexto de navegación
const btnCerrar = document.querySelector('.BotonCerrar');
if (btnCerrar) {
    btnCerrar.href = `SeleccionAsientos.html?id=${movieId}`;
}
