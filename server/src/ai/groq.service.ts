import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class GroqService {
  private readonly groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  async generate(prompt: string): Promise<string> {
    const primaryModel = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
    const fallbackModel = 'qwen/qwen3.8-27b';

    console.log(`Sending request to Groq (${primaryModel})...`);

    try {
      const completion = await this.groq.chat.completions.create({
        model: primaryModel,
        temperature: 0.4,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      console.log(`Groq replied successfully using ${primaryModel}.`);
      return completion.choices[0].message.content ?? '';
    } catch (error: any) {
      console.warn(
        `Groq request failed with ${primaryModel} (${error?.message || error}), attempting fallback to ${fallbackModel}...`,
      );

      const completion = await this.groq.chat.completions.create({
        model: fallbackModel,
        temperature: 0.4,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      console.log(`Groq replied successfully using fallback ${fallbackModel}.`);
      return completion.choices[0].message.content ?? '';
    }
  }
}