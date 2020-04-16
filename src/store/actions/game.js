import {
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILURE,
} from '../types/game';

import gameService from '../services/game';

import notificationActions from '../actions/notification';

const createGame = ({ formData }) => (dispatch) => {
  dispatch({ type: CREATE_GAME_REQUEST });

  gameService
    .createGame(formData)
    .then((response) => {
      const { data } = response;
      dispatch({ type: CREATE_GAME_SUCCESS, payload: { game: data } });
      dispatch(
        notificationActions.notify({
          type: 'success',
          message: 'Game has been successfully created',
        })
      );
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;
        dispatch({ type: CREATE_GAME_FAILURE, payload: { error: data } });
      }
    });
};

const actions = {
  createGame,
};

export default actions;
