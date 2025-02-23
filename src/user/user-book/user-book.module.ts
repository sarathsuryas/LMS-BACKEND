import { Module } from '@nestjs/common';
import { UserBookController } from './user-book.controller';
import { BookService } from 'src/common/book/book.service';
import { BookRepository } from 'src/common/book/book.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { bookSchema } from 'src/common/models/book.model';
import { JwtService } from '@nestjs/jwt';
import { bookHistorySchema } from 'src/common/models/bookhistory.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'Book',schema:bookSchema},{name:"BookHistory",schema:bookHistorySchema}])],
  controllers: [UserBookController],
  providers: [BookService,BookRepository,JwtService]
})
export class UserBookModule {}
