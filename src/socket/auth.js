import { verifyAccessToken } from "../utils/jwt.js";

export default function socketAuth(socket, next){
    try{
        const token = socket.handshake.auth.token;
        if(!token){
            return next(new Error("Authentication required"));
        }
        const payload = verifyAccessToken(token);
        socket.user = payload;
        next();
    } catch(err){
        next(new Error("Invalid token"))
    }

} 