const express = require('express');
const router = express.Router();
const User = require('./user');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el usuario ya existe
        let usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        const nuevoUsuario = new User({
            nombre,
            email,
            password
        });

        await nuevoUsuario.save();
        res.status(201).json({ msg: 'Usuario registrado con éxito', userId: nuevoUsuario._id });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;