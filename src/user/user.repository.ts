// src/user/repositories/user.repository.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { BaseRepository } from 'src/baserepository/base.repository';
import { IUserRepository } from './interface/IUserRepository';

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository{
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel)
  }
async update(
    filter,
    update,
  ) {
    try {
      console.log(update)
      return await this.userModel.findOneAndUpdate(filter, { $set: update })

    } catch (error) {
      console.error(error)
      throw new BadRequestException("updation failed")
    }
  }
  
}
