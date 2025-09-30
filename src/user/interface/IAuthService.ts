import { CreateUserDto } from "../auth/dto/createUser.dto";
import { User } from "../models/user.model";


export interface IAuthService {
  checkEmail(value: { email: string }): Promise<User | null>;

  createUser(userDto: CreateUserDto): Promise<User>;

  login(
    password: string,
    confirmPassword: string,
    userId: string,
    role: string
  ): Promise<{ accessToken: string }>;
}
