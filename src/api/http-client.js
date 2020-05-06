import axios from 'axios';

import storage from '../helpers/storage';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_HTTP_BASE_URL,
});

if (storage.isAuthenticate()) {
  httpClient.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${storage.getToken()}`;
}

export default httpClient;
