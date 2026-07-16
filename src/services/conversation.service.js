import AppError from "../errors/AppError.js"
import * as conversationRepository from "../repositories/conversation.repository.js";
import * as authRepository from "../repositories/auth.repository.js";

export async function createConversation(currentUserId, participantId){
    if(currentUserId === participantId){
        throw new AppError("You cannot create a conversation with yourself", 400);
    }

    const participant = await authRepository.findUserById(participantId);
    if(!participant){
        throw new AppError("Participant not found", 404);
    }

    const existingConversation = await conversationRepository.findConversationBetweenUsers(currentUserId, participantId);
    if(existingConversation){
        throw new AppError("Conversation already exists", 409)
    }

    const conversation = await conversationRepository.createConversation();
    await conversationRepository.addParticipant(conversation.id, currentUserId);
    await conversationRepository.addParticipant(conversation.id, participantId);

    return conversation;
}



export async function getMyConversations(userId){
    return await conversationRepository.getUserConversations(userId);
}



export async function sendMessage(conversationId, senderId, text) {
    if (!text || !text.trim()) {
        throw new AppError("Message cannot be empty", 400);
    }
    const conversation = await conversationRepository.getConversationById(conversationId);
    if(!conversation){
        throw new AppError("Conversation not found", 404);
    }

    const participants = await conversationRepository.getConversationParticipants(conversationId);

    const isParticipant = participants.some(
        (participant) => participant.user_id === senderId
    )
    if(!isParticipant){
        throw new AppError("You are not a participant in this conversation", 403)
    }

    return await conversationRepository.createMessage(
        conversationId,
        senderId,
        text
    )
}



export async function getMessages(conversationId, userId) {
    const conversation = await conversationRepository.getConversationById(conversationId);
    if(!conversation){
        throw new AppError("Conversation not found", 404);
    }

    const participants = await conversationRepository.getConversationParticipants(conversationId);
    const isParticipant = participants.some(
        (participant) => participant.user_id === userId
    )

    if(!isParticipant){
        throw new AppError("You are not a participant in this conversation", 403)
    }

    return await conversationRepository.getMessages(conversationId);
}



export async function markMessageDelivered(messageId, userId) {
    const message = await conversationRepository.getMessageById(messageId);
    if(!message){
        throw new AppError("Message not found", 404);
    }
    const participants = await conversationRepository.getConversationParticipants(message.conversation_id);
    const isParticipant = participants.some(
        (participant) => participant.user_id === userId
    )
    if(!isParticipant){
        throw new AppError("You are not a participant in this conversation", 403)
    }
    return await conversationRepository.markMessageDelivered(messageId);
}


export async function markMessageSeen(messageId, userId) {
    const message = await conversationRepository.getMessageById(messageId);
    if(!message){
        throw new AppError("Message not found", 404);
    }
    const participants = await conversationRepository.getConversationParticipants(message.conversation_id);
    const isParticipant = participants.some(
        (participant) => participant.user_id === userId
    )
    if(!isParticipant){
        throw new AppError("You are not a participant in this conversation", 403)
    }
    return await conversationRepository.markMessageSeen(messageId)
}

