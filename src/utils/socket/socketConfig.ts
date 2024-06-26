import { io } from 'socket.io-client'

const socket = io('http://4.145.80.101', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  transports: ['websocket', 'polling'],
})

export default socket
