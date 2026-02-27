import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true }),
    );

    // CORS: read allowed origins from environment variable
    const corsOrigin = process.env.CORS_ORIGIN;
    let allowedOrigins: string | string[] = '*';

    if (corsOrigin) {
      const origins = corsOrigin.split(',').map((o) => o.trim()).filter(Boolean);
      const validOrigins = origins.filter((o) => {
        try {
          new URL(o);
          return true;
        } catch {
          logger.warn(`Invalid CORS origin ignored: ${o}`);
          return false;
        }
      });
      allowedOrigins = validOrigins.length > 0 ? validOrigins : '*';
    }

    if (allowedOrigins === '*' && process.env.NODE_ENV === 'production') {
      logger.warn(
        'CORS is configured with wildcard (*) in production. Set CORS_ORIGIN for secure configuration.',
      );
    }

    app.enableCors({
      origin: allowedOrigins,
      methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    // Create directories if they don't exist
    const directories = ['resumes', 'screenshots', 'uploads/resumes'];
    for (const dir of directories) {
      const dirPath = join(process.cwd(), dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    }

    const port = process.env.BACKEND_PORT || 3000;
    await app.listen(port, '0.0.0.0');

    logger.log('='.repeat(60));
    logger.log('🚀 JOB APPLICATION ENGINE STARTED');
    logger.log('='.repeat(60));
    logger.log(`Server: http://localhost:${port}`);
    logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.log(`CORS Origins: ${Array.isArray(allowedOrigins) ? allowedOrigins.join(', ') : allowedOrigins}`);
    logger.log('='.repeat(60));
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
