import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';


import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 5000);
  const clientUrl = configService.get<string>(
    'CLIENT_URL',
    'http://localhost:3000',
  );

  app.use(helmet());

  app.use(compression());

  app.use(cookieParser());

  app.enableCors({
    origin: clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);

app.useGlobalInterceptors(
  new ResponseInterceptor(),
);

app.useGlobalFilters(
  new HttpExceptionFilter(),
);
    

  const swaggerConfig = new DocumentBuilder()
    .setTitle('InterviewAI API')
    .setDescription(
      'AI Powered Mock Interview Platform Backend API',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);

  console.log(
    `🚀 InterviewAI Server running on http://localhost:${port}`,
  );
  console.log(
    `📚 Swagger Docs: http://localhost:${port}/docs`,
  );
}

bootstrap();