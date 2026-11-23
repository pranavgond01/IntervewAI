import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('Application')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Root API Endpoint',
    description: 'Returns basic information about the InterviewAI Backend.',
  })
  @ApiResponse({
    status: 200,
    description: 'API is running successfully.',
  })
  getRoot() {
    return this.appService.getRoot();
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Checks whether the backend server is healthy.',
  })
  @ApiResponse({
    status: 200,
    description: 'Server is healthy.',
  })
  getHealth() {
    return this.appService.getHealth();
  }
}