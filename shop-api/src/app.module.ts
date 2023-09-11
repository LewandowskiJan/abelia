import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './authentication/auth.module';
import { RolesGuard } from './authorization/roles.guard';
import { AuthController, UserController } from './controllers';
import { UsersModule } from './features/users/users.module';
import { DataServiceModule } from './services/data-service/data-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    AuthModule,
    DataServiceModule,
    UsersModule,
  ],
  controllers: [AuthController, UserController],
  providers: [RolesGuard],
})
export class AppModule {}
