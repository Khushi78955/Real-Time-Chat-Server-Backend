import app from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import { connectDB, disconnectDB } from "./config/db.js";

async function startServer() {
    await connectDB();
    const server = app.listen(env.PORT, () => {
        logger.info(`Server running on port ${env.PORT}`);
    })

    const shutdown = async () => {
        logger.info("Shutting Down Server...")
        server.close(async () => {
            await disconnectDB();
            process.exit(0);
        });
    }

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
}


startServer();