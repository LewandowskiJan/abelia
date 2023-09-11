import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/core';

import { User, UserDocument } from './model';
import { MongoGenericRepository } from './mongo-generic-repository';

@Injectable()
export class MongoDataService implements IDataServices, OnApplicationBootstrap {
  users: MongoGenericRepository<User>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserRepository);
  }
}
