import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';

/**
 * Data Transfer Object for updating jobs.
 * To encapsulate the data
 */
export class UpdateJobDto extends PartialType(CreateJobDto) {
  name: any;
  projectId: any;
  phone: any;
  role: any;
  description: any;
  address: any;
}
