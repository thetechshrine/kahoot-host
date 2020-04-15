import { NOTIFY, CLOSE_NOTIFICATION } from '../types/notification';

const notify = ({ type, message }) => ({
  type: NOTIFY,
  payload: {
    type,
    message,
  },
});

const closeNotification = () => ({
  type: CLOSE_NOTIFICATION,
});

const actions = {
  notify,
  closeNotification,
};

export default actions;
