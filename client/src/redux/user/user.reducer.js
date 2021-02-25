import {
    GET_USERS,
    ADD_USER,
    GET_USER,
    REMOVE_USER
  } from './user.types';
  
  const initialState = {
    users: [],
    user: null
  };
  
  const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_USERS:
        return {
          ...state,
          users: payload,
          user: null
        };
      case GET_USER:
        return {
          ...state,
          user: payload
        };
      case ADD_USER:
        return {
          ...state,
          users: [payload, ...state.users]
        };
      case REMOVE_USER:
        return {
          ...state,
          users: state.users.filter(user => user.user_id !== payload)
        };
      default:
        return state;
    }
  }

  export default userReducer;