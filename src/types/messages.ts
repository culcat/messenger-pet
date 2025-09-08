export interface ConversationRequest {
  userId: number;
}

export interface User {
  id: number;
  username: string;
}

export interface Message {
  id: number;
  text: string;
  sender: User;
  receiver: User;
  createdAt: string;
}
export interface UserSafe {
  id: number;
  username: string;
}

export interface Dialog {
  id: number;
  text: string;
  createdAt: string;
  sender: UserSafe;
  receiver: UserSafe;
}

export interface MessagesState {
  messages: Message[];
  connected: boolean;
  dialogs: Dialog[];
}
