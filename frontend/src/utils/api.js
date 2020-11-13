import Axios from 'axios';

export default {
  checkLoggedIn: (history, pathname) => {
    Axios.get('http://localhost:5000/loggedin',
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        const { data } = res;
        if (data.logged_in) {
          localStorage.setItem('user', JSON.stringify(data));
          if (['/signin', '/signup'].includes(pathname)) history.push('/');
        } else {
          localStorage.setItem('user', JSON.stringify({}));
          if (!(['/signin', '/signup'].includes(pathname))) history.push('/signin');
        }
      })
      .catch((error) => console.log(error));
  },
};
