const express = require('express');
const router = express.Router();
const middleware = require("../middlewares/middleware");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');


// Crear Usuario
router.post("/", async (req, res) => {
  try {
    const usuario = await Usuario.create(
      {
        usuario_nombre: req.body.usuario_nombre,
        nombre_apellido: req.body.nombre_apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        password: bcrypt.hashSync(req.body.password, 10)
      }
    );
    res.status(200).json({ message: 'ok', usuario })
  } catch (e) {
    res.status(400).json({ message: e })
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { usuario, password, email } = req.body;
  const user = usuario
    ? await Usuario.findOne({ where: { usuario_nombre: usuario } })
    : await Usuario.findOne({ where: { email: email } });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      return res.json({ user, token: Token(user), message: 'Login correcto' });
    } else {
      res.status(404).json({ error: "Error en usuario y/o contraseña" });
    }
  } else {
    res.status(404).json({ error: "Error en usuario y/o contraseña" });
  }
}
)
const Token = (usuario) => {
  return jwt.sign(
    {
      usuarioId: usuario.usuario_id,
      rol: usuario.usuario_rol_id,
    }, process.env.SEED_AUTENTICACION, {
    expiresIn: "2h"
  })
};

//Traer todos los usuarios solo para Admin
router.get("/all", [middleware.verifyToken, middleware.verifyAdmin], async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json({ usuarios });
}
);


// Traer usuario por ID, si es admin puede ver cualquier usuario, si es usuario sólo se puede ver la info propia
router.get("/:id", middleware.verifyToken, async (req, res) => {

  let payloadToken = req.usuario;
  let usuario;
  console.log('Payload Token: ', payloadToken);
  if (payloadToken.rol == 1) {
    usuario = await Usuario.findOne({
      where: { usuario_id: req.params.id },
    });
    return res.status(200).json({ usuario, message: "Información de usuario con ID:" + req.params.id });
  }
  usuario = await Usuario.findOne({
    where: { usuario_id: payloadToken.usuarioId },
  });

  return res.status(200).json({ usuario, message: "Información de usuario con ID:" + payloadToken.usuarioId });
});

// Editar usuario por ID, si es admin puede editar cualquier usuario, si es usuario sólo se puede editar la info propia

router.put("/:id", middleware.verifyToken, async (req, res) => {
  let payloadToken = req.usuario;
  let usuario;
  if (payloadToken.rol == 1) {
    usuario = await Usuario.findOne({ where: { usuario_id: req.params.id } });
    if (usuario) {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10); // const hash = bcrypt.hashSync(Password, salt);
      }
      await Usuario.update(req.body, {
        where: { usuario_id: req.params.id },
      })
        .then(() => {
          res.json("Usuario actualizado");
        })
        .catch((error) => {
          return res
            .status(409)
            .json({ error: "El nombre de usuario y/o email ya existe" });
        });
    } else {
      return res
        .status(404)
        .json({ error: `El usuario ${req.params.id} no existe` });
    }
  } else {
    if (req.params.id == req.usuarioId) { 
      const usuario = await Usuario.findOne({ where: { usuario_id: req.params.id } });
      if (usuario) {
        req.body.rol = usuario_rol_id;
        if (req.body.password) {
          req.body.password = bcrypt.hashSync(req.body.password, 10); //const hash = bcrypt.hashSync(Password, salt);
        }
        await Usuario.update(req.body, {
          where: { usuario_id: req.params.id },
        })
          .then(() => {
            return res.json("Se ha actualizado el usuario");
          })
          .catch((error) => {
            return res
              .status(409)
              .json({ error: "El nombre de usuario y/o email ya existe" });
          });
      } else {
        return res
          .status(404)
          .json({ error: `No se ha encontrado usuario con ID:  ${req.params.id}` });
      }
    } else {
      return res
        .status(401)
        .json({ error: "No tiene permisos para realizar esta acción" });
    }
  }
});


// Eliminar usuario por ID, si es admin puede eliminar cualquier usuario, si es usuario sólo se puede eliminar el propio
router.delete("/:id", middleware.verifyToken, async (req, res) => {
  if (req.usuario.rol == 1) {
    async (req, res) => {
      await Usuario.destroy({
        where: { usuario_id: req.params.id },
      });
      return res.json({
        message: `El usuario con ID: ${req.params.id} ha sido eliminado`,
      });
    };
  } else {
    if (req.params.id == req.usuario.usuarioId) {
      await Usuario.destroy({
        where: { usuario_id: req.params.id },
      });
      return res.json({
        message: `El usuario con ID: ${req.params.id} ha sido eliminado`,
      });
    } else {
      return res
        .status(401)
        .json({ error: "No tiene permisos para realizar esta acción" });
    }
  }
});


module.exports = router;