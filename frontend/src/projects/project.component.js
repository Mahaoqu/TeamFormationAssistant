import { Button, Space, Spin, Table, Modal, Form, Input, InputNumber, Radio, DatePicker, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import moment from 'moment';

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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const getData = () => {
    return axios.get('projects').then(data => {
      console.log(data)
      setDetail(data.data);
      setLoading(false);
    });
  }

  const showModal = id => {
    axios.get(`projects/${id}`).then(data => {
      const d = { ...data.data }
      d.endDate = new moment(data.data.endDate)
      form.setFieldsValue(d)
      setIsModalVisible(true);
    })
  };

  const handleOk = () => {
    const id = form.getFieldValue('id');
    axios.patch(`projects/${id}`, form.getFieldsValue()).then(data => {
      message.success("Update Success");
      getData().then(d => setIsModalVisible(false));
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();


  useEffect(() => {
    getData();

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
      render: (text, record) => {
        const handleshow = () => { showModal(record.id) }
        const handledelete = () => { 
          axios.delete(`projects/${record.id}`).then(data => getData());}
        return (
          <Space size="middle">
            <Button onClick={handleshow}>Modify</Button>
            {userRole.showAdminBoard &&
              (<Button danger onClick={handledelete}>Delete</Button>)}
          </Space>
        )
      },
    },
  ];

  return (
    <div>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={detail} />
      </Spin>
      <Modal title="Modify Project" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          preserve={false}
        >
          <Form.Item
            label="Project Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your project name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Project End Date" name="endDate">
            <DatePicker disabledDate={day => day < moment().add(30, 'days')} />
          </Form.Item>

          <Form.Item label="Team Size" name="teamSize">
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item label="Budget(in dollars)" name="budget">
            <InputNumber
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              min={0}
            />
          </Form.Item>

          <Form.Item label="Tools" name="tools">
            <Input />
          </Form.Item>

          <Form.Item label="Priority" name="priority">
            <Radio.Group>
              <Radio value={0}>Very High</Radio>
              <Radio value={1}>High</Radio>
              <Radio value={2}>Low</Radio>
              <Radio value={3}>Very Low</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
