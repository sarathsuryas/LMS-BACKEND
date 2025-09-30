import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserBookModule } from './user-book/user-book.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports:[AuthModule, UserBookModule,MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    controllers: [UserController],
    providers: [{
      provide: 'IUserService', // token
      useClass: UserService,
    },
    JwtService,{
      provide: 'IUserRepository', // Interface
      useClass: UserRepository,   // Concrete Implementation
    }]
})
export class UserModule {}
