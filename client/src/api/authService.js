/* eslint-env browser */
import axios from 'axios';
import tokenService from './tokenService';

export default {
  authenticate(callback) {
    // give token to server and check if the token is valid.
    axios({
      url: '/auth',
      method: 'get',
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    })
      .then(res => callback(null, res.data.user))
      .catch(err => callback(err));
  },

  register(user, callback) {
  // create user and redirect to login page.
    axios({
      url: '/auth/register',
      method: 'post',
      data: user,
    })
      .then((response) => {
        callback(response.data);
      })
      .catch(err => console.log(err));
  },

  login(user, callback) {
    // recieve token from server, if credientials match,
    // and then redirect to profile page.
    axios({
      url: '/auth/login',
      method: 'post',
      data: user,
    })
      .then((response) => {
        tokenService.login(response.data.token);
        callback(response.data);
      })
      .catch(err => console.log(err));
  },

  logout(history) {
    // logout user by removing token from localStorage.
    // and redirect to home page after half a second.
    tokenService.logout();

    setTimeout(() => {
      history.push('/');
    }, 500);
  },
};
