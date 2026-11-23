import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';

import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { VoiceAnswerDto } from './dto/voice-answer.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('interview')
export class InterviewController {
  constructor(
    private readonly interviewService: InterviewService,
  ) {}

  @Post('create')
  async create(
    @Body() dto: CreateInterviewDto,
    @Req() req: any,
  ) {
    const userId =
      req.user?.id ??
      'demo-user';

    return this.interviewService.create(
      dto,
      userId,
    );
  }

  @Post(':id/answer')
  async submitAnswer(
    @Param('id') id: string,
    @Body('answer') answer: string,
  ) {
    return this.interviewService.submitAnswer(
      id,
      answer,
      
      

    );
    
  }


  


@Post(':id/voice')
async submitVoiceAnswer(
  @Param('id') id: string,
  @Body() dto: VoiceAnswerDto,
) {
  return this.interviewService.submitAnswer(
    id,
    dto.transcript,
  );
}

@Get(":id/report")
async report(
    @Param("id") id:string,
){
    return this.interviewService.getReport(id);
}


  @Post(':id/finish')
  async finish(
    @Param('id') id: string,
  ) {
    return this.interviewService.finishInterview(
      id,
    );
  }


  @UseGuards(JwtAuthGuard)
@Get('history/all')
async history(@Req() req: any) {
  return this.interviewService.getHistory(req.user.id);
}

  @Get(':id')
  async getInterview(
    @Param('id') id: string,
  ) {
    return this.interviewService.getInterview(
      id,
    );
  }

  @Get(':id/progress')
  async progress(
    @Param('id') id: string,
  ) {
    return this.interviewService.getProgress(
      id,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ) {
    return this.interviewService.deleteInterview(
      id,
    );
  }

  @Post(":id/coach")
askCoach(
    @Param("id") id: string,

    @Body("question")
    question: string,
) {

    return this.interviewService.askCoach(
        id,
        question,
    );

}



@Post(":id/violation")
addViolation(
  @Param("id") id: string,
  @Body("reason") reason: string,
) {
  return this.interviewService.addViolation(
    id,
    reason,
  );
}

  
}