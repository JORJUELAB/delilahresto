let express = require ('express');
let Sequelize = require ('sequelize');

const server = express();

const db = new Sequelize ("delilah_resto", "root", "1010216819Uc", { //database, usuario, password
    dialect: "mysql", 
    host: "localhost", //dominio o ip donde corre Mysql
    //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente
});

server.listen(5000, ()=>{
    db.authenticate().then(()=>{
        console.log('Servidor coenctado exitosamente');
    });
});