import dotenv from "dotenv";
import {z} from "zod";

dotenv.config();


const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    JWT_SECRET: z.string().min(10)
})

const env = envSchema.parse(process.env);

export default env;