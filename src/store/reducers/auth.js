import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
} from '../types/auth';

import storage from '../../helpers/storage';

const initState = () => ({
  token: storage.getToken(),
  user: {},
});

export default (state = initState(), action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        loading: true,
      };
    case SIGN_UP_SUCCESS:
      return {};
    case SIGN_UP_FAILURE:
      return {
        error: action.payload,
      };
    case SIGN_IN_REQUEST:
      return {
        loading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        token: action.payload.token,
      };
    case SIGN_IN_FAILURE:
      return {
        error: action.payload,
      };
    case PROFILE_REQUEST:
      return state;
    case PROFILE_SUCCESS:
      return {
        token: state.token,
        user: action.payload.user,
      };
    case PROFILE_FAILURE:
      return {
        error: action.payload.error,
      };
    default:
      return state;
  }
};
