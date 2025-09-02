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
