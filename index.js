let express = require ('express');
let Sequelize = require ('sequelize');
const producto = require('./src/routes/producto');
const rol = require('./src/routes/rol');
const estado = require('./src/routes/estado');
const formaDePago = require('./src/routes/formaDePago');


const server = express();

//middleware importante 
server.use(express.json());
server.use('/producto', producto);
server.use('/rol', rol);
server.use('/estado', estado);
server.use('/formadepago', formaDePago);

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


//Mddleware para validar que hayan datos en el producto
/*function validateProduct(req,res,next){
    let name =  req.body.producto_nombre;
    let desc =  req.body.producto_descripcion;
    let price =  req.body.producto_precio;
    let url =  req.body.producto_imagen;

    if(name && desc && price && url){
        next();
    }else{
        res.status(400);
        res.json({message: "envíe la información completa"});
    }
}*/
