-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2020 at 02:58 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id_cart` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id_cart`, `id_user`, `id_item`, `qty`, `created_at`, `updated_at`) VALUES
(8, 1, 2, 2, '2020-10-01 09:57:31', '2020-10-01 09:57:31'),
(9, 3, 2, 2, '2020-10-01 10:20:03', '2020-10-01 10:20:03'),
(11, 3, 16, 2, '2020-10-01 10:31:13', '2020-10-01 10:31:13'),
(13, 3, 15, 1, '2020-10-01 10:36:31', '2020-10-01 10:36:31'),
(14, 3, 15, 1, '2020-10-01 10:39:07', '2020-10-01 10:39:07'),
(15, 3, 10, 1, '2020-10-01 10:40:45', '2020-10-01 10:40:45'),
(20, 1, 2, 2, '2020-10-01 14:27:27', '2020-10-01 14:27:27'),
(22, 1, 15, 2, '2020-10-02 04:17:25', '2020-10-02 04:17:25'),
(23, 43, 2, 2, '2020-10-03 09:19:28', '2020-10-03 09:19:28'),
(24, 43, 17, 2, '2020-10-03 09:30:25', '2020-10-03 09:30:25'),
(26, 43, 17, 1, '2020-10-04 06:00:10', '2020-10-04 06:00:10'),
(27, 43, 15, 1, '2020-10-04 06:28:53', '2020-10-04 06:28:53'),
(28, 43, 15, 1, '2020-10-11 03:47:35', '2020-10-11 03:47:35'),
(29, 44, 15, 1, '2020-10-11 13:51:55', '2020-10-11 13:51:55'),
(30, 44, 16, 2, '2020-10-11 13:52:20', '2020-10-11 13:52:20'),
(31, 44, 17, 1, '2020-10-11 13:52:34', '2020-10-11 13:52:34'),
(32, 44, 18, 2, '2020-10-12 01:59:45', '2020-10-12 01:59:45'),
(33, 44, 20, 3, '2020-10-12 02:51:55', '2020-10-12 02:51:55'),
(34, 44, 22, 1, '2020-10-13 00:06:13', '2020-10-13 00:06:13'),
(35, 48, 21, 2, '2020-10-13 16:54:31', '2020-10-13 16:54:31'),
(36, 48, 21, 2, '2020-10-13 16:55:10', '2020-10-13 16:55:10'),
(37, 48, 16, 1, '2020-10-13 17:16:04', '2020-10-13 17:16:04'),
(38, 49, 18, 2, '2020-10-13 18:02:47', '2020-10-13 18:02:47'),
(39, 50, 17, 1, '2020-10-13 18:04:50', '2020-10-13 18:04:50'),
(40, 52, 18, 2, '2020-10-14 01:46:02', '2020-10-14 01:46:02'),
(41, 52, 15, 1, '2020-10-14 01:46:19', '2020-10-14 01:46:19'),
(42, 52, 17, 1, '2020-10-14 04:33:00', '2020-10-14 04:33:00'),
(43, 52, 16, 2, '2020-10-14 09:56:26', '2020-10-14 09:56:26');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `name_category` varchar(80) NOT NULL,
  `picture` varchar(111) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `name_category`, `picture`, `created_at`, `updated_at`) VALUES
(1, 'Mouse', NULL, '2020-09-18 13:47:50', '2020-09-18 13:47:50'),
(2, 'Keyboard', NULL, '2020-09-18 13:48:05', '2020-09-18 13:48:05'),
(3, 'Headset', NULL, '2020-09-18 13:48:10', '2020-09-18 13:48:10'),
(6, 'Laptop', NULL, '2020-09-18 14:46:11', '2020-09-18 14:46:11'),
(8, 'Android', NULL, '2020-09-18 15:17:19', '2020-09-18 15:17:19'),
(16, 'Electronic', NULL, '2020-09-21 08:24:15', '2020-09-21 08:24:15'),
(17, 'T-shirt', 'undefined', '2020-09-23 09:15:10', '2020-09-23 09:15:10'),
(18, 'T-shirt', 'undefined', '2020-09-23 09:16:35', '2020-09-23 09:16:35'),
(19, 'T-shirt', 'undefined', '2020-09-23 09:18:09', '2020-09-23 09:18:09'),
(20, 'T-shirt', 'undefined', '2020-09-23 09:20:10', '2020-09-23 09:20:10'),
(23, 'T-shirt', 'undefined', '2020-09-23 09:25:58', '2020-09-23 09:25:58'),
(24, 'T-shirt', 'undefined', '2020-09-23 09:28:51', '2020-09-23 09:28:51'),
(25, 'T-shirt', 'undefined', '2020-09-23 09:30:03', '2020-09-23 09:30:03'),
(26, 'T-shirt', 'undefined', '2020-09-23 09:31:27', '2020-09-23 09:31:27'),
(27, 'T-shirt', 'e1418c5af9d028b059962cd1c77d8da0', '2020-09-23 09:35:14', '2020-09-23 09:35:14'),
(28, 'Shoes', '81f4788e5fa3145d3507ad342ed8bac5', '2020-09-23 09:41:10', '2020-09-23 09:41:10'),
(29, 'Parfum', 'baadf4bdb8d8a42ce0f69884d9243265', '2020-09-23 09:44:15', '2020-09-23 09:44:15'),
(30, 'Parfum', '0b06ca174b062de8415de0f179e81419', '2020-09-23 09:47:45', '2020-09-23 09:47:45'),
(31, 'Parfum', '687cf4abd5090c18fefbda9670ed1c5e', '2020-09-23 09:54:10', '2020-09-23 09:54:10'),
(32, 'Parfum', 'caf8f512635ff02c32cfe75d02dc0ece', '2020-09-23 09:56:42', '2020-09-23 09:56:42'),
(33, 'Parfum', '48f619567226471789acb16cf367b382', '2020-09-23 09:58:26', '2020-09-23 09:58:26'),
(34, 'Parfum', '50124785b.jpg', '2020-09-23 10:26:53', '2020-09-23 10:26:53'),
(35, 'Parfum', 'e767c54fb900ba87f6822a89e93fac37', '2020-09-23 10:31:41', '2020-09-23 10:31:41'),
(36, 'Parfum', 'f654da67e840953809f912caabbb6f3b', '2020-09-23 10:36:24', '2020-09-23 10:36:24'),
(37, 'Parfum', 'b8d4eec70ac846579fd7361cc1f7c941', '2020-09-23 10:36:38', '2020-09-23 10:36:38'),
(38, 'Parfum', '50124785b.jpg', '2020-09-23 10:52:20', '2020-09-23 10:52:20'),
(39, 'Parfum', '44333.jpg', '2020-09-23 11:15:02', '2020-09-23 11:15:02'),
(40, 'Parfum', '44333.jpg', '2020-09-23 11:16:32', '2020-09-23 11:16:32'),
(41, 'Parfum', '44333.jpg', '2020-09-23 11:26:22', '2020-09-23 11:26:22'),
(42, 'Parfum', '44333.jpg', '2020-09-23 11:26:43', '2020-09-23 11:26:43'),
(43, 'Parfum', '44333.jpg', '2020-09-23 11:31:50', '2020-09-23 11:31:50'),
(44, 'Parfum', '44333.jpg', '2020-09-23 11:31:50', '2020-09-23 11:31:50'),
(45, 'Parfum', '44333.jpg', '2020-09-23 11:31:50', '2020-09-23 11:31:50'),
(46, 'Parfum', '44333.jpg', '2020-09-23 11:31:56', '2020-09-23 11:31:56'),
(47, 'Parfum', '44333.jpg', '2020-09-23 11:32:17', '2020-09-23 11:32:17'),
(48, 'Parfum', '44333.jpg', '2020-09-23 11:32:35', '2020-09-23 11:32:35'),
(49, 'Parfum', '44333.jpg', '2020-09-23 11:57:58', '2020-09-23 11:57:58'),
(53, 'Mix', 'qck+.png', '2020-09-24 02:24:45', '2020-09-24 02:24:45'),
(54, 'M', 'qck+.png', '2020-09-24 02:26:07', '2020-09-24 02:26:07'),
(55, 'M', 'qck+.png', '2020-09-24 07:27:04', '2020-09-24 07:27:04'),
(56, 'Mdd', 'qck+.png', '2020-09-26 04:07:36', '2020-09-26 04:07:36'),
(57, 'Mdd', 'qck+.png', '2020-09-26 04:08:51', '2020-09-26 04:08:51'),
(58, 'Mdd', 'qck+.png', '2020-09-26 04:11:21', '2020-09-26 04:11:21'),
(59, 'PPO', 'undefined', '2020-09-26 04:12:26', '2020-09-26 04:12:26'),
(61, 'kkccc', 'qck+.png', '2020-09-26 08:36:14', '2020-09-26 08:36:14'),
(62, 'kkcccfffff', 'qck+.png', '2020-09-26 09:09:43', '2020-09-26 09:09:43'),
(63, 'kkcccfffff', 'qck+.png', '2020-09-27 03:38:07', '2020-09-27 03:38:07'),
(64, 'kkcccfffff', 'qck+.png', '2020-09-27 03:39:23', '2020-09-27 03:39:23'),
(65, 'kkcccfffff', 'qck+.png', '2020-10-01 13:45:24', '2020-10-01 13:45:24');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id_item` int(11) NOT NULL,
  `image` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id_item` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `picture` varchar(111) NOT NULL,
  `id_color` int(11) NOT NULL,
  `id_condition` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id_item`, `id_category`, `name`, `price`, `description`, `picture`, `id_color`, `id_condition`, `created_at`, `updated_at`) VALUES
(2, 3, 'Siberia v2', 700000, 'Headset gaming', '0', 0, 0, NULL, NULL),
(6, 1, 'Aquila', 250000, 'Mouse low budged', '0', 0, 0, NULL, NULL),
(8, 7, 'Ducky', 1200000, 'Mechacnical keyboard gaming', '0', 0, 0, NULL, NULL),
(9, 6, 'MacBook Retina', 25000000, 'Laptop with retina screen', 'arkademy.png', 0, 0, NULL, NULL),
(10, 6, 'MacBook Slimm', 25000000, 'Laptop slimm body', 'abstract_vector.jpg', 0, 0, NULL, NULL),
(11, 6, 'MacBook Air', 25000000, 'Laptop big body', 'abstract_vector.jpg', 0, 0, '2020-09-26 07:49:58', '2020-09-26 07:49:58'),
(12, 6, 'ASUS ROG', 25000000, 'Laptop gaming', 'IconBali.png', 0, 0, '2020-09-26 08:12:00', '2020-09-26 08:12:00'),
(13, 6, 'Acel Predator', 25000000, 'Laptop gaming', '2020-09-22 (3).png', 0, 0, '2020-09-26 08:13:56', '2020-09-26 08:13:56'),
(14, 6, 'Acel Perior', 25000000, 'Laptop gaming', '2020-09-22 (3).png', 0, 0, '2020-09-26 08:16:40', '2020-09-26 08:16:40'),
(15, 1, 'Sades 100', 400000, 'Mouse semi gaming', 'screen-12.jpg', 2, 1, '2020-09-26 09:11:06', '2020-09-01 13:38:41'),
(16, 6, 'Acel Aspire', 25000000, 'Laptop gaming', 'abstract_vector.jpg', 2, 1, '2020-09-27 11:27:04', '2020-09-27 11:27:04'),
(17, 6, 'Lenovo 100', 14000000, 'Laptop gaming', 'ajazzak33.jpg', 2, 1, '2020-10-01 12:32:12', '2020-10-01 12:32:12'),
(18, 6, 'Dell doll', 14000000, 'Laptop for school', '50124785b.jpg', 4, 1, '2020-10-01 12:56:46', '2020-10-01 12:56:46'),
(19, 6, 'Acer Aspire 3 Ryzen 5', 20000000, 'Laptop for school', 'electra.jpg', 3, 1, '2020-10-01 12:58:36', '2020-10-01 12:58:36'),
(20, 6, 'Mac Air Pro', 20000000, 'Laptop mac', 'electra.jpg', 3, 1, '2020-10-01 13:00:56', '2020-10-01 13:00:56'),
(21, 6, 'Mac Air Pro', 20000000, 'Laptop mac', 'electra.jpg', 3, 1, '2020-10-01 13:30:18', '2020-10-01 13:30:18'),
(22, 6, 'Mac Air Pro', 20000000, 'Laptop mac', 'electra.jpg', 3, 1, '2020-10-02 04:12:35', '2020-10-02 04:12:35');

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE `product_colors` (
  `id_color` int(11) NOT NULL,
  `color` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_colors`
--

INSERT INTO `product_colors` (`id_color`, `color`) VALUES
(1, 'red'),
(2, 'blue'),
(3, 'gray'),
(4, 'green'),
(6, 'arr'),
(7, 'white');

-- --------------------------------------------------------

--
-- Table structure for table `product_conditions`
--

CREATE TABLE `product_conditions` (
  `id_condition` int(11) NOT NULL,
  `condition` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_conditions`
--

INSERT INTO `product_conditions` (`id_condition`, `condition`) VALUES
(1, 'New'),
(2, 'Secondhand');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id_transaction` int(11) NOT NULL,
  `id_cart` int(11) NOT NULL,
  `id_address` int(11) NOT NULL,
  `summary` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(60) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `date` date NOT NULL,
  `image` varchar(30) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `id_role`, `name`, `email`, `password`, `phone`, `gender`, `date`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 'Wahyu Ramadan', 'wramadan1203@gmail.com', '12', '082257022981', 'Male', '2000-03-12', '', NULL, NULL),
(2, 2, 'wramadan', 'w@gmail.com', '$2b$10$mlcOrLiu8HI0zY7TUAQCVem0Au017bj4bnXYOzGi/Gc', '081123432234', '', '0000-00-00', '', NULL, NULL),
(3, 2, 'Wahyu Candra', 'zankaralv5@gmail.com', '2', '082256022981', 'Male', '2000-03-12', '', NULL, NULL),
(4, 2, 'Wahyu', 'undefined', '121', '081123432234', '', '0000-00-00', '', NULL, NULL),
(5, 2, 'undefined', 'zankaralv5@gmail.com', '1', '081123432234', 'Male', '0000-00-00', '', NULL, NULL),
(6, 2, 'undefined', 'zankaralv5@gmail.com', '1', '081123432234', 'Male', '0000-00-00', '', NULL, NULL),
(7, 2, 'undefined', 'zankaralv5@gmail.com', '1', '081123432234', 'Male', '0000-00-00', '', NULL, NULL),
(8, 2, 'undefined', 'zankaralv5@gmail.com', '1', '081123432234', 'Male', '0000-00-00', '', NULL, NULL),
(9, 2, 'undefined', 'zankaralv5@gmail.com', '1', '081145432234', 'Male', '0000-00-00', '', NULL, NULL),
(10, 2, 'undefined', 'sekartaji@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(11, 2, 'undefined', 'sekartaji@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(12, 2, 'undefined', 'nila@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(13, 2, 'undefined', 'nila@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(14, 2, 'undefined', 'nila@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(15, 2, 'undefined', 'nila@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(16, 2, 'undefined', 'nila@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(17, 2, 'undefined', 'nila@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(18, 2, 'undefined', 'aaas@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(19, 2, 'undefined', 'aaas@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(20, 2, 'undefined', 'aaas@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(21, 2, 'undefined', 'asas@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(22, 2, 'undefined', 'as@gmail.com', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(23, 2, 'undefined', 'ss', '1', '081145432266', 'Female', '0000-00-00', '', NULL, NULL),
(24, 2, 'undefined', 'zankaralv56@gmail.com', '1', '081123432234', 'Male', '0000-00-00', '', NULL, NULL),
(25, 2, 'undefined', 'sujiwo@ncok.com', '1', '081176899875', 'Male', '1995-02-12', '', NULL, NULL),
(26, 2, 'undefined', 'zankaralv55@gmail.com', '1', '081123432238', 'Male', '0000-00-00', '', NULL, NULL),
(27, 2, 'undefined', 'rams@gmail.com', '1', '081123432238', 'Male', '0000-00-00', '', NULL, NULL),
(28, 2, 'Tukimen', 'tukimen@ncok.com', '$2b$10$ZRx', '081176899875', 'Male', '1995-02-10', '', NULL, NULL),
(29, 2, 'Cahyono', 'cahyo@ncok.com', '$2b$10$TQT', '081176899875', 'Male', '1990-02-10', '', NULL, NULL),
(30, 2, 'Sugeng', 'geng@ncok.com', '$2b$10$U5h', '081176899875', 'Male', '1990-02-10', '', NULL, NULL),
(31, 2, 'Sugenggggg', 'ssssgeng@ncok.com', '$2b$10$7Xd', '081176899875', 'Male', '1990-02-10', '', NULL, NULL),
(32, 2, 'Sugenggggg', 'ssssgeng@ncok.com', '$2b$10$Q/R', '081176899875', 'Male', '1990-02-10', '', NULL, NULL),
(33, 2, 'Sugenggggg', 'ssssgeng@ncok.com', '$2b$10$ZfZ', '081176899875', 'Male', '1990-02-10', '', NULL, NULL),
(34, 2, 'Sugenggggg', 'ssssgeng@ncok.com', '$2b$10$sMk', '081176899875', 'Male', '1990-02-10', '', NULL, NULL),
(35, 2, 'Sugenggggg', 'ssssgeng@ncok.com', '$2b$10$q5d', '081176899875', 'Male', '1990-02-10', '', NULL, NULL),
(36, 2, 'Sukri', 'sukri@yahoo.com', '$2b$10$xVb', '081123445443', 'Male', '1992-05-05', '', NULL, NULL),
(37, 2, 'Sukri', 'sukri@yahoo.com', '$2b$10$baI', '081123445443', 'Male', '1992-05-05', '', NULL, NULL),
(38, 2, 'Sukri', 'sukri@yahoo.com', '$2b$10$opk', '081123445443', 'Male', '1992-05-05', '', NULL, NULL),
(39, 2, 'Supriyadi', 'supri@yahoo.com', '$2b$10$wI2', '081123445443', 'Male', '1992-05-05', '', NULL, NULL),
(40, 2, 'Supriyadi', 'sup@yahoo.com', '$2b$10$NkW', '081123445443', 'Male', '1992-05-05', '', NULL, NULL),
(41, 2, 'Sugeng gendeng', 'geng@gmail.com', '$2a$10$l0pl58SiamArnrQFlb4u5utFEayRiy.2zHZdo4LrBQA', '081123432234', 'Male', '0000-00-00', '', NULL, NULL),
(42, 2, 'Supriyadi', 'suksuk@yahoo.com', '$2b$10$bGhgXjMKwyjL4CVOeeO9gur5Z0aOtem8pFmKTLKlJXt', '081123445443', 'Male', '1992-05-05', '', NULL, NULL),
(43, 2, 'Wahyu Ramadan', 'sus@gmail.com', '$2b$10$j12dAsjcYUcugFA6r0isqu5THWfFZkzziuEP99hBvAG0r0myz6MRK', '085567778227', 'Female', '2000-03-12', '$', NULL, NULL),
(44, 2, 'Susilo', 'sus@gmail.com', '$2b$10$FtpepHQmpjoTKWL9NYkWhuIdAzarZXadlWKvaRM25Ihw0CdKV0M9m', '085567778227', 'Female', '1995-02-01', '5a8ada73cd7602b48868857843e8ae', NULL, NULL),
(45, 2, 'Sandy Trisna', 'tris@gmail.com', '$2a$10$4M4PPXv/bslCXa7Utwg7kucYhNFKU7bDOSkrmriju10cUwpreKkT6', '', 'Male', '0000-00-00', '', NULL, NULL),
(46, 2, 'KPK', 'mulek@gmail.com', '$2a$10$4thmkLccsh/8fUcQ1ExVTuyYJFzSaGqDO3afiGpwoEm5IgVH./kS6', '', 'Male', '0000-00-00', '', NULL, NULL),
(47, 2, 'KPK', 'keklek@gmail.com', '$2b$10$Ap6PGb3rGEKLatFvDFeq8uOj/WpLM3WnmU0w0NInJbKwTo5b250pm', '', 'Female', '2000-03-12', '$', NULL, NULL),
(48, 2, 'Wahyu Ramadan', 'wr@gmail.com', 'undefined', '082257022981', 'Male', '2000-03-21', '', NULL, NULL),
(49, 2, 'Sumeh', 'sumeh@yahoo.com', '$2a$10$9ibqRlPcw5eqk.CjF4MbEeLp9B60xRVVFc517C7.cH8q49TpRqFWi', '', 'Male', '0000-00-00', '', NULL, NULL),
(50, 2, 'Wahyu Ramadan', 'wr7@gmail.com', 'undefined', '082257022981', 'Male', '2000-03-12', '', NULL, NULL),
(51, 2, 'Supri', 'sup@gmail.com', 'undefined', '082257022981', 'Female', '2000-03-12', '', NULL, NULL),
(52, 2, 'Wahyu Ramadan', 'wrama7@gmail.com', '$2a$10$t9liLeA9ZJuNwEu4RW09lefEnbnNijw.4av7BfSoUQc5Uqk1/smTK', '082257022981', 'Female', '2000-03-12', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id_address` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `home_address` text NOT NULL,
  `recepients_name` varchar(50) NOT NULL,
  `recepients_number` varchar(11) NOT NULL,
  `address` text NOT NULL,
  `postal_code` int(5) NOT NULL,
  `city` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`id_address`, `id_user`, `home_address`, `recepients_name`, `recepients_number`, `address`, `postal_code`, `city`) VALUES
(1, 1, 'Jl. Wahid Hasyim', 'Wahyu', '12', 'Ngunut, Tulungagung', 662592, 'Tulungagung'),
(2, 1, 'Jl. Wahid Hasyim', 'Aldy', '12', 'Ngunut, Tulungagung', 662592, 'Tulungagung'),
(3, 1, 'Jl. Jalan', 'Aldy', '12', 'Ngunut, Tulungagung', 662592, 'Tulungagung'),
(4, 1, 'Jl. Jalan', 'Aldy', '12', 'Ngunut, Tulungagung', 662592, 'Tulungagung'),
(6, 1, 'Dsn. Beji, Kec. Ngunut', 'Wahyu Ramadan', '08225702298', 'Jl. Wahid Hasyim, Kec. Ngunut, Kab. Tulungagung', 662592, 'Tulungagung'),
(8, 43, 'Jl. Wahid Hasyim, Kec. Ngunut, Kab. Tulungagung', 'Wahyu Ramadan', '08225702298', 'Jl. Wahid Hasyim, Kec. Ngunut, Kab. Tulungagung', 662592, 'Tulungagung'),
(10, 44, 'Jl. Wahid Hasyim, Kec. Ngunut, Kab. Tulungagung', 'Wahyu Aldyansah', '08775677477', 'Jl. Wahid Hasyim, Kec. Ngunut, Kab. Tulungagung', 662592, 'Tulungagung'),
(11, 44, 'Jl. Wahid Hasyim, Kec. Ngunut, Kab. Tulungagung', 'Wahyu Ramaan', '08775677477', 'Jl. Wahid Hasyim, Kec. Ngunut, Kab. Tulungagung', 662592, 'Tulungagung'),
(12, 44, 'aaa', 'awaw', 'wawww', 'lkklk', 662592, 'awiawi'),
(13, 50, 'Jl. Wahid Hasyim, Kec. Ngunut, Kab. Tulungagung', 'Wahyu Ramaan', '08775677477', 'Jl. Wahid Hasyim, Kec. Ngunut, Kab. Tulungagung', 662592, 'Tulungagung'),
(14, 50, 'Bei', 'Rama', '08225702981', 'Ngunut', 662502, 'Yuei'),
(15, 50, 'qqq', 'ew', 'wwe', 'ewew', 7878, 'eww'),
(16, 52, 'Jl. Waid Hasyim, Kec. Ngunut, Kab. Tulungagung', 'Rama', '08225702298', 'Jl. Waid Hasyim, Kec. Ngunut, Kab. Tulungagung', 662502, 'Ngunut'),
(17, 52, 'Jl. Waid Hasyim, RT.RW 001,002, Kec. Ngunut, Kab. Tulungagung, Jawa Timur', 'Wahyu Ramadan', '08225702298', 'Jl. Waid Hasyim, RT.RW 001,002, Kec. Ngunut, Kab. Tulungagung, Jawa Timur', 662505, 'Tulungagung');

-- --------------------------------------------------------

--
-- Table structure for table `user_image`
--

CREATE TABLE `user_image` (
  `id_user` int(11) NOT NULL,
  `image` varchar(111) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_image`
--

INSERT INTO `user_image` (`id_user`, `image`) VALUES
(35, ''),
(37, '5308e8ffe036a63198045e7d2ede52e2'),
(38, 'f5af1fea5468674f4075a76e4729ef2b'),
(39, '12b4920af0e349d04f2474cdae834f64'),
(40, '4db1dd22da24123b904f22973f358b14'),
(42, '2e925ce61c966e14f9b5330ea2c984f3');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id_role` int(11) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id_role`, `role`) VALUES
(1, 'admin'),
(2, 'customer'),
(3, 'seller');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_item` (`id_item`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD KEY `id_item` (`id_item`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `id_category` (`id_category`) USING BTREE,
  ADD KEY `id_color` (`id_color`,`id_condition`);

--
-- Indexes for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id_color`);

--
-- Indexes for table `product_conditions`
--
ALTER TABLE `product_conditions`
  ADD PRIMARY KEY (`id_condition`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id_transaction`),
  ADD KEY `id_cart` (`id_cart`,`id_address`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id_address`);

--
-- Indexes for table `user_image`
--
ALTER TABLE `user_image`
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id_role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product_conditions`
--
ALTER TABLE `product_conditions`
  MODIFY `id_condition` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id_transaction` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id_address` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`id_item`) REFERENCES `items` (`id_item`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
