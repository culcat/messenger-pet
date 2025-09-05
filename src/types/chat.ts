export interface ChatItem {
  id: number;
  name: string;
  messages: messages[];
  avatar?: string;
  group?: boolean;
  folder?: string;
}

export interface messages {
  message: string;
  sender: string;
  time: Date;
}
