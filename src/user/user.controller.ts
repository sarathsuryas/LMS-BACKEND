import { Controller, Get, HttpStatus, InternalServerErrorException, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { Role } from 'src/enums/role.enum';
import { ICustomRequset } from 'src/common/interfaces/ICustomRequest';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private _userService:UserService) {}
     @UseGuards(AuthGuard,RoleGuard)
     @Roles(Role.User)
     @Get('user-data')
     async userData(@Req() req:ICustomRequset,@Res() res:Response) {
        try {
           const data = await  this._userService.getUserData(req.decodedData.userId)
           res.status(HttpStatus.OK).json(data)
        } catch (error) {
            throw new InternalServerErrorException()
        }
     }
   @Put('edit') 
   async editData(@Req() req:ICustomRequset,@Res() res:Response) {
    try {
        console.log(req.body)
        const data = await  this._userService.editUser(req.body)
        res.status(HttpStatus.OK).json(data)
     } catch (error) {
         throw new InternalServerErrorException()
     }
   } 
        
}
