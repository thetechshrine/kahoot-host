// Auth
const TOKEN_KEY = 'token';

const isAuthenticate = () => !!localStorage.getItem(TOKEN_KEY);

const setToken = ({ token }) => localStorage.setItem(TOKEN_KEY, token);

const getToken = () => localStorage.getItem(TOKEN_KEY);

const storage = {
  isAuthenticate,
  setToken,
  getToken,
};

export default storage;
