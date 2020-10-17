
const Rol = require('../models/Rol');
const secretKey = "2ae89b5a-5f6d-456d-8762-7abc95f02abb";
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.json({ mensaje: 'Token inválida' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send({
        mensaje: 'Token no proveída.'
      });
    }
  }
  catch (error) {
    res.status(401)
    res.json({ message: "no  bmfgohs" })
  }
}

const verifyAdmin = async (req, res, next) => {
  const role = await Rol.findByPk(req.decoded.usuario.usuario_rol_id);
  console.log(role.rol_name)
  if (role.rol_name == "Administrador") {
    next();
  } else {
    return res.status(401).json({
      error: "Usuario no Autorizado!",
    });
  }
};

module.exports = {
  verifyAdmin,
  verifyToken,
};