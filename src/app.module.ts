import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { AuthModule } from './user/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdminAuthModule } from './admin/admin-auth/admin-auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guards/role/role.guard';
import { BookModule } from './common/book/book.module';
import { AuthGuard } from './guards/auth/auth.guard';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    DatabaseModule,
      ConfigModule.forRoot({
        isGlobal: true,
        load: [config]
      }),
      UserModule,
      AdminModule,
      BookModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
