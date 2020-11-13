/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button,
} from 'antd';
import './index.scss';
import Axios from 'axios';

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },

};

const Profile = () => {
  const [user, setUser] = useState();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    Axios.get('http://localhost:5000/get_profile',
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        const { users } = res.data;
        setUser(users[0]);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="profile-body">
      <h1>Name</h1>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="d-fl">
          <Form.Item
            {...layout}
            label="Username"
            name="username"
          >
            <Input placeholder={user && user.username} disabled />
          </Form.Item>

          <Form.Item
            {...layout}
            label="Email"
            name="email"
          >
            <Input placeholder={user && user.email} disabled />
          </Form.Item>
        </div>

        <Form.Item
          label="Password"
          name="password"
        >
          <Input.Password value={user && user.password} />
        </Form.Item>
        <Form.Item
          name="identity"
          label="Identify as:"
        >
          <div style={{ textAlign: 'left' }}>Republican</div>
        </Form.Item>
        <Form.Item
          name="interest"
          label="Interest"
        >
          <Input placeholder={user && user.interest} disabled />
        </Form.Item>
        <Form.Item
          name="healthcare"
          label="What do you think about universal healthcare?"
        >
          <Input.TextArea placeholder={user && user.messages[0]} disabled />
        </Form.Item>
        <Form.Item
          name="income"
          label="What do you think about universal basic income?"
        >
          <Input.TextArea placeholder={user && user.messages[1]} disabled />
        </Form.Item>
        <Form.Item
          name="immigrant"
          label="What do you think about allowing more immigrants into the US?"
        >
          <Input.TextArea placeholder={user && user.messages[2]} disabled />
        </Form.Item>
        <Form.Item
          name="tax"
          label="What do you think about making the rich pay more for taxes?"
        >
          <Input.TextArea placeholder={user && user.messages[3]} disabled />
        </Form.Item>
        <Form.Item
          name="education"
          label="Should education be free?"
        >
          <Input.TextArea placeholder={user && user.messages[4]} disabled />
        </Form.Item>

        <Form.Item>
          <Button className="black-box" size="large" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
