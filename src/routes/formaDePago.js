const express = require('express');
const router = express.Router();
const FormaDePago = require('../models/FormaDePago');

//CRUD forma de pago
//READ
//Traer todas las formas de pago
router.get("/", async (req, res) => {
    let formaDePago = await FormaDePago.findAll();
    res.json(formaDePago);
});

//Traer formas de pago por ID
router.get('/:id', async (req, res) => {
    let formaDePago = await FormaDePago.findByPk(req.params.id);
    if (formaDePago) {
        res.json(formaDePago);
    } else {
        res.status(404).json({
            error: "Forma De Pago no encontrada, verifique el ID ingresado.",
        });
    }
});

// Create formas de pago
router.post("/", async (req, res) => {
    try{
        let formaDePago = await FormaDePago.create(req.body);
        res.json(formaDePago);
    }catch(error){
        res.status(500).json({ message: error })   
    }
});


// PUT Editar formas de pago
router.put("/:id",  async (req, res) => {
    try{
        const formaDePago = await FormaDePago.update(req.body, {
            where: { forma_de_pago_id: req.params.id },
          });
          res.json({ message: `Se ha modificado la forma de pago con el ID:  ${req.params.id}` });
    }catch(error){
        res.status(500).json({ message: error })
    }
  });

// DELETE Eliminar formas de pago
router.delete("/:id", async (req, res) => {
    try {
        await FormaDePago.destroy({
            where: { forma_de_pago_id: req.params.id },
        });
        res.json({ message: `Se ha eliminado la forma de pago con el ID:  ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;