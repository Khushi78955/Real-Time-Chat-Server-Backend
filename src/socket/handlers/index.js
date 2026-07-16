import registerConnectionHandler from "./connection.handler.js"
import registerRoomHandler from "./room.handler.js"
import registerMessageHandler from "./message.handler.js"
import registerTypingHandler from "./typing.handler.js"


export default function registerHandlers(io, socket){
    registerConnectionHandler(io, socket);
    registerRoomHandler(io, socket);
    registerMessageHandler(io, socket);
    registerTypingHandler(io, socket);
}