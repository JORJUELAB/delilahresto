const express = require('express');
const router = express.Router();
const Rol = require('../models/Rol');

//CRUD Rol
//READ
//Traer todos los roles
router.get("/", async (req, res) => {
    let rol = await Rol.findAll();
    res.json(rol);
});

//Traer rol por ID
router.get('/:id', async (req, res) => {
    let rol = await Rol.findByPk(req.params.id);
    if (rol) {
        res.json(rol);
    } else {
        res.status(404).json({
            error: "Rol no encontrado, verifique el ID ingresado.",
        });
    }
});

// Create rol 
router.post("/", async (req, res) => {
    try{
        let rol = await Rol.create(req.body);
        res.json(rol);
    }catch(error){
        res.status(500).json({ message: error })   
    }
});


// PUT Editar rol
router.put("/:id",  async (req, res) => {
    try{
        const rol = await Rol.update(req.body, {
            where: { rol_id: req.params.id },
          });
          res.json({ message: `Se ha modificado el rol con el ID:  ${req.params.id}` });
    }catch(error){
        res.status(500).json({ message: error })
    }
  });

// DELETE Eliminar rol
router.delete("/:id", async (req, res) => {
    try {
        await Rol.destroy({
            where: { rol_id: req.params.id },
        });
        res.json({ message: `Se ha eliminado el rol con el ID:  ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;