import { Server as IServer } from "http";
import { Server as ServerIO } from "socket.io"
import { SocketAuth, TInstanceSocketIo, TSocketIo } from "../types/socket-io.ts";

export default function initSocketIo (server : IServer) {
    const io : TInstanceSocketIo = new ServerIO(server)
    io.on('connection', socket => {
        const { userName } : SocketAuth = socket.handshake.auth as SocketAuth
        console.log('A new user has been connected 🥳')
        
        sendMessage(socket, 'Hello ' + userName + ' 👋')
        
        socket.on('clientMessage', message => {
            console.log('Client says: ' + message)
            sendMessage(socket, message)
        })

        socket.on('disconnect', () => console.log('Gooodbye user 👋'))
    })
}

const sendMessage = (socket: TSocketIo, message: string) => {
    setTimeout(() => socket.emit('serverMessage', message), 2000)
}