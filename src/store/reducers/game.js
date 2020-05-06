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

const initState = () => ({
  games: [],
  game: {},
});

export default (state = initState(), action) => {
  switch (action.type) {
    case CREATE_GAME_REQUEST:
      return { ...state };
    case CREATE_GAME_SUCCESS:
      return {
        game: state.game,
        games: [action.payload.game, ...state.games],
      };
    case CREATE_GAME_FAILURE:
      return {
        error: action.payload.error,
      };
    case GET_GAMES_REQUEST:
      return { ...state };
    case GET_GAMES_SUCCESS:
      return {
        game: state.game,
        games: action.payload.games,
      };
    case GET_GAMES_FAILURE:
      return {
        error: action.payload.error,
      };
    case GET_GAME_REQUEST:
      return { ...state };
    case GET_GAME_SUCCESS:
      return {
        game: action.payload.game,
        games: state.games,
      };
    case GET_GAME_FAILURE:
      return {
        error: action.payload.error,
      };
    case UPDATE_QUESTIONS:
      return {
        games: state.games,
        game: {
          ...state.game,
          questions: action.payload.questions,
        },
      };
    case DELETE_GAME_REQUEST:
      return {
        games: state.games,
        game: state.game,
      };
    case DELETE_GAME_SUCCESS:
      return {
        games: state.games.filter(
          (game) => game.uuid !== action.payload.game.uuid
        ),
        game: state.game,
      };
    case DELETE_GAME_FAILURE:
      return {
        games: state.games,
        game: state.game,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
