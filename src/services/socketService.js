import {BASE_URL} from '@env';
import { io } from 'socket.io-client';

const url = BASE_URL;

const socket = io(url, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    timeout: 10000,
});

export const connectSocket = () => {
    if(!socket.connected) {
        socket.connect();
    }
};

export const disconnectSocket = () => {
    if(socket.connected) {
        socket.disconnect();
    }
};


export default socket;