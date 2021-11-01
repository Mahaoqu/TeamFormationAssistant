import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  name: any;
  budget: any;
  endDate: any;
  priority: any;
  isAssignmentComplete: any;
  teamSize: any;
  tools: any;
}
