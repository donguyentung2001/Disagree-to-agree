import { Button, Input } from 'antd';
import React from 'react';

const LogInInputPanel = ({ title, fieldName, logo }) => (
  <>
    <h1>{title}</h1>
    {fieldName.map((name, i) => <Input size="large" placeholder={name} prefix={logo[i]} />)}
    {title === 'Sign In' && <div className="forgot-password">Forgot Password?</div>}
    <Button size="large">{title === 'Sign In' ? 'Log In' : 'Continue'}</Button>
  </>
);

export default LogInInputPanel;
