/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost:3306
 Source Schema         : teamformationassistant

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 21/09/2021 20:32:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for application
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application`  (
  `ApplicationId` int(11) NOT NULL AUTO_INCREMENT,
  `ApplicationName` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ApplicationLanguages` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `AppPhone` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `AppAddress` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `AppSkillScore` int(11) NULL DEFAULT NULL,
  `AppExperience` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ApplicationId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of application
-- ----------------------------

-- ----------------------------
-- Table structure for candidate
-- ----------------------------
DROP TABLE IF EXISTS `candidate`;
CREATE TABLE `candidate`  (
  `ProjectId` int(11) NOT NULL,
  `ProjectName` int(11) NOT NULL,
  `ApplicationId` int(11) NOT NULL,
  `ApplicationName` int(11) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of candidate
-- ----------------------------

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job`  (
  `JobId` int(11) NOT NULL AUTO_INCREMENT,
  `JobName` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `JobPhone` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `JobRole` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Description` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `JobAddress` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`JobId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job
-- ----------------------------

-- ----------------------------
-- Table structure for job_application
-- ----------------------------
DROP TABLE IF EXISTS `job_application`;
CREATE TABLE `job_application`  (
  `Job_applictionId` int(11) NOT NULL AUTO_INCREMENT,
  `JobId` int(11) NOT NULL,
  `Job_application_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ApplicationId` int(11) NOT NULL,
  PRIMARY KEY (`Job_applictionId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job_application
-- ----------------------------

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member`  (
  `MemberId` int(11) NOT NULL AUTO_INCREMENT,
  `MemberName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DOB` date NULL DEFAULT NULL,
  `Languages` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `IsAssigned` int(11) NULL DEFAULT NULL,
  `HourlyRate` float NULL DEFAULT NULL,
  `MemberRole` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Experience` int(11) NULL DEFAULT NULL,
  `SkillScore` int(11) NULL DEFAULT NULL,
  `AvailableHoursPerWeek` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`MemberId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of member
-- ----------------------------

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `ProjectId` int(11) NOT NULL AUTO_INCREMENT,
  `ProjectName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ProjectEndDate` date NULL DEFAULT NULL,
  `ProjectTeamSize` int(11) NULL DEFAULT NULL,
  `Budget` float NULL DEFAULT NULL,
  `Tools` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `IsAssignmentComplete` int(11) NULL DEFAULT NULL,
  `Priority` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`ProjectId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------

-- ----------------------------
-- Table structure for requirements
-- ----------------------------
DROP TABLE IF EXISTS `requirements`;
CREATE TABLE `requirements`  (
  `JobId` int(11) NOT NULL AUTO_INCREMENT,
  `ProjectId` int(11) NOT NULL,
  `LanguagePreferred` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Skill` int(11) NOT NULL,
  `MemberRole` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `AvailableHoursPerWeek` int(11) NULL DEFAULT NULL,
  `SkillWeight` int(11) NULL DEFAULT NULL,
  `ExperienceWeight` int(11) NULL DEFAULT NULL,
  `HoursWeight` int(11) NULL DEFAULT NULL,
  `LanguageWeight` int(11) NULL DEFAULT NULL,
  `BudgetWeight` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`JobId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of requirements
-- ----------------------------

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'user', '2021-09-21 16:22:44', '2021-09-21 16:22:44');
INSERT INTO `roles` VALUES (2, 'manager', '2021-09-21 16:22:44', '2021-09-21 16:22:44');
INSERT INTO `roles` VALUES (3, 'admin', '2021-09-21 16:22:44', '2021-09-21 16:22:44');

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team`  (
  `MemberId` int(11) NOT NULL,
  `ProjectName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ProjectId` int(11) NOT NULL,
  `MemberName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team
-- ----------------------------

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`, `userId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES ('2021-09-21 16:23:15', '2021-09-21 16:23:15', 1, 1);
INSERT INTO `user_roles` VALUES ('2021-09-21 19:11:14', '2021-09-21 19:11:14', 1, 4);
INSERT INTO `user_roles` VALUES ('2021-09-21 17:04:29', '2021-09-21 17:04:29', 2, 3);
INSERT INTO `user_roles` VALUES ('2021-09-21 16:45:03', '2021-09-21 16:45:03', 3, 2);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'yliang', 'yliang24@ncsu.edu', '$2a$08$K4mX1SDDdIgAlBwhz5gWueGrIIK0.xDPgBJWmJ1GVSiNst3XGr86C', '2021-09-21 16:23:15', '2021-09-21 16:23:15');
INSERT INTO `users` VALUES (2, 'admin', 'admin@ncsu.edu', '$2a$08$PhkNxvO29XIYpZqwHnN2eOHGnLzWKpnsV7sV/f/RA0kTzI7dnCm5q', '2021-09-21 16:45:03', '2021-09-21 16:45:03');
INSERT INTO `users` VALUES (3, 'manager', 'manager@ncsu.edu', '$2a$08$8ZbPVlB1RYMz//rUOm5sJeGyWBvBa1KX2ANi.eUDFQHVr1Llfo9j6', '2021-09-21 17:04:29', '2021-09-21 17:04:29');
INSERT INTO `users` VALUES (4, 'yliang123', 'yliang4@ncsu.edu', '$2a$08$oOZdHq8EvorsW1T7uKVD6e9i14EkxnP3LR7eF.56rh/D855POhDZ2', '2021-09-21 19:11:14', '2021-09-21 19:11:14');

-- ----------------------------
-- Procedure structure for populateRequirements
-- ----------------------------
DROP PROCEDURE IF EXISTS `populateRequirements`;
delimiter ;;
CREATE PROCEDURE `populateRequirements`(IN vLanguagePreferred VARCHAR(255),
    IN vSkill VARCHAR(255),
    IN vMemberRole VARCHAR(255),
    IN vAvailableHoursPerWeek INT,
    IN vSkillWeight INT,
    IN vExperienceWeight INT,
    IN vHoursWeight INT,
    IN vLanguageWeight INT,
    IN vBudgetWeight INT)
BEGIN
    DECLARE pid INT DEFAULT -1;
    SELECT MAX(ProjectID) INTO pid FROM Project;
    
    INSERT INTO Requirements (ProjectId,LanguagePreferred,Skill,MemberRole,AvailableHoursPerWeek,SkillWeight,ExperienceWeight, HoursWeight, LanguageWeight, BudgetWeight) 
	VALUES (pid, vLanguagePreferred,vSkill,vMemberRole,vAvailableHoursPerWeek,vSkillWeight,vExperienceWeight, vHoursWeight, vLanguageWeight, vBudgetWeight);
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
