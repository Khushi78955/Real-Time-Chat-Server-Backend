console.log("Auth routes loaded");
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        message: "Real-Time Chat Server API"
    })
})

app.use("/auth", authRoutes);
app.use(errorHandler);


export default app;