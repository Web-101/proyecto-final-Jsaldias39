(async () => {
    await cargarPeliculas();
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id') || 'thebatman';
    const peli = peliculas[movieId];

    if (peli) {
        document.querySelector('.TituloPelicula').textContent = peli.titulo;
        document.querySelector('.Sinopsis p').textContent = peli.sinopsis;
        document.querySelector('.EtiquetaEstreno').textContent = peli.estreno;
        document.querySelector('.EtiquetaImax').textContent = peli.sala;
        
        const metaSpans = document.querySelectorAll('.MetaData > span');
        if (metaSpans.length >= 3) {
            metaSpans[0].innerHTML = `<span class="material-symbols-outlined">schedule</span> ${peli.duracion}`;
            metaSpans[1].innerHTML = `<span class="material-symbols-outlined">star</span> ${peli.calificacion}`;
            metaSpans[2].innerHTML = `<span class="material-symbols-outlined">subtitles</span> ${peli.idioma}`;
        }

        document.querySelector('.PeliculaHero').style.backgroundImage = `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 60%, #000000 100%), url(${peli.imagen})`;

        const reservBtn = document.querySelector('.BotonReservar');
        if (reservBtn) {
            reservBtn.href = `SeleccionAsientos.html?id=${movieId}`;
        }

        const tarjetasHora = document.querySelectorAll('.TarjetaHora');
        localStorage.setItem('horaSeleccionada', '18:30 HS');
        tarjetasHora.forEach(tarjeta => {
            tarjeta.addEventListener('click', () => {
                tarjetasHora.forEach(t => t.classList.remove('Activo'));
                tarjeta.classList.add('Activo');
                const hora = tarjeta.querySelector('.hora').textContent;
                localStorage.setItem('horaSeleccionada', hora);
            });
        });
    }
})();
