import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/todoService';

const rootReducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer
})

export const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});
