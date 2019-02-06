import _ from 'lodash';
import {
  LOAD_MODEL, LOAD_MODEL_SUCCESS, LOAD_MODEL_ERROR,
  ADD_MODEL, ADD_MODEL_SUCCESS, ADD_MODEL_ERROR,
  EDIT_MODEL, EDIT_MODEL_SUCCESS, EDIT_MODEL_ERROR,
  DELETE_MODEL, DELETE_MODEL_SUCCESS, DELETE_MODEL_ERROR
} from '../actions/models';

const initialState = {
  list: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MODEL:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_MODEL_SUCCESS:
      return {
        ...state,
        list: action.models,
        isLoading: false
      };

    case LOAD_MODEL_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case ADD_MODEL:
      return {
        ...state,
        isLoading: true
      };

    case ADD_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: _.concat(...state.list, action.model)
      };

    case ADD_MODEL_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case EDIT_MODEL:
      return {
        ...state,
        isLoading: true
      };

    case EDIT_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: _.concat(..._.reject(state.list, ['id', action.id]), action.model)
      };

    case EDIT_MODEL_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DELETE_MODEL:
      return {
        ...state,
        isLoading: true
      };

    case DELETE_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: _.reject(state.list, ['id', action.id])
      };

    case DELETE_MODEL_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};
