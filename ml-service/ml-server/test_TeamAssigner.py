import warnings
import unittest
import pytest
from unittest.mock import MagicMock, patch
import TeamAssigner
import pandas as pd
import mysql.connector

class testTeamAssigner(unittest.TestCase):
    
  def testSetEmployeeAssignment(self):

    testSQL ="UPDATE Member SET IsAssigned= %s WHERE MemberId = %s ;"
    with patch(target='mysql.connector.connect') as mock:
      TeamAssigner.setEmployeeAssignement(1, mock)
      mockCursor = mock.cursor()

    self.assertIsNotNone(mock)
    self.assertTrue(mock.commit.called)
    mockCursor.execute.assert_called_once_with(testSQL, (1,1))
    self.assertTrue(mockCursor.execute.called)
    self.assertTrue(mock.is_connected.called)

  def testPersistTeamData(self):

    mockTeamDataDf = pd.DataFrame(columns = ["ProjectId", "ProjectName", "MemberId", "MemberName"])
    mockTeamDataDf = mockTeamDataDf.append({"ProjectId": 1, "ProjectName": 'ABC', 'MemberId': '25', 'MemberName': 'John'}, ignore_index=True)
    mockTeamDataDf = mockTeamDataDf.append({"ProjectId": 1, "ProjectName": 'ABC', 'MemberId': '30', 'MemberName': 'Jane'}, ignore_index=True)
    mockTeamDataDf = mockTeamDataDf.append({"ProjectId": 2, "ProjectName": 'XYZ', 'MemberId': '35', 'MemberName': 'Matt'}, ignore_index=True)
    mockTeamDataDf = mockTeamDataDf.append({"ProjectId": 3, "ProjectName": 'PQR', 'MemberId': '40', 'MemberName': 'Rick'}, ignore_index=True)

    testSQL = "INSERT INTO Team(ProjectId, ProjectName, MemberId, MemberName)VALUES(%s,%s,%s,%s);"

    with patch(target='mysql.connector.connect') as mock:
      TeamAssigner.persistTeamData(mockTeamDataDf, mock)
      mockCursor = mock.cursor()
    
    self.assertIsNotNone(mock)
    self.assertTrue(mock.commit.called)
    mockCursor.execute.assert_called_with(testSQL, (str(mockTeamDataDf.loc[3, 'ProjectId']),str(mockTeamDataDf.loc[3, 'ProjectName']),str(mockTeamDataDf.loc[3, 'MemberId']),str(mockTeamDataDf.loc[3, 'MemberName'])))
    self.assertTrue(mockCursor.execute.called)
    self.assertTrue(mock.is_connected.called)

if __name__ == '__main__':
  unittest.main()

