(async () => {
    await cargarPeliculas();
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id') || 'thebatman';
    const peli = peliculas[movieId];
    const titulo = peli ? peli.titulo : "Oppenheimer";

    const nombre = localStorage.getItem('nombreCliente') || "Julian";
    const asientos = JSON.parse(localStorage.getItem('asientosSeleccionados')) || ["H12", "H13"];

    document.querySelector('.TituloExito').textContent = `¡Gracias por tu compra, ${nombre}!`;
    document.querySelector('.EncabezadoBoleto h3').textContent = titulo;
    document.querySelectorAll('.EncabezadoBoleto p')[1].textContent = `Asientos: ${asientos.join(', ')}`;

    const boletoNum = `CC - ${Math.floor(1000 + Math.random() * 9000)} - X${Math.floor(100 + Math.random() * 900)}`;
    document.querySelector('.NumeroBoleto').textContent = boletoNum;
})();
