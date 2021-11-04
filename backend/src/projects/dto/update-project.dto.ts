import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

/**
 * Data Transfer Object for updating projects.
 * To encapsulate the data
 */
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  name: any;
  budget: any;
  endDate: any;
  priority: any;
  isAssignmentComplete: any;
  teamSize: any;
  tools: any;
}
