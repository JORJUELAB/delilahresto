'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pedido',
      [{
        pedido_usuario_id: 1,
        pedido_estado_id: 1,
        pedido_forma_de_pago_id: 1,
        pedido_total: 500,
        date: "2020-10-20 21:33:04",
      },
      {
        pedido_usuario_id: 2,
        pedido_estado_id: 1,
        pedido_forma_de_pago_id: 2,
        pedido_total: 800,
        date: "2020-10-20 21:33:04",
      },
      {
        pedido_usuario_id: 2,
        pedido_estado_id: 5,
        pedido_forma_de_pago_id: 2,
        pedido_total: 760,
        date: "2020-10-20 21:33:04",
      },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pedido', null, {});
  }
}