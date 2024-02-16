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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 18:56:14
