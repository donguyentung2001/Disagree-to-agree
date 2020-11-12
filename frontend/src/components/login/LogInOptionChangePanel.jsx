import { Button } from 'antd';
import React from 'react';

const LogInOptionChangePanel = ({
  message, optionChange, setOption,
}) => (
  <>
    <h1>{message}</h1>
    <Button type="primary" size="large" onClick={setOption}>{optionChange}</Button>
  </>
);

export default LogInOptionChangePanel;
