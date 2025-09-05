// src/socket.ts
import Cookies from 'js-cookie';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const token = Cookies.get('access_token');

    socket = io('http://localhost:3000', {
      auth: { token },
      transports: ['websocket'],
    });

    // Для отладки
    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket?.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
    });

    socket.on('connect_error', (err) => {
      console.error('⚠️ Socket connect error:', err.message);
    });
  }

  return socket;
}
