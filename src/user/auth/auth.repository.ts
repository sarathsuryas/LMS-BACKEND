import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/baserepository/base.repository";
import { IAuthRepository } from "src/user/interface/IAuthRepository";
import { User } from "src/user/models/user.model";

export class AuthRepository  extends BaseRepository<User> implements IAuthRepository  {
    constructor(@InjectModel('User') private readonly _userModel:Model<User>) {
        super(_userModel)
    } 
}