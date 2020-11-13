import React, { useState } from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import {
  LockOutlined, MailOutlined, RetweetOutlined, UserOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import notification from '../../utils/notification';

const SignUp = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const onFinish = (values) => {
    const formData = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    Axios.post('http://localhost:5000/pre_register',
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
        data: formData,
      })
      .then((res) => {
        const { data } = res;
        if (data.status_code === 409) {
          if (data.error[0] === 'E') setEmailError(data.error);
          else setUsernameError(data.error);
        } else if (data.status_code === 500) {
          notification.openNotification('Server Error', 'Cannot go to next page');
        } else {
          setEmailError('');
          setUsernameError('');
          history.push('/questionaire', [formData]);
        }
      }).catch((err) => {
        console.log(err);
      });
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
            () => ({
              validator() {
                if (usernameError) return Promise.reject(usernameError);
                return Promise.resolve();
              },
            }),
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
            () => ({
              validator() {
                if (emailError) return Promise.reject(emailError);
                return Promise.resolve();
              },
            }),
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
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUp;
