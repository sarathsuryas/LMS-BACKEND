import { Types } from 'mongoose';

export interface IUserService {
  
  getUserData(userId: string)

 
  editUser(dto: { email: string; username: string; role: string }): Promise<any>;
}
