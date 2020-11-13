import React from 'react';
import {
  Form, Input, Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import API from '../../utils/api';

const SignIn = () => {
  // const [error, setError] = useState({});
  const history = useHistory();
  const { pathname } = useLocation();

  const onFinish = (values) => {
    API.checkLoggedIn(history, pathname);
    Axios.post('http://localhost:5000/login',
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          email: values.username,
          password: values.password,
        }),
      })
      .then((res) => {
        history.push('/');
        if (res.error) {
          // setError(res.error);
        }
      }).catch((err) => {
        history.push('/');
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
          name="username"
          rules={
            [{
              required: true,
              message: 'Please input your username!',
            },
            ]
          }
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
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
