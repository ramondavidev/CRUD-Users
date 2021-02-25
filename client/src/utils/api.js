import axios from 'axios';
import store from '../redux/store';
import { LOGOUT } from '../redux/auth/auth.types';

const api = axios.create({
  baseURL: 'http://localhost:5000/users',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.data.msg === 'Token is not valid') {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;