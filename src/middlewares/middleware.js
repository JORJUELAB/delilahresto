
const Rol = require('../models/Rol');
const jwt = require('jsonwebtoken');
require('../config_env/config')
const secretKey = "9729b35c-ac91-4833-a328-3a1b732f25f4"

function verifyToken(req, res, next) {
  const token = req.get('token');
  jwt.verify(token, secretKey, (err, decoded) => {
    if(err) {
      return res.status(err).json({
        message: 'Token no valido'
      })
    }
    req.usuario = decoded
    console.log('Usuario middleware: ', decoded);
    next();
  })
}

const verifyAdmin = async (req, res, next) => {
  console.log(req.usuario.usuarioId)
  const role = await Rol.findByPk(req.usuario.rol);
  console.log(role)
  if (role.rol_name == "Administrador") {
    req.usuario.rol_name = role.rol_name;
    return next();
  } 
  return res.status(401).json({
    error: "Usuario no Autorizado!",
  });
  
};

module.exports = {
  verifyAdmin,
  verifyToken,
};