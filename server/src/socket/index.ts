import { Server as IServer } from "http";
import { Server as ServerIO } from "socket.io"
import { ClientEvents, ServerEvents, InterEvents, SocketData } from "../types/socket-io.ts";

export default function initSocketIo (server : IServer) {
    const io = new ServerIO<ClientEvents, ServerEvents, InterEvents, SocketData>(server)
    io.on('connection', socket => {
        console.log('A new user has been connected 🥳')

        socket.emit('serverMessage', 'Hello user 👋' + socket.id)
        
        socket.on('clientMessage', message => {
            console.log('Client says: ' + message)
        })

        socket.on('disconnect', () => console.log('Gooodbye user 👋'))

    })
}