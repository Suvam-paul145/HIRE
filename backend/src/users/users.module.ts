import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { LlmService } from '../services/llm.service';
import { ResumeParserService } from '../services/resume-parser.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, LlmService, ResumeParserService],
  exports: [UsersService, ResumeParserService],
})
export class UsersModule { }
