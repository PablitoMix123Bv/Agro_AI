const express = require('express');
const conectarBD = require('./config/db');
require('dotenv').config({ path: '../.env' });//require('dotenv').config();

const app = express();

// Conectar a la base de datos
conectarBD();

// Middleware para leer JSON
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Servidor de AgroSmart AI funcionando 🚀');
});


// Definir rutas
app.use('/api/auth', require('./modules/auth/auth/auth'));
app.listen(PORT, '0.0.0.0', () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});