const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = new Sequelize ({ //database, usuario, password
    dialect: "mysql", 
    host: "localhost", //dominio o ip donde corre Mysql
    //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente,
    username: "root",
    password: "1010216819Uc",
    database: "delilah_resto",
})
const Pedido = sequelize.define('pedido', {
  // Model attributes are defined here
  pedido_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pedido_usuario_id: {
    type: DataTypes.INTEGER,
  },
  pedido_estado_id: {
    type: DataTypes.INTEGER,
  },
  pedido_forma_de_pago_id: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATETIME,
    defaultValue: Sequelize.NOW
  },
}, {
    timestamps: false,
    tableName: 'pedido',
});

module.exports =  Pedido;