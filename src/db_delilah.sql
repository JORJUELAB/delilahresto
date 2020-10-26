	/*Base de datos*/
DROP DATABASE IF EXISTS delilah_resto;
CREATE DATABASE delilah_resto;
USE delilah_resto;
/*Forma de pago*/
DROP TABLE IF EXISTS `forma_de_pago`;
CREATE TABLE `delilah_resto`.`forma_de_pago` (
  `forma_de_pago_id` INT NOT NULL AUTO_INCREMENT,
  `forma_de_pago_nombre` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`forma_de_pago_id`),
  UNIQUE INDEX `forma_de_pago_nombre_UNIQUE` (`forma_de_pago_nombre` ASC) VISIBLE);

/*Estado*/
DROP TABLE IF EXISTS `estado`;
CREATE TABLE `delilah_resto`.`estado` (
  `estado_id` INT NOT NULL AUTO_INCREMENT,
  `estado_nombre` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`estado_id`),
  UNIQUE INDEX `estado_nombre_UNIQUE` (`estado_nombre` ASC) VISIBLE);

/*Rol*/
DROP TABLE IF EXISTS `rol`;
CREATE TABLE `delilah_resto`.`rol` (
  `rol_id` INT NOT NULL,
  `rol_name` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`rol_id`),
  UNIQUE INDEX `rol_name_UNIQUE` (`rol_name` ASC) VISIBLE);

/*Usuario*/
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `delilah_resto`.`usuario` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `usuario_rol_id` INT DEFAULT '2',
  `usuario_nombre` VARCHAR(200) DEFAULT NULL,
  `nombre_apellido` VARCHAR(200) DEFAULT NULL,
  `email` VARCHAR(200) DEFAULT NULL,
  `telefono` VARCHAR(200) DEFAULT NULL,
  `direccion` VARCHAR(200) DEFAULT NULL,
  `password` VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `usuario_nombre_UNIQUE` (`usuario_nombre` ASC) VISIBLE);


/*Producto*/
CREATE TABLE `delilah_resto`.`producto` (
  `producto_id` INT NOT NULL AUTO_INCREMENT,
  `producto_nombre` VARCHAR(100) DEFAULT NULL,
  `producto_descripcion` VARCHAR(200) DEFAULT NULL,
  `producto_precio` INT DEFAULT NULL,
  `producto_imagen` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`producto_id`));


CREATE TABLE `delilah_resto`.`pedido` (
  `pedido_id` INT NOT NULL AUTO_INCREMENT,
  `pedido_usuario_id` INT NOT NULL,
  `pedido_estado_id` INT DEFAULT '1',
  `pedido_forma_de_pago_id` INT DEFAULT '1',
  `pedido_total` INT,
  `date` datetime NOT NULL,
  PRIMARY KEY (`pedido_id`),
  INDEX `fk_pedido_usuario_id_idx` (`pedido_usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_usuario_id`
    FOREIGN KEY (`pedido_usuario_id`)
    REFERENCES `delilah_resto`.`usuario` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `delilah_resto`.`detalle_pedido` (
  `detalle_pedido_id` INT NOT NULL AUTO_INCREMENT,
  `detalle_pedido_pedido_id` INT DEFAULT NULL,
  `detalle_pedido_producto` INT DEFAULT NULL,
  `detalle_pedido_cantidad` INT DEFAULT NULL,
  PRIMARY KEY (`detalle_pedido_id`));
