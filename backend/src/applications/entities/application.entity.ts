import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { JobListing } from '../../jobs/entities/job-listing.entity';

export type ApplicationStatus = 'Drafting' | 'NeedsApproval' | 'Submitted' | 'Failed';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'userid' })
  userId: string;

  @Column({ type: 'uuid', name: 'jobid' })
  jobId: string;

  @Column({ type: 'text' })
  status: ApplicationStatus;

  @Column({ type: 'text', nullable: true, name: 'tailoredresume' })
  tailoredResume: string;

  @Column({ type: 'text', nullable: true, name: 'tailoredresumeurl' })
  tailoredResumeUrl: string;

  @Column({ type: 'text', nullable: true, name: 'previewscreenshoturl' })
  previewScreenshotUrl: string;

  @Column({ type: 'text', nullable: true, name: 'failurereason' })
  failureReason: string;

  @Column({ type: 'int', default: 0, name: 'retrycount' })
  retryCount: number;

  @CreateDateColumn({ name: 'createdat' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedat' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'approvedat' })
  approvedAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'submittedat' })
  submittedAt: Date;

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'userid' })
  user: User;

  @ManyToOne(() => JobListing, (job) => job.applications)
  @JoinColumn({ name: 'jobid' })
  job: JobListing;
}



