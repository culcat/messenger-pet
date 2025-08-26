import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./chatsSlice";
import contactsReducer from "./contactsSlice";

export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    contacts: contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
