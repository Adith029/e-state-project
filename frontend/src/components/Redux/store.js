// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './userSlice'; // Assuming you will define authSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
