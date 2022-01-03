import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../store/Reducer/login';
import { userSlice } from '../store/Reducer/user';

import { combineReducers } from 'redux';

const main = combineReducers({
    login: loginSlice.reducer,
    user: userSlice.reducer,
})

export default configureStore({
    reducer:{
        main: main
    },
})