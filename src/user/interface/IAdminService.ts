import { User } from "../models/user.model";

export interface IAdminService {
  /**
   * Get user data by adminId with projection
   */
  getUserData(adminId: string): Promise<Partial<User> | null>;

  /**
   * Edit user data
   */
  editUser(dto: { email: string; username: string; role: string }): Promise<User | null>;
}
