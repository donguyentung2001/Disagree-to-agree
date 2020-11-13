/* eslint-disable no-unused-vars */
import { Button } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Matching = () => {
  const [isLoading, setIsLoading] = useState(false);

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
