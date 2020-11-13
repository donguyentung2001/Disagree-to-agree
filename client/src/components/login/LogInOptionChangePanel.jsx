import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const LogInOptionChangePanel = ({
  message, optionChange, pathname,
}) => (
  <>
    <h1>{message}</h1>
    <Link to={pathname === '/signin' ? '/signup' : '/signin'}>
      <Button size="large">{optionChange}</Button>
    </Link>
  </>
);

export default LogInOptionChangePanel;
