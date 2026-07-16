import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash)
}


export async function hashRefreshToken(token) {
    return bcrypt.hash(token, SALT_ROUNDS)
}

export async function compareRefreshToken(token, hash) {
    return bcrypt.compare(token, hash)
}

