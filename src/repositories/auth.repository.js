import {query} from "../config/db.js"

export async function createUser(email, passwordHash, displayName){
    const result = await query(
        `
        INSERT INTO users 
        (email, password_hash, display_name)
        VALUES ($1, $2, $3)
        RETURNING id, email, display_name, created_at;
        `, 
        [email, passwordHash, displayName]
    )
    return result.rows[0];
}


export async function findUserByEmail(email){
    const result = await query(
        `
        SELECT *
        FROM users
        WHERE email = $1;
        `,
        [email]
    )
    return result.rows[0];
}


export async function findUserById(id) {
    const result = await query(
        `
        SELECT id, email, display_name, created_at
        FROM users
        WHERE id = $1;
        `,
        [id]
    )
    return result.rows[0];
}


export async function saveRefreshToken(userId, tokenHash, expiresAt) {
    const result = await query(
        `
        INSERT INTO refresh_tokens
        (user_id, token_hash, expires_at)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [userId, tokenHash, expiresAt]
    )
    return result.rows[0];  
}


export async function getRefreshTokensByUserId(userId) {
    const result = await query(
        `
        SELECT *
        FROM refresh_tokens
        WHERE user_id = $1
            AND revoked_at IS NULL;
        `,
        [userId]
    )
    return result.rows;
}


export async function revokeRefreshToken(id) {
    await query(
        `
        UPDATE refresh_tokens
        SET revoked_at = CURRENT_TIMESTAMP
        WHERE id = $1;
        `,
        [id]
    )
}


export async function revokeAllRefreshTokens(userId) {
    await query(
        `
        UPDATE refresh_tokens
        SET revoked_at = CURRENT_TIMESTAMP
        WHERE user_id = $1;
        `,
        [userId]
    )
}