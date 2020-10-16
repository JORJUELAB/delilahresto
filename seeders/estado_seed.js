'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('estado',
      [{
        estado_nombre: 'Nuevo',
        estado_id: 1,
      },
      {
        estado_nombre: 'Confirmado',
        estado_id: 2,
      },
      {
        estado_nombre: 'Preparando',
        estado_id: 3,
      },
      {
        estado_nombre: 'Enviando',
        estado_id: 4,
      },
      {
        estado_nombre: 'Cancelado',
        estado_id: 5,
      },
      {
        estado_nombre: 'Entregado',
        estado_id: 6,
      },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('estado', null, {});
  }
}