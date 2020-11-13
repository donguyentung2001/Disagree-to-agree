/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Form, Input, Button,
} from 'antd';
import './index.scss';

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },

};

const Profile = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div id="profile-body">
      <h1>Name</h1>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          username: 'linh',
          email: 'a@gmail.com',
          password: '123',
          interest: '',
          healthcare: 'a',
          income: 'a',
          immigrant: 'a',
          tax: 'a',
          education: 'a',
        }}
      >
        <div className="d-fl">
          <Form.Item
            {...layout}
            label="Username"
            name="username"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            {...layout}
            label="Email"
            name="email"
          >
            <Input disabled />
          </Form.Item>
        </div>

        <Form.Item
          label="Password"
          name="password"
        >
          <Input.Password />
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
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="healthcare"
          label="What do you think about universal healthcare?"
        >
          <Input.TextArea disabled />
        </Form.Item>
        <Form.Item
          name="income"
          label="What do you think about universal basic income?"
        >
          <Input.TextArea disabled />
        </Form.Item>
        <Form.Item
          name="immigrant"
          label="What do you think about allowing more immigrants into the US?"
        >
          <Input.TextArea disabled />
        </Form.Item>
        <Form.Item
          name="tax"
          label="What do you think about making the rich pay more for taxes?"
        >
          <Input.TextArea disabled />
        </Form.Item>
        <Form.Item
          name="education"
          label="Should education be free?"
        >
          <Input.TextArea disabled />
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
