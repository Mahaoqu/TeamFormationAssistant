import { Button, Space, Spin, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

const App = () => {
  return (
    <div className="midpart">
      <h2 align="center">Projects</h2>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Link to="/add_project">
          <Button>Add Project</Button>
        </Link>
      </div>

      <Content />
    </div>
  );
};

const Content = () => {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState();
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    axios.get('projects').then(data => {
      console.log(data)
      setDetail(data.data);
      setLoading(false);
    });

    if (user) {
      setUserRole({
        currentUser: user,
        showManagerBoard:
          user.roles.includes('ROLE_MANAGER') ||
          user.roles.includes('ROLE_ADMIN'),
        showAdminBoard: user.roles.includes('ROLE_ADMIN'),
      });
    }
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: d => new Date(d).toLocaleDateString()
    },
    {
      title: 'Team Size',
      dataIndex: 'teamSize',
      key: 'teamSize',
    },
    {
      title: 'Budget',
      key: 'budget',
      dataIndex: 'budget',
    },
    {
      title: 'Assignment Complete?',
      dataIndex: 'isAssignmentComplete',
      key: 'isAssignmentComplete',
      render: is => (is ? 'Yes' : 'No'),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: p => ['Very High', 'High', 'Low', 'Very Low'][parseInt(p)]
    },
    {
      title: 'Tools',
      dataIndex: 'tools',
      key: 'tools',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button>Invite</Button>
          {userRole.showAdminBoard && (<Button>Delete</Button>)}
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={detail} />
    </Spin>
  );
};

export default App;
