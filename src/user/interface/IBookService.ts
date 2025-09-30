import { CreateBookDto } from "src/common/book/dto/createBook.dto";
import { EditBookDto } from "src/common/book/dto/editBook.dto";
import { PaginationQueryDto } from "src/common/book/dto/paginationQuery.dto";
import { IBook } from "src/common/interfaces/IBook";

export interface IBookService {
  existBook(name: string): Promise<any>;
  create(dto: CreateBookDto): Promise<any>;
  getAllBooks(dto: PaginationQueryDto): Promise<any>;
  update(dto: EditBookDto): Promise<any>;
  getAllBooksUser(limit: number, page: number, filter: string): Promise<{ data: IBook[]; count: number }>;
  bookTransaction(dto: any): Promise<void>;
  bookHistory(userId: string): Promise<any>;
  return(bookId: string, historyId: string): Promise<void>;
  bookBorrowings(adminId: string): Promise<any>;
}
