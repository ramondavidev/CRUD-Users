import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGOUT
  } from './auth.types';

  const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
        case REGISTER_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case AUTH_ERROR:
      case LOGOUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
      default:
        return state;
    }
}

export default authReducer;