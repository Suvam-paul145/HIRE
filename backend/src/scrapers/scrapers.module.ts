import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapersController } from './scrapers.controller';
import { ScrapersService } from './scrapers.service';
import { InternshalaScraperV2 } from './internshala-v2.scraper';
import { LinkedInScraper } from './linkedin.scraper';
import { JobsModule } from '../jobs/jobs.module';
import { JobListing } from '../jobs/entities/job-listing.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobListing, User]),
    JobsModule,
  ],
  controllers: [ScrapersController],
  providers: [ScrapersService, InternshalaScraperV2, LinkedInScraper],
  exports: [ScrapersService],
})
export class ScrapersModule { }
