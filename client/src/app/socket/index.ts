import { io as ClientIO } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { TInstanceSocketIo } from "@/types/socket";
 
/**
 * Inicializa o Socket.io no lado Client.
 */
export default function initSocketIo() : TInstanceSocketIo {
   const socket = ClientIO({
      auth: {
        userName: 'Naceja'
      }
   })
   socket.on('connect'   , () => console.log('User connected ✅'))
   socket.on('disconnect', (why) => console.log(why + ' 🫠'))
   return socket;
}