import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "@/data/chatsData";
import { ChatItem } from "@/types/chat";

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<ChatItem>) => {
      state.push(action.payload);
    },
  },
});

export const { addChat } = chatsSlice.actions;
export default chatsSlice.reducer;
