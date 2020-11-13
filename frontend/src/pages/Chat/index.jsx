import { SendOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import ChatItem from '../../components/chat/ChatItem';
import api from '../../utils/api';

import './index.scss';

const Chat = () => {
// const [name, setName] = useState('Biden');
  const [chatId, setChatId] = useState();
  const [chat, setChat] = useState([
    { user: 'trump', message: 'Hi friend' },
    { user: 'bernie', message: 'Hello' },
    { user: 'trump', message: 'How are you doing, Mr. Sanders?' },
    { user: 'bernie', message: 'I’m good. How about you? ' },
    { user: 'trump', message: 'I’m feeling greater than ever. ' },
    { user: 'bernie', message: 'Wanna talk some econ' },
    { user: 'trump', message: 'Sure bro. ' },
    { user: 'bernie', message: 'I want to tax those wealthy people, big corporations. ' },
    { user: 'trump', message: 'No. ' },
    { user: 'bernie', message: 'Why not? ' },
    { user: 'trump', message: 'If we do that, most corporations will leave the US. and they are the reason why we are so rich in the first place. ' },
    { user: 'bernie', message: 'But if you don\'t tax them, most people will suffer economically, only the rich will benefit from the so-called greatness of America.' },
  ]);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    api.checkLoggedIn(history, pathname);
    Axios.get('http://localhost:5000/get_chatid',
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        const { data } = res;
        console.log(data);
        setChatId(data.id);
      }).catch((err) => {
        console.log(err);
      });

    Axios.get(`http://localhost:5000/chat/log/${chatId}`,
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        const { data } = res;
        console.log(data);
        setChat(data);
      }).catch((err) => {
        console.log(err);
      });
  });
  return (
    <div id="chat-body">
      <div id="chat-header">
        <h2>
          Sanders
        </h2>
        <Link to="/">
          <Button type="danger" size="large">Leave</Button>
        </Link>
      </div>
      <div style={{ height: '370px', overflow: 'auto', border: '1px solid #000' }}>
        {chat.map((item, i) => <ChatItem user={item.user} message={item.message} key={`chat-${i}`} />)}
      </div>
      <Input
        suffix={(
          <SendOutlined />
      )}
      />
    </div>
  );
};
export default Chat;
