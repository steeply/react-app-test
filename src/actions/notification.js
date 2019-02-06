export const THROW_NOTIFICATION = 'THROW_NOTIFICATION';

export const throwNotification = (title, message, type) => {
  return dispatch => {
    dispatch({
      type: THROW_NOTIFICATION,
      data: { title, message, type }
    });
  };
};

export const clearNotification = () => {
  return dispatch => {
    dispatch({
      type: THROW_NOTIFICATION,
      data: { title: '', message: '', type: 'clear' }
    });
  };
};
