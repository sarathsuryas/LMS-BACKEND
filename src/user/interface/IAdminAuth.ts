import { User } from "../models/user.model";

export interface IAdminAuthService {
 
  checkEmail(value: { email: string }): Promise<User | null>;

  login(
    adminId: string,
    password: string,
    confirmPassword: string,
    email: string,
    role: string,
  ): Promise<{ accessToken: string }>;
}
