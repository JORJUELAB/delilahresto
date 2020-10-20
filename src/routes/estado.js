const express = require('express');
const router = express.Router();
const middleware = require("../middlewares/middleware");
const Estado = require('../models/Estado');

//CRUD Estado
//READ
//Traer todos los estados
router.get("/", async (req, res) => {
    let estado = await Estado.findAll();
    res.json(estado);
});

//Traer estado por ID
router.get('/:id', async (req, res) => {
    let estado = await Estado.findByPk(req.params.id);
    if (estado) {
        res.json(estado);
    } else {
        res.status(404).json({
            error: "Estado no encontrado, verifique el ID ingresado.",
        });
    }
});

// Create estado 
router.post("/", middleware.verifyToken, middleware.verifyAdmin, async (req, res) => {
    try{
        let estado = await Estado.create(req.body);
        res.json(estado).json({message: "Estado creado con exito"});
    }catch(error){
        res.status(500).json({ message: error })   
    }
});

// PUT Editar estado
router.put("/:id",  middleware.verifyToken, middleware.verifyAdmin, async (req, res) => {
    try{
        const estado = await Estado.update(req.body, {
            where: { estado_id: req.params.id },
          });
          res.json({ message: `Se ha modificado el estado con el ID:  ${req.params.id}` });
    }catch(error){
        res.status(500).json({ message: error })   
    }
  });

// DELETE Eliminar estado
router.delete("/:id", middleware.verifyToken, middleware.verifyAdmin, async (req, res) => {
    try {
        await Estado.destroy({
            where: { estado_id: req.params.id },
        });
        res.json({ message: `Se ha eliminado el estado con el ID:  ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;