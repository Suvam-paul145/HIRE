import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobListing } from './entities/job-listing.entity';
import { User } from '../users/entities/user.entity';
import { LlmService } from '../services/llm.service';
import { MatchingService } from '../services/matching.service';
import { ApplicationsModule } from '../applications/applications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobListing, User]),
    forwardRef(() => ApplicationsModule),
  ],
  controllers: [JobsController],
  providers: [JobsService, LlmService, MatchingService],
  exports: [JobsService],
})
export class JobsModule { }



