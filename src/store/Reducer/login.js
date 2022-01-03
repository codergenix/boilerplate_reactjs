import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import axios from 'axios';
import Service from '../../Utils/service';
import CONFIG from '../../Utils/config';

export const loginUser = createAsyncThunk(
    'users/login',
    async (userdata, thunkAPI) => {
        try {
            let result = await  axios({ method: 'POST', url: `${CONFIG.API_ENDPOINT}login`, data:userdata, headers: CONFIG.API_HEADER.headers });
            console.log('login result >>',result);
            if (result.data.success) {
                localStorage.setItem('ReactloginTime', moment().format('YYYY-MM-DD'));
                localStorage.setItem('Reacttoken', result.data.result.token);
                localStorage.setItem('ReactisLogin', true);
                localStorage.setItem('Reactstatus', 'login');
                localStorage.setItem('ReactuserId', result.data.result.id);
                localStorage.setItem('ReactuserData', JSON.stringify(result.data.result));
                return result.data.result;
            }
            else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            console.log('try catch error >>',error);
        }
    }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        logindata: [],
        token: '',
        isFetching: false,
        isLogin: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isLogin = false;
            state.isFetching = false;
            return state;
        },
    },
    extraReducers: {

        [loginUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = false;
            state.isLogin = true;
            state.logindata = payload;
            state.errorMessage = '';
            return state;
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.logindata = [];
            state.isLogin = false;
            (payload) ? state.errorMessage = (payload.error) ? payload.error : "Please try after some time" : state.errorMessage = "API Response Invalid. Please Check API";
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
    },
});

export const { clearState } = loginSlice.actions;
export const loginSelector = (state) => state.main.login;

