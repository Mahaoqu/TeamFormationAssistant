import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  project_id: any;
  project_budget: any;
  project_name: any;
  project_end_date: any;
  project_is_assignment_complete: any;
  project_priority: any;
  project_team_size: any;
  project_tool: any;
}
