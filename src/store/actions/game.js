import {
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILURE,
  GET_GAMES_REQUEST,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  GET_GAME_REQUEST,
  GET_GAME_SUCCESS,
  GET_GAME_FAILURE,
  UPDATE_QUESTIONS,
  DELETE_GAME_REQUEST,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_FAILURE,
} from '../types/game';

import gameService from '../services/game';

import notificationActions from '../actions/notification';
import creatorActions from '../actions/creator';

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

const getGames = () => (dispatch) => {
  dispatch({ type: GET_GAMES_REQUEST });

  gameService
    .getGames()
    .then((response) => {
      const { data } = response;
      dispatch({ type: GET_GAMES_SUCCESS, payload: { games: data } });
    })
    .catch((error) => {
      if (error) {
        const { data } = error.response;
        dispatch({ type: GET_GAMES_FAILURE, payload: { error: data } });
      }
    });
};

const getGame = (gameUUID) => (dispatch) => {
  dispatch({ type: GET_GAME_REQUEST });

  gameService
    .getGame(gameUUID)
    .then((response) => {
      const { data } = response;
      dispatch({ type: GET_GAME_SUCCESS, payload: { game: data } });
      dispatch(creatorActions.initialize({ game: data }));
    })
    .catch((error) => {
      if (error) {
        const { data } = error.response;
        dispatch({ type: GET_GAME_FAILURE, payload: { error: data } });
        if (data.message) {
          dispatch(
            notificationActions.notify({
              type: 'error',
              message: data.message,
            })
          );
        }
      }
    });
};

const deleteGame = ({ game }) => (dispatch) => {
  dispatch({ type: DELETE_GAME_REQUEST });

  gameService
    .deleteGame(game._id)
    .then((response) => {
      const { data } = response;
      dispatch({ type: DELETE_GAME_SUCCESS, payload: { game } });
      dispatch(
        notificationActions.notify({
          type: 'success',
          message: data.message,
        })
      );
    })
    .catch((error) => {
      if (error) {
        const { data } = error.response;
        dispatch({ type: DELETE_GAME_FAILURE, payload: { error: data } });
        if (data.message) {
          dispatch(
            notificationActions.notify({
              type: 'error',
              message: data.message,
            })
          );
        }
      }
    });
};

const updateQuestions = (questions) => {
  return {
    type: UPDATE_QUESTIONS,
    payload: { questions },
  };
};

const actions = {
  createGame,
  getGames,
  getGame,
  updateQuestions,
  deleteGame,
};

export default actions;
