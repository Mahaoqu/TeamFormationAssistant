# Team Formation Assistant

[![Build Status](https://app.travis-ci.com/yliang123/TeamFormationAssistant.svg?branch=master)](https://app.travis-ci.com/yliang123/TeamFormationAssistant)
[![DOI](https://zenodo.org/badge/doi/10.5281/zenodo.5542332.svg)](https://zenodo.org/badge/latestdoi/408224049)
[![Documentation Status](https://readthedocs.org/projects/ansicolortags/badge/?version=latest)](http://ansicolortags.readthedocs.io/?badge=latest)
![GitHub language count](https://img.shields.io/github/languages/count/AmitMandliya/TeamFormationAssistant?style=flat-square)
<img src=https://img.shields.io/github/license/yliang123/TeamFormationAssistant>

# Introduction

Creating teams has always been an issue in large companies, especially with ones who have employees spread out over a country or even with employees in differents countries. The larger the company, the harder it is to choose employees who have different skill levels, avalibility for a specific project. Thus, this project aims to provide an easy to way to build teams by creating an assistant that will aid with project and job management. The project management side will allow for you to assign employees to projects based on the project requirements, team members availability, skill level, tools preferred, etc. The job management side will allow users to apply to jobs and the manager to review the applications or audit applications automatically.

In addition, this project has the following features to aid team creation:
➢ A form for the manager to enter projects requirements & new jobs informations.<br/>
➢ A dashboard to showcase the generated projects assignments & jobs assignments.<br/>
➢ A database using MySQL to store the employees, projects, assignments data.<br/>
➢ An algorithm which will take the project requirements, team members availability, skill level, tools preferred, etc. as input and assigns the applicants for new jobs and employees for the new projects.<br/>

# Click for video:

[![Team Formation Assistant Project 2](https://github.com/yliang123/CSC510-Group18/blob/main/teamformation.png)](https://www.youtube.com/watch?v=U7m2TXdxnak)

[![Team Formation Assistant](https://github.com/lokesh45/TeamFormationAssistant/blob/master/Assistant.png)](https://www.youtube.com/watch?v=LmKjp3aQPEI&feature=youtu.be)

[![Team Formation Assistant Project 2 DEMO](https://github.com/Mahaoqu/TeamFormationAssistant/tree/master/docs/teamFormationAssistant.png)]
(https://www.youtube.com/watch?v=Zev_PW6lhZM)

Steps for execution:

1. Download [Docker](https://docs.docker.com/get-docker/).
2. Pull this project from Github.
3. In the terminal, navigate to the TeamFormationAssistant directory.
4. Run the following command:
```
npm i
docker-compose up --build -d
```
6. Next, open your browser and type in localhost:8080 in the search bar to open the web UI of the application

## Project Details

### Database Implementation:

We store team members into an MySQL database. Python files import the
data and process it and store the final result back to the database.<br/>

### Frontend Implementation:

Team members will be able to submit a form to consider them as part of project
assignment.
Final team assignment will posted on the homepage dashboard. We 
implement the dashboard and form using HTML, CSS, and JavaScript.

### Linting: Code Styling, Formatting and Syntax Checking:
Flake8, ESlint, Prettier

### Automated Analysis Tool used:
[Code Climate](https://codeclimate.com/github/yliang123/TeamFormationAssistant)

### For more information, check out the [wiki](https://github.com/yliang123/TeamFormationAssistant/wiki).

Project Screenshots:<br>
![](https://github.com/yliang123/TeamFormationAssistant/blob/master/images/Screen%20Shot%202021-09-30%20at%203.45.46%20PM.png)<br>
![](https://github.com/yliang123/TeamFormationAssistant/blob/master/images/Screen%20Shot%202021-09-30%20at%203.46.40%20PM.png)

## Video link

Development Environment Setup
[![Development Environment Setup](https://github.com/AmitMandliya/TeamFormationAssistant/blob/master/images/Development.png)](https://youtu.be/WLMfi0sLFsA)

Main Functions and Procedure
[![Main Functions and Procedure](https://github.com/AmitMandliya/TeamFormationAssistant/blob/master/images/teamFormation.PNG)](https://youtu.be/Xtcq-58arUU)
