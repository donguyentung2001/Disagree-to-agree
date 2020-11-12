/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import './common.scss';

const NavigationBar = () => {
  const [visible, setVisible] = useState(false);

  const handleCloseSubMenu = () => {
    setVisible(false);
  };

  const handleOpenSubMenu = () => {
    setVisible(true);
  };

  const menu = (
    <Menu onClick={handleCloseSubMenu}>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header style={{
      position: 'fixed', zIndex: 2, width: '100%', background: '#000', display: 'flex',
    }}
    >
      <div className="logo">Disagree To Agree</div>
      <Menu mode="horizontal">
        <Menu.Item key="1" style={{ display: 'block', textAlign: 'right' }}>
          <Dropdown
            overlay={menu}
            onVisibleChange={handleOpenSubMenu}
            visible={visible}
          >
            <div
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <UserOutlined color="#fff" />
              <span>Linh</span>
              {' '}
              <DownOutlined />
            </div>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default NavigationBar;
