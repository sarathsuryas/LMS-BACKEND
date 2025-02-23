import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { bookSchema } from '../models/book.model';
import { BookRepository } from './book.repository';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { bookHistorySchema } from '../models/bookhistory.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'Book',schema:bookSchema},{name:"BookHistory",schema:bookHistorySchema}])],
  controllers: [BookController],
  providers: [BookService,BookRepository,JwtService]
})
export class BookModule {}
