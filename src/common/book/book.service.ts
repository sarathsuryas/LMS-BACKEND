import { BadRequestException, ConflictException, Inject, Injectable} from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/createBook.dto';
import { PaginationQueryDto } from './dto/paginationQuery.dto';
import { EditBookDto } from './dto/editBook.dto';
import { Types } from 'mongoose';
import { IBook } from '../interfaces/IBook';
import { IBookService } from 'src/user/interface/IBookService';

@Injectable()
export class BookService implements IBookService {
  constructor(@Inject('BOOK_REPOSITORY') private readonly bookRepository: BookRepository) { }

  async existBook(name: string) {
    try {
      return this.bookRepository.bookRepository.findOneByQuery({ title: name });
    } catch (error) {
      console.error(error);
    }
  }

  async create(dto: CreateBookDto) {
    try {
      const data = await this.bookRepository.bookRepository.create({
        title: dto.title,
        adminId: new Types.ObjectId(dto.adminId),
        genre: dto.genre,
        pages: dto.pages
      });
      return data;
    } catch (error) {
      console.error("error while creating the book", error, '//////');
      if (error instanceof ConflictException) {
        throw new ConflictException('the book already exist');
      }
    }
  }

  async getAllBooks(dto: PaginationQueryDto) {
    try {
      return await this.bookRepository.findAllPaginated(dto);
    } catch (error) {
      throw new Error('Error retrieving books from the repository');
    }
  }

  async update(dto: EditBookDto) {
    try {
      return await this.bookRepository.bookRepository.findOneAndUpdate(
        { _id: dto._id },
        { title: dto.title, genre: dto.genre, pages: dto.pages }
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async getAllBooksUser(limit: number, page: number, filter: string): Promise<{ data: IBook[], count: number }> {
    try {
      return await this.bookRepository.GetAllUserBooks(limit, page, filter);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async bookTransaction(dto) {
    try {
      this.bookRepository.bookTransaction(dto);
    } catch (error) {
      console.error(error);
    }
  }

  async bookHistory(userId: string) {
    try {
      return this.bookRepository.bookHistory(userId);
    } catch (error) {
      console.error(error);
    }
  }

  async return(bookId: string, historyId: string) {
    try {
      await this.bookRepository.return(bookId, historyId);
    } catch (error) {
      console.error(error);
    }
  }

  async bookBorrowings(adminId: string) {
    try {
      return this.bookRepository.bookBorrowings(adminId);
    } catch (error) {
      console.error(error);
    }
  }
}
