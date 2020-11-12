import { Button } from 'antd';
import React, { useState } from 'react';
import './index.scss';

const Chat = () => {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('Linh');

  return (
    <div id="chat-body">
      <div id="chat-header">
        <h2>
          {name}
        </h2>
        <Button type="danger" size="large">Leave</Button>
      </div>
    </div>
  );
};

export default Chat;
