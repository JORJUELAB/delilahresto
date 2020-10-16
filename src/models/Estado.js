const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = new Sequelize ({ //database, usuario, password
    dialect: "mysql", 
    host: "localhost", //dominio o ip donde corre Mysql
    //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente,
    username: "root",
    password: "1010216819Uc",
    database: "delilah_resto",
})
const Estado = sequelize.define('estado', {
  // Model attributes are defined here
  estado_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  estado_nombre: {
    type: DataTypes.STRING(45),
    unique: true,
    allowNull:false
  },
}, {
  timestamps: false,
  tableName: 'estado',
});

module.exports = Estado;