import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './authApi';
import chatsReducer from './chatsSlice';
import contactsReducer from './contactsSlice';
import folderReducer from './folderSlice';
import { messagesApi } from './messagesApi';
export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    contacts: contactsReducer,
    folders: folderReducer,
    [authApi.reducerPath]: authApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, messagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
