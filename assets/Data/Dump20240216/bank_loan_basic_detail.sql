-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: bank
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `loan_basic_detail`
--

DROP TABLE IF EXISTS `loan_basic_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_basic_detail` (
  `loan_basic_detail_id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) DEFAULT NULL,
  `customer_id` int NOT NULL,
  `is_approved` tinyint(1) DEFAULT NULL,
  `starting_date` date DEFAULT NULL,
  `duration_days` int DEFAULT NULL,
  `interest` decimal(4,2) DEFAULT NULL,
  `loan_type` enum('PERSONAL','BUSINESS') DEFAULT NULL,
  PRIMARY KEY (`loan_basic_detail_id`),
  UNIQUE KEY `loan_basic_detail_id` (`loan_basic_detail_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `loan_basic_detail_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=100035 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_basic_detail`
--

LOCK TABLES `loan_basic_detail` WRITE;
/*!40000 ALTER TABLE `loan_basic_detail` DISABLE KEYS */;
INSERT INTO `loan_basic_detail` VALUES (100000,42761793.52,6,1,'2022-10-26',345,16.05,'BUSINESS'),(100001,36247929.40,11,1,'2022-07-27',113,16.58,'PERSONAL'),(100002,98439890.93,20,1,'2022-06-19',387,15.86,'BUSINESS'),(100003,55395604.74,7,0,'2021-11-29',450,14.22,'BUSINESS'),(100004,82394953.24,3,1,'2022-09-29',830,18.84,'PERSONAL'),(100005,40745120.41,13,0,'2022-10-11',806,12.93,'BUSINESS'),(100006,76215453.14,16,1,'2022-08-03',122,18.92,'PERSONAL'),(100007,30271950.80,10,1,'2022-11-18',266,17.42,'BUSINESS'),(100008,63449402.43,15,0,'2022-05-24',452,17.11,'PERSONAL'),(100009,99291201.46,17,1,'2022-07-15',703,12.44,'BUSINESS'),(100010,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100011,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100012,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100013,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100014,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100015,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100016,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100017,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100018,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100019,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100020,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100021,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100022,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100024,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100025,50.00,1,1,'2023-01-12',360,14.00,'PERSONAL'),(100026,12341.00,1,1,'2023-01-12',180,13.00,'PERSONAL'),(100027,12341.00,1,1,'2023-01-12',180,13.00,'PERSONAL'),(100028,12341.00,1,1,'2023-01-12',180,13.00,'PERSONAL'),(100029,12341.00,1,1,'2023-01-12',180,13.00,'PERSONAL'),(100030,12341.00,1,1,'2023-01-12',180,13.00,'PERSONAL'),(100031,12341.00,1,1,'2023-01-12',180,13.00,'PERSONAL'),(100032,12341.00,1,1,'2023-01-12',180,13.00,'PERSONAL'),(100033,12341.00,1,1,'2023-01-12',180,13.00,'PERSONAL'),(100034,56.00,1,1,'2023-01-14',180,13.00,'BUSINESS');
/*!40000 ALTER TABLE `loan_basic_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 18:56:12