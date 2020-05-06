import _ from 'lodash';
import { v1 as uuid } from 'uuid';

import {
  INITIALIZE,
  SET_ACTIVE_QUESTION,
  UPDATE_ACTIVE_QUESTION,
  ADD_QUESTION,
  SAVE_QUESTIONS_REQUEST,
  SAVE_QUESTIONS_SUCCESS,
  SAVE_QUESTIONS_FAILURE,
  DELETE_QUESTION_FAILURE,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_REQUEST,
} from '../types/creator';

import creatorService from '../services/creator';

import gameActions from '../actions/game';
import notificationActions from '../actions/notification';

import dataHelper from '../../helpers/data';

const initQuestion = () => ({
  uuid: uuid(),
  title: '',
  time: 10,
  points: 1000,
  file: null,
  answers: [
    {
      title: '',
      position: 1,
      isCorrect: false,
    },
    {
      title: '',
      position: 2,
      isCorrect: false,
    },
    {
      title: '',
      position: 3,
      isCorrect: false,
    },
    {
      title: '',
      position: 4,
      isCorrect: false,
    },
  ],
});

const initialize = ({ game }) => {
  const questions = [];
  if (game.questions && game.questions.length > 0) {
    questions.push(...game.questions.map((question) => _.cloneDeep(question)));
  } else {
    questions.push(initQuestion());
  }

  return {
    type: INITIALIZE,
    payload: {
      questions,
      gameId: game._id,
    },
  };
};

const setActiveQuestion = ({ activeQuestion }) => {
  return {
    type: SET_ACTIVE_QUESTION,
    payload: { activeQuestion },
  };
};

const updateActiveQuestion = ({ path, value }) => ({
  type: UPDATE_ACTIVE_QUESTION,
  payload: { path, value },
});

const addQuestion = () => {
  const question = initQuestion();
  return {
    type: ADD_QUESTION,
    payload: { question },
  };
};

const saveQuestions = () => (dispatch, getState) => {
  dispatch({ type: SAVE_QUESTIONS_REQUEST });

  const { game } = getState().core.game;
  const { questions } = getState().ui.creator;

  dataHelper
    .validateQuestions(questions)
    .then(() => {
      creatorService
        .saveQuestions({
          gameId: game._id,
          creatorQuestions: questions,
          gameQuestions: game.questions,
        })
        .then((questionsResponse) => {
          const updatedQuestions = questions.map((question) => {
            const questionResponse = questionsResponse.find(
              (questionResponse) => questionResponse.uuid === question.uuid
            );
            if (questionResponse) {
              Object.assign(question, questionResponse);
            }

            return question;
          });

          dispatch({
            type: SAVE_QUESTIONS_SUCCESS,
            payload: { questions: updatedQuestions },
          });
          dispatch(gameActions.updateQuestions(updatedQuestions));
          dispatch(
            notificationActions.notify({
              type: 'success',
              message: 'All questions have been saved',
            })
          );
        })
        .catch((error) => {
          if (error) {
            const { data } = error.response;
            dispatch({
              type: SAVE_QUESTIONS_FAILURE,
              payload: { error: data },
            });
            let message = '';
            if (data.message) {
              message = data.message;
            } else if (data.errors && data.errors.length > 0) {
              const firstError = data.errors[0];
              message = firstError[Object.keys(firstError)[0]];
            }

            if (message) {
              dispatch(
                notificationActions.notify({
                  type: 'error',
                  message,
                })
              );
            }
          }
        });
    })
    .catch((error) => {
      dispatch(
        notificationActions.notify({ type: 'error', message: error.message })
      );
    });
};

const deleteQuestion = ({ question }) => (dispatch, getState) => {
  dispatch({
    type: DELETE_QUESTION_REQUEST,
  });

  if (!question._id) {
    dispatch({
      type: DELETE_QUESTION_SUCCESS,
      payload: { question },
    });
  } else {
    creatorService
      .deleteQuestion(getState().core.game.game._id, question._id)
      .then((response) => {
        const { data } = response;
        dispatch({
          type: DELETE_QUESTION_SUCCESS,
          payload: { question },
        });
        dispatch(
          notificationActions.notify({
            type: 'success',
            message: data.message,
          })
        );
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          if (data) {
            dispatch({
              type: DELETE_QUESTION_FAILURE,
              payload: { error: data },
            });
          }
        } else {
          dispatch({
            type: DELETE_QUESTION_FAILURE,
            payload: { error: error.message },
          });
        }
      });
  }
};

const actions = {
  initialize,
  setActiveQuestion,
  updateActiveQuestion,
  addQuestion,
  saveQuestions,
  deleteQuestion,
};

export default actions;
