const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.static(__dirname));

let peliculas = {};

try {
    const rawData = fs.readFileSync('cartelera.json', 'utf8');
    peliculas = JSON.parse(rawData);
} catch (error) {
    console.error(error);
}

app.get('/api/cartelera', (req, res) => {
    res.status(200).json(peliculas);
});

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
