import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type BookHistoryDocument = HydratedDocument<BookHistory>;


@Schema({timestamps:true})
export class BookHistory {
@Prop({required:true})
userId:Types.ObjectId;
@Prop({required:true})
adminId:Types.ObjectId;
@Prop({required:true})
bookId:Types.ObjectId;
@Prop({required:true})
status:boolean;
@Prop({required:true})
borrowDate:Date
@Prop({required:true})
returnDate:Date
}
export const bookHistorySchema = SchemaFactory.createForClass(BookHistory);
