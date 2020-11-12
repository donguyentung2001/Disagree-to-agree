/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-template-curly-in-string */
import {
  Radio, Form, Input, Button,
} from 'antd';
import React, { useState } from 'react';

import './index.scss';

const options = [
  { label: 'Republican', value: 'republican' },
  { label: 'Democrats', value: 'democrats' },
  { label: 'Other', value: 'other' },
];

const layout = {
  layout: 'vertical',
};

const validateMessages = {
  required: '${label} is required!',
};

const Questionaire = () => {
  const [option, setOption] = useState('republican');

  const setIdentity = (e) => {
    setOption(e.target.value);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <h1>Tell us a little bit about you!</h1>
      <Form
        {...layout}
        id="questionaire-body"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'identity']}
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
          name={['user', 'Interest']}
          label="Type in your interest, seperated by a comma (,):"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'healthcare']}
          label="What do you think about universal healthcare?"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={['user', 'income']} label="What do you think about universal basic income?">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={['user', 'immigrant']} label="What do you think about allowing more immigrants into the US?">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={['user', 'tax']} label="What do you think about making the rich pay more for taxes?">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={['user', 'education']} label="Should education be free??">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button style={{ marginLeft: 'auto', marginRight: 'auto' }} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Questionaire;
