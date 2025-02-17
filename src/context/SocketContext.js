import { Children, createContext, useEffect } from "react";
import socket, { connectSocket, disconnectSocket } from "../services/socketService";


export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
    console.log('SocketProvider rendered');
    useEffect(() => {
        connectSocket();

        return () => {
            disconnectSocket();
        };
    }, []);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}