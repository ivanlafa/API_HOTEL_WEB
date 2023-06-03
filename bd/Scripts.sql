
/* Crear la base de datos */
CREATE DATABASE `hotel` /*!40100 DEFAULT CHARACTER SET utf8 */;

-- hotel.habitaciones definition

CREATE TABLE `habitaciones` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `numero` int(11) NOT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT '0',
  `created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- hotel.reservas definition

CREATE TABLE `reservas` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `codigo_habitacion` int(11) NOT NULL,
  `nombre_cliente` varchar(255) NOT NULL,
  `telefono_cliente` varchar(20) NOT NULL,
  `fecha_reserva` date NOT NULL,
  `fecha_entrada` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `eliminada` tinyint(1) DEFAULT '0',
  KEY `codigo_habitacion` (`codigo_habitacion`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`codigo_habitacion`) REFERENCES `habitaciones` (`codigo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- hotel.usuarios definition

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL UNIQUE,
  `contraseña` varchar(50) NOT NULL,
  `identificacion` int(11) NOT NULL UNIQUE,
  `telefono` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `eliminado` bit(1) NOT NULL DEFAULT b'0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
