import {
  GAME_PLAY_REQUEST,
  GAME_PLAY_SUCCESS,
  GAME_PLAY_FAILURE,
  UPDATE_PLAYERS_LIST,
  QUESTION_INTRO,
  QUESTION_START,
  QUESTION_END,
  GAME_OVER,
} from '../types/websocket';

import gameService from '../services/game';
import notificationActions from '../actions/notification';

import history from '../../helpers/history';

const playGame = ({ ws, gameUUID }) => (dispatch) => {
  dispatch({ type: GAME_PLAY_REQUEST });

  gameService
    .getGame(gameUUID)
    .then((response) => {
      const { data } = response;
      dispatch({ type: GAME_PLAY_SUCCESS, payload: { game: data } });
      ws.playGame({ gamePin: data.pin });
    })
    .catch((error) => {
      if (error) {
        const { data } = error.response;
        dispatch({ type: GAME_PLAY_FAILURE, payload: { error: data } });
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

const updatePlayersList = ({ players = [] }) => (dispatch, getState) => {
  let answersCount = 0;
  if (players.length > 0) {
    if (getState().core.websocket.current) {
      const { question } = getState().core.websocket.current;
      players.forEach((player) => {
        const { playerAnswers } = player;
        if (playerAnswers && Array.isArray(playerAnswers)) {
          const currentQuestionAnswer = playerAnswers.find(
            (playerAnswer) => playerAnswer.question.uuid === question.uuid
          );
          if (currentQuestionAnswer) {
            answersCount += 1;
          }
        }
      });
    }
  }

  dispatch({
    type: UPDATE_PLAYERS_LIST,
    payload: { players, answersCount },
  });
};

const questionIntro = ({ current }) => (dispatch, getState) => {
  history.push(`/question-intro?gameId=${getState().core.websocket.game.uuid}`);
  dispatch({
    type: QUESTION_INTRO,
    payload: { current },
  });
};

const questionStart = ({ current }) => (dispatch, getState) => {
  history.push(`/question-block?gameId=${getState().core.websocket.game.uuid}`);
  dispatch({
    type: QUESTION_START,
    payload: { current },
  });
};

const questionEnd = ({ current }) => (dispatch) => {
  dispatch({
    type: QUESTION_END,
    payload: {
      current: { ...current, status: 'ended' },
    },
  });
};

const gameOver = () => (dispatch, getState) => {
  history.push(`/game-over?gameId=${getState().core.websocket.game.uuid}`);
  dispatch({
    type: GAME_OVER,
  });
};

const actions = {
  playGame,
  updatePlayersList,
  questionIntro,
  questionStart,
  questionEnd,
  gameOver,
};

export default actions;
