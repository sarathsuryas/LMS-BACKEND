import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { IAuthRepository } from 'src/user/interface/IAuthRepository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IAuthRepository') private authRepository: IAuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async checkEmail(value: { email: string }) {
    try {
      return await this.authRepository.findOneByQuery<User>(value);
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(userDto: CreateUserDto) {
    try {
      return await this.authRepository.create(userDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to create user', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(password: string, confirmPassword: string, userId: string, role: string) {
    try {
      if (password === confirmPassword) {
        const payload = { userId, role };
        const accessToken = this.jwtService.sign(payload, { secret: this.configService.get('JWT_SECRET_KEY'), expiresIn: '10m' });
        return { accessToken };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('please check your password');
      } else {
        throw new HttpException(
          { message: 'Failed to login', error: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
