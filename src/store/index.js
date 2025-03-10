import { configureStore } from '@reduxjs/toolkit';
import { frontSlice } from '../store/Reducer/frontSlice';
export default configureStore({
    reducer: {
        main: frontSlice.reducer
    },
    devTools: true
})