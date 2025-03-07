import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend proxy
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Initial system message to set the AI's behavior
const SYSTEM_MESSAGE: ChatMessage = {
  role: 'system',
  content: 'You are a friendly AI assistant named amanda. Keep responses very brief, 1-2 sentences maximum. If you are asked to learn more about plants, say sure thing, ill take you to the plant story explorer.'
};

// List of models to try in order of preference
const MODELS = [
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-0125',
  'gpt-3.5-turbo-0301',
  'gpt-4o',
];

export async function getChatResponse(userMessage: string, previousMessages: ChatMessage[] = []) {
  let lastError = null;

  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}`);
      console.log('Sending message to OpenAI:', userMessage);
      console.log('API Key available:', !!import.meta.env.VITE_OPENAI_API_KEY);
      
      const messages = [
        SYSTEM_MESSAGE,
        ...previousMessages,
        { role: 'user', content: userMessage } as ChatMessage
      ];

      console.log('Full messages array:', messages);

      const completion = await openai.chat.completions.create({
        messages,
        model: model,
        temperature: 0.7,
        max_tokens: 60, // Reduced for cost efficiency
        presence_penalty: 0,
        frequency_penalty: 0,
      });

      console.log('OpenAI response:', completion.choices[0].message);
      return completion.choices[0].message.content;
    } catch (error: any) {
      console.error(`Error with model ${model}:`, error.message);
      lastError = error;
      
      // If it's not a quota error, don't try other models
      if (error.message.includes('429')) {
        continue;
      }
      break;
    }
  }

  // If we get here, all models failed
  console.error('All models failed. Last error:', {
    error: lastError?.message,
    type: lastError?.type,
    stack: lastError?.stack
  });
  throw new Error(`OpenAI API error: ${lastError?.message}`);
}
