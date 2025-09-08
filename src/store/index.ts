import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './authApi';
import { contactApi } from './contactApi';
import { messagesApi } from './messagesApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, messagesApi.middleware, contactApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
