import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Utils/axiosConfig';
import Service from '../../Utils/service';
//----
export const loginUser = createAsyncThunk(
    'users/login',
    async (data, thunkAPI) => {
        try {
            let result = await axios.post('login', data);
            // console.info('loginUser >> reuslt.data>>', result.data);
            if (result.status == 200 && !result?.data?.error) {
                sessionStorage.setItem('webAppUser', JSON.stringify(result.data));
                return result.data;
            }
            else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            let errorMessage = error?.response || error?.message;
            return thunkAPI.rejectWithValue({ error: errorMessage });
        }
    }
);
export const profileUpdate = createAsyncThunk(
    'user/Profileupdate',
    async (data, thunkAPI) => {
        try {
            let result = await axios.put(`user/update/${data.userId}`, data);
            // console.info('profileUpdate >> reuslt.data>>', result.data);
            if (result.status == 200 && !result?.data?.error) {
                return result.data.result;
            } else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            let errorMessage = error?.response || error?.message;
            return thunkAPI.rejectWithValue({ error: errorMessage });
        }
    }
);
export const userGrid = createAsyncThunk(
    'user/grid',
    async (params, thunkAPI) => {
        try {
            let result = await axios.post('user/grid', params);
            // console.info('userGrid >> reuslt.data>>', result.data);
            if (result.status == 200 && !result?.data?.error) {
                return result.data.result;
            } else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            let errorMessage = error?.response || error?.message;
            return thunkAPI.rejectWithValue({ error: errorMessage });
        }
    }
);
export const userInfo = createAsyncThunk(
    'user/info',
    async (params, thunkAPI) => {
        try {
            let result = await axios.get(`user/info/${params.userId}`);
            // console.info('userInfo >> reuslt.data>>', result.data);
            if (result.status == 200 && !result?.data?.error) {
                return result.data.result;
            } else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            let errorMessage = error?.response || error?.message;
            return thunkAPI.rejectWithValue({ error: errorMessage });
        }
    }
);
export const userCreate = createAsyncThunk(
    'user/create',
    async (data, thunkAPI) => {
        try {
            let result = await axios.post('user/create', data);
            // console.info('userCreate >> reuslt.data>>', result.data);
            if (result.status == 200 && !result?.data?.error) {
                return result.data.result;
            } else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            let errorMessage = error?.response || error?.message;
            return thunkAPI.rejectWithValue({ error: errorMessage });
        }
    }
);
export const userUpdate = createAsyncThunk(
    'user/update',
    async (data, thunkAPI) => {
        try {
            let result = await axios.put(`user/update/${data.userId}`, data);
            // console.info('userUpdate >> reuslt.data>>', result.data);
            if (result.status == 200 && !result?.data?.error) {
                return result.data.result;
            } else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            let errorMessage = error?.response || error?.message;
            return thunkAPI.rejectWithValue({ error: errorMessage });
        }
    }
);
export const userDelete = createAsyncThunk(
    'user/delete',
    async (data, thunkAPI) => {
        try {
            let result = await axios.delete(`user/delete/${data.userId}`, data);
            // console.info('userDelete >> reuslt.data>>', result.data);
            if (result.status == 200 && !result?.data?.error) {
                return result.data;
            } else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            let errorMessage = error?.response || error?.message;
            return thunkAPI.rejectWithValue({ error: errorMessage });
        }
    }
);
export const userChangePassword = createAsyncThunk(
    'user/change-password',
    async (data, thunkAPI) => {
        try {
            let result = await axios.put(`user/change-password/${data.userId}`, data);
            // console.info('userChangePassword >> reuslt.data>>', result.data);
            if (result.status == 200 && !result?.data?.error) {
                return result.data;
            }
            else {
                return thunkAPI.rejectWithValue(result.data);
            }
        } catch (error) {
            let errorMessage = error?.response || error?.message;
            return thunkAPI.rejectWithValue({ error: errorMessage });
        }
    }
);
export const frontSlice = createSlice({
    name: 'frontSlice',
    initialState: {
        loginData: Service.getLoginData() || {},
        users: [],
        userDetail: {},
        //---
        isFetchingOBJ: {},
        //--
        isAddedUser: false,
        isUpdatedUser: false,
        isDeletedUser: false,
        isUpdatedProfile: false,
        isChangePassword: false,
        //---
        isError: false,
        errorMessage: '',
        successMessage: '',
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.errorMessage = '';
            return state;
        },
        updateState: (state, { payload }) => {
            if (payload.isAddedUser !== undefined) { state.isAddedUser = payload.isAddedUser }
            if (payload.isUpdatedUser !== undefined) { state.isUpdatedUser = payload.isUpdatedUser }
            if (payload.isDeletedUser !== undefined) { state.isDeletedUser = payload.isDeletedUser }
            if (payload.isChangePassword !== undefined) { state.isChangePassword = payload.isChangePassword }
            if (payload.isUpdatedProfile !== undefined) { state.isUpdatedProfile = payload.isUpdatedProfile }
            if (payload.isError !== undefined) { state.isError = payload.isError }
            if (payload.errorMessage !== undefined) { state.errorMessage = payload.errorMessage }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            try {
                state.loginData = payload;
                state.isFetchingOBJ['loginUser'] = false;
                state.isError = false;
                state.isLogin = true;
                state.logindata = payload;
                state.errorMessage = '';
                return state;
            } catch (error) {
                console.error('try catch[loginUser.fulfilled] error >>', error);
            }

        })
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            try {
                state.isFetchingOBJ['loginUser'] = false;
                state.isError = true;
                state.logindata = [];
                state.isLogin = false;
                state.errorMessage = payload?.error?.data?.detail?.toString() || payload?.error?.data?.Message?.toString() || payload?.error?.data?.title?.toString() || payload?.error?.message?.toString() || payload?.error?.statusText?.toString() || payload?.message?.toString() || payload?.error?.toString() || "API Response Invalid.";
            } catch (error) {
                console.error('try catch[loginUser.rejected] error >>', error.message);
            }
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isFetchingOBJ['loginUser'] = true;
        })
        //---
        builder.addCase(profileUpdate.fulfilled, (state, { payload }) => {
            try {
                state.isFetchingOBJ['profileUpdate'] = false;
                state.isError = false;
                state.errorMessage = '';
                state.isUpdatedProfile = true;
                return state;
            } catch (error) {
                console.error('try catch[profileUpdate.fulfilled] error >>', error);
            }
        })
        builder.addCase(profileUpdate.rejected, (state, { payload }) => {
            try {
                state.isFetchingOBJ['profileUpdate'] = false;
                state.isError = true;
                state.isUpdatedProfile = false;
                state.errorMessage = payload?.error?.data?.detail?.toString() || payload?.error?.data?.Message?.toString() || payload?.error?.data?.title?.toString() || payload?.error?.message?.toString() || payload?.error?.statusText?.toString() || payload?.message?.toString() || payload?.error?.toString() || "API Response Invalid.";
                return state;
            } catch (error) {
                console.error('try catch[profileUpdate.rejected] error >>', error.message);
            }
        })
        builder.addCase(profileUpdate.pending, (state) => {
            state.isFetchingOBJ['profileUpdate'] = true;
            return state;
        })
        //---
        builder.addCase(userGrid.fulfilled, (state, { payload }) => {
            try {
                state.isFetchingOBJ['userGrid'] = false;
                state.isError = false;
                state.users = payload;
                state.errorMessage = '';
                return state;
            } catch (error) {
                console.error('try catch[userGrid.fulfilled] error >>', error);
            }
        })
        builder.addCase(userGrid.rejected, (state, { payload }) => {
            try {
                state.isFetchingOBJ['userGrid'] = false;
                state.isError = true;
                state.users = [];
                state.errorMessage = payload?.error?.data?.detail?.toString() || payload?.error?.data?.Message?.toString() || payload?.error?.data?.title?.toString() || payload?.error?.message?.toString() || payload?.error?.statusText?.toString() || payload?.message?.toString() || payload?.error?.toString() || "API Response Invalid.";
            } catch (error) {
                console.error('try catch[userGrid.rejected] error >>', error.message);
            }
        })
        builder.addCase(userGrid.pending, (state) => {
            state.isFetchingOBJ['userGrid'] = true;
            return state;
        })
        //---
        builder.addCase(userInfo.fulfilled, (state, { payload }) => {
            try {
                state.userDetail = payload;
                state.isFetchingOBJ['userInfo'] = false;
                state.isError = false;
                state.errorMessage = '';
                return state;
            } catch (error) {
                console.error('try catch[userInfo.fulfilled] error >>', error);
            }
        })
        builder.addCase(userInfo.rejected, (state, { payload }) => {
            try {
                state.isFetchingOBJ['userInfo'] = false;
                state.isError = true;
                state.userDetail = {};
                state.errorMessage = payload?.error?.data?.detail?.toString() || payload?.error?.data?.Message?.toString() || payload?.error?.data?.title?.toString() || payload?.error?.message?.toString() || payload?.error?.statusText?.toString() || payload?.message?.toString() || payload?.error?.toString() || "API Response Invalid.";
            } catch (error) {
                console.error('try catch[userInfo.rejected] error >>', error.message);
            }
        })
        builder.addCase(userInfo.pending, (state) => {
            state.isFetchingOBJ['userInfo'] = true;
            return state;
        })
        //---
        builder.addCase(userCreate.fulfilled, (state, { payload }) => {
            try {
                state.isFetchingOBJ['userCreate'] = false;
                state.isError = false;
                state.errorMessage = '';
                state.isAddedUser = true;
                return state;
            } catch (error) {
                console.error('try catch[userCreate.fulfilled] error >>', error);
            }
        })
        builder.addCase(userCreate.rejected, (state, { payload }) => {
            try {
                state.isFetchingOBJ['userCreate'] = false;
                state.isError = true;
                state.isAddedUser = false;
                state.errorMessage = payload?.error?.data?.detail?.toString() || payload?.error?.data?.Message?.toString() || payload?.error?.data?.title?.toString() || payload?.error?.message?.toString() || payload?.error?.statusText?.toString() || payload?.message?.toString() || payload?.error?.toString() || "API Response Invalid.";
                return state;
            } catch (error) {
                console.error('try catch[userCreate.rejected] error >>', error.message);
            }
        })
        builder.addCase(userCreate.pending, (state) => {
            state.isFetchingOBJ['userCreate'] = true;
            return state;
        })
        //---
        builder.addCase(userUpdate.fulfilled, (state, { payload }) => {
            try {
                state.isFetchingOBJ['userUpdate'] = false;
                state.isError = false;
                state.errorMessage = '';
                state.isUpdatedUser = true;
                return state;
            } catch (error) {
                console.error('try catch[userUpdate.fulfilled] error >>', error);
            }
        })
        builder.addCase(userUpdate.rejected, (state, { payload }) => {
            try {
                state.isFetchingOBJ['userUpdate'] = false;
                state.isError = true;
                state.isUpdatedUser = false;
                state.errorMessage = payload?.error?.data?.detail?.toString() || payload?.error?.data?.Message?.toString() || payload?.error?.data?.title?.toString() || payload?.error?.message?.toString() || payload?.error?.statusText?.toString() || payload?.message?.toString() || payload?.error?.toString() || "API Response Invalid.";
                return state;
            } catch (error) {
                console.error('try catch[userUpdate.rejected] error >>', error.message);
            }
        })
        builder.addCase(userUpdate.pending, (state) => {
            state.isFetchingOBJ['userUpdate'] = true;
            return state;
        })
        //---
        builder.addCase(userDelete.fulfilled, (state, { meta, payload }) => {
            try {
                state.users = state.users.filter((user) => user.userId != meta.arg.userId);
                state.isFetchingOBJ['userDelete'] = false;
                state.isError = false;
                state.isDeletedUser = true;
                return state;
            } catch (error) {
                console.error('try catch[userDelete.fulfilled] error >>', error);
            }
        })
        builder.addCase(userDelete.rejected, (state, { payload }) => {
            try {
                let exist = [...state.users];
                state.isFetchingOBJ['userDelete'] = false;
                state.isError = true;
                state.users = exist;
                state.isDeletedUser = false;
                state.errorMessage = payload?.error?.data?.detail?.toString() || payload?.error?.data?.Message?.toString() || payload?.error?.data?.title?.toString() || payload?.error?.message?.toString() || payload?.error?.statusText?.toString() || payload?.message?.toString() || payload?.error?.toString() || "API Response Invalid.";
                return state;
            } catch (error) {
                console.error('try catch[userDelete.rejected] error >>', error.message);
            }
        })
        builder.addCase(userDelete.pending, (state) => {
            state.isFetchingOBJ['userDelete'] = true;
            return state;
        })
        //---
        builder.addCase(userChangePassword.fulfilled, (state, { payload }) => {
            try {
                state.isFetchingOBJ['userChangePassword'] = false;
                state.isChangePassword = true;
                state.isError = false;
                return state;
            } catch (error) {
                console.error('try catch[userChangePassword.fulfilled] error >>', error);
            }
        })
        builder.addCase(userChangePassword.rejected, (state, { payload }) => {
            try {
                state.isFetchingOBJ['userChangePassword'] = false;
                state.isChangePassword = false;
                state.isError = true;
                state.errorMessage = payload?.error?.data?.detail?.toString() || payload?.error?.data?.Message?.toString() || payload?.error?.data?.title?.toString() || payload?.error?.message?.toString() || payload?.error?.statusText?.toString() || payload?.message?.toString() || payload?.error?.toString() || "API Response Invalid.";
                return state;
            } catch (error) {
                console.error('try catch[userChangePassword.rejected] error >>', error.message);
            }
        })
        builder.addCase(userChangePassword.pending, (state) => {
            state.isFetchingOBJ['userChangePassword'] = true;
            return state;
        })
        //---
    },
});
export const { clearState, updateState } = frontSlice.actions;
export const frontSelector = (state) => state.main;
