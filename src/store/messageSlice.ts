import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Dialog, Message } from '@/types';

import { RootState } from './index';

// adapter для сообщений
export const messagesAdapter = createEntityAdapter<Message>({
  selectId: (msg) => msg.id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

// adapter для диалогов
export const dialogsAdapter = createEntityAdapter<Dialog>({
  selectId: (d) => d.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

// селекторы для сообщений
export const messagesSelectors = messagesAdapter.getSelectors<RootState>((state) => state.messagesApi.queries);

// селекторы для диалогов
export const dialogsSelectors = dialogsAdapter.getSelectors<RootState>((state) => state.messagesApi.queries);
