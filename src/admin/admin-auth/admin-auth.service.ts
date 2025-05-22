import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAdminAuthRepository } from '../interface/IAdminAuthRepository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/models/user.model';

@Injectable()
export class AdminAuthService {
    constructor(
        @Inject('IAdminAuthRepository') private _adminAuthRepository:IAdminAuthRepository,
        private _jwtService:JwtService,
        private _configService:ConfigService
    ) {}
    async checkEmail(value:{email:string}) {
        try {
          return await this._adminAuthRepository.findOneByQuery<User>(value)
        } catch (error) {
         console.error(error)  
        } 
       }

    async login(adminId:string,password:string,confirmPasword:string,email:string,role:string) {
        try {
            if(password === confirmPasword) {
             const payload = {adminId,role}
             const accessToken = this._jwtService.sign(payload,{secret:this._configService.get('JWT_SECRET_KEY'),expiresIn:'10m'})
             return {accessToken}
            } else {
              throw new UnauthorizedException();
            }
        } catch (error) {
          console.error(error)
          if(error instanceof UnauthorizedException) {
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
