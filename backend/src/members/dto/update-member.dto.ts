import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
/**
 * Data Transfer Object for updating members.
 * To encapsulate the data
 */
export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
