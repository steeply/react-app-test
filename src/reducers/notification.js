import { THROW_NOTIFICATION } from '../actions/notification';

const initialState = {
  type: 'info',
  title: '',
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THROW_NOTIFICATION:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};
