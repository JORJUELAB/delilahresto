'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('forma_de_pago', [{
      forma_de_pago_nombre: 'efectivo',
      forma_de_pago_id: 1,
    },
    {
      forma_de_pago_nombre: 'tarjeta',
      forma_de_pago_id: 2,
    }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('forma_de_pago', null, {});
  }
};
