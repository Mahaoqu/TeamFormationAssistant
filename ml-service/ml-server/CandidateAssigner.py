from mysql.connector import connect
import pandas as pd

import mysql.connector

# import sys
# import math

connection = mysql.connector.connect(
    host="3.83.120.177",
    database="teamformation",
    user="dbuser",
    password="dbuserpwd"
)

# for function assignCandidate
def persistCandidateData(candidateData):
    """ Creates a dataframe containing the project ids and the applications matched to that project """
    if connection.is_connected():
        cursor = connection.cursor()
        for row in candidateData.index:
            sql = "REPLACE INTO Candidate(ProjectId, ProjectName, \
                  ApplicationId, ApplicationName)VALUES(%s,%s,%s,%s);"
            cursor.execute(
                sql,
                (
                    str(candidateData.loc[row, "ProjectId"]),
                    str(candidateData.loc[row, "ProjectName"]),
                    str(candidateData.loc[row, "ApplicationId"]),
                    str(candidateData.loc[row, "ApplicationName"]),
                ),
            )
        connection.commit()


# for function applicationToCandidateMapping
def setEmployeeAssignement(employ):
    """ Updates the application details in the database if he or she is assigned to a project """
    if connection.is_connected():
        cursor = connection.cursor()
        sql = "UPDATE Member SET IsAssigned= %s WHERE MemberId = %s ;"
        cursor.execute(sql, (1, employ))
        connection.commit()

# for function assignCandidate
def applicationToCandidateMapping(ApplicationData, ProjectData, RequirementsData):
    """ Matches the applications to the project candidates """
    requirementsIDs = RequirementsData["RequirementsId"].tolist()
    employee = ApplicationData["ApplicationId"].tolist()
    candidateData = pd.DataFrame(
        columns=["ProjectId", "ProjectName", "ApplicationId", "ApplicationName"]
    )

    for requirementsID in requirementsIDs:
        Req = RequirementsData.loc[RequirementsData["RequirementsId"] == requirementsID]
        reqLanguage = Req["LanguagePreferred"].tolist()[0]
        skillweight = float(Req["SkillWeight"])
        experienceWeight = float(Req["ExperienceWeight"])
        languageWeight = float(Req["LanguageWeight"])
        ProjectId = Req["ProjectId"].tolist()[0]
        Project = ProjectData.loc[ProjectData["ProjectId"] == ProjectId]
        ProjectName = Project["ProjectName"].tolist()
        if len(ProjectName) == 0:
            ProjectName = "Not Provided22"
        else:
            ProjectName = Project["ProjectName"].tolist()[0]

        highScore = 0
        selectedEmploy = ""
        for employ in employee:
            employData = ApplicationData.loc[ApplicationData["ApplicationId"] == employ]
            skillScore = float(employData["AppSkillScore"])
            #expScore = float(employData["AppExperience"])
            expScore = 1
            languageScore = 0

            if reqLanguage in employData["ApplicationLanguages"].tolist()[0].split(","):
                languageScore = 1
            memscore = (
                    (skillweight * skillScore)
                    + (experienceWeight * expScore)
                    + (languageWeight * languageScore)
            ) / (skillweight + experienceWeight + languageWeight)
            if memscore > highScore:
                selectedEmploy = employ
                highScore = memscore

        if selectedEmploy not in employee:
            continue
        employee.remove(selectedEmploy)
        #setEmployeeAssignement(int(selectedEmploy))
        Application = ApplicationData.loc[ApplicationData["ApplicationId"] == selectedEmploy]
        ApplicationName = Application["ApplicationName"].tolist()[0]
        candidateData = candidateData.append(
            {
                "ProjectId": ProjectId,
                "ProjectName": ProjectName,
                "ApplicationId": selectedEmploy,
                "ApplicationName": ApplicationName,
            },
            ignore_index=True,
        )
    return candidateData


def assignCandidate():
    """ Runner function which makes subsequeent function calls and fires SQL queries to perform the candidate matching """
    if connection.is_connected():
        Application_Query = pd.read_sql_query("""select * from Application""", connection)
        Project_Query = pd.read_sql_query("""select * from Project""", connection)
        Requirements_Query = pd.read_sql_query(
            """select * from Requirements""", connection
        )
        ApplicationData = pd.DataFrame(
            Application_Query,
            columns=[
                "ApplicationId",
                "ApplicationName",
                "ApplicationLanguages",
                "AppPhone",
                "AppAddress",
                "AppSkillScore",
                "AppExperience",
            ],
        )
        ProjectData = pd.DataFrame(
            Project_Query,
            columns=[
                "ProjectId",
                "ProjectName",
                "ProjectEndDate",
                "ProjectCandidateSize",
                "Budget",
                "Tools",
                "IsAssignmentComplete",
                "Priority",
            ],
        )
        RequirementsData = pd.DataFrame(
            Requirements_Query,
            columns=[
                "RequirementsId",
                "ProjectId",
                "LanguagePreferred",
                "Skill",
                "MemberRole",
                "AvailableHoursPerWeek",
                "SkillWeight",
                "ExperienceWeight",
                "HoursWeight",
                "LanguageWeight",
                "BudgetWeight",
            ],
        )
        candidateData = applicationToCandidateMapping(ApplicationData, ProjectData, RequirementsData)
        persistCandidateData(candidateData)


if __name__ == "__main__":
    assignCandidate()
