const express = require('express');
const router = express.Router();
let Sequelize = require('sequelize');
const middleware = require("../middlewares/middleware");
const Pedido = require('../models/Pedido');
const Descripcion = require('../models/Detallepedido');
const QueryTypes = require("../../index");


const sequelize = new Sequelize("delilah_resto", "root", "1010216819Uc", { //database, usuario, password
  dialect: "mysql",
  host: "localhost", //dominio o ip donde corre Mysql
  //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente
});

// GET Obtener todos los Pedidos
router.get("/", middleware.verifyToken, middleware.verifyAdmin, async (req, res) => {
  let pedidos = {};
  pedidos = await sequelize.query(
    `SELECT e.estado_nombre as estado, pd.date as hora, concat('#',dp.detalle_pedido_pedido_id) as número, group_concat(dp.detalle_pedido_cantidad,'x',pr.producto_nombre SEPARATOR ' ') as  detalle,
      fp.forma_de_pago_nombre as pago,
      sum(pr.producto_precio*dp.detalle_pedido_cantidad) as total,
      u.usuario_id as idUsuario,
      u.usuario_nombre as usuario,
      u.direccion as dirección
      FROM detalle_pedido as dp
      JOIN producto as pr
      ON dp.detalle_pedido_producto = pr.producto_id
      JOIN pedido as pd
      ON dp.detalle_pedido_pedido_id = pd.pedido_id
      JOIN forma_de_pago as fp
      ON pd.pedido_forma_de_pago_id = fp.forma_de_pago_id
      JOIN estado as e
      ON pd.pedido_estado_id = e.estado_id
      JOIN usuario as u
      ON pd.pedido_usuario_id = u.usuario_id
      group by dp.detalle_pedido_pedido_id;`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.json(pedidos);
});

// GET Obtener un pedido por ID
router.get("/:id", middleware.verifyToken, async (req, res) => {
  let pedidos = {};
  pedidos = await sequelize.query(
    `SELECT e.estado_nombre as estado, pd.date as hora, concat('#',dp.detalle_pedido_pedido_id) as número, group_concat(dp.detalle_pedido_cantidad,'x',pr.producto_nombre SEPARATOR ' ') as  detalle,
    fp.forma_de_pago_nombre as pago,
    sum(pr.producto_precio*dp.detalle_pedido_cantidad) as total,
    u.usuario_id as idUsuario,
    u.usuario_nombre as usuario,
    u.direccion as dirección
    FROM detalle_pedido as dp
    JOIN producto as pr
    ON dp.detalle_pedido_producto = pr.producto_id
    JOIN pedido as pd
    ON dp.detalle_pedido_pedido_id = pd.pedido_id
    JOIN forma_de_pago as fp
    ON pd.pedido_forma_de_pago_id = fp.forma_de_pago_id
    JOIN estado as e
    ON pd.pedido_estado_id = e.estado_id
    JOIN usuario as u
    ON pd.pedido_usuario_id = u.usuario_id
    WHERE pd.pedido_id= ${req.params.id} AND pd.pedido_usuario_id = ${req.usuario.usuarioId}
    group by dp.detalle_pedido_pedido_id;`,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (pedidos.length > 0) {
    res.json(pedidos);
  } else {
    return res.status(401).json({ error: "Usuario no Autorizado!" });
  }
});
// POST Crear un Pedido
router.post("/", middleware.verifyToken, async (req, res) => {
  const { pedido_forma_de_pago_id, productos } = req.body;
  let solicitud = {};
  await Pedido.create({ pedido_forma_de_pago_id, pedido_usuario_id: req.usuario.usuarioId })
    .then(async (orden) => {
      productos.forEach(async (producto) => {
        await Descripcion.create({
          detalle_pedido_pedido_id: orden.pedido_id,
          detalle_pedido_producto: producto.id,
          detalle_pedido_cantidad: producto.cantidad,

        }).catch(() => {
          return res
            .status(400)
            .json({ error: "Hubo un error al generar el pedido." });
        });
      });
      solicitud = orden.pedido_id;
    })
    .catch((error) => {
      console.log(error);
      res.status(409).json({
        error: "No se pudo guardar el Pedido",
      });
    });
  setTimeout(async () => {
    await sequelize
      .query(
        `SELECT e.estado_nombre as estado, pd.date as hora, concat('#',dp.detalle_pedido_pedido_id) as número, group_concat(dp.detalle_pedido_cantidad,'x',pr.producto_nombre SEPARATOR ' ') as  detalle,
        fp.forma_de_pago_nombre as pago,
        sum(pr.producto_precio*dp.detalle_pedido_cantidad) as total,
        u.usuario_id as idUsuario,
        u.usuario_nombre as usuario,
        u.direccion as dirección
        FROM detalle_pedido as dp
        JOIN producto as pr
        ON dp.detalle_pedido_producto = pr.producto_id
        JOIN pedido as pd
        ON dp.detalle_pedido_pedido_id = pd.pedido_id
        JOIN forma_de_pago as fp
        ON pd.pedido_forma_de_pago_id = fp.forma_de_pago_id
        JOIN estado as e
        ON pd.pedido_estado_id = e.estado_id
        JOIN usuario as u
        ON pd.pedido_usuario_id = u.usuario_id
        WHERE dp.detalle_pedido_pedido_id = ${solicitud}
        group by dp.detalle_pedido_pedido_id;`,
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((pedido) => {
        return res.json(pedido);
      });
  }, 5);
});


//Editar estado del pedido

router.put("/:id", middleware.verifyToken, middleware.verifyAdmin, async (req, res) => {
  const { pedido_estado_id } = req.body;
  console.log(pedido_estado_id);
  await Pedido.update({ pedido_estado_id: pedido_estado_id }, { where: { pedido_id: req.params.id } })
    .then((pedido) => {
      console.log(pedido);
      return res.json({
        message: `se ha modificado el Pedido ${req.params.id}`,
      });
    })
    .catch(() => {
      res.status(409).json({
        error: "No se pudo modificar el pedido.",
      });
    });
});
// Eliminar pedido
router.delete("/:id", middleware.verifyToken, middleware.verifyAdmin, async (req, res) => {
  try {
    if (req.usuario.rol == 1) {
      await Pedido.destroy({
        where: { pedido_id: req.params.id },
      });
      await Descripcion.destroy({
        where: { detalle_pedido_pedido_id: req.params.id },
      });
    }
    res.status(200).json({ message: `El pedido con ID: ${req.params.id} ha sido eliminado` })
  } catch (error) {
    res.status(400).json({ error: "El pedido no se pudo eliminar" });
  }
});


module.exports = router;