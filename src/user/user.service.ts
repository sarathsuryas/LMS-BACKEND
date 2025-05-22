import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Types } from 'mongoose';
import { IUserRepository } from './interface/IUserRepository';

@Injectable()
export class UserService {
    constructor(
      @Inject('IUserRepository') private _userRepository:IUserRepository ) {}
   async getUserData(userId:string) {
        try {
            return await this._userRepository.findOneWithProjection({_id:new Types.ObjectId(userId)},{email:1,role:1,username:1})
        } catch (error) {
            console.error(error)
        }
    }
  async editUser(dto) {
    try {
        return await this._userRepository.findOneAndUpdate({email:dto.email},{username:dto.username,role:dto.role})
    } catch (error) {
        console.error(error)
    }
  }  
}

