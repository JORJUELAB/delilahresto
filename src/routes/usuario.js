const express = require('express');
const router = express.Router();
const middleware = require("../middlewares/middleware");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { Op } = require("sequelize");
const secretKey = "2ae89b5a-5f6d-456d-8762-7abc95f02abb";



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
  //const { usuario, email, password } = req.body;
  const { usuario, password, email } = req.body;
  const user = await Usuario.findOne({
    where: {
      [Op.or]: [
        { usuario_nombre: usuario },
        { email: email }
      ]
    }
  });

  if (user) {
    const validatePassword = bcrypt.compareSync(password, user.password);
    if (validatePassword) {
      let token = jwt.sign({
        usuario: user,
      }, secretKey, {
        expiresIn: "1h"
      })
      return res.json({
        usuarioId: user.usuario_id,
        rol: user.usuario_rol_id,
        message: 'Log in correct',
        token,
      })
    }
    return res.status(400).json({ message: 'El usuario y/o contraseña invalidos' });
  }
  res.status(400).json({ message: 'El usuario y/o contraseña invalidos' });

});
//Traer todos los usuarios solo para Admin
router.get("/", middleware.verifyToken, middleware.verifyAdmin, async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json({ usuarios });
}
);


//Traer usuario por ID solo para Admin
router.get("/:id", middleware.verifyToken, async (req, res) => {
  let usuario = {};
  if (role == 1) {
      usuario = await Usuario.findOne({
      where: { id: req.params.id },
    });
    return res.json({ usuario });
  } else {
    if (req.params.id == req.usuarioId) {
      usuario = await Usuario.findOne({
        where: { id: userid },
      });
      return res.json({ usuario });
    } else {
      return res
        .status(401)
        .json({ error: "No tiene permisos para realizar esta operación" });
    }
  }
});

//Editar usuario, si es usuario solo puede editar el propio, si es admin todos
/*router.put("/:id", middleware.verificarToken, async (req, res) => {
  if (req.rol == 1) {
    const usuario = await Usuario.findOne({ where: { id: req.params.id } });
    if (usuario) {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10); // Se cifra la contraseña 10 veces
      }
      await Usuario.update(req.body, {
        where: { id: req.params.id },
      })
        .then(() => {
          res.json(`Se ha actualizado el usuario satisfactoriamente!`);
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
      const usuario = await Usuario.findOne({ where: { id: req.params.id } });
      if (usuario) {
        req.body.rol = usuario.rol;
        if (req.body.password) {
          req.body.password = bcrypt.hashSync(req.body.password, 10); // Se cifra la contraseña 10 veces
        }
        await Usuario.update(req.body, {
          where: { id: req.params.id },
        })
          .then(() => {
            return res.json(`Se ha actualizado el usuario satisfactoriamente!`);
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
      return res
        .status(401)
        .json({ error: "No tiene permisos para realizar esta operación" });
    }
  }
});*/

/*
// DELETE Eliminar un usuario, si es admin puede borrar cualquier usuario, si es cliente, sólo se puede borrar a sí mismo
// DELETE FROM Usuarios WHERE id = id;
router.delete("/:id", middleware.verificarToken, async (req, res) => {
  if (req.rol == 1) {
    async (req, res) => {
      await Usuario.destroy({
        where: { id: req.params.id },
      });
      return res.json({
        message: `se ha eliminado el usuario ${req.params.id}`,
      });
    };
  } else {
    if (req.params.id == req.usuarioId) {
      await Usuario.destroy({
        where: { id: req.params.id },
      });
      return res.json({
        message: `se ha eliminado el usuario ${req.params.id}`,
      });
    } else {
      return res
        .status(401)
        .json({ error: "No tiene permisos para realizar esta operación" });
    }
  }
});
*/
module.exports = router;