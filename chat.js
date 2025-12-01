import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function getAiResponse(message) {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-4.1-nano"
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, having issues right now!";
  }
}
