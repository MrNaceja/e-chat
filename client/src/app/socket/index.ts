//@ts-ignore
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { TSocketIo } from "../types/socket-io.js";

export default function initSocketIo() {
    const socket : TSocketIo = io('')

    socket.on('connect', () => {
        console.log('teste' + socket.id)
        socket.on('serverMessage', message => {
            console.log('Server says: ' + message)
        })
    })

    return socket;
}