/* Servidor API Backend de Cine Cinema */
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Configuración de middlewares
app.use(cors());
app.use(express.json());

// Log de peticiones en consola
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Compartir archivos estáticos del frontend
app.use(express.static(__dirname));

let peliculas = {};

// Cargar base de datos inicial desde archivo JSON
try {
    const rawData = fs.readFileSync('cartelera.json', 'utf8');
    peliculas = JSON.parse(rawData);
} catch (error) {
    console.error(error);
}

// Endpoint para obtener toda la cartelera
app.get('/api/cartelera', (req, res) => {
    res.status(200).json(peliculas);
});

// Endpoint para realizar la reserva de asientos
app.post('/api/comprar', (req, res) => {
    const { movieId, hora, asientos } = req.body;
    if (movieId && hora && asientos && peliculas[movieId]) {
        const funcion = peliculas[movieId].funciones.find(f => f.hora === hora);
        if (funcion) {
            funcion.ocupados.push(...asientos);
            return res.status(200).json({ success: true, ocupados: funcion.ocupados });
        }
    }
    res.status(400).json({ success: false });
});

// Iniciar servidor en puerto 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
