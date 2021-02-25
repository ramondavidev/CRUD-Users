import api from '../../utils/api';

import {
    GET_USERS,
    GET_USER,
    ADD_USER,
    REMOVE_USER
} from './user.types';

export const getUsers = () => async dispatch => {
  try {
    const res = await api.get('/');
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
}

export const getUser = ( id ) => async dispatch => {
  try {
    const res = await api.get(`/${id}`);
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
}

export const addUser = ( title, description, done ) => async dispatch => {
  try {
    const res = await api.post('/', { title, description, done });
    
    dispatch({
      type: ADD_USER,
      payload: res.data
    });
  } catch (error) {
   console.error(error);
  }
}

export const editUser = ( form, id ) => async dispatch => {
  try {
    await api.put(`/${id}`, form);
    const res = await api.get('/');
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (error) {
   console.error(error);
  }
}

export const deleteUser = ( id ) => async dispatch => {
  try {
      await api.delete(`/${id}`);
      dispatch({
        type: REMOVE_USER,
        payload: id
      });

  } catch (error) {
    console.log(error);
  }
}