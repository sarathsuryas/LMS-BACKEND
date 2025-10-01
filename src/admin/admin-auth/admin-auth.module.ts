import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthRepository } from './admin-auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/models/user.model';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    {
      provide: 'IAdminAuthRepository', // Token for the interface
      useClass: AdminAuthRepository,
    },
    {
      provide: 'IAdminAuthService', // token
      useClass: AdminAuthService,
    },
    ConfigService,
    JwtService
  ],
  controllers: [AdminAuthController]
})
export class AdminAuthModule { }
