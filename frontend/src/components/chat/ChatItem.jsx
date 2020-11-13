import React from 'react';
import './chatitem.scss';

const ChatItem = ({ user, message }) => (
  <div className={
    user === JSON.parse(localStorage.getItem('user')).user
      ? 'me-dialog' : 'other-dialog'
}
  >
    {message}
  </div>
);

export default ChatItem;
