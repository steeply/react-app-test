import { combineReducers } from 'redux';
import models from './models';
import notification from './notification';

export default combineReducers({
  models,
  notification
});
