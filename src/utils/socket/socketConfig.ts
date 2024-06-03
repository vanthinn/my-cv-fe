import { io } from 'socket.io-client';

const socket = io('http://localhost:3000',
  {
    reconnection: true,
    reconnectionAttempts: Infinity,
    transports: ['websocket', 'polling']
  })

export default socket;