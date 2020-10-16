const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = new Sequelize ({ //database, usuario, password
    dialect: "mysql", 
    host: "localhost", //dominio o ip donde corre Mysql
    //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente,
    username: "root",
    password: "1010216819Uc",
    database: "delilah_resto",
})
const DetallePedido = sequelize.define('detallepedido', {
  // Model attributes are defined here
  detalle_pedido_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  detalle_pedido_pedido_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detalle_pedido_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detalle_pedido_cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    timestamps: false,
    tableName: 'detalle_pedido',
});

module.exports =  DetallePedido;