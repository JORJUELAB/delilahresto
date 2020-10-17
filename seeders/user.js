'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuario',
      [{
        usuario_rol_id: 1,
        usuario_nombre:"jessica",
        nombre_apellido: "jessica orjuela",
        email: "jessica@gmail.com",
        telefono: "3333333",
        direccion: "avenida xxx",
        password: bcrypt.hashSync("ensayo123", 10),
      },
      {
        usuario_rol_id: 2,
        usuario_nombre:"Jess_user",
        nombre_apellido: "user user",
        email: "user@gmail.com",
        telefono: "555",
        direccion: "avenida 13",
        password: bcrypt.hashSync("user123", 10),
      },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuario', null, {});
  }
}