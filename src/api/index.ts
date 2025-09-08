import { authApi } from '@/store/authApi';
import { messagesApi } from '@/store/messagesApi';

export const api = {
  auth: authApi,
  messages: messagesApi,
};
