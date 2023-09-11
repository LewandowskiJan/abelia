import { Test, TestingModule } from '@nestjs/testing';
import { MongoDataTestModule } from 'src/frameworks/mongo/test/mongo-data-test.module';

import { UserFactoryService } from './user-factory.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoDataTestModule],
      providers: [UsersService, UserFactoryService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
