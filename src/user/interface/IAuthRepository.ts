import { User } from "src/user/models/user.model";
import { IBaseRepository } from "./IBaseRepository";

export interface IAuthRepository extends IBaseRepository<User> {}