import { Body, Controller, HttpException, HttpStatus, Inject, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/logint.dto';
import { token } from 'morgan';
import { IAuthService } from '../interface/IAuthService';

@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService') private readonly authservice: IAuthService) { }
  @Post('create')
  async create(@Body() userDto: CreateUserDto, @Res() res: Response) {
    try {
      const existingUser = await this.authservice.checkEmail({ email: userDto.email });

      if (existingUser) {
        return res.status(HttpStatus.CONFLICT).json({ message: 'Email already exists' })
      }

      const createdUser = await this.authservice.createUser(userDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'User created successfully',
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Error creating user', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    try {
      const loginDto = req.body as LoginDto
      const result = await this.authservice.checkEmail({ email: loginDto.email });

      if (result && result.role === 'Admin') {
        throw new UnauthorizedException("You are admin please go to admin login")
      }
      if (result) {
        const data = await this.authservice.login(result.password, loginDto.password, result._id as string, result.role)
        console.log(data)
        res.status(HttpStatus.OK).json({ token: data.accessToken })

      } else {
        throw new UnauthorizedException("user not found please register")
      }

    } catch (error) {
      console.error(error)
      if (error instanceof UnauthorizedException) {
        res.status(error.getStatus())
          .json({ status: error.getStatus(), message: error.message })
      } else {
        throw new HttpException(
          { message: 'loggin user failed', error: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }

    }
  }

}
