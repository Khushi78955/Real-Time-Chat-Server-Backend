import * as conversationService from "../services/conversation.service.js";

export async function createConversation(req, res) {
    const conversation = await conversationService.createConversation(req.user.id, req.body.participantId);
    res.status(201).json({
        success: true,
        message: "Conversation created successfully",
        data: conversation
    }) 
}


export async function getMyConversations(req, res) {
    const conversations = await conversationService.getMyConversations(req.user.id);
    res.status(200).json({
        success: true,
        data: conversations
    }) 
}


export async function sendMessage(req, res) {
    const message = await conversationService.sendMessage(Number(req.params.id), req.user.id, req.body.text);
    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: message
    }) 
}



export async function getMessages(req, res) {
    const messages = await conversationService.getMessages(Number(req.params.id), req.user.id);
    res.status(200).json({
        success: true,
        data: messages
    }) 
}

