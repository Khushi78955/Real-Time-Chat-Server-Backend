import { EVENTS } from "../events.js";
import * as conversationService from "../../services/conversation.service.js";

export default function registerRoomHandler(io, socket) {
    socket.on(EVENTS.JOIN_CONVERSATION, async (conversationId) => {
        try {
            const conversations = await conversationService.getMyConversations(socket.user.id);
            const isParticipant = conversations.some(
                (conversation) => conversation.id === conversationId
            );
            if (!isParticipant) {
                return;
            }

            socket.join(`conversation:${conversationId}`);

            console.log(`${socket.user.email} joined conversation ${conversationId}`);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on(EVENTS.LEAVE_CONVERSATION, (conversationId) => {
        socket.leave(`conversation:${conversationId}`);
        console.log(`${socket.user.email} left conversation ${conversationId}`);
    });
}