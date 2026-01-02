import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service';

// Implimentation Details
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt too long'),
   conversationId: z.string().uuid(),
});

// Public interface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parsed = chatSchema.safeParse(req.body);
      if (!parsed.success) {
         return res.status(400).json(parsed.error.format());
      }

      try {
         const { prompt, conversationId } = parsed.data;
         const response = await chatService.sendMessage(prompt, conversationId);

         res.json({
            message: response.message,
         });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate a response.' });
      }
   },
};
