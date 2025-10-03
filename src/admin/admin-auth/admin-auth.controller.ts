import { Controller, HttpException, HttpStatus, Inject, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDto } from 'src/user/auth/dto/logint.dto';
import { IAdminAuthService } from 'src/user/interface/IAdminAuth';

@Controller('/admin/auth') 
export class AdminAuthController {
  constructor(
    @Inject('IAdminAuthService') private readonly _adminAuthService: IAdminAuthService,
  ) { }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    try {
      const loginDto = req.body as LoginDto; // camelCase variable
      const result = await this._adminAuthService.checkEmail({ email: loginDto.email });

      if (result && result.role !== 'Admin') {
        throw new UnauthorizedException("You are not admin");
      }
      if (result) {
        console.log(result);
        const data = await this._adminAuthService.login(
          result._id as string,
          result.password,
          loginDto.password,
          result.email,
          result.role
        );
        console.log(data);
        res.status(HttpStatus.OK).json({ token: data.accessToken }); // camelCase key

      } else {
        throw new UnauthorizedException("admin not found please register");
      }

    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedException) {
        res.status(error.getStatus())
          .json({ status: error.getStatus(), message: error.message });
      } else {
        throw new HttpException(
          { message: 'loggin user failed', error: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }

    }
  }

}
