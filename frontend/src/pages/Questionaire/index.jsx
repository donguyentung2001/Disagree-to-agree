import {
  Radio, Form, Input, Button,
} from 'antd';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
// import api from '../../utils/api';

import './index.scss';

const options = [
  { label: 'Republican', value: 'republican' },
  { label: 'Democrats', value: 'democrats' },
  { label: 'Other', value: 'other' },
];

const layout = {
  layout: 'vertical',
};

const Questionaire = () => {
  const [option, setOption] = useState('republican');
  const history = useHistory();
  // const { pathname } = useLocation();
  const setIdentity = (e) => {
    setOption(e.target.value);
  };

  const onFinish = () => {
    // api.checkLoggedIn(history, pathname);
    Axios.post('http://localhost:5000/login',
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
        data: {
          email: 'trump',
          password: 'trump',
        },
      })
      .then((res) => {
        const { data } = res;
        localStorage.setItem('user', JSON.stringify(data));
        history.push('/');
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="questionaire">
      <h1>Tell us a little bit about you!</h1>
      <Form
        {...layout}
        id="questionaire-body"
        name="nest-messages"
        initialValues={{ identity: 'republican' }}
        onFinish={onFinish}
      >
        <Form.Item
          name="identity"
          label="Do you identify as:"
          rules={[{ required: true }]}
        >
          <Radio.Group
            options={options}
            onChange={setIdentity}
            value={option}
            optionType="button"
          />
        </Form.Item>
        <Form.Item
          name="interest"
          label="Type in your interest, seperated by a comma (,):"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="healthcare"
          label="What do you think about universal healthcare?"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="income"
          label="What do you think about universal basic income?"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="immigrant"
          label="What do you think about allowing more immigrants into the US?"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="tax"
          label="What do you think about making the rich pay more for taxes?"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="education"
          label="Should education be free?"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <div className="encourage-message">Yay, you finished it!</div>
          <Link to="/">
            <Button
              size="large"
              htmlType="submit"
              className="black-box"
            >
              Submit
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Questionaire;
