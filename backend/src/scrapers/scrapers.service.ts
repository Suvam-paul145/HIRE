import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { InternshalaScraperV2 } from './internshala-v2.scraper';
import { LinkedInScraper } from './linkedin.scraper';
import { JobsService } from '../jobs/jobs.service';
import { JobListing } from '../jobs/entities/job-listing.entity';
import { User } from '../users/entities/user.entity';

export interface ScrapeResult {
  internshala: number;
  linkedin: number;
  removed: number;
  duration: number;
}

@Injectable()
export class ScrapersService {
  private readonly logger = new Logger(ScrapersService.name);

  constructor(
    private internshalaScraperV2: InternshalaScraperV2,
    private linkedInScraper: LinkedInScraper,
    private jobsService: JobsService,
    @InjectRepository(JobListing)
    private jobRepository: Repository<JobListing>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  /**
   * Full scrape: clears old jobs and scrapes fresh based on user skills
   */
  async scrapeForUser(userId: string, options: {
    maxJobs?: number;
    clearOld?: boolean;
  } = {}): Promise<ScrapeResult> {
    const startTime = Date.now();
    const maxJobs = options.maxJobs || 300;

    this.logger.log(`🚀 Starting personalized scrape for user ${userId}`);

    // Get user's skills
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const userSkills = user?.skills || [];

    this.logger.log(`📋 User skills: ${userSkills.join(', ') || 'None specified'}`);

    // Optionally clear old jobs
    let removedCount = 0;
    if (options.clearOld) {
      removedCount = await this.clearOldJobs();
    }

    // Scrape Internshala with user skills
    const internshalaJobs = await this.internshalaScraperV2.scrapeForUser(userSkills, maxJobs);
    let internshalaCount = 0;

    this.logger.log(`📥 Processing ${internshalaJobs.length} Internshala jobs...`);

    for (const job of internshalaJobs) {
      try {
        await this.jobsService.saveScrapedJob('internshala', job);
        internshalaCount++;

        // Progress log every 20 jobs
        if (internshalaCount % 20 === 0) {
          this.logger.log(`  ✓ Saved ${internshalaCount}/${internshalaJobs.length} jobs`);
        }

        // Rate limiting to avoid LLM API limits
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.logger.error(`Error saving job: ${error.message}`);
      }
    }

    const duration = Math.round((Date.now() - startTime) / 1000);

    this.logger.log(`✅ Scraping complete in ${duration}s: ${internshalaCount} jobs saved, ${removedCount} old jobs removed`);

    return {
      internshala: internshalaCount,
      linkedin: 0, // LinkedIn not scraped in personalized mode
      removed: removedCount,
      duration,
    };
  }

  /**
   * Default scrape all platforms
   */
  async scrapeAllJobs(): Promise<ScrapeResult> {
    const startTime = Date.now();

    this.logger.log('🚀 Starting job scraping for all platforms...');

    // Clear jobs older than 7 days
    const removedCount = await this.clearStaleJobs(7);

    // Scrape Internshala
    const internshalaJobs = await this.internshalaScraperV2.scrapeJobs(200);
    let internshalaCount = 0;

    for (const job of internshalaJobs) {
      try {
        await this.jobsService.saveScrapedJob('internshala', job);
        internshalaCount++;
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.logger.error(`Error saving Internshala job: ${error.message}`);
      }
    }

    // Scrape LinkedIn
    const linkedinJobs = await this.linkedInScraper.scrapeJobs(50);
    let linkedinCount = 0;

    for (const job of linkedinJobs) {
      try {
        await this.jobsService.saveScrapedJob('linkedin', job);
        linkedinCount++;
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.logger.error(`Error saving LinkedIn job: ${error.message}`);
      }
    }

    const duration = Math.round((Date.now() - startTime) / 1000);

    this.logger.log(`✅ Scraping complete in ${duration}s: ${internshalaCount} Internshala, ${linkedinCount} LinkedIn, ${removedCount} removed`);

    return {
      internshala: internshalaCount,
      linkedin: linkedinCount,
      removed: removedCount,
      duration,
    };
  }

  /**
   * Clear all old jobs (complete refresh)
   */
  async clearOldJobs(): Promise<number> {
    this.logger.log('🗑️ Clearing all old Internshala jobs...');

    const result = await this.jobRepository.delete({
      platform: 'internshala' as any,
    });

    const count = result.affected || 0;
    this.logger.log(`  Removed ${count} old Internshala jobs`);
    return count;
  }

  /**
   * Clear jobs older than N days
   */
  async clearStaleJobs(days: number = 7): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    this.logger.log(`🗑️ Clearing jobs older than ${days} days (before ${cutoffDate.toISOString()})...`);

    const result = await this.jobRepository.delete({
      createdAt: LessThan(cutoffDate),
    });

    const count = result.affected || 0;
    this.logger.log(`  Removed ${count} stale jobs`);
    return count;
  }

  /**
   * Get statistics about current job listings
   */
  async getStats(): Promise<{
    total: number;
    internshala: number;
    linkedin: number;
    recentlyUpdated: number;
  }> {
    const total = await this.jobRepository.count();
    const internshala = await this.jobRepository.count({ where: { platform: 'internshala' } });
    const linkedin = await this.jobRepository.count({ where: { platform: 'linkedin' } });

    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const recentlyUpdated = await this.jobRepository
      .createQueryBuilder('job')
      .where('job.updatedAt > :date', { date: oneDayAgo })
      .getCount();

    return { total, internshala, linkedin, recentlyUpdated };
  }
}
