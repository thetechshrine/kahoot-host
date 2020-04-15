import { combineReducers } from 'redux';

import authReducer from './auth';
import gameReducer from './game';

import notificationReducer from './notification';

export default combineReducers({
  core: combineReducers({
    auth: authReducer,
    game: gameReducer,
  }),
  ui: combineReducers({
    notification: notificationReducer,
  }),
});
