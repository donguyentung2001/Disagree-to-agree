import { Input } from 'antd';
import React from 'react';

const LogInInputPanel = ({ title, fieldName, logo }) => (
  <div>
    <div>{title}</div>
    {fieldName.map((name, i) => <Input size="large" placeholder={name} prefix={logo[i]} />)}
  </div>
);

export default LogInInputPanel;
