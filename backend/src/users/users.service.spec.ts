import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

const userArray = [
  {
    name: 'timm',
    email: 'timm@ncsu.edu',
  },
  {
    name: 'shudi shao',
    email: 'sshao@ncsu.edu',
  },
];

const oneUser = {
  name: 'shudi shao',
  email: 'sshao@ncsu.edu',
};

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create()', () => {
  //   it('should successfully insert a user', () => {
  //     const oneUser = {
  //       name: 'hello',
  //       email: 'hello@example.com',
  //       password: 'xxxxx'
  //     };

  //     expect(
  //       service.create({
  //         name: 'hello',
  //         email: 'hello@example.com',
  //         password: 'xxxxx'
  //       }),
  //     ).resolves.toEqual(oneUser);
  //   });
  // });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
  });

  // describe('findOne()', () => {
  //   it('should get a single user', () => {
  //     const repoSpy = jest.spyOn(repository, 'findOne');
  //     expect(service.findOne('1')).resolves.toEqual(oneUser);
  //     expect(repoSpy).toBeCalledWith('1');
  //   });
  // });

  // describe('remove()', () => {
  //   it('should call remove with the passed value', async () => {
  //     const removeSpy = jest.spyOn(repository, 'delete');
  //     const retVal = await service.remove('2');
  //     expect(removeSpy).toBeCalledWith('2');
  //     expect(retVal).toBeUndefined();
  //   });
  // });
});
