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

const profile = async () => httpClient.get('/users/profile');

const service = {
  signUp,
  signIn,
  profile,
};

export default service;
