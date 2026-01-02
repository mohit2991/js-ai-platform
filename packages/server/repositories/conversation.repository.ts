type Message = {
   role: 'system' | 'user' | 'assistant';
   content: string;
};

/* -------------------- In-memory store -------------------- */
/**
 * conversationId -> messages[]
 * (Later you can replace this with Redis / DB)
 */
const conversations = new Map<string, Message[]>();

export function conversationRepository(conversationId: string, prompt: string) {
   if (!conversations.has(conversationId)) {
      conversations.set(conversationId, [
         {
            role: 'system',
            content: 'You are a helpful assistant.',
         },
      ]);
   }

   const messages = conversations.get(conversationId)!;
   messages.push({ role: 'user', content: prompt });

   return messages;
}
