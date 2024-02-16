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
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfer` (
  `transfer_id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL,
  `from_account` int NOT NULL,
  `to_account` int NOT NULL,
  `transferd_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_fee` decimal(4,2) DEFAULT NULL,
  `sender_remarks` varchar(100) DEFAULT NULL,
  `beneficiary_remarks` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`transfer_id`),
  UNIQUE KEY `transfer_id` (`transfer_id`),
  KEY `from_account` (`from_account`),
  KEY `to_account` (`to_account`),
  CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`from_account`) REFERENCES `account` (`account_id`) ON DELETE CASCADE,
  CONSTRAINT `transfer_ibfk_2` FOREIGN KEY (`to_account`) REFERENCES `account` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer`
--

LOCK TABLES `transfer` WRITE;
/*!40000 ALTER TABLE `transfer` DISABLE KEYS */;
INSERT INTO `transfer` VALUES (29,96737679.09,1000007,1000027,'2022-11-01 03:46:43',0.00,'Transfer for business expenses','Funds received for expansion'),(30,43223883.21,1000004,1000021,'2022-11-24 03:05:53',19.31,'Payment for goods','Invoice payment received'),(31,21276393.06,1000027,1000024,'2022-11-22 09:32:30',78.25,'Loan repayment','Loan repayment received'),(32,80509918.29,1000008,1000014,'2022-11-06 11:59:18',95.85,'Salary transfer','Salary credited'),(33,58512729.60,1000004,1000001,'2022-11-08 03:35:36',0.00,'Transfer to savings account','Funds transferred to savings account'),(34,34216468.07,1000007,1000018,'2022-10-31 19:56:18',81.75,'Personal transfer','Personal funds transferred'),(35,14051826.00,1000009,1000021,'2022-11-27 14:00:39',32.92,'Investment transfer','Investment funds transferred'),(36,79944321.20,1000015,1000014,'2022-11-03 21:21:25',0.00,'Refund transfer','Refund transferred'),(37,92501325.70,1000015,1000026,'2022-11-06 11:08:13',31.63,'Gift transfer','Gift funds transferred'),(38,93016296.19,1000023,1000026,'2022-11-05 09:59:52',0.00,'Transfer for property purchase','Funds transferred for property purchase'),(39,90991533.01,1000011,1000003,'2022-11-29 20:25:51',60.96,'Transfer for expenses','Funds transferred for expenses'),(40,39580043.92,1000005,1000000,'2022-11-16 06:19:02',0.00,'Transfer for debts','Funds transferred to clear debts'),(41,17156877.00,1000029,1000028,'2022-11-19 00:59:29',0.00,'Transfer for insurance','Funds transferred for insurance'),(42,32276037.37,1000020,1000006,'2022-11-22 06:45:44',58.21,'Transfer for college fees','College fees transferred'),(43,83920472.64,1000015,1000009,'2022-11-16 17:31:32',5.10,'Transfer for rent','Rent transferred'),(44,75829779.39,1000014,1000024,'2022-11-17 19:08:26',11.97,'Transfer for bills','Bills paid'),(45,48302633.63,1000004,1000024,'2022-11-11 19:41:38',4.48,'Transfer for groceries','Groceries paid'),(46,96082561.91,1000021,1000022,'2022-11-22 13:47:17',0.00,'Transfer for travel','Travel funds transferred'),(47,99099241.49,1000012,1000017,'2022-12-03 23:52:36',96.27,'Transfer for equipment','Equipment purchased'),(48,39001924.74,1000006,1000008,'2022-11-17 18:02:17',0.00,'Transfer for medical expenses','Medical expenses paid'),(49,85234772.57,1000029,1000004,'2022-12-02 17:24:12',8.49,'Transfer for tuition','Tuition fees paid'),(50,67890132.12,1000023,1000011,'2022-11-29 07:51:49',0.00,'Transfer for taxes','Taxes paid'),(51,76583918.94,1000005,1000007,'2022-12-04 23:18:32',16.34,'Transfer for insurance','Insurance premiums paid'),(52,34921568.79,1000020,1000019,'2022-12-01 08:45:43',0.00,'Transfer for car purchase','Car purchased'),(53,13582977.39,1000001,1000008,'2022-11-28 04:08:26',0.00,'Transfer for home renovation','Home renovation funds transferred'),(54,81789012.62,1000022,1000010,'2022-12-04 15:01:49',31.10,'Transfer for business expenses','Business expenses paid'),(55,92767891.94,1000028,1000025,'2022-12-03 11:18:32',0.00,'Transfer for vacation','Vacation funds transferred'),(56,57349215.79,1000009,1000027,'2022-12-02 04:45:43',19.56,'Transfer for legal expenses','Legal expenses paid'),(57,4657.00,1000000,1000009,'2023-01-14 04:16:49',0.00,'Test','Test'),(58,132456.00,1000000,1000009,'2023-01-14 04:34:20',0.00,'sasds','sadsa');
/*!40000 ALTER TABLE `transfer` ENABLE KEYS */;
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
