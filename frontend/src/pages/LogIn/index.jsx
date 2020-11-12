import React, { useState } from 'react';
import { Col, Row } from 'antd';
import SignIn from '../../components/login/SignIn';
import SignUp from '../../components/login/SignUp';
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
            <Col id="signin" span={14} className="login-input-panel">
              <SignIn />
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
            <Col id="signup" span={14} className="login-input-panel">
              <SignUp />
            </Col>
          </>
        )}
    </Row>
  );
};

export default LogIn;
