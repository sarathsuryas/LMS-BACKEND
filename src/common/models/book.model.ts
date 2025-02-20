
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { Schema } from "@nestjs/mongoose";

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({required:true})
  adminId:Types.ObjectId 
  
  @Prop({ required: true , unique:true })
  title: string;

  @Prop({ required: true})
  genre: string;

  @Prop({ required: true })
  pages: string;

  @Prop({ default: true })
  status: boolean;
}

export const bookSchema = SchemaFactory.createForClass(Book);
