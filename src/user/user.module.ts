import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserBookModule } from './user-book/user-book.module';

@Module({
    imports:[AuthModule, UserBookModule]
})
export class UserModule {}
