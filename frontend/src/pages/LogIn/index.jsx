import React, { useState } from 'react';
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import LogInInputPanel from '../../components/login/LogInInputPanel';
import LogInOptionChangePanel from '../../components/login/LogInOptionChangePanel';
import './index.scss';

const LogIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const setOption = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <Row align="middle" justify="center" gutter={[10, 0]} className="full-height">
      {isSignIn
        ? (
          <>
            <Col span={14} className="login-input-panel">
              <LogInInputPanel
                title="Sign In"
                fieldName={['username', 'password']}
                logo={[<UserOutlined />, <LockOutlined />]}
              />
            </Col>
            <Col span={10} className="login-option-change-panel full-height d-fl">
              <LogInOptionChangePanel
                message="Hello, Friend!"
                optionChange="Sign Up"
                setOption={setOption}
              />
            </Col>
          </>
        )
        : (
          <>
            <Col span={10} className="login-option-change-panel full-height d-fl">
              <LogInOptionChangePanel
                message="Welcome back!"
                optionChange="Sign In"
                setOption={setOption}
              />
            </Col>
            <Col span={14} className="login-input-panel">
              <LogInInputPanel
                title="Create Account"
                fieldName={['username', 'email', 'password']}
                logo={[<UserOutlined />, <MailOutlined />, <LockOutlined />]}
              />
            </Col>
          </>
        )}
    </Row>
  );
};

export default LogIn;
