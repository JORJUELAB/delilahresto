let express = require ('express');
let Sequelize = require ('sequelize');
let jwt = require('jsonwebtoken');

const server = express();

//middleware importante 
server.use(express.json());

const db = new Sequelize ("delilah_resto", "root", "1010216819Uc", { //database, usuario, password
    dialect: "mysql", 
    host: "localhost", //dominio o ip donde corre Mysql
    //port: 3306 el lo toma por defecto, se debe cambiar si se establece un puerto diferente
});

server.listen(5000, ()=>{
    db.authenticate().then(()=>{
        console.log("Servidor conectado exitosamente");
    });
});

//CRUD PRODUCTO
function validateProduct(req,res,next){
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
}
//Create -> Post
server.post("/productos", validateProduct, (req, res, next)=>{
    let name =  req.body.producto_nombre;
    let desc =  req.body.producto_descripcion;
    let price =  req.body.producto_precio;
    let url =  req.body.producto_imagen;

    db.query("INSERT INTO `delilah_resto`.`producto` (`producto_nombre`, `producto_descripcion`, `producto_precio`, `producto_imagen`) " + 
            "VALUES (:nam, :des, :pr, :url);", {
                type: Sequelize.QueryTypes.INSERT,
                replacements: {
                    nam: name,
                    des: desc,
                    pr: price,
                    url: url
                }
            }).then((data)=>{
                res.json(data);
            }).catch((error)=>{
                res.status(500) //500 internal server
                console.log(error);
                res.json(error);
            })
})
//Read

//Update
server.put("/productos/:id", validateProduct, (req, res, next)=>{
    let name =  req.body.producto_nombre;
    let desc =  req.body.producto_descripcion;
    let price =  req.body.producto_precio;
    let url =  req.body.producto_imagen;
    let ident = req.params.id;

    db.query("UPDATE `delilah_resto`.`producto` " + 
            "SET `producto_nombre` = :nam, `producto_descripcion` = :des, `producto_precio` = :pr, `producto_imagen` = :url " + 
            "WHERE (`producto_id` = :idp);", {
                type: Sequelize.QueryTypes.UPDATE,
                replacements: {
                    nam: name,
                    des: desc,
                    pr: price,
                    url: url,
                    idp: ident
                }
            }).then((data)=>{
                res.json();
            }).catch((error)=>{
                res.status(500) //500 internal server
                console.log(error);
                res.json(error);
            })
})

//Delete
