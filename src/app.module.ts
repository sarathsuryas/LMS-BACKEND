import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { BookModule } from './common/book/book.module';
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
  providers: [],
})
export class AppModule { }
