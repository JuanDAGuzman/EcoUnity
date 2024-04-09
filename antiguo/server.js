const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Asegúrate de que la ruta hacia tu configuración de la base de datos sea correcta
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Ruta de login
app.post('/login', async (req, res) => {
    const { usuario, correo, contraseña} = req.body;
    
    if (!usuario || !correo || !contraseña) {
        return res.status(400).send({ message: 'Se requieren el nombre de usuario y la contraseña' });
    }
    
    try {
        // Consulta en la base de datos para encontrar el usuario
        const { rows } = await db.query('SELECT * FROM login WHERE usuario = $1', [username]);
        
        if (rows.length === 0) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
        
        const user = rows[0];
        
        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
        }
        
        // Aquí, deberías generar y enviar un token de autenticación al usuario (omitido para simplificar)
        
        res.send({ message: 'Login exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${5432}`);
});
