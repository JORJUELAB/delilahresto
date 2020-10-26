'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('detalle_pedido',
      [{

        detalle_pedido_pedido_id: 1,
        detalle_pedido_producto: 1,
        detalle_pedido_cantidad: 3,
      },
      {

        detalle_pedido_pedido_id: 2,
        detalle_pedido_producto: 2,
        detalle_pedido_cantidad: 3,
      },
      {

        detalle_pedido_pedido_id: 3,
        detalle_pedido_producto: 3,
        detalle_pedido_cantidad: 3,
      },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('detalle_pedido', null, {});
  }
}