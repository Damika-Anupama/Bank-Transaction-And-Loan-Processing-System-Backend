show databases;
drop database bank;
create database bank;
use bank;

CREATE TABLE `user` (
  `user_id` INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL UNIQUE,
  `password` VARCHAR(100) NOT NULL UNIQUE,
  `fullname` VARCHAR(30),
  `type` ENUM('CUSTOMER','EMPLOYEE','MANAGER','ADMIN'),
  `gender` ENUM('MALE','FEMALE','OTHER'),
  `dob` DATE,
  `address` VARCHAR(30),
  `email` VARCHAR(30) NOT NULL UNIQUE,
  `contact_no` VARCHAR(10),
  PRIMARY KEY (`user_id`)
);

CREATE TABLE `manager` (
  `manager_id` INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
  `user_id` INT(10) NOT NULL UNIQUE,
  PRIMARY KEY (`manager_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `branch` (
  `branch_id` INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
  `branch_name` VARCHAR(20) NOT NULL UNIQUE,
  `branch_type` ENUM('NORMAL','HEAD OFFICE'),
  `address` VARCHAR(20),
  `manager_id` INT(10),
  PRIMARY KEY (`branch_id`),
  FOREIGN KEY (`manager_id`) REFERENCES `manager`(`manager_id`) ON DELETE CASCADE
);
make one to one relationship between account and saving_account and give me code
CREATE TABLE `account` (
  `account_id` INT(10) NOT NULL UNIQUE auto_increment,
  `user_id` INT(10) NOT NULL,
  `branch_id` INT(10) NOT NULL,
  `account_type` ENUM('PERSONAL','ORGANIZATION'),
  `amount` DECIMAL(12,2),
  `created_date` DATE,
  `saving_type` ENUM('CURRENT','SAVING'),
  PRIMARY KEY (`account_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`branch_id`) REFERENCES `branch`(`branch_id`) ON DELETE CASCADE,
  CHECK (`amount` >= 0)
)ENGINE=InnoDB AUTO_INCREMENT=1000000 DEFAULT CHARSET=latin1;

CREATE TABLE `saving_account` (
  `saving_account_id` INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
  `account_id` INT(10) NOT NULL UNIQUE,
  `saving_account_type` ENUM('CHILD','TEEN','ADULT','SENIOR'),
  `interest_rate` ENUM('12','11','10','13'),
  `min_required_balance` ENUM('0','500','1000'),
  `no_of_withdrawals` INT UNSIGNED DEFAULT 5,
  PRIMARY KEY (`saving_account_id`),
  FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=latin1;

CREATE TABLE `fixed_deposit` (
  `fd_id` INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
  `saving_account_id` INT(10) NOT NULL,
  `duration` ENUM('6_MONTH','1_YEAR','3_YEARS'),
  `rate_per_annum` ENUM('13','14','15'),
  `fd_opening_date` DATE,
  `amount` DECIMAL(12,2),
  PRIMARY KEY (`fd_id`),
  FOREIGN KEY (`saving_account_id`) REFERENCES `saving_account`(`saving_account_id`) ON DELETE CASCADE,
  CHECK (`amount` > 0)
) ENGINE=InnoDB AUTO_INCREMENT=20000 DEFAULT CHARSET=latin1;

CREATE TABLE `loan_basic_detail` (
  `loan_basic_detail_id` INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
  `amount` DECIMAL(12,2),
  `customer_id` INT(10) NOT NULL,
  `is_approved` BOOLEAN,
  `starting_date` DATE,
  `duration_days` INT,
  `interest` DECIMAL(4,2),
  `loan_type` ENUM('PERSONAL','BUSINESS'),
  PRIMARY KEY (`loan_basic_detail_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=100000 DEFAULT CHARSET=latin1;

CREATE TABLE `online_portal_loan` (
  `loan_detail_id` INT(10)  NOT NULL UNIQUE,
  `fixed_deposit_id` INT(10) NOT NULL,
  PRIMARY KEY (`loan_detail_id`),
  FOREIGN KEY (`fixed_deposit_id`) REFERENCES `fixed_deposit`(`fd_id`) ON DELETE CASCADE,
  FOREIGN KEY (`loan_detail_id`) REFERENCES `loan_basic_detail`(`loan_basic_detail_id`) ON DELETE CASCADE
);

CREATE TABLE `employee` (
  `employee_id` INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
  `user_id` INT(10) NOT NULL UNIQUE,
  `branch_id` INT(10) NOT NULL,
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`branch_id`) REFERENCES `branch`(`branch_id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `withdrawal` (
  `withdrawal_id` INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
  `amount` DECIMAL(12,2) NOT NULL,
  `account_id` INT(10) NOT NULL,
  `withdrawal_time` DATE,
  `withdrawal_fee` DECIMAL(4,2),
  PRIMARY KEY (`withdrawal_id`),
  FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`) ON DELETE CASCADE
);

CREATE TABLE `normal_loan` (
  `loan_detail_id` INT(10) NOT NULL UNIQUE,
  `employee_id` INT(10) NOT NULL,
   PRIMARY KEY (`loan_detail_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE,
  FOREIGN KEY (`loan_detail_id`) REFERENCES `loan_basic_detail`(`loan_basic_detail_id`) ON DELETE CASCADE
);

CREATE TABLE `transfer` (
  `transfer_id` INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
  `amount` DECIMAL(12,2) NOT NULL,
  `from_account` INT(10) NOT NULL,
  `to_account` INT(10) NOT NULL,
  `transferd_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `transaction_fee` DECIMAL(4,2),
  `sender_remarks` VARCHAR(30),
  `beneficiary_remarks` VARCHAR(30),
  PRIMARY KEY (`transfer_id`),
  FOREIGN KEY (`from_account`) REFERENCES `account`(`account_id`) ON DELETE CASCADE,
  FOREIGN KEY (`to_account`) REFERENCES `account`(`account_id`) ON DELETE CASCADE
);

CREATE TABLE `loan_installment` (
    'installment_id' INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    'loan_basic_detail_id' INT NOT NULL,
    'installment_number' INT NOT NULL,
    'due_date' DATE NOT NULL,
    'amount' DECIMAL(10,2) NOT NULL,
    'paid_date' DATE,
    'late_fee' DECIMAL(10,2) NOT NULL,
    status ENUM('unpaid', 'paid', 'late') NOT NULL,
    FOREIGN KEY ('loan_basic_detail_id') REFERENCES 'loan_basic_detail'('loan_basic_detail_id')
);

INSERT INTO loan_installments (loan_basic_detail_id, installment_number, due_date, amount, paid_date, late_fee, status) VALUES 
(1, 1, '2022-11-26', 106904.48, '2022-11-25', 0, 'paid'),
(1, 2, '2022-12-26', 106904.48, NULL, 0, 'unpaid'),
(1, 3, '2023-01-26', 106904.48, NULL, 0, 'unpaid'),
(1, 4, '2023-02-26', 106904.48, NULL, 0, 'unpaid'),
(2, 1, '2022-08-27', 320159.87, '2022-08-26', 0, 'paid'),
(2, 2, '2022-09-27', 320159.87, NULL, 0, 'unpaid'),
(2, 3, '2022-10-27', 320159.87, NULL, 0, 'unpaid'),
(3, 1, '2022-07-19', 249740.99, '2022-07-20', 0, 'paid'),
(3, 2, '2022-08-19', 249740.99, NULL, 0, 'unpaid'),
(3, 3, '2022-09-19', 249740.99, NULL, 0, 'unpaid'),
(3, 4, '2022-10-19', 249740.99, NULL, 0, 'unpaid'),
(3, 5, '2022-11-19', 249740.99, NULL, 0, 'unpaid'),
(3, 6, '2022-12-19', 249740.99, NULL, 0, 'unpaid'),
(4, 1, '2022-01-29', 123980.13, '2022-01-28', 0, 'paid'),
(4, 2, '2022-02-29', 123980.13, NULL, 0, 'unpaid'),
(4, 3, '2022-03-29', 123980.13, NULL, 0, 'unpaid'),
(5, 1, '2022-12-29', 1266321.65, '2022-12-30', 0, 'paid'),
(5, 2, '2023-01-29', 1266321.65, NULL, 0, 'unpaid'),
(5, 3, '2023-02-29', 1266321.65, NULL, 0, 'unpaid'),
(5, 4, '2023-03-29', 1266321.65, NULL, 0, 'unpaid'),
(6, 1, '2022-11-11', 501939.01, '2022-11-12', 0, 'paid'),
(6, 2, '2022-12-11', 501939.01, NULL, 0, 'unpaid'),
(6, 3, '2023-01-11', 501939.01, NULL, 0, 'unpaid');


INSERT INTO user (username, password, fullname, type, gender, dob, address, email, contact_no) VALUES
("Damia", "12345678", "Damika Anupama", "CUSTOMER", "MALE", NOW(), "No.17, Train Road, Panaduwara", "damikaanupama@gmail.com", "0721436578"),
('agerlghyg0', 'Abigail', 'Abigail Gerling', 'ADMIN', 'MALE', '2022-11-09 13:55:03', '2031 Welch Pass', 'agerling0@intel.com', '2557996331'),
('bbackman1', 'Bartolemo', 'Bartolemo Backman', 'MANAGER', 'OTHER', '2022-11-27 01:17:35', '1039 Northfield Lane', 'bbackman1@icq.com', '1516546427'),
('agalway2', 'Alyce', 'Alyce Galway', 'EMPLOYEE', 'OTHER', '2022-11-24 21:40:02', '9937 Green Ridge Alley', 'agalway2@intel.com', '1619268157'),
('mmaxted3', 'Minni', 'Minni Maxted', 'ADMIN', 'MALE', '2022-12-03 11:29:01', '2521 Evergreen Place', 'mmaxted3@lulu.com', '7495313543'),
('hbuckoke4', 'Hilly', 'Hilly Buckoke', 'CUSTOMER', 'MALE', '2022-11-29 16:03:18', '2795 Fairfield Center', 'hbuckoke4@nsw.gov.au', '7475836631'),
('aogelsby5', 'Artemus', 'Artemus Ogelsby', 'ADMIN', 'MALE', '2022-12-05 02:03:59', '78270 Drewry Street', 'aogelsby5@sun.com', '3959892943'),
('mcominotti6', 'Marvin', 'Marvin Cominotti', 'CUSTOMER', 'OTHER', '2022-11-16 03:39:17', '1 Holmberg Court', 'mcominotti6@vk.com', '3679606084'),
('edykes7', 'Emmalee', 'Emmalee Dykes', 'MANAGER', 'FEMALE', '2022-11-04 04:46:53', '8664 Canary Point', 'edykes7@bbc.co.uk', '9189595478'),
('dclyne8', 'Dru', 'Dru Clyne', 'CUSTOMER', 'OTHER', '2022-11-01 01:15:49', '1 Saint Paul Crossing', 'dclyne8@icio.us', '1867706386'),
('cpundy9', 'Camella', 'Camella Pundy', 'ADMIN', 'MALE', '2022-12-03 07:08:53', '740 Tomscot Way', 'cpundy9@oaic.gov.au', '3602827915'),
('ofalkousa', 'Olenolin', 'Olenolin Falkous', 'EMPLOYEE', 'FEMALE', '2022-11-16 23:57:54', '8 Stephen Point', 'ofalkousa@merriam.com', '6521723246'),
('arobbekeb', 'Astrid', 'Astrid Robbeke', 'EMPLOYEE', 'FEMALE', '2022-11-20 09:25:35', '77 Burrows Pass', 'arobbekeb@hexun.com', '5559918863'),
('alilburnec', 'Allys', 'Allys Lilburne', 'CUSTOMER', 'MALE', '2022-11-07 21:28:20', '973 Hudson Point', 'alilburnec@amazon.com', '2066854674'),
('cimmd', 'Chet', 'Chet Imm', 'ADMIN', 'OTHER', '2022-11-05 14:43:53', '6295 Waubesa Way', 'cimmd@mashable.com', '5449777967'),
('tcadremane', 'Tobye', 'Tobye Cadreman', 'CUSTOMER', 'OTHER', '2022-12-04 21:22:11', '29027 Talmadge Terrace', 'tcadremane@csmonitor.com', '7883177171'),
('fbeastallf', 'Flossi', 'Flossi Beastall', 'EMPLOYEE', 'FEMALE', '2022-11-07 10:42:04', '6 Shelley Crossing', 'qsd@asdasd.com', '8789808175'),
('lwhellamsg', 'Lee', 'Lee Whellams', 'MANAGER', 'OTHER', '2022-11-10 16:16:11', '859 Mcbride Road', 'lwhellamsg@nsw.gov.au', '9493185550'),
('kgrenvilleh', 'Kathy', 'Kathy Grenville', 'CUSTOMER', 'OTHER', '2022-11-14 04:55:00', '64481 Autumn Leaf Point', 'kgrenvilleh@washington.edu', '4865476351'),
('jkesoni', 'Jewelle', 'Jewelle Keson', 'CUSTOMER', 'MALE', '2022-11-15 03:57:01', '07 Messerschmidt Drive', 'jkesoni@alexa.com', '7053248157'),
('rdaltonj', 'Rik', 'Rik Dalton', 'EMPLOYEE', 'OTHER', '2022-11-08 11:25:10', '3 Drewry Plaza', 'rdaltonj@altervista.org', '3098691551'),
('rdaltonj33', 'Rikan', 'Rik Dalton', 'EMPLOYEE', 'OTHER', '2022-11-08 11:25:10', '3 Drewry Plaza', 'rdaltonj@altervista.org', '3098691551'),
('dfdlossi', 'Floski', 'Flossi Dalton', 'MANAGER', 'MALE', '2022-12-04 21:22:11', '3 Shelley Plaza', 'dfkjdfns@skdfjfsndfos.org', '6238623784'),
('dsfdsfs890', 'SDFDSF09', 'Rik Tobye', 'MANAGER', 'FEMALE', '2022-11-08 11:25:10', '3 Cook Plaza', 'mashable@altervista.org', '7895672930');

INSERT INTO manager(user_id) VALUES(3),(9),(20),(23),(24);

INSERT INTO branch (branch_name, branch_type, address, manager_id) VALUES 
('Shanghudi', 'HEAD OFFICE', '36 Loomis Plaza', 3),('Delong', 'NORMAL', '163 Cook Drive', 1),('Baffa', 'NORMAL', '52 Fisk Way', 2),
('Lille', 'NORMAL', '13 Susan Street', 4),('Socos', 'NORMAL', '2946 Kim Place', 5);

INSERT INTO account (user_id, branch_id, account_type, amount, created_date) VALUES 
(1, 1, 'ORGANIZATION', 805338779.54, '2022-12-04 18:22:30'),
(2, 2, 'ORGANIZATION', 423057562.67, '2022-11-12 16:51:44'),
(3, 3, 'ORGANIZATION', 203827189.02, '2022-11-23 17:10:44'),
(4, 4, 'PERSONAL', 127091406.22, '2022-12-01 08:32:34'),
(5, 5, 'PERSONAL', 135246812.46, '2022-11-02 12:50:15'),
(6, 5, 'PERSONAL', 372383471.53, '2022-11-01 15:58:09'),
(7, 1, 'PERSONAL', 95099373.48, '2022-11-28 17:54:53'),
(8, 2, 'ORGANIZATION', 748579034.52, '2022-11-04 09:03:59'),
(9, 3, 'ORGANIZATION', 834690509.5, '2022-11-05 09:06:11'),
(10, 4, 'PERSONAL', 791033684.68, '2022-11-03 13:05:21'),
(11, 1, 'ORGANIZATION', 85339522.92, '2022-12-02 00:45:32'),
(12, 2, 'PERSONAL', 782734504.03, '2022-11-13 10:19:17'),
(13, 3, 'ORGANIZATION', 855069457.76, '2022-11-11 14:05:07'),
(14, 4, 'ORGANIZATION', 781585354.42, '2022-11-12 21:22:26'),
(15, 5, 'ORGANIZATION', 743403781.83, '2022-11-22 22:01:00'),
(16, 1, 'PERSONAL', 284327306.16, '2022-11-26 09:01:27'),
(17, 2, 'PERSONAL', 466756793.17, '2022-11-27 18:52:45'),
(18, 3, 'PERSONAL', 196726991.37, '2022-11-01 22:33:52'),
(19, 4, 'ORGANIZATION', 292038409.51, '2022-11-14 00:08:38'),
(20, 5, 'PERSONAL', 479569647.63, '2022-11-11 16:11:19'),
(21, 1, 'PERSONAL', 544060000.96, '2022-12-06 18:45:58'),
(22, 2, 'ORGANIZATION', 413057693.5, '2022-11-27 00:30:59'),
(23, 3, 'ORGANIZATION', 128050282.52, '2022-11-08 16:53:32'),
(24, 4, 'PERSONAL', 277754200.05, '2022-11-13 17:59:22'),
(1, 5, 'ORGANIZATION', 586310050.46, '2022-12-01 20:17:24'),
(2, 1, 'ORGANIZATION', 49105403.24, '2022-12-01 13:41:37'),
(7, 2, 'PERSONAL', 770498821.58, '2022-11-16 03:27:23'),
(8, 3, 'PERSONAL', 490257868.72, '2022-11-17 13:47:05'),
(9, 4, 'ORGANIZATION', 734805832.74, '2022-11-29 14:31:41'),
(23, 5, 'ORGANIZATION', 336377052.52, '2022-11-15 16:12:04');

INSERT INTO saving_account (account_id, saving_account_type, interest_rate, min_required_balance, no_of_withdrawals) VALUES 
(1000026, 'ADULT', '10', '1000', 5),
(1000027, 'CHILD', '12', '0', 2),
(1000028, 'ADULT', '10', '1000', 1),
(1000029, 'TEEN', '11', '500', 0),
(1000020, 'ADULT', '10', '1000', 1),
(1000021, 'SENIOR', '13', '1000', 5),
(1000022, 'ADULT', '10', '1000', 5),
(1000023, 'SENIOR', '13', '1000', 0),
(1000024, 'SENIOR', '13', '1000', 1),
(1000025, 'TEEN', '11', '500', 4),
(1000012, 'SENIOR', '13', '1000', 4),
(1000013, 'SENIOR', '13', '1000', 2),
(1000011, 'SENIOR', '13', '1000', 1),
(1000014, 'ADULT', '10', '1000', 4),
(1000016, 'SENIOR', '13', '1000', 2);

INSERT INTO fixed_deposit (saving_account_id, duration, rate_per_annum, fd_opening_date, amount) VALUES 
(10013, '6_MONTH', '13', '2021-11-30 03:57:53', 7533534047.35),
(10008, '3_YEARS', '15', '2022-11-01 05:02:43', 9348869788.43),
(10005, '1_YEAR', '15', '2022-09-09 13:26:20', 2905433976.78),
(10002, '1_YEAR', '14', '2022-01-31 11:00:01', 7019514353.95),
(10001, '3_YEARS', '15', '2021-12-10 14:57:45', 6315881509.09);

INSERT INTO loan_basic_detail (amount, customer_id, is_approved , starting_date, duration_days, interest, loan_type) VALUES 
(42761793.52, 6, 1, '2022-10-26 17:49:02', 345, 16.05, 'BUSINESS'),
(36247929.4, 11, 1, '2022-07-27 18:30:03', 113, 16.58, 'PERSONAL'),
(98439890.93, 20, 1, '2022-06-19 17:28:47', 387, 15.86, 'BUSINESS'),
(55395604.74, 7, 0, '2021-11-29 16:09:23', 450, 14.22, 'BUSINESS'),
(82394953.24, 3, 1, '2022-09-29 04:47:03', 830, 18.84, 'PERSONAL'),
(40745120.41, 13, 0, '2022-10-11 15:21:11', 806, 12.93, 'BUSINESS'),
(76215453.14, 16, 1, '2022-08-03 23:11:11', 122, 18.92, 'PERSONAL'),
(30271950.8, 10, 1, '2022-11-18 22:14:29', 266, 17.42, 'BUSINESS'),
(63449402.43, 15, 0, '2022-05-24 18:58:08', 452, 17.11, 'PERSONAL'),
(99291201.46, 17, 1, '2022-07-15 10:01:36', 703, 12.44, 'BUSINESS');

INSERT INTO online_portal_loan (loan_detail_id, fixed_deposit_id) VALUES
(100000,20000),
(100001,20003),
(100002,20004);

INSERT INTO employee (user_id, branch_id) VALUES
(4,1),
(12,2),
(13,3),
(17,4),
(21,5),
(22,1);

INSERT INTO withdrawal (amount, account_id, withdrawal_time, withdrawal_fee) VALUES
(23602073.52, 1000026, '2022-03-01 00:13:11', 67.87),
(209621720.8, 1000009, '2022-03-07 17:44:23', 9.44),
(189335233.89, 1000013, '2022-07-30 08:05:32', 26.2),
(407569690.51, 1000014, '2022-10-05 02:48:00', 28.6),
(341877101.75, 1000022, '2022-02-03 23:13:00', 12.72),
(496379857.47, 1000019, '2022-06-28 01:12:51', 72.33),
(464064841.83, 1000022, '2021-11-23 09:17:48', 0.54),
(592855500.76, 1000024, '2022-06-01 08:44:12', 42.3),
(384134990.7, 1000001, '2021-12-18 07:14:48', 25.03),
(720261092.26, 1000002, '2022-08-23 17:33:42', 23.09),
(758426509.28, 1000000, '2022-08-06 13:31:50', 75.12),
(154842341.68, 1000028, '2022-08-18 08:08:49', 59.84),
(630430175.61, 1000002, '2022-09-26 10:49:48', 93.92),
(492167750.3, 1000013, '2022-11-08 05:49:32', 7.41),
(272671165.24, 1000018, '2021-11-03 15:15:23', 74.79),
(932940304.61, 1000000, '2021-12-21 06:41:58', 11.49),
(60895725.53, 1000012, '2022-02-14 08:38:07', 8.39),
(140546026.74, 1000006, '2022-02-14 02:36:11', 71.99),
(599464041.18, 1000002, '2022-09-20 14:49:24', 87.54),
(607872695.43, 1000022, '2021-11-21 22:45:33', 18.6);

INSERT INTO normal_loan (loan_detail_id, employee_id) VALUES
(100003,1),
(100004,2),
(100005,3),
(100006,4),
(100007,5),
(100008,6),
(100009,1);

INSERT INTO transfer (amount, from_account, to_account, transferd_time, transaction_fee) VALUES 
(96737679.09, 1000007, 1000027, '2022-11-01 09:16:43', 0),
(43223883.21, 1000004, 1000021, '2022-11-24 08:35:53', 19.31),
(21276393.06, 1000027, 1000024, '2022-11-22 15:02:30', 78.25),
(80509918.29, 1000008, 1000014, '2022-11-06 17:29:18', 95.85),
(58512729.6, 1000004, 1000001, '2022-11-08 09:05:36', 0),
(34216468.07, 1000007, 1000018, '2022-11-01 01:26:18', 81.75),
(14051826.0, 1000009, 1000021, '2022-11-27 19:30:39', 32.92),
(79944321.2, 1000015, 1000014, '2022-11-04 02:51:25', 0),
(92501325.7, 1000015, 1000026, '2022-11-06 16:38:13', 31.63),
(93016296.19, 1000023, 1000026, '2022-11-05 15:29:52', 0),
(90991533.01, 1000011, 1000003, '2022-11-30 01:55:51', 60.96),
(39580043.92, 1000005, 1000000, '2022-11-16 11:49:02', 0),
(17156877.0, 1000029, 1000028, '2022-11-19 06:29:29', 0),
(32276037.37, 1000020, 1000006, '2022-11-22 12:15:44', 58.21),
(83920472.64, 1000015, 1000009, '2022-11-16 23:01:32', 5.1),
(75829779.39, 1000014, 1000024, '2022-11-18 00:38:26', 11.97),
(48302633.63, 1000004, 1000024, '2022-11-12 01:11:38', 4.48),
(96082561.91, 1000021, 1000022, '2022-11-22 19:17:17', 0),
(99099241.49, 1000012, 1000017, '2022-12-04 05:22:36', 96.27),
(39001924.74, 1000006, 1000008, '2022-11-17 23:32:17', 0);


/* iterate over all rows in the account table and 
update the saving_type column value to SAVING 
if the account table's account_id column value 
equals one of the values from the saving_account table account_id column, 
and to CURRENT for all other rows */
UPDATE account
SET saving_type = CASE
    WHEN account_id IN (SELECT account_id FROM saving_account) THEN 'SAVING'
    ELSE 'CURRENT'
END;

/* 
Write a mysql function gives user_id, username and type from the user table when the email is given. 
using the user_id give all account details as an array such as account_id, branch_id, account_type, amount, saving_type from account table. 
for each account array item include branch_name using branch_id from the branch table instead of branch_id
Finally compose the whole object */
DELIMITER $$
CREATE FUNCTION get_user_details(email VARCHAR(255))
RETURNS JSON DETERMINISTIC
BEGIN
    DECLARE user_id INT;
    DECLARE username VARCHAR(255);
    DECLARE type VARCHAR(255);
    DECLARE account_id INT;
    DECLARE branch_id INT;
    DECLARE account_type VARCHAR(255);
    DECLARE amount DECIMAL(20,2);
    DECLARE saving_type VARCHAR(255);
    DECLARE branch_name VARCHAR(255);
    DECLARE account_array JSON;
    DECLARE user_details JSON;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur1 CURSOR FOR SELECT user_id, username, type FROM user WHERE email = email;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN cur1;
    read_loop: LOOP
        FETCH cur1 INTO user_id, username, type;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SET account_array = JSON_ARRAY();
        SET user_details = JSON_OBJECT('user_id', user_id, 'username', username, 'type', type, 'accounts', account_array);
        SET done = FALSE;
        DECLARE cur2 CURSOR FOR SELECT account_id, branch_id, account_type, amount, saving_type FROM account WHERE user_id = user_id;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
        OPEN cur2;
        read_loop2: LOOP
            FETCH cur2 INTO account_id, branch_id, account_type, amount, saving_type;
            IF done THEN
                LEAVE read_loop2;
            END IF;
            SET branch_name = (SELECT branch_name FROM branch WHERE branch_id = branch_id);
            SET account_array = JSON_ARRAY_APPEND(account_array, '$', JSON_OBJECT('account_id', account_id, 'branch_id', branch_id, 'account_type', account_type, 'amount', amount, 'saving_type', saving_type, 'branch_name', branch_name));
        END LOOP read_loop2;
        CLOSE cur2;
        SET user_details = JSON_SET(user_details, '$.accounts', account_array);
        SELECT user_details;
    END LOOP read_loop;
    CLOSE cur1;
END$$

