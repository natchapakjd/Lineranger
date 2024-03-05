-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2024 at 01:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testlrg`
--

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `username` varchar(255) NOT NULL,
  `pin` int(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `balance` int(10) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`username`, `pin`, `password`, `balance`, `role`) VALUES
('admin', 123456, '$2b$10$IRsfmJTnnOQfNIYMnaCs6ODdte7cwGAfEetxmWb/lHFcCZQYCP7VC', 6100, 'member'),
('member', 123456, '$2b$08$bqrk.V/Ryzsa/epX7i4Oi.jlXp7eDWBMgNj2ocRkrBz0rIdiEgP5.', 2000, 'member');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(10) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `quantity` int(10) NOT NULL,
  `total_price` int(10) NOT NULL,
  `p_id` int(10) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `username`, `quantity`, `total_price`, `p_id`, `date`) VALUES
(19, 'member', 1, 50, 2, '2024-01-31 00:29:54'),
(20, 'member', 1, 50, 2, '2024-01-31 00:29:54'),
(21, 'member', 1, 50, 2, '2024-01-31 00:29:54'),
(22, 'member', 2, 100, 2, '2024-01-31 00:29:54'),
(23, 'member', 5, 250, 2, '2024-01-31 00:29:54'),
(24, 'member', 11, 1100, 1, '2024-01-31 00:29:54'),
(25, 'member', 1, 100, 1, '2024-01-31 00:29:54'),
(26, 'member', 6, 600, 1, '2024-01-31 00:29:54'),
(27, 'member', 5, 500, 1, '2024-01-31 00:29:54'),
(28, 'member', 5, 500, 1, '2024-01-31 00:29:54'),
(29, 'member', 1, 100, 1, '2024-01-31 00:29:54'),
(30, 'member', 8, 800, 1, '2024-01-31 00:29:54'),
(31, 'member', 2, 200, 1, '2024-01-31 00:29:54'),
(32, 'admin', 1, 100, 1, '2024-01-31 00:29:54'),
(33, 'admin', 8, 800, 1, '2024-01-31 00:29:54'),
(34, 'admin', 20, 2000, 1, '2024-01-31 00:29:54'),
(35, 'member', 10, 500, 2, '2024-01-31 00:29:54'),
(36, 'member', 10, 1000, 1, '2024-01-31 00:29:54'),
(37, 'member', 8, 800, 3, '2024-01-31 00:29:54'),
(38, 'member', 10, 1000, 4, '2024-01-31 00:29:54'),
(39, 'member', 1, 100, 1, '2024-01-31 01:23:36'),
(40, 'member', 5, 500, 1, '2024-01-31 01:24:09'),
(41, 'member', 1, 100, 1, '2024-01-31 01:25:32'),
(42, 'member', 1, 100, 1, '2024-01-31 01:34:09'),
(43, 'member', 1, 100, 1, '2024-01-31 01:34:26');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(10) NOT NULL,
  `price` int(10) NOT NULL,
  `type_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `quantity`, `price`, `type_id`) VALUES
(1, 'เมกุมิน', 21, 100, 1),
(2, 'อควา', 0, 50, 1),
(3, 'ชากะ', 0, 100, 1),
(4, 'แจ็ค', 0, 100, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

CREATE TABLE `product_type` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`id`, `name`) VALUES
(1, 'ป้ายเหลืองโคลาโบ'),
(2, 'ป้ายเหลืองแสงมืด');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(10) NOT NULL,
  `tran_ref` varchar(30) NOT NULL,
  `username` varchar(255) NOT NULL,
  `amount` int(10) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `tran_ref`, `username`, `amount`, `date`) VALUES
(5, 'Ac42c412167004031', 'admin', 0, '2024-01-30 01:24:59'),
(8, '2024012734314659', 'admin', 0, '2024-01-30 01:24:59'),
(14, '402819569851I000012B9790', 'member', 2000, '2024-01-31 01:37:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`),
  ADD KEY `p_id` (`p_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`username`) REFERENCES `member` (`username`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `product_type` (`id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`username`) REFERENCES `member` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
