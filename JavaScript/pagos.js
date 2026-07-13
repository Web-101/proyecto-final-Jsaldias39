/* Procesamiento del formulario de pago y simulación de compra */
(async () => {
    // Cargar películas y rellenar resumen de compra
    await cargarPeliculas();
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id') || 'thebatman';
    const peli = peliculas[movieId];

    if (peli) {
        document.querySelector('.InfoResumenPelicula h3').textContent = peli.titulo;
        document.querySelector('.PosterResumen img').src = peli.imagen;
        document.querySelector('.PosterResumen img').alt = peli.titulo;
    }

    // Mostrar asientos seleccionados y total desde localStorage
    const asientos = JSON.parse(localStorage.getItem('asientosSeleccionados')) || [];
    const total = localStorage.getItem('totalCompra') || "0";

    const items = document.querySelectorAll('.DetallesResumen li');
    const hora = localStorage.getItem('horaSeleccionada') || '18:30 HS';
    const sala = peli && peli.funciones ? (peli.funciones.find(f => f.hora === hora)?.sala || "SALA 2 - IMAX") : "SALA 2 - IMAX";
    if (items.length >= 3) {
        items[0].querySelector('span:last-child').textContent = `Hoy, ${hora} | ${sala}`;
        items[1].querySelector('span:last-child').textContent = `Asientos: ${asientos.join(', ') || 'Ninguno'}`;
        items[2].querySelector('span:last-child').textContent = `${asientos.length} x Entradas General`;
    }
    document.querySelector('.PrecioTotalResumen').textContent = `$${total}`;

    // Validar formulario, registrar asientos en API y redirigir
    const btnFinalizar = document.querySelector('.BotonFinalizarCompra');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', async (e) => {
            e.preventDefault();
            const nameInput = document.querySelector('.GrupoInput input[type="text"]').value.trim();
            const emailInput = document.querySelector('.GrupoInput input[type="email"]').value.trim();

            if (!nameInput || !emailInput) {
                alert("Por favor completa los campos obligatorios (*)");
                return;
            }

            const hora = localStorage.getItem('horaSeleccionada') || '18:30 HS';
            
            try {
                await fetch('/api/comprar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ movieId, hora, asientos })
                });
            } catch (error) {
                console.error(error);
            }

            localStorage.setItem('nombreCliente', nameInput);
            window.location.href = `ConfirmacionCompra.html?id=${movieId}`;
        });
    }

    // Enlace de regreso a la sala de asientos
    const btnCerrar = document.querySelector('.BotonCerrar');
    if (btnCerrar) {
        btnCerrar.href = `SeleccionAsientos.html?id=${movieId}`;
    }
})();
