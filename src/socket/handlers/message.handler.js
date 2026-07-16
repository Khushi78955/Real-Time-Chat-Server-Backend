import { EVENTS } from "../events.js";

import * as conversationService from "../../services/conversation.service.js"

export default function registerMessageHandler(io, socket){
    socket.on(EVENTS.SEND_MESSAGE, async({conversationId, text}) => {
        try{
            const message = await conversationService.sendMessage(conversationId, socket.user.id, text)
            io.to(`conversation:${conversationId}`).emit(EVENTS.RECEIVE_MESSAGE, message)
        } catch(err){
            socket.emit("error", {
                message: err.message
            })
        }
    })

    socket.on(EVENTS.MESSAGE_DELIVERED, async({messageId}) => {
        try{
            const message = await conversationService.markMessageDelivered(messageId, socket.user.id);
            io.to(`conversation:${message.conversation_id}`).emit(
                EVENTS.MESSAGE_DELIVERED,
                message
            )
        } catch(err){
            socket.emit("error", {
                message: err.message
            })
        }
    })


    socket.on(EVENTS.MESSAGE_SEEN, async ({messageId}) => {
        try{
            const message = await conversationService.markMessageSeen(messageId, socket.user.id);
            io.to(`conversation:${message.conversation_id}`).emit(
                EVENTS.MESSAGE_SEEN,
                message
            )
        } catch(err){
            socket.emit("error", {
                message: err.message
            })
        }
    })
}




