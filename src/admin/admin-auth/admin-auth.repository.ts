import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/baserepository/base.repository";
import { User } from "src/user/models/user.model";
import { IAdminAuthRepository } from "../interface/IAdminAuthRepository";

export class AdminAuthRepository extends BaseRepository<User> implements IAdminAuthRepository {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
        super(userModel);
    }
}