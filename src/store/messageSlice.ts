import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

import * as types from '@/types/messages';

import { AppDispatch } from '.';

type Message = types.Message;

interface UserSafe {
  id: number;
  username: string;
}

interface Dialog {
  id: number;
  text: string;
  createdAt: string;
  sender: UserSafe;
  receiver: UserSafe;
}

interface MessagesState {
  messages: Message[];
  connected: boolean;
  dialogs: Dialog[];
}

const initialState: MessagesState = {
  messages: [],
  connected: false,
  dialogs: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    setDialogs(state, action: PayloadAction<Dialog[]>) {
      state.dialogs = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const { addMessage, setConnected, setMessages, setDialogs, clearMessages } = messagesSlice.actions;

// Socket.IO
let socket: Socket | null = null;

export const connectMessagesSocket = (token: string) => (dispatch: AppDispatch) => {
  if (socket) {
    socket.disconnect(); // защита от дубликатов
  }

  socket = io('http://localhost:3000', {
    auth: { token },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    dispatch(setConnected(true));
  });

  socket.on('disconnect', () => {
    dispatch(setConnected(false));
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connect error:', err);
    dispatch(setConnected(false));
  });

  socket.on('new_message', (msg: Message) => {
    // убираем password, если вдруг пришёл
    const safeMsg: Message = {
      ...msg,
      sender: { ...msg.sender },
      receiver: { ...msg.receiver },
    };
    dispatch(addMessage(safeMsg));
  });

  socket.on('conversationHistory', (messages: Message[]) => {
    const safeMessages = messages.map((m) => ({
      ...m,
      sender: { ...m.sender },
      receiver: { ...m.receiver },
    }));
    dispatch(setMessages(safeMessages));
  });

  socket.on('dialogsList', (dialogs: Dialog[]) => {
    const safeDialogs = dialogs.map((d) => ({
      ...d,
      sender: { id: d.sender.id, username: d.sender.username },
      receiver: { id: d.receiver.id, username: d.receiver.username },
    }));
    dispatch(setDialogs(safeDialogs));
  });
};

export const getDialogs = () => () => {
  if (socket && socket.connected) {
    socket.emit('getDialogs');
  }
};

export const getConversation = (userId: number) => (dispatch: AppDispatch) => {
  if (socket && socket.connected) {
    dispatch(clearMessages()); // очистим историю перед загрузкой
    socket.emit('getConversation', { userId });
  }
};

export const sendMessage = (text: string, receiverId: number) => (dispatch: AppDispatch) => {
  if (socket && socket.connected) {
    const optimisticMsg: Message = {
      id: Date.now(), // временный id
      text,
      createdAt: new Date().toISOString(),
      sender: { id: 0, username: 'me' }, // заменишь на данные текущего юзера
      receiver: { id: receiverId, username: 'unknown' },
    };
    dispatch(addMessage(optimisticMsg)); // оптимистично

    socket.emit('send_message', { text, receiverId });
  }
};

export default messagesSlice.reducer;
