'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('producto',
      [{
        producto_nombre:"Hamburguesa cláscia",
        producto_descripcion: "Hamburguesa “senior” de 180 gramos: 100% sabrosa y carne de ternera, acompañada de lechuga, tomate, cebolla confitada y salsas.",
        producto_precio: 350,
        producto_imagen: "http://foodandroll.com/wp-content/uploads/2013/12/classic_burger_food_and_roll-631x449.jpg",
      },
      {
        producto_nombre:"Sandwich veggie",
        producto_descripcion: "Is crispy, crunchy, vegetarian perfection. Pile on the veggies any which way you want!",
        producto_precio: 310,
        producto_imagen: "https://www.subway.com/ns/images/menu/BOL/SPA/RPLC_veggie_delite.jpg",
      },
      {
        producto_nombre:"Ensalada veggie",
        producto_descripcion: "Vuelva su comida más crocante agregándole vegetales trozados, como lechuga, cebollas coloradas, tomates, pepinos y muchos más.",
        producto_precio: 340,
        producto_imagen: "https://www.subway.com/ns/images/menu/ECU/SPA/ChopVeggieSalad.jpg",
      },

      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('producto', null, {});
  }
}