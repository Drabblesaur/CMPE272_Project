
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_TOKEN });

async function testcall() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant. tell them about themselves" }],
    model: "gpt-4o-mini",
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
}

export default testcall;