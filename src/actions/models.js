import fetch from '../api/fetch';
import { throwNotification } from './notification';
export const LOAD_MODEL = 'model/LOAD';
export const LOAD_MODEL_SUCCESS = 'model/LOAD_SUCCESS';
export const LOAD_MODEL_ERROR = 'model/LOAD_ERROR';
export const ADD_MODEL = 'model/ADD';
export const ADD_MODEL_SUCCESS = 'model/ADD_SUCCESS';
export const ADD_MODEL_ERROR = 'model/ADD_ERROR';
export const EDIT_MODEL = 'model/EDIT';
export const EDIT_MODEL_SUCCESS = 'model/EDIT_SUCCESS';
export const EDIT_MODEL_ERROR = 'model/EDIT_ERROR';
export const DELETE_MODEL = 'model/DELETE';
export const DELETE_MODEL_SUCCESS = 'model/DELETE_SUCCESS';
export const DELETE_MODEL_ERROR = 'model/DELETE_ERROR';

export const loadModels = (cbk = () => null) => {
  return dispatch => {
    dispatch({ type: LOAD_MODEL });

    fetch('api/models', 'GET' )
      .then(
        resp => {
          if (resp) {
            dispatch({ type: LOAD_MODEL_SUCCESS, models: resp });
            cbk();
          }
        },
        e => {
          dispatch({ type: LOAD_MODEL_ERROR });
          dispatch(throwNotification('Ошибка', 'Ошибка загрузки моделей', 'error'));
          console.error('Error:', e);
        }
      )
      .catch(e => {
        dispatch({ type: LOAD_MODEL_ERROR });
        dispatch(throwNotification('Ошибка', 'Ошибка загрузки моделей', 'error'));
        console.error('Catch:', e);
      });
  };
};

export const addModel = (obj, cbk = () => null) => {
  return dispatch => {
    dispatch({ type: ADD_MODEL });
    fetch('api/model/create', 'POST', obj )
      .then(
        resp => {
          if (resp) {
            dispatch({ type: ADD_MODEL_SUCCESS, model: resp });
            dispatch(throwNotification('Уведомление', 'Модель создана', 'success'));
            cbk();
          }
        },
        e => {
          dispatch({ type: ADD_MODEL_ERROR });
          dispatch(throwNotification('Ошибка', 'Ошибка создания модели', 'error'));
          console.error('Error:', e);
        }
      )
      .catch(e => {
        dispatch({ type: ADD_MODEL_ERROR });
        dispatch(throwNotification('Ошибка', 'Ошибка создания модели', 'error'));
        console.error('Catch:', e);
      });
  };
};

export const editModel = (id, obj, cbk = () => null) => {
  return dispatch => {

    dispatch({ type: EDIT_MODEL });
    fetch(`api/model/${id}`, 'PUT', obj)
      .then(
        resp => {
          if (resp) {
            dispatch({ type: EDIT_MODEL_SUCCESS, model: resp, id });
            dispatch(throwNotification('Уведомление', 'Модель обновлена', 'success'));
            cbk();
          }
        },
        e => {
          dispatch({ type: EDIT_MODEL_ERROR });
          dispatch(throwNotification('Ошибка', 'Ошибка редактирования модели', 'error'));
          console.error('Error:', e);
        }
      )
      .catch(e => {
        dispatch({ type: EDIT_MODEL_ERROR });
        dispatch(throwNotification('Ошибка', 'Ошибка редактирования модели', 'error'));
        console.error('Catch:', e);
      });
  };
};


export const deleteModel = (id, cbk = () => null) => {
  return dispatch => {

    dispatch({ type: DELETE_MODEL });
    fetch(`api/model/${id}`, 'DELETE')
      .then(
        resp => {
          if (resp) {
            dispatch({ type: DELETE_MODEL_SUCCESS, id: id });
            dispatch(throwNotification('Уведомление', 'Модель удалена', 'success'));
            cbk();
          }
        },
        e => {
          dispatch({ type: DELETE_MODEL_ERROR });
          dispatch(throwNotification('Ошибка', 'Ошибка удаления модели', 'error'));
          console.error('Error:', e);
        }
      )
      .catch(e => {
        dispatch({ type: DELETE_MODEL_ERROR });
        dispatch(throwNotification('Ошибка', 'Ошибка удаления модели', 'error'));
        console.error('Catch:', e);
      });
  };
};

