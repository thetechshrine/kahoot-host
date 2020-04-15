import httpClient from '../../api/http-client';

const signUp = async (user) => {
  const configs = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return httpClient.post('/auth/signup', user, configs);
};

const signIn = async (credentials) => {
  const configs = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return httpClient.post('/auth/signin', credentials, configs);
};

const service = {
  signUp,
  signIn,
};

export default service;
