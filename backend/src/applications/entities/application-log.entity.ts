import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Application } from './application.entity';

export type ApplicationEvent =
  | 'created'
  | 'resume_tailored'
  | 'skyvern_started'
  | 'skyvern_paused'
  | 'screenshot_captured'
  | 'approval_requested'
  | 'approved'
  | 'rejected'
  | 'skyvern_resumed'
  | 'submitted'
  | 'failed'
  | 'retry_attempted'
  | 'captcha_detected'
  | 'credentials_required';

@Entity('application_logs')
export class ApplicationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'applicationid' })
  applicationId: string;

  @Column({ type: 'text' })
  event: ApplicationEvent;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  message: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Application)
  @JoinColumn({ name: 'applicationid' })
  application: Application;
}
