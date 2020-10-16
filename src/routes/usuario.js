const express = require('express');
const router = express.Router();
const middleware = require("../middlewares");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');


// Crear Usuario
router.post("/", async (req, res) => {
    try {
        let usuario =  await Usuario.create(
            {
                usuario_nombre: req.body.usuario_nombre, 
                nombre_apellido: req.body.nombre_apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                password: bcrypt.hashSync(req.body.password, 10)        }
            );
            res.status(200).json({message: 'ok', usuario})
    } catch(e) {
        res.status(400).json({message: e})
    }

    
}
);

/*//Login
router.post("/login", async (req, res) => {
    const { usuario, email, contraseña } = req.body;
    const user = usuario
        ? await Usuario.findOne({ where: { usuario_nombre: req.body.usuario } })
        : await Usuario.findOne({ where: { email: req.body.email } });

    if (user) {
        if (bcrypt.compareSync(contraseña, user.contraseña)) {
            res.json({ success: createToken(user) });
        } else {
            res.status(404).json({ error: "Verifique usuario y/o contraseña" });
        }
    } else {
        res.status(404).json({ error: "Verifique usuario y/o contraseña" });
    }
}
);

// Creación  del Token 
const createToken = ({ usuario }, 'secretekey', (err, token) => {
    return jswt.sign({
        
        },
    );
})


// Verificación del token
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerHeader = bearerHeader.split("")[1];
        req.token = bearerHeader;
    } else {
        res.status(403);
    }
}

//middleware
const validarRol = async (req, res, next) => {
    const rol = await Rol.findByPk(req.rol);
    if (rol_name == "Administrador") {
        next();
    } else {
        return res.status(401).json({
            error: "No es un usuario autorizado",
        });
    }
};*/


module.exports = router;