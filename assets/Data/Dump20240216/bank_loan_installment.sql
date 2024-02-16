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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 18:56:13
