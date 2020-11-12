import { Input } from 'antd';
import React from 'react';

const LogInInputPanel = ({ title, fieldName, logo }) => (
  <>
    <h1>{title}</h1>
    {fieldName.map((name, i) => <Input size="large" placeholder={name} prefix={logo[i]} />)}
  </>
);

export default LogInInputPanel;
