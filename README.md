# delilahresto
Descripción: Delilah resto, proyecto Backend - API REST usando NodeJS y MySQL
Description: Delilah resto, Backend project - API REST using NodeJS & MySQL

# Documentación Swagger / Swagger documentation
https://app.swaggerhub.com/apis/JORJUELAB/delilahresto/1.0.0#/

# Tecnologías / Technologies 
Node JS
MySQL


# Descripción / Description
Este proyecto conecta un servidor REST que comunica con una base de dátos MySQL, permite gestionar usuarios y sus roles, productos, pedidos, estados de pedidos y formas de pago.

This project connects a REST server that communicates with a MySQL database, allows managing users and their roles, products, orders, order status and payment methods.

#  Librerias usadas en el poyecto / Libraries used in the project 

body-parser: v1.19.0
cors: v2.8.5
express: v4.17.1 
jsonwebtoken: v8.5.1
mysql2: v2.2.5
sequelize: v6.3.5

#  Tablas creadas / Tables created 

rol
usuario
pedido
detalle_de_pedido
estado
forma_de_pago
producto


# Requisitos / Requirements

    - NodeJS (v12.18.3). (Verifica la versión / validate its version)
    - MySQL.

# Instalación de repositorio local /  Local repository installation

Clone el repositorio del siguiente enlace / Clone the repository from the following link:

https://github.com/JORJUELAB/delilahresto

Para instalar las dependencias necesarias, ubiquese en la ruta del archivo package.json y ejecute:
To install the necessary dependencies, go to the path of the package.json file and run:

npm install

Para iniciar el servidor con nodemon ejecute / To start the server with nodemon execute:

npm run dev

Para iniciar el servidor directamente ejecute / To start the directly execute:

node index.js


# Inicialización de datos / Data initialization

Ejecute el siguiente comando / Eun this command:

npx sequelize-cli db:seed:all

De esta manera se inicializan los datos en la base de datos creada.  / In this way you will inicializate the data in the database created

# End points

Eete API tiene 3 endpoints principales / This PAI have 3 main endpoints

- http://localhost:3000/user
- http://localhost:3000/producto
- http://localhost:3000/pedido

Para acceder a cada endpoint iniciando sesión y obteniendo un token de acceso.
Use el endpoint de http://localhost:3000/user/login. 
Dependiendo de su perfil (administrador / usuario), podra acceder a diferentes endpoints, con ejecución de solicitudes específicas. 

To access each endpoint, you must log in and obtain an access token.
Use the endpoint at http: // localhost: 3000/user/login. 
Depending on your profile (administrator / user), you can access different endpoints, executing specific requests.

Este es un ejemplo para la creación de pedidos

POST/pedido Request application/json
{
    "pedido_forma_de_pago_id": 2,
    "productos": [{
        "id": 1,
        "cantidad": 3
    },{
        "id": 2,
        "cantidad": 1
    }]
}