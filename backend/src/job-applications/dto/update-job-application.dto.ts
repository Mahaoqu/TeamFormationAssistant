import { PartialType } from '@nestjs/mapped-types';
import { CreateJobApplicationDto } from './create-job-application.dto';

/**
 * Data Transfer Object for updating job appilcation.
 * To encapsulate the data
 */
export class UpdateJobApplicationDto extends PartialType(
  CreateJobApplicationDto,
) {}
