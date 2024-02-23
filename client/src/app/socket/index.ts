// @ts-ignore
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { TSocketIo, TInstanceSocketIo } from "@/types/socket-io";
 
const ClientIo : TSocketIo = io

/**
 * Inicializa o Socket.io no lado Client.
 */
export default function initSocketIo() : TInstanceSocketIo {
   const socket = ClientIo({
      auth: {
        userName: 'Naceja'
      }
   })
   socket.on('connect'   , () => console.log('User connected ✅'))
   socket.on('disconnect', (why) => console.log(why + ' 🫠'))
   return socket;
}