import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/createBook.dto';
import { PaginationQueryDto } from './dto/paginationQuery.dto';
import { EditBookDto } from './dto/editBook.dto';
import { title } from 'process';

@Injectable()
export class BookService {
    constructor(private  _bookRepository:BookRepository) {}
 async create(dto:CreateBookDto) {
      try {
        const data = await this._bookRepository.create(dto)
        return data 
      } catch (error) {
        console.error("error while creating the book" ,error,'//////')
        if(error instanceof ConflictException) {
            throw new ConflictException('the book already exist')
        } 
      } 
    }
    async getAllBooks(dto:PaginationQueryDto) {
        try {
          return await this._bookRepository.findAllPaginated(dto)
        } catch (error) {
          throw new Error('Error retrieving books from the repository');
        }
      }
    async update(dto:EditBookDto) {
        try {
            return await this._bookRepository.findOneAndUpdate({_id:dto._id},{title:dto.title,genre:dto.genre,pages:dto.pages})
        } catch (error) {
            if(error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } 
            throw new BadRequestException(error.message)
        }
    }  
}
 