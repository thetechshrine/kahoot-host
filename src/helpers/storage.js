// Auth
const TOKEN_KEY = 'token';
const ACTIVE_QUESTION = 'active_question';

const isAuthenticate = () => !!localStorage.getItem(TOKEN_KEY);

const setToken = ({ token }) => localStorage.setItem(TOKEN_KEY, token);

const getToken = () => localStorage.getItem(TOKEN_KEY);

const clearAll = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ACTIVE_QUESTION);
};

const setActiveQuestion = ({ activeQuestion }) =>
  localStorage.setItem(ACTIVE_QUESTION, JSON.stringify(activeQuestion));

const getActiveQuestion = () =>
  localStorage.getItem(ACTIVE_QUESTION)
    ? JSON.parse(localStorage.getItem(ACTIVE_QUESTION))
    : {};

const storage = {
  isAuthenticate,
  setToken,
  getToken,
  clearAll,
  setActiveQuestion,
  getActiveQuestion,
};

export default storage;
