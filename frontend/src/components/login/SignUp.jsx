/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import {
  LockOutlined, MailOutlined, RetweetOutlined, UserOutlined,
} from '@ant-design/icons';

const SignUp = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <h1>Create Account</h1>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid email!',
            },
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input
            size="large"
            prefix={<LockOutlined />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input
            size="large"
            prefix={<RetweetOutlined />}
            placeholder="confirm-password"
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) => (value ? Promise.resolve() : Promise.reject('You should accept agreement')),
            },
          ]}
        >
          <Checkbox>
            I have read the
            {' '}
            <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUp;
