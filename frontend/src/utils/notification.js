import { notification } from 'antd';

export default {
  openNotification: (message, description) => {
    notification.open({
      message,
      description,
    });
  },
};
