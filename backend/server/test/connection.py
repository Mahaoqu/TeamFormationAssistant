# pylint: skip-file
import mysql.connector as conn

# Connect to Local MYSQL database on Dev team Desktops. FOr production Environments connect to AWS
try:
    Connection = conn.connect(
        host="database",
        user="dbuser",
        password="dbuserpwd",
        database="teamformationassistant",
    )
    print("Connected to Developer Database")
except:
    Connection = conn.connect(
        host="database",
        user="root",
        password="SEFall2021",
        database="teamformationassistant",
    )
    print("Switching to root user")


def connect():
    try:
        Connection = conn.connect(
            host="database",
            user="root",
            password="DatabasePass@54",
            database="teamformationassistant",
            auth_plugin="mysql_native_password",
        )
    except:
        Connection = conn.connect(
            host="database",
            user="root",
            password="SEFall2021",
            database="teamformationassistant",
        )


def CheckConnection():
    if not Connection.is_connected():
        connect()

def add_job(data):
    try:
        CheckConnection()
        with Connection.cursor() as cursor:
            jobName = str(data["JobName"])
            jobPhone = str(data["JobPhone"])
            jobRole = str(data["JobRole"])
            description = str(data["Description"])
            jobAddress = str(data["JobAddress"])
            projectId = str(data["ProjectId"])

            query = "INSERT INTO Job (JobName, JobPhone, JobRole, Description, JobAddress, ProjectId) VALUES (%s,%s,%s,%s,%s,%d);"
            cursor.execute(
                query,
                (
                    jobName,
                    jobPhone,
                    jobRole,
                    description,
                    jobAddress,
                    projectId
                )
            )
            Connection.commit()
            return True

    except conn.Error as error:
        print("Failed to update record to database rollback: {}".format(error))
        Connection.rollback()
        return False

def create_project(data):
    """Adds new project details to project database"""
    try:
        CheckConnection()
        with Connection.cursor() as cursor:
            name = str(data["name"])
            end_date = str(data["enddate"])
            team_size = str(data["teamsize"])
            budget = str(data["budget"])
            tools = str(data["tools"])
            priority = str(data["priority"])
            is_assignment_complete = str(0)

            query = "INSERT INTO Project (ProjectName,ProjectEndDate,ProjectTeamSize,Budget,Tools,Priority,IsAssignmentComplete) VALUES (%s,%s,%s,%s,%s,%s,%s);"
            cursor.execute(
                query,
                (
                    name,
                    end_date,
                    team_size,
                    budget,
                    tools,
                    priority,
                    is_assignment_complete,
                ),
            )
            Connection.commit()
        return True

    except conn.Error as error:
        print("Failed to update record to database rollback: {}".format(error))
        Connection.rollback()
        return False
