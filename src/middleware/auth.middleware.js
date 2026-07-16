import AppError from "../errors/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export default function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new AppError("Authorization header missing", 401);
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if(!token){
        throw new AppError("Invalid authorization header", 401)
    }

    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
}