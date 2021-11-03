import React, { Component, useState, useEffect } from 'react';
import AddMember from './add-member.component';
import { Table, Tag, Space, Spin, Button } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Languages',
    dataIndex: 'aanguages',
    key: 'languages',
  },
  {
    title: 'Assigned?',
    dataIndex: 'isAssigned',
    key: 'isAssigned',
    render: is => (is ? 'Yes' : 'No'),
  },
  {
    title: 'Hourly Rate',
    key: 'hourlyRate',
    dataIndex: 'hourlyRate',
  },
  {
    title: 'Member Role',
    dataIndex: 'memberRole',
    key: 'memberRole',
  },
  {
    title: 'Experience',
    dataIndex: 'experience',
    key: 'experience',
  },
  {
    title: 'Skill Score',
    dataIndex: 'skillScore',
    key: 'skillScore',
  },
  {
    title: 'Available Hours Per Week',
    dataIndex: 'availableHoursPerWeek',
    key: 'availableHoursPerWeek',
  },
];

const App = () => {
  return (
    <div className="midpart">
      <h2 align="center">Members</h2>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Link to="/add_member">
          <Button>Add Member</Button>
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
    axios.get('members').then(data => {
      console.log(data);
      setDetail(data.data);
      setLoading(false);
    });
  }, []);

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={detail} />
    </Spin>
  );
};
export default App;
