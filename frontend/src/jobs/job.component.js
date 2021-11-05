import {
  Button, Spin, Form,
  Input, message, Select,
  Space, Modal, Table
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
const { Option } = Select;
const { TextArea } = Input;

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
  const [userRole, setUserRole] = useState();
  const user = authService.getCurrentUser();

  const [proj, setproj] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getData = () => {
    return axios.get('jobs').then(data => {
      console.log(data)
      setDetail(data.data);
      setLoading(false);
    });
  }

  const showModal = id => {
    axios.get(`jobs/${id}`).then(data => {
      const d = { ...data.data }
      d.endDate = new moment(data.data.endDate)
      form.setFieldsValue(d)
      setIsModalVisible(true);
    })
  };

  const handleOk = () => {
    const id = form.getFieldValue('id');
    axios.patch(`jobs/${id}`, form.getFieldsValue()).then(data => {
      message.success("Update Success");
      getData().then(d => setIsModalVisible(false));
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  const options = proj.map(d => <Option key={d.id}>{d.name}</Option>);


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
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const handleshow = () => { showModal(record.id) }
        const handledelete = () => {
          axios.delete(`jobs/${record.id}`).then(data => getData());
        }
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
          autoComplete="off"
        >
          <Form.Item
            label="Job Name"
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

          <Form.Item
            label="Project"
            name="projectId"
            rules={[
              {
                required: true,
                message: 'Please input your project name!',
              },
            ]}
          >
            <Select defaultValue="">
              {options}
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your project name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: 'Please input your project!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your description!',
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input your address!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default App;
