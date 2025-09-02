import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './authApi';
import contactsReducer from './contactsSlice';
import folderReducer from './folderSlice';
import { messagesSlice } from './messageSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    folders: folderReducer,
    [authApi.reducerPath]: authApi.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
