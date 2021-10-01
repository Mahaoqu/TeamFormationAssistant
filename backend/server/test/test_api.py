# pylint: skip-file
from __future__ import absolute_import

import json
import unittest
import sys
import requests

sys.path.append(".")
from test.connection import connect
from test import connection
# from server.test.connection import connect
# from server.test import connection

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


"""Define all test cases as test_TEST_NAME"""

class Api(unittest.TestCase):
    def setUp(self):
        self.db = connect()
        self.connection = connection

    def test_get_job_data(self):
        response = requests.get("http://3.83.120.177:8080/api/jobs")
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 200)
        # self.assertNotEqual(len(data[0]['MemberName']), 0)
        # self.assertIsNotNone(data[0]['ProjectId'])
        # self.assertNotEqual(len(data[0]['ProjectName']), 0)

    def test_member_signup_success(self):
        response = self.connection.add_job(TEST_DATA_JOB)
        self.assertEqual(response, True)



if __name__ == "__main__":
    unittest.main()
