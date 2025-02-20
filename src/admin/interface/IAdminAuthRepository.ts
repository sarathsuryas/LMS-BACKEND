import { IBaseRepository } from "src/user/interface/IBaseRepository";
import { User } from "src/user/models/user.model";

export interface IAdminAuthRepository extends IBaseRepository<User> {}