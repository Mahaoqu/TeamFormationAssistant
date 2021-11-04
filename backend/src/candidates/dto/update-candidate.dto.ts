import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateDto } from './create-candidate.dto';
/**
 * Data Transfer Object for updating canidates.
 * To encapsulate the data
 */
export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {}
