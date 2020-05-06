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

const initState = () => ({
  game: {},
  players: [],
  answersCount: 0,
  current: {
    question: {},
    index: 0,
    total: 0,
    status: '',
  },
});

export default (state = initState(), action) => {
  switch (action.type) {
    case GAME_PLAY_REQUEST: {
      return state;
    }
    case GAME_PLAY_SUCCESS: {
      return {
        players: state.players,
        answersCount: state.answersCount,
        current: state.current,
        game: action.payload.game,
      };
    }
    case GAME_PLAY_FAILURE: {
      return {
        players: state.players,
        answersCount: state.answersCount,
        current: state.current,
        game: state.game,
        error: action.payload.error,
      };
    }
    case UPDATE_PLAYERS_LIST: {
      return {
        game: state.game,
        current: state.current,
        players: action.payload.players,
        answersCount: action.payload.answersCount,
      };
    }
    case QUESTION_INTRO: {
      return {
        players: state.players,
        answersCount: state.answersCount,
        game: state.game,
        current: action.payload.current,
      };
    }
    case QUESTION_START: {
      return {
        players: state.players,
        answersCount: state.answersCount,
        game: state.game,
        current: action.payload.current,
      };
    }
    case QUESTION_END: {
      return {
        players: state.players,
        answersCount: state.answersCount,
        game: state.game,
        current: action.payload.current,
      };
    }
    case GAME_OVER: {
      return {
        players: state.players,
        answersCount: state.answersCount,
        game: state.game,
        current: state.current,
      };
    }
    default:
      return state;
  }
};
