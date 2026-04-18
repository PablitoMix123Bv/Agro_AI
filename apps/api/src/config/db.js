const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const conectarBD = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("La variable MONGO_URI no está definida en el .env");
        }
        await mongoose.connect(uri);
        console.log('Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error(' Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
};

module.exports = conectarBD;