const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = new Sequelize({ //database, usuario, password
  dialect: "mysql",
  host: "localhost", //dominio o ip donde corre Mysql
  //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente,
  username: "root",
  password: "1010216819Uc",
  database: "delilah_resto",
})
const Usuario = sequelize.define('usuario', {
  // Model attributes are defined here
  usuario_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario_rol_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  },
  usuario_nombre: {
    type: DataTypes.STRING(200),
    allowNull:false,
    unique:true,
  },
  nombre_apellido: {
    type: DataTypes.STRING(200),
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull:false,
    unique:true,
  },
  telefono: {
    type: DataTypes.STRING(200),
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(200),
  }
}, { 
  timestamps: false,
  tableName: 'usuario',
});
Usuario.prototype.toJSON = function () {
  let values = Object.assign({}, this.get())
  delete values.password
  return values;
}
module.exports = Usuario;