-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-03-2023 a las 16:48:21
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca_pruebas_udemy`
--
create database biblioteca_pruebas_udemy;

use biblioteca_pruebas_udemy;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adminusuarios`
--

CREATE TABLE `adminusuarios` (
  `id_usuario` varchar(10) NOT NULL,
  `nom_usuario` varchar(500) NOT NULL,
  `contrasena` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `adminusuarios`
--

INSERT INTO `adminusuarios` (`id_usuario`, `nom_usuario`, `contrasena`) VALUES
('adm0001', 'Sergio Peralta', 'sergiop');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE `autores` (
  `id_autor` varchar(300) NOT NULL,
  `nom_autor` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id_autor`, `nom_autor`) VALUES
('a0001', 'Walter Riso'),
('a0002', 'Harvey M. Deitel'),
('a0003', 'Paul J. Deitel'),
('a0004', 'Paulo Coelho'),
('a0005', 'Nilo Ney Coutinho Menezes'),
('a0006', 'Stephen King');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` varchar(100) NOT NULL,
  `nom_categoria` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nom_categoria`) VALUES
('c0001', 'Fantasia'),
('c0002', 'Ingenieria'),
('c0003', 'Medicina'),
('c0004', 'Thriller'),
('c0005', 'Superacion Personal'),
('c0006', 'Infantil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `editoriales`
--

CREATE TABLE `editoriales` (
  `id_editorial` varchar(300) NOT NULL,
  `nom_editorial` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `editoriales`
--

INSERT INTO `editoriales` (`id_editorial`, `nom_editorial`) VALUES
('e0001', 'AlfaOmega'),
('e0002', 'Planeta'),
('e0003', 'Debolsillo'),
('e0004', 'Pearson Prentice Hall');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `isbn` varchar(15) NOT NULL,
  `portada` varchar(500) DEFAULT NULL,
  `nom_libro` varchar(500) NOT NULL,
  `autor` text NOT NULL,
  `descripcion` text DEFAULT NULL,
  `editorial` varchar(500) NOT NULL,
  `anio_publicacion` varchar(4) DEFAULT NULL,
  `edicion` varchar(100) DEFAULT NULL,
  `existencias` int(11) NOT NULL,
  `categoria` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`isbn`, `portada`, `nom_libro`, `autor`, `descripcion`, `editorial`, `anio_publicacion`, `edicion`, `existencias`, `categoria`) VALUES
('1234567891234', '1234567891234.png', 'IT', 'Stephen King', 'Suspenso y terror', 'Debolsillo', '2010', '8', 20, 'Thriller'),
('3210987654321', '3210987654321.png', 'el alquimista', 'Paulo Coelho', '', 'Planeta', '2006', '2', 10, 'Superacion Personal'),
('9786070768828', '9786070768828.png', 'Atrevete a ser quien eres', 'Walter Riso', NULL, 'Planeta', '2002', '3', 15, 'Superacion Personal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `id_prestamo` varchar(100) NOT NULL,
  `isbn` varchar(15) NOT NULL,
  `id_usuario` varchar(5) NOT NULL,
  `fecha_prestamo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` varchar(5) NOT NULL,
  `nom_usuario` varchar(500) NOT NULL,
  `estado_usuario` varchar(100) DEFAULT NULL,
  `contrasena` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nom_usuario`, `estado_usuario`, `contrasena`) VALUES
('u0001', 'Sergio Peralta', NULL, 'sergiop'),
('u0002', 'Jose Luis Perez', NULL, 'josep'),
('u0003', 'Laura Morales', NULL, 'lauram'),
('u0004', 'Enrique', NULL, '123456'),
('u0010', 'Maria Angeles', NULL, 'ma1991');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adminusuarios`
--
ALTER TABLE `adminusuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id_autor`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `editoriales`
--
ALTER TABLE `editoriales`
  ADD PRIMARY KEY (`id_editorial`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`isbn`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`id_prestamo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
