import axios from 'axios';

import storage from '../helpers/storage';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

if (storage.isAuthenticate()) {
  httpClient.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${storage.getToken()}`;
}

export default httpClient;
