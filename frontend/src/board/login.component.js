/** 
 * design and render the login-form
 */
import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onSubmit = () => {
    AuthService.login(
      form.getFieldValue('username'),
      form.getFieldValue('password'),
    ).then(
      () => {
        history.push('/profile');
        window.location.reload();
      },
      err => console.log(err),
    );
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
