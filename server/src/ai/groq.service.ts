import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class GroqService {
  private readonly groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  async generate(prompt: string): Promise<string> {
    console.log("Sending request to Groq...");

    const completion =
      await this.groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.4,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    console.log("Groq replied.");

    return completion.choices[0].message.content ?? "";
  }
}