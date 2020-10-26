'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('forma_de_pago', [{
      forma_de_pago_nombre: 'Efectivo',
    },
    {
      forma_de_pago_nombre: 'Tarjeta',
    }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('forma_de_pago', null, {});
  }
};
