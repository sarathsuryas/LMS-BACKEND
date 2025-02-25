import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { BaseRepository } from "src/baserepository/base.repository";
import { BookDocument } from "../models/book.model";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Mongoose, Types } from "mongoose";
import { PaginationQueryDto } from "./dto/paginationQuery.dto";
import { title } from "process";
import { IBook } from "../interfaces/IBook";
import { BookHistoryDocument } from "../models/bookhistory.model";

@Injectable()
export class BookRepository{
    public bookRepository: BaseRepository<BookDocument>;
    public bookHistoryRepository:BaseRepository<BookHistoryDocument>
    constructor(
        @InjectModel('Book') private readonly _bookModel:Model<BookDocument>,
        @InjectModel('BookHistory') private readonly _bookHistoryModel:Model<BookHistoryDocument>
    ) {
        this.bookHistoryRepository = new BaseRepository<BookHistoryDocument>(_bookHistoryModel)
        this.bookRepository = new BaseRepository<BookDocument>(_bookModel)
    }

async findAllPaginated(query: PaginationQueryDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    console.log(limit)
    const [data, totalCount] = await Promise.all([
      this._bookModel.find({adminId:new Types.ObjectId(query.adminId)})
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
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
// async GetAllUserBooks(limit:number,page:number,filter:string):Promise<{data:IBook[],count:number}> {
//     try {
//         const matchStage = filter ? { $match: { title: { $regex: filter, $options: 'i' } } } : {};
  
//       // Aggregate pipeline
//       const data = await this._bookModel.aggregate([
//         matchStage, // Apply filtering
//         {
//           $lookup: {
//             from: 'users', // The collection to join
//             localField: 'adminId', // Field in the current collection
//             foreignField: '_id', // Field in the 'users' collection
//             as: 'adminData', // Name of the joined field
//           },
//         },
//         { $unwind: '$adminData' }, // Flatten the adminData array
//         {
//           $project: {
//             _id: 1,
//             title: 1,
//             genre: 1,
//             pages: 1,
//             status: 1,
//             adminData: {
//               _id: 1,
//               username: 1,
//             },
//           },
//         },
//         { $skip: (page - 1) * limit }, // Pagination: Skip records
//         { $limit: limit }, // Pagination: Limit the number of records
//       ]);
  
//       // Total count for pagination metadata
//       const count = await this._bookModel.countDocuments(filter ? { title: { $regex: filter, $options: 'i' } } : {});
  
       
//          return {
//             data,count
//          }
//         } catch (error) {
//         console.error(error)
//         throw new BadRequestException("data fetch failed")
//      }
// }
async GetAllUserBooks(limit: number, page: number, filter: string): Promise<{ data: IBook[]; count: number }> {
    try {
     
  
      const matchStage = filter ? { $match: { title: { $regex: filter, $options: 'i' } } } : null;
  
      // Aggregate pipeline
      const pipeline = [
        ...(matchStage ? [matchStage] : []), // Add $match stage conditionally
        {
          $lookup: {
            from: 'users', // The collection to join
            localField: 'adminId', // Field in the current collection
            foreignField: '_id', // Field in the 'users' collection
            as: 'adminData', // Name of the joined field
          },
        },
        { $unwind: '$adminData' }, // Flatten the adminData array
        {
          $project: {
            _id: 1,
            title: 1,
            genre: 1,
            pages: 1,
            status: 1,
            adminData: {
              _id: 1,
              username: 1,
            },
          },
        },
        { $skip: (page - 1) * limit  }, // Pagination: Skip records
        { $limit: limit }, // Pagination: Limit the number of records
      ];
  
      const data = await this._bookModel.aggregate(pipeline);
  
      // Total count for pagination metadata
      const count = await this._bookModel.countDocuments(
        filter ? { title: { $regex: filter, $options: 'i' } } : {}
      );
  
      return { data, count };
    } catch (error) {
      console.error("Error fetching books:", error.message);
      throw new BadRequestException("Data fetch failed");
    }
  }
  async bookTransaction(dto) {
    try {
       await this._bookModel.findByIdAndUpdate(dto.bookId,{status:false}) 
      return  await this._bookHistoryModel.create({
            adminId:new Types.ObjectId(dto.adminId),
            userId:new Types.ObjectId(dto.userId),
            bookId:new Types.ObjectId(dto.bookId),
            status:true
        })
    } catch (error) {
        console.error(error)
    }
  }

  async bookHistory(userId:string) {
    try {
      return  await this._bookHistoryModel.aggregate([
        {$match:{userId:new Types.ObjectId(userId)}},
        {$sort:{createdAt:-1}},
        {$lookup:{
            from:'users',
            localField:'adminId',
            foreignField:'_id',
             as:'adminData'
        }},
        {$lookup:{
            from:'books',
            localField:'bookId',
            foreignField:'_id',
            as:"bookData"
        }},
        {$unwind:'$adminData'},
        {$unwind:'$bookData'},
        {$project:{
            status:1,
           bookData:{
            _id:1,
            title:1
           },
           adminData:{
            username:1
           }
        }}
      ])
    } catch (error) {
        console.error(error)
    }
  }

  async return(bookId:string) {
    try {
        await this._bookModel.findOneAndUpdate({_id:new Types.ObjectId(bookId)},{status:true})
       await this._bookHistoryModel.findOneAndUpdate({bookId:new Types.ObjectId(bookId)},{status:false})
    } catch (error) {
        console.error(error) 
    }
  }
async bookBorrowings(adminId:string) {
  try {
    return await this._bookHistoryModel.aggregate([
        {$match:{adminId:new Types.ObjectId(adminId)}},
        {$sort:{createdAt:-1}},
        {$lookup:{
            from:'users',
            localField:'userId',
            foreignField:'_id',
             as:'userData'
        }},
        {$lookup:{
            from:'books',
            localField:'bookId',
            foreignField:'_id',
            as:"bookData"
        }},
        {$unwind:'$userData'},
        {$unwind:'$bookData'},
        {$project:{
            status:1,
           bookData:{
            _id:1,
            title:1
           },
           userData:{
            username:1
           }
        }}
    ])
    
  } catch (error) {
    console.error(error) 
  }
}


}



