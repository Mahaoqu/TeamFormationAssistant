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

DROP TABLE IF EXISTS Member;
DROP TABLE IF EXISTS Project;
DROP TABLE IF EXISTS Team;
DROP TABLE IF EXISTS Requirements;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS Job;
DROP TABLE IF EXISTS Application;
DROP TABLE IF EXISTS Job_application;
DROP TABLE IF EXISTS Candidate;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS roles;

CREATE TABLE Job(
JobId 					INT NOT NULL AUTO_INCREMENT,
JobName 				VARCHAR(225) NOT NULL,
JobPhone  			VARCHAR(225) NOT NULL,
JobRole 	 		VARCHAR(225) NOT NULL,
Description 				VARCHAR(225) NOT NULL,
JobAddress 					VARCHAR(225) NOT NULL,
ProjectId           INT,
PRIMARY KEY (JobId)
);

CREATE TABLE Application(
ApplicationId 					INT NOT NULL AUTO_INCREMENT,
ApplicationName 				VARCHAR(225) NOT NULL,
ApplicationLanguages  			VARCHAR(225) NOT NULL,
AppPhone 	 		VARCHAR(225) NOT NULL,
AppAddress 				VARCHAR(225) NOT NULL,
AppSkillScore 					INT,
AppExperience					INT,
PRIMARY KEY (ApplicationId)
);

CREATE TABLE Job_Application(
	Job_applictionId INT NOT NULL AUTO_INCREMENT,
	JobId	INT NOT NULL REFERENCES Job(JobId),
	Job_application_status varchar(255),
	ApplicationId	INT NOT NULL REFERENCES Application(ApplicationId),
	
	PRIMARY KEY (Job_applictionId)
    	
);

CREATE TABLE Member(
	MemberId				INT NOT NULL AUTO_INCREMENT,
	MemberName					VARCHAR(255) NOT NULL, 
	DOB						DATE,
	Languages				VARCHAR(255) NOT NULL,
	IsAssigned				INT,
	HourlyRate				FLOAT,
	MemberRole					VARCHAR(255),
	Experience				INT,
	SkillScore				INT,
	AvailableHoursPerWeek	INT,
	PRIMARY KEY (MemberId)
);


CREATE TABLE Candidate(
	ProjectId	INT NOT NULL REFERENCES Project(ProjectId),
	ProjectName	VARCHAR(255) NOT NULL,
	ApplicationId	INT NOT NULL REFERENCES Application(ApplicationId),
	ApplicationName	VARCHAR(255) NOT NULL,
	CONSTRAINT pk_proj_app PRIMARY KEY (ProjectId, ApplicationId)
);


CREATE TABLE Project(
	ProjectId				INT NOT NULL AUTO_INCREMENT,
	ProjectName					VARCHAR(255) NOT NULL,
	ProjectEndDate					DATE,
	ProjectTeamSize					INT,
	Budget					FLOAT,
	Tools					VARCHAR(255),
	IsAssignmentComplete	INT,
	Priority				INT,
	PRIMARY KEY (ProjectId)
);

CREATE TABLE Team(
	MemberId	INT NOT NULL REFERENCES Member(MemberId),
	ProjectName 	VARCHAR(255) NOT NULL,
	ProjectId	INT NOT NULL REFERENCES Project(ProjectId),
    	MemberName	VARCHAR(255) NOT NULL
);

CREATE TABLE Requirements(
	RequirementsId					INT NOT NULL AUTO_INCREMENT,
	ProjectId				INT NOT NULL REFERENCES Project(ProjectId),
	LanguagePreferred 				VARCHAR(255) NOT NULL,
	Skill					INT NOT NULL,
	MemberRole					VARCHAR(255),
	AvailableHoursPerWeek	INT,
	SkillWeight				INT,
	ExperienceWeight		INT,
	HoursWeight				INT,
	LanguageWeight			INT,
	BudgetWeight			INT,
	PRIMARY KEY (RequirementsId)
);

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
DELIMITER //
CREATE PROCEDURE populateRequirements(
	IN vLanguagePreferred VARCHAR(255),
    IN vSkill VARCHAR(255),
    IN vMemberRole VARCHAR(255),
    IN vAvailableHoursPerWeek INT,
    IN vSkillWeight INT,
    IN vExperienceWeight INT,
    IN vHoursWeight INT,
    IN vLanguageWeight INT,
    IN vBudgetWeight INT
)
BEGIN
    DECLARE pid INT DEFAULT -1;
    SELECT MAX(ProjectID) INTO pid FROM Project;
    
    INSERT INTO Requirements (ProjectId,LanguagePreferred,Skill,MemberRole,AvailableHoursPerWeek,SkillWeight,ExperienceWeight, HoursWeight, LanguageWeight, BudgetWeight) 
	VALUES (pid, vLanguagePreferred,vSkill,vMemberRole,vAvailableHoursPerWeek,vSkillWeight,vExperienceWeight, vHoursWeight, vLanguageWeight, vBudgetWeight);
END//   

DELIMITER ;
