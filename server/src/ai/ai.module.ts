import { Module } from '@nestjs/common';

import { AIService } from './ai.service';
import { GroqService } from './groq.service';

@Module({
  providers: [
    AIService,
    GroqService,
  ],
  exports: [
    AIService,
  ],
})
export class AIModule {}