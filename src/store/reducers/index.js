import { combineReducers } from 'redux';

import authReducer from './auth';
import gameReducer from './game';
import websocketReducer from './websocket';

import notificationReducer from './notification';
import creatorReducer from './creator';

export default combineReducers({
  core: combineReducers({
    auth: authReducer,
    game: gameReducer,
    websocket: websocketReducer,
  }),
  ui: combineReducers({
    notification: notificationReducer,
    creator: creatorReducer,
  }),
});
