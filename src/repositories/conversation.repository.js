import {query} from "../config/db.js"

export async function createConversation() {
    const result = await query(
        `
        INSERT INTO conversations
        DEFAULT VALUES
        RETURNING *;
        `
    )
    return result.rows[0];  
}

export async function addParticipant(conversationId, userId){
    await query(
        `
        INSERT INTO conversation_participants
        (conversation_id, user_id)
        VALUES ($1, $2);
        `,
        [conversationId, userId]
    )
}


export async function getConversationParticipants(conversationId){
    const result = await query(
        `
        SELECT user_id
        FROM conversation_participants
        WHERE conversation_id = $1;
        `,
        [conversationId]
    )
    return result.rows;
}


export async function getConversationById(conversationId){
    const result = await query(
        `
        SELECT *
        FROM conversations
        WHERE id = $1;
        `,
        [conversationId]
    )
    return result.rows[0];
}


export async function getUserConversations(userId){
    const result = await query(
        `
        SELECT c.id, c.created_at
        FROM conversations c
        JOIN conversation_participants cp
            ON c.id = cp.conversation_id
        WHERE cp.user_id = $1
        ORDER BY c.created_at DESC;
        `,
        [userId]
    )
    return result.rows;
}


export async function createMessage(conversationId, senderId, text){
    const result = await query(
        `
        INSERT INTO messages
        (conversation_id, sender_id, text)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [conversationId, senderId, text]
    );
    return result.rows[0];
}



export async function getMessages(conversationId) {
    const result = await query(
        `
        SELECT *
        FROM messages
        WHERE conversation_id = $1
        ORDER BY created_at ASC;
        `,
        [conversationId]
    );
    return result.rows;
}




export async function findConversationBetweenUsers(userOneId, userTwoId) {
    const result = await query(
        `
        SELECT cp1.conversation_id
        FROM conversation_participants cp1
        JOIN conversation_participants cp2
            ON cp1.conversation_id = cp2.conversation_id
        WHERE cp1.user_id = $1
          AND cp2.user_id = $2;
        `,
        [userOneId, userTwoId]
    );

    return result.rows[0];
}