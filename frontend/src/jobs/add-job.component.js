import {
  Button, Card, Form,
  Input, message, Select
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
};

const AddJobForm = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [proj, setproj] = useState([]);

  const postForm = () => {
    console.log(form);
    axios.post('jobs', form.getFieldsValue()).then(data => {
      message.success('Add Job Success.')
      history.push('/jobs');
    });
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    axios.get('projects').then(data => {
      setproj(data.data);
    });
  }, [])

  const options = proj.map(d => <Option key={d.id}>{d.name}</Option>);

  return (<Card>
    <b>New Job</b>
    <Form
      form={form}
      name="basic"
      {...layout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: layout.labelCol.span }}>
        <Button type="primary" htmlType="submit" onClick={postForm}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Card>)
}
export default AddJobForm;
