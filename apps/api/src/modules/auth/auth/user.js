const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Ej: "Marcus Thorne"
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    perfil: {
        organizacion: { type: String, default: "AgroSafe" },
        foto: { type: String, default: "" } // URL de la imagen
    },
    // Datos estadísticos que se ven en el Dashboard
    estadisticas: {
        superficieTotal: { type: Number, default: 0 },
        camposActivos: { type: Number, default: 0 }
    },
    fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);