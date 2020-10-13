const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = new Sequelize({ //database, usuario, password
  dialect: "mysql",
  host: "localhost", //dominio o ip donde corre Mysql
  //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente,
  username: "root",
  password: "1010216819Uc",
  database: "delilah_resto",
})
const Rol = sequelize.define('rol', {
  // Model attributes are defined here
  rol_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rol_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false,
  tableName: 'rol',
});

module.exports = Rol;