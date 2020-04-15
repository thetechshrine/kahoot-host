import { NOTIFY, CLOSE_NOTIFICATION } from '../types/notification';

const initState = () => ({
  show: false,
  type: '',
  message: '',
});

export default (state = initState(), action) => {
  switch (action.type) {
    case NOTIFY:
      return {
        show: true,
        type: action.payload.type,
        message: action.payload.message,
      };
    case CLOSE_NOTIFICATION:
      return {
        show: false,
        type: state.type,
      };
    default:
      return state;
  }
};
