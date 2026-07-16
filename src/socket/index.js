import { Server } from "socket.io";
import socketAuth from "./auth.js";
import registerHandlers from "./handlers/index.js";


let io = null;

export function initializeSocket(server){
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    })
    io.use(socketAuth);
    io.on("connection", (socket) => {
        registerHandlers(io, socket);
    })
    return io;
}

export function getIO(){
    if(!io){
        throw new Error("Socket.IO has not been initialized.");
    }
    return io;
}