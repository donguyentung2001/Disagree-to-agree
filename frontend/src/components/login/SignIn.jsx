import React, { useState } from 'react';
import {
  Form, Input, Button,
} from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import API from '../../utils/api';
import notification from '../../utils/notification';

const SignIn = () => {
  // eslint-disable-next-line no-unused-vars
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();

  const onFinish = (values) => {
    API.checkLoggedIn(history, pathname);
    axios.post('http://localhost:5000/login',
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
        data: {
          email: values.email,
          password: values.password,
        },
      })
      .then((res) => {
        const { data } = res;
        if (data.status_code === 404) {
          setEmailError(data.error);
        } else if (data.status_code === 401) {
          setPassError(data.error);
        } else if (data.status_code === 500) {
          notification.openNotification('Server Error', 'Cannot Sign In');
        } else {
          console.log(data);
          localStorage.setItem('user', JSON.stringify(data));
          history.push('/');
        }
      }).catch((err) => {
        console.log(err);
      });
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
          name="email"
          rules={
            [
              // {
              //   type: 'email',
              //   message: 'The input is not valid email!',
              // }, {
              {
                required: true,
                message: 'Please input your email!',
              },
              () => ({
                validator() {
                  if (emailError) return Promise.reject(emailError);
                  return Promise.resolve();
                },
              }),
            ]
          }
        >
          <Input
            size="large"
            prefix={<MailOutlined />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={
            [{
              required: true,
              message: 'Please input your password!',
            },
            () => ({
              validator() {
                if (passError) return Promise.reject(passError);
                return Promise.resolve();
              },
            })]
}
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
