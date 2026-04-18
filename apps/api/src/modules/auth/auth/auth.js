const express = require('express');
const router = express.Router();
const User = require('./user');

/**
 * @route   POST /api/auth/register
 * @desc    Registrar un nuevo usuario
 */
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // 1. Verificar si el usuario ya existe
        let usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // 2. Crear nuevo usuario
        const nuevoUsuario = new User({
            nombre,
            email,
            password
        });

        // 3. Guardar en MongoDB Atlas
        await nuevoUsuario.save();
        
        res.status(201).json({ 
            msg: 'Usuario registrado con éxito', 
            userId: nuevoUsuario._id 
        });
        
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ msg: 'Error en el servidor al registrar' });
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Autenticar usuario y dar acceso
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar al usuario por correo
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El correo no está registrado' });
        }

        // 2. Verificar contraseña (comparación directa)
        if (usuario.password !== password) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // 3. Responder con éxito
        res.status(200).json({
            msg: '¡Bienvenido de nuevo!',
            user: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ msg: 'Error en el servidor al iniciar sesión' });
    }
});

module.exports = router;