export interface ChatItem {
  id: number;
  name: string;
  messages: messages[];
  avatar?: string;
  group?: boolean;
}

export interface messages {
  message: string;
  sender: string;
  time: Date;
}
