import { Handshake } from "node_modules/socket.io/dist/socket.js";
import { Server as ServerIO, Socket } from "socket.io"

export interface ServerEvents {
    serverMessage: (message : string) => void
}
  
export interface ClientEvents {
    clientMessage: (message : string) => void;
}
  
export interface InterEvents {
    ping: () => void;
}
  
export interface SocketData {}

export interface SocketAuth {
    userName: string
}

export type TInstanceSocketIo = InstanceType<typeof ServerIO<ClientEvents, ServerEvents, InterEvents, SocketData>>

export type TSocketIo = Omit<Socket<ClientEvents, ServerEvents, InterEvents, SocketData>, 'handshake'> & {
    handshake: Omit<Handshake, 'auth'> & { auth: SocketAuth }
}