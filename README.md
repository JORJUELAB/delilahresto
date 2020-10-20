# delilahresto
Descripción: Delilah resto, proyecto Backend - API REST usando NodeJS y MySQL
Description: Delilah resto, Backend project - API REST using NodeJS & MySQL

# Documentación Swagger
https://app.swaggerhub.com/apis/JORJUELAB/delilahresto/1.0.0#/

# Tecnologías:
Node JS
MySQL


# Descripción
Este proyecto conecta un servidor REST que comunica con una base de dátos MySQL, permite gestionar usuarios y sus roles, productos, pedidos, estados de pedidos y formas de pago.

#  Librerias usadas en el poyecto

body-parser: v1.19.0
cors: v2.8.5
express: v4.17.1 
jsonwebtoken: v8.5.1
mysql2: v2.2.5
sequelize: v6.3.5

#  Tablas creadas:

rol
usuario
pedido
detalle_de_pedido
estado
forma_de_pago
producto


# Requisitos
Validar la versión de:
    - NodeJS (v12.18.3).
    - MySQL.

# Instalación de repositorio local

Clone el repositorio del siguiente enlace:

git clone https://github.com/JORJUELAB/delilahresto

Para instalar las dependencias necesarias, ubiquese en la ruta del archivo package.json y ejecute:

npm install

Para iniciar el servidor con nodemon ejecute:

npm run dev

Para iniciar el servidor directamente ejecute:

node index.js


# Inicialización de datos

Ejecute el siguiente comando:

npx sequelize-cli db:seed:all

De esta manera se inicializan los datos en la base de datos creada. 

# End points

This API tiene 3 endpoints principales. 

- http://localhost:3000/user
- http://localhost:3000/producto
- http://localhost:3000/pedido

Para acceder a cada endpoint iniciando sesión y obteniendo un token de acceso.
Use el endpoint de http://localhost:3000/user/ login. Dependiendo de su perfil (administrador / usuario), podra acceder a diferentes endpoints, con ejecución de solicitudes específicas. 