import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  Link, useHistory, useLocation,
} from 'react-router-dom';
import API from '../../utils/api';
import './index.scss';

const HomePage = () => {
  const [name, setName] = useState('Linh');
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    API.checkLoggedIn(history, pathname);
    setName(JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).user);
  }, []);

  return (
    <div id="homepage-body">
      <h1>
        Hi,
        {' '}
        {name}
      </h1>
      <h3>How are you feeling today? Wanna find a match?</h3>
      <Link to="/matching">
        <Button className="black-box" size="large">Join the journey</Button>
      </Link>
    </div>
  );
};

export default HomePage;
