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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `branch_id` int NOT NULL,
  `account_type` enum('PERSONAL','ORGANIZATION') DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `saving_type` enum('CURRENT','SAVING') DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `account_id` (`account_id`),
  KEY `user_id` (`user_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE,
  CONSTRAINT `account_chk_1` CHECK ((`amount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=1000030 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1000000,1,1,'ORGANIZATION',805201666.54,'2022-12-04','CURRENT'),(1000001,2,2,'ORGANIZATION',423057562.67,'2022-11-12','CURRENT'),(1000002,3,3,'ORGANIZATION',203827189.02,'2022-11-23','CURRENT'),(1000003,4,4,'PERSONAL',127091406.22,'2022-12-01','CURRENT'),(1000004,5,5,'PERSONAL',135246812.46,'2022-11-02','CURRENT'),(1000005,6,5,'PERSONAL',372383471.53,'2022-11-01','CURRENT'),(1000006,7,1,'PERSONAL',95099373.48,'2022-11-28','CURRENT'),(1000007,8,2,'ORGANIZATION',748579034.52,'2022-11-04','CURRENT'),(1000008,9,3,'ORGANIZATION',834690509.50,'2022-11-05','CURRENT'),(1000009,10,4,'PERSONAL',791170797.68,'2022-11-03','CURRENT'),(1000010,11,1,'ORGANIZATION',85339522.92,'2022-12-02','CURRENT'),(1000011,12,2,'PERSONAL',871786273.65,'2022-11-13','SAVING'),(1000012,13,3,'ORGANIZATION',952350781.10,'2022-11-11','SAVING'),(1000013,14,4,'ORGANIZATION',870506385.20,'2022-11-12','SAVING'),(1000014,15,5,'ORGANIZATION',1572213714.03,'2022-11-22','SAVING'),(1000015,16,1,'PERSONAL',284327306.16,'2022-11-26','CURRENT'),(1000016,17,2,'PERSONAL',519859752.37,'2022-11-27','SAVING'),(1000017,18,3,'PERSONAL',196726991.37,'2022-11-01','CURRENT'),(1000018,19,4,'ORGANIZATION',292038409.51,'2022-11-14','CURRENT'),(1000019,20,5,'PERSONAL',479569647.63,'2022-11-11','CURRENT'),(1000020,21,1,'PERSONAL',591136860.37,'2022-12-06','SAVING'),(1000021,22,2,'ORGANIZATION',804374612.06,'2022-11-27','SAVING'),(1000022,23,3,'ORGANIZATION',139130319.89,'2022-11-08','SAVING'),(1000023,24,4,'PERSONAL',309354318.49,'2022-11-13','SAVING'),(1000024,1,5,'ORGANIZATION',1761054899.11,'2022-12-01','SAVING'),(1000025,2,1,'ORGANIZATION',53797024.12,'2022-12-01','SAVING'),(1000026,7,2,'PERSONAL',837169160.55,'2022-11-16','SAVING'),(1000027,8,3,'PERSONAL',1287040034.46,'2022-11-17','SAVING'),(1000028,9,4,'ORGANIZATION',1565504420.02,'2022-11-29','SAVING'),(1000029,23,5,'ORGANIZATION',368515137.21,'2022-11-15','SAVING');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(20) NOT NULL,
  `branch_type` enum('NORMAL','HEAD OFFICE') DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`branch_id`),
  UNIQUE KEY `branch_id` (`branch_id`),
  UNIQUE KEY `branch_name` (`branch_name`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`manager_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Shanghudi','HEAD OFFICE','36 Loomis Plaza',3),(2,'Delong','NORMAL','163 Cook Drive',1),(3,'Baffa','NORMAL','52 Fisk Way',2),(4,'Lille','NORMAL','13 Susan Street',4),(5,'Socos','NORMAL','2946 Kim Place',5);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `branch_id` int NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE,
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,4,1),(2,12,2),(3,13,3),(4,17,4),(5,21,5),(6,22,1),(7,34,1),(8,35,1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fixed_deposit`
--

DROP TABLE IF EXISTS `fixed_deposit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fixed_deposit` (
  `fd_id` int NOT NULL AUTO_INCREMENT,
  `saving_account_id` int NOT NULL,
  `duration` enum('6_MONTH','1_YEAR','3_YEARS') DEFAULT NULL,
  `rate_per_annum` enum('13','14','15') DEFAULT NULL,
  `fd_opening_date` date DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`fd_id`),
  UNIQUE KEY `fd_id` (`fd_id`),
  KEY `saving_account_id` (`saving_account_id`),
  CONSTRAINT `fixed_deposit_ibfk_1` FOREIGN KEY (`saving_account_id`) REFERENCES `saving_account` (`saving_account_id`) ON DELETE CASCADE,
  CONSTRAINT `fixed_deposit_chk_1` CHECK ((`amount` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=20009 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fixed_deposit`
--

LOCK TABLES `fixed_deposit` WRITE;
/*!40000 ALTER TABLE `fixed_deposit` DISABLE KEYS */;
INSERT INTO `fixed_deposit` VALUES (20000,10013,'6_MONTH','13','2021-11-30',7533534047.35),(20001,10008,'3_YEARS','15','2022-11-01',9348869788.43),(20002,10005,'1_YEAR','15','2022-09-09',2905433976.78),(20003,10002,'1_YEAR','14','2022-01-31',7019514353.95),(20004,10001,'3_YEARS','15','2021-12-10',6315881509.09),(20005,10008,'6_MONTH','13','2023-01-12',123.00),(20006,10008,'3_YEARS','15','2023-01-14',456789.00),(20007,10008,'1_YEAR','14','2023-01-14',456789.00),(20008,10008,'1_YEAR','14','2023-01-14',123.00);
/*!40000 ALTER TABLE `fixed_deposit` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `loan_installment`
--

DROP TABLE IF EXISTS `loan_installment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_installment` (
  `installment_id` int NOT NULL AUTO_INCREMENT,
  `loan_basic_detail_id` int DEFAULT NULL,
  `installment_number` int NOT NULL,
  `due_date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paid_date` date DEFAULT NULL,
  `late_fee` decimal(10,2) NOT NULL,
  `status` enum('unpaid','paid','late') NOT NULL,
  PRIMARY KEY (`installment_id`),
  KEY `loan_basic_detail_id` (`loan_basic_detail_id`),
  CONSTRAINT `loan_installment_ibfk_1` FOREIGN KEY (`loan_basic_detail_id`) REFERENCES `loan_basic_detail` (`loan_basic_detail_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_installment`
--

LOCK TABLES `loan_installment` WRITE;
/*!40000 ALTER TABLE `loan_installment` DISABLE KEYS */;
INSERT INTO `loan_installment` VALUES (102,100000,1,'2022-11-26',4290355.82,'2022-11-25',0.00,'paid'),(103,100000,2,'2022-12-26',4290355.82,NULL,0.00,'unpaid'),(104,100000,3,'2023-01-26',4290355.82,NULL,0.00,'unpaid'),(105,100000,4,'2023-02-26',4290355.82,NULL,0.00,'unpaid'),(106,100001,1,'2022-08-27',10124169.65,'2022-08-26',0.00,'paid'),(107,100001,2,'2022-09-27',10124169.65,NULL,0.00,'unpaid'),(108,100001,3,'2022-10-27',10124169.65,NULL,0.00,'unpaid'),(109,100002,1,'2022-07-19',8932046.52,'2022-07-20',0.00,'paid'),(110,100002,2,'2022-08-19',8932046.52,NULL,0.00,'unpaid'),(111,100002,3,'2022-09-19',8932046.52,NULL,0.00,'unpaid'),(112,100002,4,'2022-10-19',8932046.52,NULL,0.00,'unpaid'),(113,100002,5,'2022-11-19',8932046.52,NULL,0.00,'unpaid'),(114,100002,6,'2022-12-19',8932046.52,NULL,0.00,'unpaid'),(115,100003,1,'2022-01-29',4349478.23,'2022-01-28',0.00,'paid'),(116,100003,2,'2022-02-28',4349478.23,NULL,0.00,'unpaid'),(117,100003,3,'2022-03-29',4349478.23,NULL,0.00,'unpaid'),(118,100004,1,'2022-12-29',4271731.61,'2022-12-30',0.00,'paid'),(119,100004,2,'2023-01-29',4271731.61,NULL,0.00,'unpaid'),(120,100004,3,'2023-02-28',4271731.61,NULL,0.00,'unpaid'),(121,100004,4,'2023-03-29',4271731.61,NULL,0.00,'unpaid'),(122,100005,1,'2022-11-11',1955596.43,'2022-11-12',0.00,'paid'),(123,100005,2,'2022-12-11',1955596.43,NULL,0.00,'unpaid'),(124,100005,3,'2023-01-11',1955596.43,NULL,0.00,'unpaid'),(125,100006,1,'2022-12-15',19943168.52,'2022-12-16',0.00,'paid'),(126,100006,2,'2023-01-15',19943168.52,NULL,0.00,'unpaid'),(127,100006,3,'2023-02-15',19943168.52,NULL,0.00,'unpaid'),(128,100007,1,'2022-11-28',3853577.61,'2022-11-29',0.00,'paid'),(129,100007,2,'2022-12-28',3853577.61,NULL,0.00,'unpaid'),(130,100007,3,'2023-01-28',3853577.61,NULL,0.00,'unpaid'),(131,100007,4,'2023-02-28',3853577.61,NULL,0.00,'unpaid'),(132,100007,5,'2023-03-28',3853577.61,NULL,0.00,'unpaid'),(133,100008,1,'2022-12-08',5115926.25,'2022-12-09',0.00,'paid'),(134,100008,2,'2023-01-08',5115926.25,NULL,0.00,'unpaid'),(135,100008,3,'2023-02-08',5115926.25,NULL,0.00,'unpaid'),(136,100009,1,'2022-11-19',5266496.66,'2022-11-20',0.00,'paid'),(137,100009,2,'2022-12-19',5266496.66,NULL,0.00,'unpaid'),(138,100009,3,'2023-01-19',5266496.66,NULL,0.00,'unpaid'),(139,100009,4,'2023-02-19',5266496.66,NULL,0.00,'unpaid'),(140,100009,5,'2023-03-19',5266496.66,NULL,0.00,'unpaid');
/*!40000 ALTER TABLE `loan_installment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`manager_id`),
  UNIQUE KEY `manager_id` (`manager_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (1,3),(2,9),(3,20),(4,23),(5,24);
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `normal_loan`
--

DROP TABLE IF EXISTS `normal_loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `normal_loan` (
  `loan_detail_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`loan_detail_id`),
  UNIQUE KEY `loan_detail_id` (`loan_detail_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `normal_loan_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE,
  CONSTRAINT `normal_loan_ibfk_2` FOREIGN KEY (`loan_detail_id`) REFERENCES `loan_basic_detail` (`loan_basic_detail_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `normal_loan`
--

LOCK TABLES `normal_loan` WRITE;
/*!40000 ALTER TABLE `normal_loan` DISABLE KEYS */;
INSERT INTO `normal_loan` VALUES (100003,1),(100009,1),(100004,2),(100005,3),(100006,4),(100007,5),(100008,6);
/*!40000 ALTER TABLE `normal_loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `online_portal_loan`
--

DROP TABLE IF EXISTS `online_portal_loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `online_portal_loan` (
  `loan_detail_id` int NOT NULL,
  `fixed_deposit_id` int NOT NULL,
  PRIMARY KEY (`loan_detail_id`),
  UNIQUE KEY `loan_detail_id` (`loan_detail_id`),
  KEY `fixed_deposit_id` (`fixed_deposit_id`),
  CONSTRAINT `online_portal_loan_ibfk_1` FOREIGN KEY (`fixed_deposit_id`) REFERENCES `fixed_deposit` (`fd_id`) ON DELETE CASCADE,
  CONSTRAINT `online_portal_loan_ibfk_2` FOREIGN KEY (`loan_detail_id`) REFERENCES `loan_basic_detail` (`loan_basic_detail_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `online_portal_loan`
--

LOCK TABLES `online_portal_loan` WRITE;
/*!40000 ALTER TABLE `online_portal_loan` DISABLE KEYS */;
INSERT INTO `online_portal_loan` VALUES (100000,20000),(100032,20001),(100033,20001),(100001,20003),(100002,20004),(100034,20005);
/*!40000 ALTER TABLE `online_portal_loan` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fullname` varchar(30) DEFAULT NULL,
  `type` enum('CUSTOMER','EMPLOYEE','MANAGER','ADMIN') DEFAULT NULL,
  `gender` enum('MALE','FEMALE','OTHER') DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `contact_no` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `password` (`password`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Damia ','$2b$10$hN5LWqdMw8EI44ppQR/kUe8UQ4u0egX6IS.cc0FA7nyprIRwTxzZS','Damika Anupama','CUSTOMER','MALE','2000-11-10','Galle','damikaanupama@gmail.com','0778233476'),(2,'agerlghyg0','Abigail','Abigail Gerling','ADMIN','MALE','2022-11-09','2031 Welch Pass','agerling0@intel.com','2557996331'),(3,'bbackman1','Bartolemo','Bartolemo Backman','MANAGER','OTHER','2022-11-27','1039 Northfield Lane','bbackman1@icq.com','1516546427'),(4,'agalway2','Alyce','Alyce Galway','EMPLOYEE','OTHER','2022-11-24','9937 Green Ridge Alley','agalway2@intel.com','1619268157'),(5,'mmaxted3','Minni','Minni Maxted','ADMIN','MALE','2022-12-03','2521 Evergreen Place','mmaxted3@lulu.com','7495313543'),(6,'hbuckoke4 ','$2b$10$FLNAgFbJ1r51Lh0orDd3.OwezhO1lwhgTbfMkYLZzftI0XGY4oPzm','Hilly Buckoke','CUSTOMER','MALE','2000-11-10','Galle','hbuckoke4@nsw.gov.au','0778233476'),(7,'aogelsby5','Artemus','Artemus Ogelsby','ADMIN','MALE','2022-12-05','78270 Drewry Street','aogelsby5@sun.com','3959892943'),(8,'mcominotti6','Marvin','Marvin Cominotti','CUSTOMER','OTHER','2022-11-16','1 Holmberg Court','mcominotti6@vk.com','3679606084'),(9,'edykes7','Emmalee','Emmalee Dykes','MANAGER','FEMALE','2022-11-04','8664 Canary Point','edykes7@bbc.co.uk','9189595478'),(10,'dclyne8','Dru','Dru Clyne','CUSTOMER','OTHER','2022-11-01','1 Saint Paul Crossing','dclyne8@icio.us','1867706386'),(11,'cpundy9','Camella','Camella Pundy','ADMIN','MALE','2022-12-03','740 Tomscot Way','cpundy9@oaic.gov.au','3602827915'),(12,'ofalkousa','Olenolin','Olenolin Falkous','EMPLOYEE','FEMALE','2022-11-16','8 Stephen Point','ofalkousa@merriam.com','6521723246'),(13,'arobbekeb','Astrid','Astrid Robbeke','EMPLOYEE','FEMALE','2022-11-20','77 Burrows Pass','arobbekeb@hexun.com','5559918863'),(14,'alilburnec','Allys','Allys Lilburne','CUSTOMER','MALE','2022-11-07','973 Hudson Point','alilburnec@amazon.com','2066854674'),(15,'cimmd','Chet','Chet Imm','ADMIN','OTHER','2022-11-05','6295 Waubesa Way','cimmd@mashable.com','5449777967'),(16,'tcadremane','Tobye','Tobye Cadreman','CUSTOMER','OTHER','2022-12-04','29027 Talmadge Terrace','tcadremane@csmonitor.com','7883177171'),(17,'fbeastallf','Flossi','Flossi Beastall','EMPLOYEE','FEMALE','2022-11-07','6 Shelley Crossing','qsd@asdasd.com','8789808175'),(18,'lwhellamsg','Lee','Lee Whellams','MANAGER','OTHER','2022-11-10','859 Mcbride Road','lwhellamsg@nsw.gov.au','9493185550'),(19,'kgrenvilleh','Kathy','Kathy Grenville','CUSTOMER','OTHER','2022-11-14','64481 Autumn Leaf Point','kgrenvilleh@washington.edu','4865476351'),(20,'jkesoni ','$2b$10$P3p6.cx6ilQBP4NsnKRxC.Ukg2X25AIiKxxliIOtVozojmJkA2ASK','Jewelle Keson','MANAGER','MALE','2000-11-10','Galle','jkesoni@alexa.com','0778233476'),(21,'rdaltonj','Rik','Rik Dalton','EMPLOYEE','OTHER','2022-11-08','3 Drewry Plaza','rdaltsonj@altervista.org','3098691551'),(22,'rdaltonj33','Rikan','Rik Dalton','EMPLOYEE','OTHER','2022-11-08','3 Drewry Plaza','rdaltonj@altervista.org','3098691551'),(23,'dfdlossi','Floski','Flossi Dalton','MANAGER','MALE','2022-12-04','3 Shelley Plaza','dfkjdfns@skdfjfsndfos.org','6238623784'),(24,'dsfdsfs890','SDFDSF09','Rik Tobye','MANAGER','FEMALE','2022-11-08','3 Cook Plaza','mashable@altervista.org','7895672930'),(25,'Bimal','$2b$10$3ASS/8wUrikyDDpLlpvWHuEZc5k0nfgmpmwRySq6DRAbPwbOvgRvu','Damika Anupama','MANAGER','MALE','2023-01-12','No.17, Train Road, Panaduwara','bimalbimal@gmail.com','0721436578'),(26,'Nimal ','$2b$10$jL179GzSScIDGw4JdBd7Le3Ld9Dlgs4Wk9inTNkKO.6SqWnOsM78W','Damika Anupama','EMPLOYEE','MALE','2000-11-10','Galle','nimalnimal@gmail.com','0778233476'),(27,'jkesoni@alexa.com','$2b$10$893.kd2s3P4tNad31ei05u9e3Vl5HXM7Otxsj2YxMvwTHgVLmQNge','sdfsdfsd','EMPLOYEE','FEMALE','2023-02-03','sdfsdf','sdfsf','sdfsdf'),(30,'sdfdsfsdfs','$2b$10$hkIAawb71R.CnsqN9GSPWuHwwPidNvWue5/q.I1n.BKM7XSrVCu7q','sdfsdfsd','EMPLOYEE','OTHER','2023-02-03','sdfsdf','ghtykghmjjljlk','sdfsdf'),(32,'iopopiop','$2b$10$tkvVYL2AhXcXeCSShEF.yOVwsYrmvicGjZzNFajSdsE7ErqLx7/3q','ipooipio','EMPLOYEE','FEMALE','2023-03-02','uio','k;uiluo7uio','uio'),(33,'iopopiopyuy','$2b$10$sYkhZNvufEy2QthCr2LnzOgnbkC3oGkAfNpugMKea4CPu6ddJwXYS','sdfsfjyky','EMPLOYEE','FEMALE','2023-03-02','uio','k;yukyl','uio'),(34,'ererhgdb','$2b$10$y0xfDuBEo7wgLK.FQug0sekiaSI0ic/MUHy.ZJembknJvvm5cy/wG','sdsgrgert','EMPLOYEE','OTHER','2023-03-02','uioer','k;yukylerte','uiofgfeg'),(35,'ererhgdberreg','$2b$10$9zZOLLQhrbWczVV2h1Sm2utcn.NKdYtSxngbGB9CHj6kugyk0LaUu','sdrgerge','EMPLOYEE','OTHER','2023-03-02','uioer','k;yukylertesf','uiofgfeg'),(38,'Damika','$2b$10$ds5y7nwbLWR91gb5IYmQxO84rXt6ucy8tpvTIxFmkiimmyeG1wcIq','dfgdfgfd','CUSTOMER','MALE','2022-11-27','DSDJFSDFJKNSF','sdfbksjdnfkjsdnf','131456789');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawal`
--

DROP TABLE IF EXISTS `withdrawal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdrawal` (
  `withdrawal_id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL,
  `account_id` int NOT NULL,
  `withdrawal_time` date DEFAULT NULL,
  `withdrawal_fee` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`withdrawal_id`),
  UNIQUE KEY `withdrawal_id` (`withdrawal_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `withdrawal_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal`
--

LOCK TABLES `withdrawal` WRITE;
/*!40000 ALTER TABLE `withdrawal` DISABLE KEYS */;
INSERT INTO `withdrawal` VALUES (1,23602073.52,1000026,'2022-03-01',67.87),(2,209621720.80,1000009,'2022-03-07',9.44),(3,189335233.89,1000013,'2022-07-30',26.20),(4,407569690.51,1000014,'2022-10-05',28.60),(5,341877101.75,1000022,'2022-02-03',12.72),(6,496379857.47,1000019,'2022-06-28',72.33),(7,464064841.83,1000022,'2021-11-23',0.54),(8,592855500.76,1000024,'2022-06-01',42.30),(9,384134990.70,1000001,'2021-12-18',25.03),(10,720261092.26,1000002,'2022-08-23',23.09),(11,758426509.28,1000000,'2022-08-06',75.12),(12,154842341.68,1000028,'2022-08-18',59.84),(13,630430175.61,1000002,'2022-09-26',93.92),(14,492167750.30,1000013,'2022-11-08',7.41),(15,272671165.24,1000018,'2021-11-03',74.79),(16,932940304.61,1000000,'2021-12-21',11.49),(17,60895725.53,1000012,'2022-02-14',8.39),(18,140546026.74,1000006,'2022-02-14',71.99),(19,599464041.18,1000002,'2022-09-20',87.54),(20,607872695.43,1000022,'2021-11-21',18.60);
/*!40000 ALTER TABLE `withdrawal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 18:54:15
