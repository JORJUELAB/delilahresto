const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');


//CRUD producto

//READ
//Traer todos los productos
router.get("/", async (req, res) => {
    let producto = await Producto.findAll();
    res.json(producto);
});

//Traer producto por ID
router.get('/:id', async (req, res) => {
    let producto = await Producto.findByPk(req.params.id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({
            error: "Producto no encontrado.",
        });
    }
});

// Create producto 
router.post("/", async (req, res) => {
    let producto = await Producto.create(req.body);
    res.json(producto);
});

// PUT Editar producto
router.put("/:id",  async (req, res) => {
    try{
        const producto = await Producto.update(req.body, {
            where: { producto_id: req.params.id },
          });
          res.json(producto);
    }catch(error){
        res.status(500).json({ message: error })
    }
  });

// DELETE Eliminar producto
router.delete("/:id", async (req, res) => {
    try {
        await Producto.destroy({
            where: { producto_id: req.params.id },
        });
        res.json({ message: `se ha eliminado el producto con el ID:  ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;