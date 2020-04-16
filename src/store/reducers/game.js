import {
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILURE,
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
    default:
      return state;
  }
};
