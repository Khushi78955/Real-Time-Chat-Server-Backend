import jwt from "jsonwebtoken";
import env from "../config/env.js"

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export function generateAccessToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        env.JWT_ACCESS_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}


export function generateRefreshToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        env.JWT_REFRESH_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}

export function verifyAccessToken(token){
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
}


export function verifyRefreshToken(token) {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
}