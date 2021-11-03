import React, { Component, useEffect, useState } from 'react';

import AddProject from './add-project.component';
import { Table, Tag, Space, Spin, Button } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    axios.get('projects').then(data => {
      console.log(data)
      setDetail(data.data);
      setLoading(false);
    });
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
    },
    {
      title: 'Tools',
      dataIndex: 'tools',
      key: 'tools',
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={detail} />
    </Spin>
  );
};

export default App;
