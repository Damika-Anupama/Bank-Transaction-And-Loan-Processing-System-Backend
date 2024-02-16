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
-- Table structure for table `saving_account`
--

DROP TABLE IF EXISTS `saving_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saving_account` (
  `saving_account_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `saving_account_type` enum('CHILD','TEEN','ADULT','SENIOR') DEFAULT NULL,
  `interest_rate` enum('12','11','10','13') DEFAULT NULL,
  `min_required_balance` enum('0','500','1000') DEFAULT NULL,
  `no_of_withdrawals` int unsigned DEFAULT '5',
  PRIMARY KEY (`saving_account_id`),
  UNIQUE KEY `saving_account_id` (`saving_account_id`),
  UNIQUE KEY `account_id` (`account_id`),
  CONSTRAINT `saving_account_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10015 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saving_account`
--

LOCK TABLES `saving_account` WRITE;
/*!40000 ALTER TABLE `saving_account` DISABLE KEYS */;
INSERT INTO `saving_account` VALUES (10000,1000026,'ADULT','10','1000',0),(10001,1000027,'CHILD','12','0',0),(10002,1000028,'ADULT','10','1000',0),(10003,1000029,'TEEN','11','500',0),(10004,1000020,'ADULT','10','1000',0),(10005,1000021,'SENIOR','13','1000',0),(10006,1000022,'ADULT','10','1000',0),(10007,1000023,'SENIOR','13','1000',0),(10008,1000024,'SENIOR','13','1000',0),(10009,1000025,'TEEN','11','500',0),(10010,1000012,'SENIOR','13','1000',0),(10011,1000013,'SENIOR','13','1000',0),(10012,1000011,'SENIOR','13','1000',0),(10013,1000014,'ADULT','10','1000',0),(10014,1000016,'SENIOR','13','1000',0);
/*!40000 ALTER TABLE `saving_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 18:56:13
