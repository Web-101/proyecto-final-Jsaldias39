/* Página de confirmación de boleto virtual */
(async () => {
    // Cargar películas y configurar datos del ticket virtual
    await cargarPeliculas();
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id') || 'thebatman';
    const peli = peliculas[movieId];
    const titulo = peli ? peli.titulo : "The Batman";

    // Recuperar datos de compra desde el formulario anterior
    const nombre = localStorage.getItem('nombreCliente') || "Julian";
    const asientos = JSON.parse(localStorage.getItem('asientosSeleccionados')) || ["H12", "H13"];

    // Rellenar ticket con datos reales del usuario
    const hora = localStorage.getItem('horaSeleccionada') || '18:30 HS';
    const sala = peli && peli.funciones ? (peli.funciones.find(f => f.hora === hora)?.sala || "SALA 2 - IMAX") : "SALA 2 - IMAX";
    document.querySelector('.TituloExito').textContent = `¡Gracias por tu compra, ${nombre}!`;
    document.querySelector('.EncabezadoBoleto h3').textContent = titulo;
    document.querySelectorAll('.EncabezadoBoleto p')[0].textContent = `Hoy, ${hora} | ${sala}`;
    document.querySelectorAll('.EncabezadoBoleto p')[1].textContent = `Asientos: ${asientos.join(', ')}`;

    // Generar código aleatorio para simular el boleto
    const boletoNum = `CC - ${Math.floor(1000 + Math.random() * 9000)} - X${Math.floor(100 + Math.random() * 900)}`;
    document.querySelector('.NumeroBoleto').textContent = boletoNum;
})();
