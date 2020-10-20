let express = require ('express');
let Sequelize = require ('sequelize');
const producto = require('./src/routes/producto');
const rol = require('./src/routes/rol');
const estado = require('./src/routes/estado');
const formaDePago = require('./src/routes/formaDePago');
const user = require('./src/routes/usuario');
const cors = require("cors");
require('./src/config_env/config')


const server = express();

//middleware importante 
server.use(express.json());
server.use('/producto', producto);
server.use('/rol', rol);
server.use('/estado', estado);
server.use('/formadepago', formaDePago);
server.use('/user', user);
server.use(cors());


const db = new Sequelize ("delilah_resto", "root", "1010216819Uc", { //database, usuario, password
    dialect: "mysql", 
    host: "localhost", //dominio o ip donde corre Mysql
    //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente
});

server.listen(3003, ()=>{
    db.authenticate().then(()=>{
        console.log("Servidor conectado exitosamente");
    });
});
