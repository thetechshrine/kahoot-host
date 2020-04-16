import httpClient from '../../api/http-client';

const createGame = async (formData) => {
  const configs = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return httpClient.post('/games', formData, configs);
};

const service = {
  createGame,
};

export default service;
