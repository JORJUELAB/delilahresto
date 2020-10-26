'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('estado',
      [{
        estado_nombre: 'Nuevo',
      },
      {
        estado_nombre: 'Confirmado',
      },
      {
        estado_nombre: 'Preparando',
      },
      {
        estado_nombre: 'Enviando',
      },
      {
        estado_nombre: 'Cancelado',
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