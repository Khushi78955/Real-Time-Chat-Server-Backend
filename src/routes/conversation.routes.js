import { Router } from "express";

import * as conversationController from "../controllers/conversation.controller.js";
import authMiddleware from "../middleware/auth.middleware.js"
import validate from "../middleware/validate.middleware.js"

import { createConversationSchema, sendMessageSchema } from "../validators/conversation.validator.js";

const router = Router();

router.use(authMiddleware);

router.post("/", validate(createConversationSchema), conversationController.createConversation);
router.get("/", conversationController.getMyConversations);
router.post("/:id/messages", validate(sendMessageSchema), conversationController.sendMessage)
router.get("/:id/messages", conversationController.getMessages)

export default router;