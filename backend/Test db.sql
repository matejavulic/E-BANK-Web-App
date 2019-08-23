CREATE DATABASE  IF NOT EXISTS `ebank` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `ebank`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: ebank
-- ------------------------------------------------------
-- Server version	5.7.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `accounts` (
  `accountID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `currentBalance` decimal(20,3) NOT NULL DEFAULT '0.000',
  `accountType` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Tekuci',
  `garnishment` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Administrativna zabrana',
  `currencyID` int(10) unsigned NOT NULL DEFAULT '1',
  `dateOpened` datetime NOT NULL,
  `dateClosed` datetime DEFAULT NULL,
  `clientID` char(24) COLLATE utf8_unicode_ci NOT NULL,
  `branch` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Stari Grad',
  `limitMonthly` decimal(20,3) unsigned NOT NULL DEFAULT '150000.000',
  `usedLimit` decimal(20,3) unsigned NOT NULL DEFAULT '0.000',
  PRIMARY KEY (`accountID`),
  UNIQUE KEY `accountID_UNIQUE` (`accountID`),
  KEY `fkAccountsCurrencyID_idx` (`currencyID`),
  CONSTRAINT `fkAccountsCurrencyID` FOREIGN KEY (`currencyID`) REFERENCES `currencies` (`currencyID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (165,74375.000,'Tekuci',0,1,'2019-08-13 01:26:57','0000-00-00 00:00:00','5d51f5c11ef4a32e54828408','Stari Grad',150000.000,12400.000),(166,66385.000,'Tekuci',0,1,'2019-08-13 01:29:11','0000-00-00 00:00:00','5d51f6471ef4a32e54828409','Stari Grad',150000.000,14200.000),(167,85369.000,'Tekuci',0,1,'2019-08-13 01:30:19','0000-00-00 00:00:00','5d51f68b1ef4a32e5482840a','Stari Grad',150000.000,75000.000),(168,49493.000,'Tekuci',0,1,'2019-08-16 02:38:36','0000-00-00 00:00:00','5d55fb0cd3f3e43654aa7e24','Stari Grad',150000.000,70000.000),(169,65774.000,'Tekuci',0,1,'2019-08-19 12:02:03','0000-00-00 00:00:00','5d5a739b9cd1991548b595b9','Stari Grad',150000.000,65000.000),(171,71703.000,'Tekuci',0,1,'2019-08-20 18:22:42','0000-00-00 00:00:00','5d5c1e522f077109f01d4181','Stari Grad',150000.000,35500.000),(172,60373.000,'Tekuci',0,1,'2019-08-21 01:44:59','0000-00-00 00:00:00','5d5c85fb42be0433d0bc6f59','Stari Grad',150000.000,50500.000),(173,36351.000,'Tekuci',0,1,'2019-08-21 13:00:46','0000-00-00 00:00:00','5d5d245ef2943119684d0bd6','Stari Grad',150000.000,0.000),(174,57401.000,'Tekuci',0,1,'2019-08-21 14:46:05','0000-00-00 00:00:00','5d5d3d0da9adee3a94f31357','Stari Grad',150000.000,0.000);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `currencies` (
  `currencyID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(3) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`currencyID`),
  UNIQUE KEY `currencyID_UNIQUE` (`currencyID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currencies`
--

LOCK TABLES `currencies` WRITE;
/*!40000 ALTER TABLE `currencies` DISABLE KEYS */;
INSERT INTO `currencies` VALUES (10,'ALL'),(14,'AUD'),(7,'BAM'),(3,'CNY'),(6,'EUR'),(5,'GBP'),(8,'HRK'),(11,'HUF'),(12,'INR'),(9,'MKD'),(1,'RSD'),(4,'RUB'),(2,'USD'),(13,'XDR');
/*!40000 ALTER TABLE `currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transaction` (
  `transactionID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `paymentMethod` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Kartica',
  `senderAccountNumber` int(10) NOT NULL,
  `receiverAccountNumber` int(10) NOT NULL,
  `amount` double unsigned NOT NULL,
  `date` date NOT NULL,
  `dateKnjizenja` date NOT NULL,
  `description` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `refference` varchar(45) COLLATE utf8_unicode_ci DEFAULT 'PPT-0375684-D-PROD',
  `currencyID` int(10) DEFAULT '1',
  PRIMARY KEY (`transactionID`),
  UNIQUE KEY `transactionID_UNIQUE` (`transactionID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'Kartica',167,166,1000,'2019-01-01','2019-01-01','Konsultantske usluge','REF-166-167-PRO',1),(3,'Kartica',165,167,6000,'2019-01-02','2019-01-03','Trzni centar SHOPPP!','REF-167-166-PRO1',1),(4,'Uplata',165,167,3000,'2019-01-03','2019-01-04','Rata letovanja','REF',1),(5,'Uplata',165,165,1000,'2019-01-04','2019-01-04','B.S. - Benzin Gas','66-PRO1',1),(6,'Kartica',167,165,5500,'2019-01-05','2019-01-05','Salon namestaja - Fotelja','REF-167-166-PRO1',1),(7,'Kartica',167,165,200,'2019-01-06','2019-01-06','Knjizara 3M - Sveska','REF-167-166-PRO1',1),(8,'Kartica',165,165,750,'2019-01-07','2019-01-07','Kafic - Koktel x 3','REF-167-166-PRO1',1),(9,'Kartica',165,165,1100,'2019-01-08','2019-01-08','Restoran - Pica Kapricoza','REF-167-166-PRO1',1),(10,'Kartica',167,165,3000,'2019-01-09','2019-01-09','Autoservis Petko','REF-167-166-PRO1',1),(11,'Uplata',167,165,125,'2019-01-10','2019-01-10','Market Koala - Hleb, mleko, jogurt','REF-167-166-PRO1',1),(12,'Uplata',167,165,50,'2019-01-11','2019-01-11','Trafika - Zvake Zvacko','REF-167-166-PRO1',1),(13,'Kartica',167,165,130,'2019-01-12','2019-01-12','Kiosk - Sendvic','REF-167-166-PRO1',1),(14,'Kartica',167,165,2200,'2019-01-13','2019-01-13','BAS - Karta','REF-167-166-PRO1',1),(15,'Cek',167,165,1250,'2019-01-14','2019-01-14','Кафе City Zone - Ugostiteljstvo','REF-167-166-PRO1',1),(16,'Cek',167,165,20,'2019-01-15','2019-01-15','Posta - Markica','REF-167-166-PRO1',1),(17,'Cek',167,165,35000,'2019-01-16','2019-01-16','Prodavnica - Mobilni telefon Telmob D.O.O','REF-167-166-PRO1',1);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ebank'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-23  4:39:23
