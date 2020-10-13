const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = new Sequelize ({ //database, usuario, password
    dialect: "mysql", 
    host: "localhost", //dominio o ip donde corre Mysql
    //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente,
    username: "root",
    password: "1010216819Uc",
    database: "delilah_resto",
})
const Producto = sequelize.define('producto', {
  // Model attributes are defined here
  producto_id: {
    type: DataTypes.INTEGER,
    //allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  producto_nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,

  },
  producto_descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false
  },
  producto_precio: {
      type:  DataTypes.INTEGER,
      allowNull: false
  },
  producto_imagen: {
      type: DataTypes.STRING(255),
      allowNull: false
  },
}, {
    timestamps: false
});

module.exports =  Producto;