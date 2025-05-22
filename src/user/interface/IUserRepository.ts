// src/user/repositories/interfaces/user-repository.interface.ts
import { BaseRepository } from 'src/baserepository/base.repository';
import { User } from '../models/user.model';
import { IBaseRepository } from './IBaseRepository';

export interface IUserRepository extends IBaseRepository<User>{
  update(filter: any, update:any): Promise<User | null>;
}
