import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot() {
    return {
      success: true,
      statusCode: 200,
      message: 'Welcome to InterviewAI Backend API',
      application: 'InterviewAI',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      documentation: '/docs',
      health: '/api/v1/health',
    };
  }

  getHealth() {
    return {
      success: true,
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memory: {
        rss: process.memoryUsage().rss,
        heapTotal: process.memoryUsage().heapTotal,
        heapUsed: process.memoryUsage().heapUsed,
        external: process.memoryUsage().external,
      },
      node: process.version,
      platform: process.platform,
    };
  }
}