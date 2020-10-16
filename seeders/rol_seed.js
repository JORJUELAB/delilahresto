'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rol', [{
      rol_name: 'administrador',
      rol_id: 1,
    },
    {
      rol_name: 'usuario',
      rol_id: 2,
    }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rol', null, {});
  }
}

