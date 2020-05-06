import httpClient from '../../api/http-client';
import storage from '../../helpers/storage';

const createGame = async (formData) => {
  const configs = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return httpClient.post('/games', formData, configs);
};

const getGames = async () => {
  return httpClient.get('/games', {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};

const getGame = async (gameId) => httpClient.get(`/games/${gameId}`);

const deleteGame = async (gameId) => httpClient.delete(`/games/${gameId}`);

const service = {
  createGame,
  getGames,
  getGame,
  deleteGame,
};

export default service;
