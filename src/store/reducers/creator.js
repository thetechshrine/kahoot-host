import {
  INITIALIZE,
  SET_ACTIVE_QUESTION,
  UPDATE_ACTIVE_QUESTION,
  ADD_QUESTION,
  SAVE_QUESTIONS_REQUEST,
  SAVE_QUESTIONS_SUCCESS,
  SAVE_QUESTIONS_FAILURE,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE,
} from '../types/creator';

import storage from '../../helpers/storage';

const initState = () => {
  return {
    gameId: null,
    questions: [],
    activeQuestion: storage.getActiveQuestion(),
  };
};

export default (state = initState(), action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        questions: action.payload.questions,
        gameId: action.payload.gameId,
        activeQuestion: action.payload.questions[0],
      };
    case SET_ACTIVE_QUESTION: {
      return {
        questions: state.questions,
        gameId: state.gameId,
        activeQuestion: action.payload.activeQuestion,
      };
    }
    case UPDATE_ACTIVE_QUESTION: {
      let { questions } = { ...state };
      questions = questions.map((question) => {
        if (question.uuid === state.activeQuestion.uuid) {
          if (action.payload.path === 'answers') {
            question.answers = question.answers.map((answer) => {
              if (answer.position === action.payload.value.position) {
                Object.assign(answer, action.payload.value);
              }

              return answer;
            });
          } else {
            Object.assign(question, {
              [action.payload.path]: action.payload.value,
            });
          }
        }
        return question;
      });

      return {
        questions: questions,
        activeQuestion: questions.find(
          (question) => question.uuid === state.activeQuestion.uuid
        ),
        gameId: state.gameId,
      };
    }
    case ADD_QUESTION:
      return {
        gameId: state.gameId,
        questions: [...state.questions, action.payload.question],
        activeQuestion: action.payload.question,
      };

    case SAVE_QUESTIONS_REQUEST:
      return {
        ...state,
        saving: true,
      };
    case SAVE_QUESTIONS_SUCCESS:
      return {
        gameId: state.gameId,
        questions: action.payload.questions,
        activeQuestion: action.payload.questions.find(
          (question) => question.uuid === state.activeQuestion.uuid
        ),
      };
    case SAVE_QUESTIONS_FAILURE:
      return {
        gameId: state.gameId,
        questions: state.questions,
        activeQuestion: state.activeQuestion,
        error: action.payload.error,
      };
    case DELETE_QUESTION_REQUEST:
      return {
        gameId: state.gameId,
        questions: state.questions,
        activeQuestion: state.activeQuestion,
      };
    case DELETE_QUESTION_SUCCESS:
      return {
        gameId: state.gameId,
        questions: state.questions.filter(
          (question) => question.uuid !== action.payload.question.uuid
        ),
        activeQuestion: state.questions[state.questions.length - 2],
      };
    case DELETE_QUESTION_FAILURE:
      return {
        gameId: state.gameId,
        questions: state.questions,
        activeQuestion: state.activeQuestion,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
