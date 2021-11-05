/**
 * Data Transfer Object for creating projects.
 * To encapsulate the data
 */
export class CreateProjectDto {
  name: string;
  budget: number;
  endDate: Date;
  priority: number;
  isAssignmentComplete: boolean;
  teamSize: number;
  tools: string;
  requirements: CreateProjectRequirementsDto[];
}

export class CreateProjectRequirementsDto {
  skillWeight: number;
  experienceWeight: number;
  hoursWeight: number;
  languageWeight: number;
  budgetWeight: number;
}
