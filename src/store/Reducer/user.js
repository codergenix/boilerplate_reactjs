import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CONFIG from '../../Utils/config';
import Service from '../../Utils/service';
import _ from 'lodash';
import axios from 'axios';

export const getAllUser = createAsyncThunk(
    'user/getall',
    async (thunkAPI) => {
        try {
            let result = await axios({ method: 'GET', url: `${CONFIG.API_ENDPOINT}user`, headers: CONFIG.API_HEADER.headers });
            console.log('getall result >>',result);
            if (result.data.success) {
                return result.data.result;
            } else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            console.log('getalluser try catch error >>',error);
        }
    }
);

export const addUser = createAsyncThunk(
    'user/add',
    async (postdata, thunkAPI) => {
        postdata.CreatedBy=Service.getUserid();
        try {
            let result = await axios({ method: 'POST', url: `${CONFIG.API_ENDPOINT}user/create`, data: postdata, headers: CONFIG.API_HEADER.headers });
            console.log('create result >>',result);
            if (result.data.success) {
                return result.data.result;
            } else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            console.log('adduser try catch error >>',error);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/update',
    async (postdata, thunkAPI) => {
          postdata.updateBy = Service.getUserid();
        try {
            let result = await axios({ method: 'PUT', url: `${CONFIG.API_ENDPOINT}user/update`, data: postdata, headers: CONFIG.API_HEADER.headers });
            console.log('update result >>',result);
            if (result.data.success) {
                return result.data.result;
            } else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            console.log('updateuser try catch error >>',error);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (postdata, thunkAPI) => {
        try {
            let deleteData = {
                "id": postdata.id,
                "UpdatedBy": Service.getUserid()
            }
            let result = await axios({ method: 'DELETE', url: `${CONFIG.API_ENDPOINT}user/delete`, data: postdata, headers: CONFIG.API_HEADER.headers });
            console.log('delete result >>',result);
            if (result.data.success) {
                result.postdata = postdata;
                return result;
            } else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            console.log('deleteuser try catch error >>',error);
        }
    }
);

export const setCurrentUser = createAsyncThunk(
    'user/setcurrent',
    async (data, thunkAPI) => {
        return data;
    }
);

export const setParams = createAsyncThunk(
    'user/setparams',
    async (data, thunkAPI) => {
        return data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        currentUser: [],
        isFetching: false,
        isAdded: '',
        isUpdated: '',
        isDeleted: '',
        isError: false,
        errorMessage: '',
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isFetching = false;
            state.isAdded = '';
            state.isUpdated = '';
            state.isDeleted = '';
            return state;
        },
        resetCurrent: (state) => {
            return state;
        }
    },
    extraReducers: {
        [getAllUser.fulfilled]: (state, { payload }) => {
            try {
                let exist = [...state.users];
                let reciveitems = _.unionBy(exist, payload, 'id');
                state.isFetching = false;
                state.isError = false;
                state.users = reciveitems;
                state.errorMessage = '';
                return state;
            } catch (error) {
                console.log('getalluserFulfill try catch error >>',error);
            }
        },
        [getAllUser.rejected]: (state, { payload }) => {
            try {
                state.isFetching = false;
                state.isError = true;
                state.users = [];
                (payload) ? state.errorMessage = (payload.error) ? payload.error : "Please try after some time" : state.errorMessage = "API Response Invalid. Please Check API";
            } catch (error) {
                console.log('try catch error >>',error);
            }
        },
        [getAllUser.pending]: (state) => {
            state.isFetching = true;
            return state;
        },

        [addUser.fulfilled]: (state, { payload }) => {
            try {
                let updated = payload;
                let reciveitems = [...state.users, updated];
                state.currentUser = updated;
                state.isFetching = false;
                state.isError = false;
                state.users = reciveitems;
                state.errorMessage = '';
                state.isAdded = true;
                return state;
            } catch (error) {
                console.log('adduserFullfill try catch error >>',error);
            }
        },
        [addUser.rejected]: (state, { payload }) => {
            try {
                let exist = [...state.users];
                state.isFetching = false;
                state.isError = true;
                state.users = exist;
                state.isAdded = false;
                (payload) ? state.errorMessage = (payload.error) ? payload.error : "Please try after some time" : state.errorMessage = "API Response Invalid. Please Check API";
                return state;
            } catch (error) {
                console.log('try catch error >>',error);
            }
        },
        [addUser.pending]: (state) => {
            state.isFetching = true;
            return state;
        },

        [updateUser.fulfilled]: (state, { payload }) => {
            try {
                let exist = [...state.users];
                let updated = payload;
                const index = state.users.findIndex(opt => opt.id === payload.id)
                exist[index] = updated;
                state.isFetching = false;
                state.isError = false;
                state.users = exist;
                state.errorMessage = '';
                state.isUpdated = true;
                return state;
            } catch (error) {
                console.log('updateuserFulfill try catch error >>',error);
            }
        },
        [updateUser.rejected]: (state, { payload }) => {
            try {
                let exist = [...state.users];
                state.isFetching = false;
                state.isError = true;
                state.users = exist;
                state.isUpdated = false;
                (payload) ? state.errorMessage = (payload.error) ? payload.error : "Please try after some time" : state.errorMessage = "API Response Invalid. Please Check API";
                return state;
            } catch (error) {
                console.log('try catch error >>',error);
            }
        },
        [updateUser.pending]: (state) => {
            state.isFetching = true;
            return state;
        },

        [deleteUser.fulfilled]: (state, { payload }) => {
            try {
                let exist = [...state.users];
                let newExist = exist.filter((e) => {
                    if (e.id != payload.postdata.id) {
                        return e;
                    }
                    return false;
                });
                state.isFetching = false;
                state.isError = false;
                state.isDeleted = true;
                state.users = newExist;
                return state;
            } catch (error) {
                console.log('deleteuserFulfill try catch error >>',error);
            }
        },
        [deleteUser.rejected]: (state, { payload }) => {
            try {
                let exist = [...state.users];
                state.isFetching = false;
                state.isError = true;
                state.users = exist;
                state.isDeleted = false;
                (payload) ? state.errorMessage = (payload.error) ? payload.error : "Please try after some time" : state.errorMessage = "API Response Invalid. Please Check API";
                return state;
            } catch (error) {
                console.log('try catch error >>',error);
            }
        },
        [deleteUser.pending]: (state) => {
            state.isFetching = true;
            return state;
        },

        [setParams.fulfilled]: (state, { payload }) => {
            let newState2 = {
                ...state,
                isAdded: '',
                isUpdated: '',
                isDeleted: '',
            };
            state = newState2;
            return state;
        },

        [setCurrentUser.fulfilled]: (state, { payload }) => {
            try {
                localStorage.setItem('ReactcurrentUser', JSON.stringify(payload));
                state.currentUser = payload;
                return state;
            } catch (error) {
                console.log('try catch error >>',error);
            }
        },
        [setCurrentUser.rejected]: (state, { payload }) => {
            state.currentUser = [];
            return state;
        },
        [setCurrentUser.pending]: (state) => {
            state.currentUser = [];
            return state;
        },
    },
});

export const { clearState, resetCurrent } = userSlice.actions;
export const userSelector = (state) => state.main.user;

