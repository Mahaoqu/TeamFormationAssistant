/**
 * Data Transfer Object for creating members.
 * To encapsulate the data
 */
export class CreateMemberDto {
  name: string;
  enddate: Date;
  teamsize: number;
  budget: number;
  tools: string;
  priority: string;
}
