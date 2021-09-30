# pylint: skip-file
from __future__ import absolute_import

import json
import unittest
import sys

sys.path.append(".")
from server.app import app
from test.connection import connect
from test import connection

TEST_DATA_JOB = {
    "JobName": "testscript",
    "JobPhone": "1231231231",
    "JobRole": "testscript",
    "Description": "testscript",
    "JobAddress": "testscript",
    "ProjectId": "123"
}

WRONG_DATA_JOB = {
    "JobName": "testscript",
    "JobPhone": "123123123123",
    "JobRole": "testscript",
    "Description": "testscript",
    "JobAddress": "testscript",
    "ProjectId": "123"
}

PROJECT_DETAIL_DATA = {
    "name": "test",
    "enddate": "2020-12-12",
    "teamsize": "1",
    "budget": "100",
    "tools": "Vscode",
    "priority": "4",
    "languagepreferred0": "JAVA",
    "skill0": "33",
    "memberrole0": "DevOps",
    "availablehoursperweek0": "20",
    "skillweight": "20",
    "experienceweight": "20",
    "hoursweight": "20",
    "languageweight": "20",
    "budgetweight": "20",
}

"""Define all test cases as test_TEST_NAME"""

class Api(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.db = connect()
        self.connection = connection

    def test_get_team_data(self):
        response = self.app.get("/api/job")
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 200)
        # self.assertNotEqual(len(data[0]['MemberName']), 0)
        # self.assertIsNotNone(data[0]['ProjectId'])
        # self.assertNotEqual(len(data[0]['ProjectName']), 0)

    def test_member_signup_success(self):
        response = self.connection.add_job(TEST_DATA_JOB)
        self.assertEqual(response, True)

    # def test_member_signup_fails(self):
    #     response = self.connection.add_member(WRONG_DATA)
    #     self.assertEqual(response, False)

    # def test_save_project_requirements(self):
    #     response = self.connection.save_project_requirements(PROJECT_DETAIL_DATA)
    #     self.assertEqual(response, True)

    # def create_project(self):
    #     response = self.connection.create_project(PROJECT_DETAIL_DATA)
    #     self.assertEqual(response, True)


if __name__ == "__main__":
    unittest.main()
