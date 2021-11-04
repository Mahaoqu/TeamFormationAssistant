import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * Data Transfer Object for updating users.
 * To encapsulate the data
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  username: any;
  email: any;
  password: any;
}
