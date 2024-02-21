// @ts-ignore
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { SocketAuth, TSocketIo } from "../types/socket-io.js";
 
const ClientIo : TSocketIo = io
export default function initSocketIo() {
    const socket = ClientIo({
       auth: {
         userName: 'Naceja'
       } as SocketAuth
    })
    socket.on('connect', () => {
       console.log('User connected ✅')
    })
    socket.on('disconnect', (why) => console.log(why + ' 🫠'))

    return socket;
}