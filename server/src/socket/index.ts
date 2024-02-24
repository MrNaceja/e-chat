import { Server as IServer } from "http";
import { Server as ServerIO } from "socket.io"
import { TInstanceSocketIo, TSocketIo } from "../types/socket-io.ts";

/**
 * Inicializa o Socket.io no lado do Server.
 * 
 * @param server 
 */
export default function initSocketIo (server : IServer) {
    const io : TInstanceSocketIo = new ServerIO(server)
    
    //@ts-ignore
    io.on('connection', (socket : TSocketIo) => {
        const { userName } = socket.handshake.auth
        console.log('A new user has been connected 🥳')
        
        sendMessage(socket, 'Hello ' + userName + ' 👋')
        
        socket.on('clientMessage', message => {
            console.log('Client says: ' + message)
            sendMessage(socket, message)
        })

        socket.on('disconnect', () => console.log('Gooodbye user 👋'))
    })
}

/**
 * Envia uma mensagem do servidor para o cliente.
 * 
 * @param socket 
 * @param message 
 */
const sendMessage = (socket: TSocketIo, message: string) => {
    // Com delay para simular processamento...
    setTimeout(() => socket.emit('serverMessage', message), 2500)
}