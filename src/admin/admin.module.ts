import { Module } from '@nestjs/common';
import { BookModule } from 'src/common/book/book.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';

@Module({
  imports:[AdminAuthModule]
})
export class AdminModule {}
