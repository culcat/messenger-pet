import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./chatsSlice";
import contactsReducer from "./contactsSlice";
import folderReducer from "./folderSlice";
export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    contacts: contactsReducer,
    folders: folderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
