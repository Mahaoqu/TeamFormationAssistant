import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';

/**
 * Data Transfer Object for updating teams.
 * To encapsulate the data
 */

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
