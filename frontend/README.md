### Directory Details:
This directory contains the frontend code. The setup is automated using [Docker](https://github.com/AmitMandliya/TeamFormationAssistant/wiki/Setting-Up-Development-Environment).
If you wish run it locally then go to [Wiki](https://github.com/lokesh45/TeamFormationAssistant/wiki/NodeJS-Documentation) for instructions.
Here are details of the files used. 

### File : App.js

App.js acts as a middleware for this project. It connects the server and the client. It navigates to different files such as Signup.js, ProjectDetails.js whenever required.

### File : Signup.js

This file is for people who want to register regarding their work availability. It has several features:<br>
1. Name - Records the name of the person.<br>
2. Date of Birth - Records Data of birth of the person and makes sure he/she is at least 18 years old.<br>
3. Programming language - Records their most proficient programming language.<br>
4. Hourly rate - Records each individuals personal choice of hourly rate that they think they deserve.<br>
5. Role - There are several roles that a software engineer might be proficient in or interest in. We have provided these choices as a dropdown where they can select their field of interest.<br>
6. Experience - Records number of years of experience of the individual.<br>
7. Skill Score - Records the indiviudal's score that they achieved in the Skill Assessment test.<be>
8. Available Hours - Records number of hours he/she is available for the week. 


### File : ProjectDetails.js
This file is for managers/employers who are looking for employees that can be a good fit to the project. It has several features:<br>
1. Project Name - Records the name of the project. <br>
2. End Date - Records the expected end date of the project.<br>
3. Team size - Records the required size of the team. <br>
4. Budget - Records budget(in dollars) that is assigned to the project. <br>
5. Tools - Records the various tools that the employees are going to work on for this project.<br>
6. Priority - Records the priority of the project as per Manager on a scale of 1-4. <br>

Now in the same file, we have several features that an employers is looking for in the employees. They are:<br>
1. Preferred Programming language - Records the requirement of the manager in terms of what he is looking for in individual's programming language preference.<br>
2. Minimum skill assessment score - Records the requirement of the manager in terms of what he is looking for in individual's Skill Assessment score.<br>
3. Role - Records the requirement of the manager in terms of what he is looking for in individual's Preferred role.<br>
4. Available hours - Records the requirement of the manager in terms of what he is looking for in an individual's availability as a unit of hours.<br>
5. There are fields that records the weights for different attributes of a employee.<br>
---->> a)Skill Weight <br>
---->> b)Experience Weight <br>
---->> c)Budget Weight <br>
---->> d)Language Weight <br>
---->> e)hours Weight <br>

#### Employers must make sure that these weights sum up to 100. <br>
#### The page has default to add 1 member, but if the employers need more people on the project they can select the option "Add new member" and fill the above details.<br>
 
### File : Home.js

This is the home page of the application where we can see the Team member and their assigned project. This gives a fair idea on who are all currently working on a project and which project are they working on.<br>

### File : TeamAssigner.py 

This file is the core of the project as it is responsible for assigning team members to a project in a navel way.
This file is run on a regular basis where it fetches all the projects that need team member assignments and all the team members that are available for work. 
After fetching the team members a score is calculated for each individual based on the requirements and weights for that 
specific project that are provided by the employer when they were entering the project details and requirements. Once each individual's score is calculated, 
they are sorted based on the requirements in hand and top members are assigned to the project. 
