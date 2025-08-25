import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatItem {
  id: number;
  name: string;
  message: string;
  avatar?: string;
  group?: boolean;
}

const initialState: ChatItem[] = [
  { id: 1, name: "Ethan Smith", message: "Paul - Come around..." },
  { id: 2, name: "Ava Williams", message: "I found this amazing book..." },
  {
    id: 3,
    name: "Isabella Rais",
    message: "Did you find out about the cup...",
  },
  {
    id: 4,
    name: "Lana Steiner",
    message: "What do you think about this report?",
  },
  { id: 5, name: "Laura Coppen", message: "Hello! Check out this post..." },
  { id: 6, name: "Oscar Roe", message: "Sam Ottman - Come around..." },
  {
    id: 7,
    name: "Support",
    message: "Pedro Rivera (Tech support) - Hello!...",
  },
];

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<ChatItem>) => {
      state.push(action.payload);
    },
    // другие редьюсеры по необходимости
  },
});

export const { addChat } = chatsSlice.actions;
export default chatsSlice.reducer;
