import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
} from '../types/auth';
import authService from '../services/auth';

import notificationActions from '../actions/notification';

import storage from '../../helpers/storage';
import history from '../../helpers/history';

const signUp = ({ user }) => (dispatch) => {
  dispatch({ type: SIGN_UP_REQUEST, payload: { user } });

  authService
    .signUp(user)
    .then((response) => {
      const { data } = response;
      // navigate
      history.push('/auth/login');

      dispatch({ type: SIGN_UP_SUCCESS });
      dispatch(
        notificationActions.notify({ type: 'success', message: data.message })
      );
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;
        dispatch({ type: SIGN_UP_FAILURE, payload: data });
        dispatch(
          notificationActions.notify({ type: 'error', message: data.message })
        );
      }
    });
};

const signIn = ({ credentials }) => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST, payload: { credentials } });

  authService
    .signIn(credentials)
    .then((response) => {
      const { data } = response;
      dispatch({ type: SIGN_IN_SUCCESS, payload: data });

      // persist token
      storage.setToken(data);

      // navigate
      history.push('/');
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;
        dispatch({ type: SIGN_IN_FAILURE, payload: data });
        dispatch(
          notificationActions.notify({ type: 'error', message: data.message })
        );
      }
    });
};

const actions = {
  signUp,
  signIn,
};

export default actions;
