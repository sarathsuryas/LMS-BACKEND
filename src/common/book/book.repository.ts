import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/baserepository/base.repository";
import { BookDocument } from "../models/book.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaginationQueryDto } from "./dto/paginationQuery.dto";

@Injectable()
export class BookRepository extends BaseRepository<BookDocument> {
    constructor(@InjectModel('Book') private readonly _bookModel:Model<BookDocument>) {
        super(_bookModel)
    }
async findAllPaginated(query: PaginationQueryDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    console.log(limit)
    const [data, totalCount] = await Promise.all([
      this._bookModel.find({adminId:query.adminId})
        .skip(skip)
        .limit(limit)
        .exec(),
      this._bookModel.countDocuments().exec()
    ]);
    
    return {
      data,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  }
}