import { Button } from 'antd';
import React from 'react';

const LogInOptionChangePanel = ({
  message, optionChange, setOption,
}) => (
  <>
    <div>{message}</div>
    <Button type="primary" size="large" onClick={setOption}>{optionChange}</Button>
  </>
);

export default LogInOptionChangePanel;
