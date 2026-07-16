import { EVENTS } from "../events.js";

export default function registerTypingHandler(io, socket) {
    socket.on(EVENTS.TYPING, ({conversationId}) => {
        socket.to(`conversation:${conversationId}`).emit(
            EVENTS.TYPING, {
                userId: socket.user.id,
                email: socket.user.email
            }
        )
    })

    socket.on(EVENTS.STOP_TYPING, ({conversationId}) => {
        socket.to(`conversation:${conversationId}`).emit(
            EVENTS.STOP_TYPING, {
                userId: socket.user.id
            }
        )
    })
}


