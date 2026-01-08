import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LlmService } from '../services/llm.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private llmService: LlmService,
  ) { }

  async createUser(data: {
    fullname: string;
    email: string;
    masterResumeText: string;
    skills: string[];
    phone?: string;
  }): Promise<User> {
    // Check if user with this email already exists
    let user = await this.userRepository.findOne({ where: { email: data.email } });

    if (user) {
      // Update existing user
      this.logger.log(`User with email ${data.email} already exists, updating...`);
      user.fullname = data.fullname;
      user.masterResumeText = data.masterResumeText;
      user.skills = data.skills;
      if (data.phone) user.phone = data.phone;
    } else {
      // Create new user
      user = this.userRepository.create({
        fullname: data.fullname,
        email: data.email,
        masterResumeText: data.masterResumeText,
        skills: data.skills,
        phone: data.phone,
      });
    }

    await this.userRepository.save(user);

    // Generate profile vector (non-blocking - continue even if it fails)
    this.generateProfileVectorAsync(user);

    this.logger.log(`User ready: ${user.email} (id: ${user.id})`);
    return user;
  }

  /**
   * Update user's resume and skills
   */
  async updateResume(userId: string, data: {
    masterResumeText: string;
    skills?: string[];
    resumeFileUrl?: string;
    phone?: string;
  }): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }

    user.masterResumeText = data.masterResumeText;

    if (data.skills) {
      user.skills = data.skills;
    }

    if (data.resumeFileUrl) {
      user.resumeFileUrl = data.resumeFileUrl;
    }

    if (data.phone) {
      user.phone = data.phone;
    }

    // Clear old vector so it gets regenerated
    user.profileVector = null as any;

    await this.userRepository.save(user);

    // Regenerate profile vector
    this.generateProfileVectorAsync(user);

    this.logger.log(`Resume updated for user: ${user.email}`);
    return user;
  }

  /**
   * Update user skills
   */
  async updateSkills(userId: string, skills: string[]): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }

    user.skills = skills;
    await this.userRepository.save(user);

    // Regenerate profile vector
    this.generateProfileVectorAsync(user);

    return user;
  }

  /**
   * Generate profile vector asynchronously (non-blocking)
   */
  private async generateProfileVectorAsync(user: User): Promise<void> {
    try {
      const profileText = `${user.masterResumeText || ''}\n\nSkills: ${(user.skills || []).join(', ')}`;
      user.profileVector = await this.llmService.generateEmbedding(profileText);
      await this.userRepository.save(user);
      this.logger.log(`Profile vector generated for user: ${user.email}`);
    } catch (error) {
      this.logger.warn(`Failed to generate profile vector for ${user.email}: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
