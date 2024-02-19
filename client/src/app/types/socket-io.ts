import { Socket } from 'socket.io-client';

export interface ServerEvents {
    serverMessage: (message : string) => void
}
  
export interface ClientEvents {
    clientMessage: (message : string) => void;
}
  
export interface InterEvents {
    ping: () => void;
}
  
export interface SocketData {
    name: string;
    age: number;
}

export type TSocketIo = Socket<ServerEvents, ClientEvents>