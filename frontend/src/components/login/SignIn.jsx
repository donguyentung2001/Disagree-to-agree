/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Form, Input, Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <h1>Sign In</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            size="large"
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0, height: 0 }}>
          <div className="login-form-forgot" href="">
            Forgot password
          </div>
        </Form.Item>

        <Form.Item>
          <Button size="large" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignIn;
