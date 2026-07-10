let peliculas = {};

async function cargarPeliculas() {
    try {
        const response = await fetch('/api/cartelera');
        peliculas = await response.json();
        return peliculas;
    } catch (error) {
        console.error(error);
    }
}
