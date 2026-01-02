import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

// implementation details
const client = new OpenAI({
   apiKey: 'not-needed',
   baseURL: 'http://localhost:12434/engines/llama.cpp/v1',
});

type ChatResponse = {
   id: string;
   message: string | null | undefined;
};

// Public interface
// Leaky abstraction
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const messages = conversationRepository(conversationId, prompt);

      const response = await client.chat.completions.create({
         model: 'ai/gemma3-qat',
         messages,
         temperature: 0.3,
         max_tokens: 200,
      });

      return {
         id: response.id,
         message: response.choices[0]?.message.content,
      };
   },
};
