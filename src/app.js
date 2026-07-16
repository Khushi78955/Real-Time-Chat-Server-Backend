import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Real-Time Chat Server API"
    })
})

export default app;