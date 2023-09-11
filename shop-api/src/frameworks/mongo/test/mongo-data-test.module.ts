import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/core';

import { User } from '../model';
import { MongoDataService } from '../mongo-data.service';

const userModel = Model<User>;

@Module({
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataService,
    },
    {
      provide: getModelToken(User.name),
      useValue: userModel,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataTestModule {}
