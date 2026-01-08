import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JobListing } from '../jobs/entities/job-listing.entity';
import { Application } from '../applications/entities/application.entity';
import { ApplicationLog } from '../applications/entities/application-log.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hire_db',
      entities: [User, JobListing, Application, ApplicationLog],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
      extra: {
        max: 20,
      },
    };
  }
}



