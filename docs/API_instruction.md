<h1>API_Instruction</h1>

**Function:api/projects/post**<br>
**Description**: When a new project is created, insert the information of new project into the table “project”<br>
**Inputs**:
- ProjectName 
- ProjectEndDate 
- ProjectTeamSize 
- Budget 
- Tools 
- Priority
- IsAssignmentComplete：whether the project is assigned to employees

**Outputs**: None
<br>
<br>


**Function: api/projects/get**<br>
**Description**: Query all data stored in the table “Project”<br>
**Inputs**: None<br>
**Outputs**: 
- ProjectId 
- ProjectName 
- ProjectEndDate 
- ProjectTeamSize 
- Budget 
- Tools 
- Priority 
- IsAssignmentComplete：whether the project is assigned to employees
<br>
<br>

**Function: api/teams**<br>
**Description**: Query all data in the table”Team”<br>
**Inputs**: None<br>
**Outputs**: 
- MemberName 
- ProjectName
<br>
<br>


**Function: api/members/post**<br>
**Description**: Insert the information of current user into the table”Member”<br>
**Inputs**:
- MemberName 
- HourlyRate 
- DOB: date of birth 
- Languages: the programming languages current user prefers 
- IsAssigned : Whether the current user is assigned to a job 
- MemberRole 
- Experience 
- SkillScore 
- AvailableHoursPerWeek

**Outputs**: None
<br>
<br>



**Function: api/members/get**<br>
**Description**: Get all data stored in the table “Member”<br>
**Inputs**: None<br>
**Outputs**: 
- MemberId 
- MemberName 
- HourlyRate 
- DOB: date of birth 
- Languages: the programming languages current user prefers 
- IsAssigned : Whether the current user is assigned to a job 
- MemberRole - Experience - SkillScore - AvailableHoursPerWeek
<br>
<br>


**Function: api/candidates/get**<br>
**Description**: Get all data stored in the table “Candidates”<br>
**Inputs**: None<br>
**Outputs**: 
- ProjectId 
- ApplicationId 
- ProjectName 
- ApplicationName
<br>
<br>



**Function: api/jobs/get**<br>
**Description**: Get all data stored in the table “Job”<br>
**Inputs**: None<br>
**Outputs**: 
- JobId 
- JobName 
- JobRole 
- JobPhone 
- JobAddress 
- Description 
- ProjectId
<br>
<br>



**Function: api/jobs/post**<br>
**Description**: When a new job is created by manager or admin, insert all related information into the table “Job”<br>
**Inputs**: 
- JobName 
- ProjectId 
- JobPhone 
- JobRole 
- Description 
- JobAddress

**Outputs**: None
<br>
<br>



**Function: api.py/execute_algo()**<br>
**Description**: Execute the machine learning algorithm for the project assignment to employees<br>
**Inputs**: 
- MemberId
- MemberName
- HourlyRate
- DOB: date of birth 
- Languages: the programming languages current user prefers
- IsAssigned : Whether the current user is assigned to a job
- MemberRole
- Experience
- SkillScore
- AvailableHoursPerWeek
- ProjectId 
- ProjectName 
- ProjectEndDate 
- ProjectTeamSize 
- Budget 
- Tools 
- Priority 
- IsAssignmentComplete：whether the project is assigned to employees 
- RequirementsId 
- LanguagePreferred 
- Skill 
- SkillWeight 
- ExperienceWeight 
- HoursWeight 
- LanguageWeight 
- BudgetWeight

**Outputs**: 
- ProjectId 
- ProjectName 
- MemberId 
- MemberName
<br>
<br>



**Function: api.py/execute_cand()**<br>
**Description**: Execute the machine learning algorithm for the job assignment to applicants<br>
**Inputs**: 
- ApplicationId 
- ApplicationName 
- ApplicationLanguages 
- AppPhone 
- AppAddress 
- AppSkillScore 
- AppExperience
- ProjectId 
- ProjectName 
- ProjectEndDate 
- ProjectCandidateSize 
- Budget 
- Tools 
- Priority 
- IsAssignmentComplete：whether the project is assigned to employees 
- RequirementsId 
- LanguagePreferred 
- Skill 
- MemberRole 
- AvailableHoursPerWeek 
- SkillWeight 
- ExperienceWeight 
- HoursWeight 
- LanguageWeight 
- BudgetWeight

**Outputs**: 
- ProjectId 
- ProjectName 
- ApplicationId 
- ApplicationName

