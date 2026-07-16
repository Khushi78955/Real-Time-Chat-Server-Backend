import { z } from "zod";

export const createConversationSchema = z.object({
    participantId: z
        .number()
        .int()
        .positive("Participant ID must be a positive integer"),
});

export const sendMessageSchema = z.object({
    text: z
        .string()
        .trim()
        .min(1, "Message cannot be empty")
        .max(1000, "Message is too long"),
});