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

export type TSocketIo = Socket<ClientEvents, ServerEvents, InterEvents, SocketData>
export type TInstanceSocketIo = InstanceType<typeof ServerIO<ClientEvents, ServerEvents, InterEvents, SocketData>>