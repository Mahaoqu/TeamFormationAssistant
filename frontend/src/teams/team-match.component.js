import UserService from '../services/user.service';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Spin, Table, Space } from 'antd';

const App = () => {
  return (
    <div className="midpart">
      <h2 align="center">Team Match Result</h2>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Link to="team/match">
          <Button>Match Team Now</Button>
        </Link>
      </div>

      <TeamMatchTable />
    </div>
  );
};

const TeamMatchTable = () => {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('teams').then(data => {
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

const columns = [
  {
    title: 'ProjectName',
    dataIndex: 'project_name',
    key: 'project_name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Membername',
    dataIndex: 'member_name',
    key: 'member_name',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Send Offer</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default App;
