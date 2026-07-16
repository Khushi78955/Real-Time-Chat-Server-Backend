import {EVENTS} from "../events.js";
import { addUser, removeUser } from "../onlineUsers.js";

export default function registerConnectionHandler(io, socket){
    console.log(`User ${socket.user.email} connected (${socket.id})`);
    addUser(socket.user.id, socket.id);
    socket.broadcast.emit(EVENTS.USER_ONLINE, {
        userId: socket.user.id,
        email: socket.user.email,
    });
    socket.on(EVENTS.DISCONNECT, () => {
        removeUser(socket.user.id);
        socket.broadcast.emit(EVENTS.USER_OFFLINE, {
            userId: socket.user.id,
        });
        console.log(`User ${socket.user.email} disconnected`);
    });

}