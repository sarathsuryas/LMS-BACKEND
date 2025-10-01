// src/user/repositories/user.repository.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/baserepository/base.repository';
import { User } from 'src/user/models/user.model';

@Injectable()
export class AdminRepository extends BaseRepository<User> {
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
