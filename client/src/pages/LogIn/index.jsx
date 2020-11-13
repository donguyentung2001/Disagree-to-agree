import React from 'react';
import { Col, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import SignIn from '../../components/login/SignIn';
import SignUp from '../../components/login/SignUp';
import LogInOptionChangePanel from '../../components/login/LogInOptionChangePanel';
import './index.scss';

const LogIn = () => {
  const { pathname } = useLocation();

  return (
    <Row align="middle" justify="center" gutter={[10, 0]} className="full-height">
      {pathname === '/signin'
        ? (
          <>
            <Col id="signin" span={14} className="login-input-panel">
              <SignIn />
            </Col>
            <Col span={10} className="login-option-change-panel full-height d-fl">
              <LogInOptionChangePanel
                message="Hello, Friend!"
                optionChange="Sign Up"
                pathname={pathname}
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
                pathname={pathname}
              />
            </Col>
            <Col id="signup" span={14} className="login-input-panel">
              <SignUp />
            </Col>
          </>
        )}
    </Row>
  );
};

export default LogIn;
