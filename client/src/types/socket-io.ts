import { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

export interface ServerEvents {
    serverMessage: (message : string) => void
}
  
export interface ClientEvents {
    clientMessage: (message : string) => void;
}
  
export interface InterEvents {
    ping: () => void;
}

export interface SocketAuth {
    userName: string
}

export type TInstanceSocketIo = Socket<ServerEvents, ClientEvents>
export type TSocketIo = (opts?: Partial<ManagerOptions & Omit<SocketOptions, 'auth'> & { auth: SocketAuth}>) => TInstanceSocketIo