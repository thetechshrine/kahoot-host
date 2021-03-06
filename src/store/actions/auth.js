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
      setTimeout(() => {
        window.location.reload();
      }, 20);
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

const profile = () => (dispatch) => {
  dispatch({ type: PROFILE_REQUEST });

  authService
    .profile()
    .then((response) => {
      const { data } = response;
      dispatch({ type: PROFILE_SUCCESS, payload: { user: data } });
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;
        dispatch({ type: PROFILE_FAILURE, payload: { error: data } });
      }
    });
};

const actions = {
  signUp,
  signIn,
  profile,
};

export default actions;
