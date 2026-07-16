const onlineUsers = new Map();

export function addUser(userId, socketId){
    onlineUsers.set(userId, socketId)
}

export function removeUser(userId){
    onlineUsers.delete(userId);
}

export function getUserSocket(userId){
    return onlineUsers.get(userId);
}

export function getOnlineUsers(){
    return onlineUsers;
}
