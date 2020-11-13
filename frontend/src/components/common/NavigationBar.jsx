/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import notification from '../../utils/notification';
import './common.scss';

const NavigationBar = () => {
  const [visible, setVisible] = useState(false);

  const handleCloseSubMenu = () => {
    setVisible(false);
  };

  const handleOpenSubMenu = () => {
    setVisible(true);
  };

  const logout = () => {
    Axios.post('http://localhost:5000/logout',
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        const { data } = res;
        if (data.status_code !== 200) {
          notification.openNotification('Error!', 'Cannot logout.');
        }
      }).catch((err) => {
        console.log(err);
      });
  };

  const menu = (
    <Menu onClick={handleCloseSubMenu}>
      <Menu.Item key="1"><Link to="/profile/1">Profile</Link></Menu.Item>
      <Menu.Item key="2" onClick={logout}><Link to="/signin">Logout</Link></Menu.Item>
    </Menu>
  );

  return (
    <Header style={{
      position: 'fixed', zIndex: 2, width: '100%', background: '#000', display: 'flex',
    }}
    >
      <Link to="/">
        <div className="logo">Disagree To Agree</div>
      </Link>
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
              <span>{JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).user}</span>
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
