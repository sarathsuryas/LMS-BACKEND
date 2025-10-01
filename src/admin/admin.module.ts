import { Module } from '@nestjs/common';
import { BookModule } from 'src/common/book/book.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminRepository } from './admin.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/models/user.model';

@Module({
  imports: [AdminAuthModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AdminController],
  providers: [{
    provide: 'IAdminService', // token
    useClass: AdminService,
  }, JwtService, {
    provide: 'IAdminRepository', // token
    useClass: AdminRepository,   // bind interface to concrete repo
  }]
})
export class AdminModule { }
