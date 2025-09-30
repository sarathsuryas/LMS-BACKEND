import { BaseRepository } from "src/baserepository/base.repository";
import { User } from "../models/user.model";

export interface IAdminRepository extends BaseRepository<User> {
  update(filter: any, update: any): Promise<User | null>;
}
