import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
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