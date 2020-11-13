import { Button } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Link, useHistory, useLocation, withRouter,
} from 'react-router-dom';
import API from '../../utils/api';
import './index.scss';

const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('Linh');
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    API.checkLoggedIn(history, pathname);
    Axios.get('http://localhost:5000/get_profile',
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        const { data } = res;
        setName(data.username);
      })
      .catch((error) => console.log(error));
  });

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

export default withRouter(HomePage);
