import { io } from 'socket.io-client';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = API_BASE.replace(/\/api\/?$/, '');

const socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: true,
});

export default socket;