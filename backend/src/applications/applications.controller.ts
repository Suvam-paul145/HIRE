import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { IsUUID, IsOptional, IsString } from 'class-validator';

class SwipeRightDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  jobId: string;
}

class ApproveApplicationDto {
  @IsUUID()
  userId: string;
}

class RejectApplicationDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  reason?: string;
}

class RetryApplicationDto {
  @IsOptional()
  credentials?: { email?: string; password?: string };
}

@Controller('api/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  /**
   * Create a new application (swipe right on job)
   */
  @Post()
  async create(@Body() dto: SwipeRightDto) {
    const application = await this.applicationsService.createApplication(
      dto.userId,
      dto.jobId,
    );

    return {
      id: application.id,
      status: application.status,
      previewScreenshotUrl: application.previewScreenshotUrl,
      message: 'Application created successfully - processing in background',
    };
  }

  /**
   * Legacy endpoint for backward compatibility
   */
  @Post('/swipe-right')
  async swipeRight(@Body() swipeRightDto: SwipeRightDto) {
    return this.create(swipeRightDto);
  }

  /**
   * Get single application by ID
   */
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const application = await this.applicationsService.findOne(id);

    return {
      id: application.id,
      status: application.status,
      previewScreenshotUrl: application.previewScreenshotUrl,
      tailoredResumeUrl: application.tailoredResumeUrl,
      failureReason: application.failureReason,
      retryCount: application.retryCount,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      approvedAt: application.approvedAt,
      submittedAt: application.submittedAt,
      job: {
        id: application.job.id,
        title: application.job.title,
        company: application.job.company,
        platform: application.job.platform,
        url: application.job.url,
        location: application.job.location,
      },
      user: {
        id: application.user.id,
        fullname: application.user.fullname,
        email: application.user.email,
      },
    };
  }

  /**
   * Get all applications for a user (paginated)
   */
  @Get()
  async getAll(
    @Query('userId') userId?: string,
    @Query('status') status?: string,
    @Query('limit') limitStr?: string,
    @Query('offset') offsetStr?: string,
  ) {
    const limit = Math.min(Math.max(parseInt(limitStr ?? '20', 10) || 20, 1), 100);
    const offset = Math.max(parseInt(offsetStr ?? '0', 10) || 0, 0);

    if (status && userId) {
      return this.applicationsService.findByStatus(status as any, userId, limit, offset);
    } else if (status) {
      return this.applicationsService.findByStatus(status as any, undefined, limit, offset);
    } else if (userId) {
      return this.applicationsService.findByUser(userId, limit, offset);
    }

    // Return empty paginated response if no filters
    return { data: [], total: 0, limit, offset };
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const parsedLimit = Math.max(1, parseInt(limit ?? '20', 10) || 20);
    const parsedOffset = Math.max(0, parseInt(offset ?? '0', 10) || 0);

    if (status && userId) {
      return this.applicationsService.findByStatus(status as any, userId, parsedLimit, parsedOffset);
    } else if (status) {
      return this.applicationsService.findByStatus(status as any, undefined, parsedLimit, parsedOffset);
    } else if (userId) {
      return this.applicationsService.findByUser(userId, parsedLimit, parsedOffset);
    }

    // Return empty result if no filters
    return { data: [], total: 0, limit: parsedLimit, offset: parsedOffset };
  }

  /**
   * Approve an application (resume Skyvern task and submit)
   */
  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  async approve(@Param('id') id: string, @Body() dto: ApproveApplicationDto) {
    const application = await this.applicationsService.approveApplication(
      id,
      dto.userId,
    );

    return {
      id: application.id,
      status: application.status,
      message: 'Application approved - submitting in background',
    };
  }

  /**
   * Reject an application
   */
  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  async reject(@Param('id') id: string, @Body() dto: RejectApplicationDto) {
    const application = await this.applicationsService.rejectApplication(
      id,
      dto.userId,
      dto.reason,
    );

    return {
      id: application.id,
      status: application.status,
      message: 'Application rejected',
    };
  }

  /**
   * Retry a failed application
   */
  @Post(':id/retry')
  @HttpCode(HttpStatus.OK)
  async retry(@Param('id') id: string, @Body() dto: RetryApplicationDto) {
    const application = await this.applicationsService.retryApplication(id, dto.credentials);

    return {
      id: application.id,
      status: application.status,
      retryCount: application.retryCount,
      message: `Retry attempt ${application.retryCount} initiated`,
    };
  }

  /**
   * Get application logs (audit trail)
   */
  @Get(':id/logs')
  async getLogs(@Param('id') id: string) {
    const logs = await this.applicationsService.getApplicationLogs(id);

    return {
      applicationId: id,
      logs: logs.map((log) => ({
        id: log.id,
        event: log.event,
        message: log.message,
        metadata: log.metadata,
        timestamp: log.timestamp,
      })),
    };
  }
}



