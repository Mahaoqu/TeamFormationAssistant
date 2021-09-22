USE teamformationassistant;

DROP TABLE IF EXISTS Member;
DROP TABLE IF EXISTS Project;
DROP TABLE IF EXISTS Team;
DROP TABLE IF EXISTS Requirements;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Job;
DROP TABLE IF EXISTS Application;
DROP TABLE IF EXISTS Job_application;
DROP TABLE IF EXISTS Candidate;
DROP TABLE IF EXISTS User_Roles;
DROP TABLE IF EXISTS Roles;

CREATE TABLE Users(
UserId 					INT NOT NULL AUTO_INCREMENT,
UerName 				VARCHAR(225) NOT NULL,
UserPassword 		VARCHAR(225) NOT NULL,
UserEmail 	 		VARCHAR(225) NOT NULL,

PRIMARY KEY (UserId)
);

CREATE TABLE Roles(
RoleId 					INT NOT NULL AUTO_INCREMENT,
RoleName 				VARCHAR(225) NOT NULL,


PRIMARY KEY (RoleId)

);

CREATE TABLE User_Roles(
	
	RoleId	INT NOT NULL REFERENCES Roles(RoleId),
	
	UserId	INT NOT NULL REFERENCES Users(UserId)
    	
);


CREATE TABLE Job(
JobId 					INT NOT NULL AUTO_INCREMENT,
JobName 				VARCHAR(225) NOT NULL,
JobPhone  			VARCHAR(225) NOT NULL,
JobRole 	 		VARCHAR(225) NOT NULL,
Description 				VARCHAR(225) NOT NULL,
JobAddress 					VARCHAR(225) NOT NULL,
PRIMARY KEY (JobId)
);

CREATE TABLE Application(
ApplicationId 					INT NOT NULL AUTO_INCREMENT,
ApplicationName 				VARCHAR(225) NOT NULL,
ApplicationLanguages  			VARCHAR(225) NOT NULL,
AppPhone 	 		VARCHAR(225) NOT NULL,
AppAddress 				VARCHAR(225) NOT NULL,
AppSkillScore 					INT,
AppExperience						VARCHAR(225) NOT NULL,
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
	ProjectName	INT NOT NULL REFERENCES Project(ProjectName),
	ApplicationId	INT NOT NULL REFERENCES Application(ApplicationId),
	ApplicationName	INT NOT NULL REFERENCES Application(ApplicationName)
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
	ProjectName varchar(255),
	ProjectId	INT NOT NULL REFERENCES Project(ProjectId),
    	MemberName		VARCHAR(255) NOT NULL
);

CREATE TABLE Requirements(
	JobId					INT NOT NULL AUTO_INCREMENT,
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
	PRIMARY KEY (JobId)
);


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