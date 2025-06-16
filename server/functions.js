import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "Enter your API key here",
});

export const completion = async (prompt) => {
  try {
    const result = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {"role": "user", "content": prompt},
      ],
    });
    
    return result.choices[0].message;
  } catch (error) {
    console.error('Error in OpenAI completion:', error);
    throw error;
  }
} 