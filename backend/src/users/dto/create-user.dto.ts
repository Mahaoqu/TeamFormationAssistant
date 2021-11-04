/**
 * Data Transfer Object for creating users.
 * To encapsulate the data
 */
export class CreateUserDto {
  password: string;
  email: string;
  username: string;
}
