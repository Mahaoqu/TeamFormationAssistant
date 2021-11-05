import UserService from '../services/user.service';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Spin, Table, Space } from 'antd';

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
        <Button>Send Offer</Button>
        <Button>Delete</Button>
      </Space>
    ),
  },
];



const App = () => {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  const getData = () => {
    return axios.get('teams').then(data => {
      console.log(data);
      setDetail(data.data);
      setLoading(false);
    });
  };

  const onMatchTeam = () => {
    axios.post('teams/match').then(data => {
      getData();
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="midpart">
      <h2 align="center">Team Match Result</h2>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Button onClick={onMatchTeam}>Match Team Now</Button>
      </div>

      <Spin spinning={loading}>
        <Table columns={columns} dataSource={detail} />
      </Spin>
    </div>
  );
};

export default App;
