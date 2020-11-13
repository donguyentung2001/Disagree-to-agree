import { Button } from 'antd';
import React, { useState } from 'react';
import './index.scss';

const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('Linh');

  return (
    <div id="homepage-body">
      <h1>
        Hi,
        {' '}
        {name}
      </h1>
      <h3>How are you feeling today? Wanna find a match?</h3>
      <Button className="black-box" size="large">Join the journey</Button>
    </div>
  );
};

export default HomePage;
