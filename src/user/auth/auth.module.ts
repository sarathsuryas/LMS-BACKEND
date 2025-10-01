import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/models/user.model';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IAuthService', // token
      useClass: AuthService,   // concrete implementation
    },
    JwtService,
    {
      provide: 'IAuthRepository', // Token for the interface
      useClass: AuthRepository,
    }]
})
export class AuthModule { }
