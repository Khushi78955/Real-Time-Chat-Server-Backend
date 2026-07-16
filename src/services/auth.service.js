import AppError from "../errors/AppError.js";

import * as authRepository from "../repositories/auth.repository.js"

import { hashPassword, comparePassword, hashRefreshToken, compareRefreshToken } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

const REFRESH_TOKEN_EXPIRY_DAYS = 7;

export async function register({email, password, displayName}) {
    const existingUser = await authRepository.findUserByEmail(email);
    if(existingUser){
        throw new AppError("Email already exists", 409);
    }

    const passwordHash = await hashPassword(password);
    const user = await authRepository.createUser(
        email, 
        passwordHash,
        displayName
    )
    return user;
}



export async function login({email, password}) {
    const user = await authRepository.findUserByEmail(email);
    if(!user){
        throw new AppError("Invalid email or password", 401);
    }
    
    const isPasswordCorrect = await comparePassword(password, user.password_hash);
    if(!isPasswordCorrect){
        throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const tokenHash = await hashRefreshToken(refreshToken);
    const expiresAt = new Date();

    expiresAt.setDate(
        expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS
    )

    await authRepository.saveRefreshToken(user.id, tokenHash, expiresAt);

    return {
        user: {
            id: user.id,
            email: user.email,
            displayName: user.display_name
        },
        accessToken,
        refreshToken
    }
}



export async function refresh(refreshToken) {
    if(!refreshToken){
        throw new AppError("Refresh token missing", 401);
    }
    const payload = verifyRefreshToken(refreshToken);

    const user = await authRepository.findUserById(payload.id);
    if(!user){
        throw new AppError("User not found", 404);
    }

    const refreshTokens = await authRepository.getRefreshTokensByUserId(user.id);
    
    let currentToken = null;
    for(const token of refreshTokens){
        const matched = await compareRefreshToken(refreshToken, token.token_hash);
        if(matched){
            currentToken = token;
            break;
        }
    }

    if(!currentToken){
        throw new AppError("Invalid refresh token", 401);
    }

    await authRepository.revokeRefreshToken(currentToken.id);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    const newTokenHash = await hashRefreshToken(newRefreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(
        expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS
    )

    await authRepository.saveRefreshToken(
        user.id,
        newTokenHash,
        expiresAt
    )
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
}



export async function logout(refreshToken) {
    if(!refreshToken){
        return;
    }
    const payload = verifyRefreshToken(refreshToken);
    const refreshTokens = await authRepository.getRefreshTokensByUserId(payload.id);

    for(const token of refreshTokens){
        const matched = await compareRefreshToken(refreshToken, token.token_hash);
        if(matched){
            await authRepository.revokeRefreshToken(token.id);
            break;
        }
    }
    
}



export async function getCurrentUser(userId) {
    const user = await authRepository.findUserById(userId);
    if(!user){
        throw new AppError("User not found", 404);
    }
    return user;
}