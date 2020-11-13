/* eslint-disable no-unused-vars */
import { Button } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import api from '../../utils/api';
import './index.scss';

const Matching = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    api.checkLoggedIn(history, pathname);
    Axios.post('http://localhost:5000/matchmaking',
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        const { data } = res;
        console.log(data);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="matching">
      {isLoading
        ? (
          <div>
            <h1>Wait a moment...</h1>
            <h3>We are finding a match for you</h3>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              className="avatar"
              alt="avatar"
            />
            <Button size="large" className="black-box">Cancel Matching</Button>
          </div>
        )
        : (
          <div>
            <h1>You got a match!</h1>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg"
              className="avatar"
              alt="avatar"
            />
            <Link to="/chat/1">
              <Button size="large" className="black-box">Join Conversation</Button>
            </Link>

          </div>
        )}
    </div>
  );
};

export default Matching;
