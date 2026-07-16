import pg from "pg";
import env from "./env.js";
import logger from "./logger.js";

const {Pool} = pg;

const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
});

export async function connectDB() {
    const client = await pool.connect();
    logger.info("PostgresSQL connected");
    client.release();

}

export async function query(text, params = []) {
    return pool.query(text, params);
}

export async function disconnectDB() {
    await pool.end();
    logger.info("PostgresSQL disconnected")
    
}