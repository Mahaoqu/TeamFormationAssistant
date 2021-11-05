import { Button, Spin, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const App = () => {
  return (
    <div className="midpart">
      <h2 align="center">Jobs</h2>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Link to="/add_job">
          <Button>Add Job</Button>
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
    axios.get('jobs').then(data => {
      console.log(data)
      setDetail(data.data);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      title: 'Job Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Project ID',
      dataIndex: 'projectId',
      key: 'projectId',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={detail} />
    </Spin>
  );
}
export default App;
