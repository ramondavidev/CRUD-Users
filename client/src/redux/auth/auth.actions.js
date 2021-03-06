
import api from '../../utils/api';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './auth.types';


// Load User
export const loadUser = () => async dispatch => {
    try {
        console.log('resssss');
      const res = await api.get('/auth');
      console.log('res');
      console.log(res);
      console.log('res');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
  
  // Register User
  export const register = formData => async dispatch => {
    try {
  
      const res = await api.post('/users', formData);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      console.log(err.response);
      const errors = err.response.data.errors;
  
      if (errors) {
        //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };

// Login User
export const login = (username, password) => async dispatch => {
    const body = { username, password };
  
    try {
      const res = await api.post('/auth', body);
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
  
  // Logout
  export const logout = () => ({ type: LOGOUT });