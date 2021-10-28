import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Temp use....
  async onModuleInit() {
    console.log(`Initialization 3 admin users ...`);
    const u1: User = {
      id: 1,
      name: 'admin',
      email: 'admin@ncsu.edu',
      password: await bcrypt.hash('123456', 8),
      role: UserRole.ADMIN,
    };
    const u2: User = {
      id: 2,
      name: 'manager',
      email: 'admin@ncsu.edu',
      password: await bcrypt.hash('123456', 8),
      role: UserRole.MANAGER,
    };
    const u3: User = {
      id: 3,
      name: 'yliang',
      email: 'admin@ncsu.edu',
      password: await bcrypt.hash('123456', 8),
      role: UserRole.USER,
    };

    await this.usersRepository.save(u1);
    await this.usersRepository.save(u2);
    await this.usersRepository.save(u3);
  }

  async createWithUniqueNameEmail(createUserDto: CreateUserDto) {
    const user = new User();
    const n = this.usersRepository.findAndCount({
      name: createUserDto.username,
    });
    const e = this.usersRepository.findAndCount({ email: createUserDto.email });

    if ((await n)[1] != 0)
      throw new HttpException('Username existed', HttpStatus.BAD_REQUEST);

    if ((await e)[1] != 0)
      throw new HttpException('Email existed!', HttpStatus.BAD_REQUEST);

    user.name = createUserDto.username;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 8);

    await this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    user.name = updateUserDto.username;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async login(name: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({ name: name });

    var passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new HttpException(
        'Username or password invalid',
        HttpStatus.FORBIDDEN,
      );
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
