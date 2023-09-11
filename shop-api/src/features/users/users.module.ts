import { Module } from '@nestjs/common';

import { DataServiceModule } from '../../services/data-service/data-service.module';
import { UserFactoryService } from './user-factory.service';
import { UsersService } from './users.service';

@Module({
  imports: [DataServiceModule],
  providers: [UserFactoryService, UsersService],
  exports: [UserFactoryService, UsersService],
})
export class UsersModule {}
