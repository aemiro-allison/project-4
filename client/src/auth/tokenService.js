/* eslint-env browser */
export default {
  login(token) {
    localStorage.setItem('igenio/authToken', token);
  },

  logout() {
    localStorage.setItem('igenio/authToken', null);
  },

  getToken() {
    return localStorage.getItem('igenio/authToken');
  },
};
