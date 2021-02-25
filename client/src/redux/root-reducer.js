import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import authReducer from './auth/auth.reducer';


export default combineReducers({
    users: userReducer,
    auth: authReducer
});