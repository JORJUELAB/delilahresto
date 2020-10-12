const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = new Sequelize ({ //database, usuario, password
    dialect: "mysql", 
    host: "localhost", //dominio o ip donde corre Mysql
    //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente,
    username: "root",
    password: "1010216819Uc",
    database: "delilah_resto",
})
const FormaDePago = sequelize.define('formadepago', {
  // Model attributes are defined here
  forma_de_pago_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  forma_de_pago_nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false
});
module.exports =  FormaDePago;