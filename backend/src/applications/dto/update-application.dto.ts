import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';

/**
 * Data Transfer Object for updating application.
 * To encapsulate the data
 */
export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}
