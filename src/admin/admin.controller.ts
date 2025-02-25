import { Controller, Get, HttpStatus, InternalServerErrorException, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ICustomRequset } from 'src/common/interfaces/ICustomRequest';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
 constructor(private _adminService:AdminService) {}
     @UseGuards(AuthGuard,RoleGuard)
     @Roles(Role.Admin)
     @Get('admin-data')
     async userData(@Req() req:ICustomRequset,@Res() res:Response) {
        try {
           const data = await  this._adminService.getUserData(req.decodedData.adminId)
           res.status(HttpStatus.OK).json(data)
        } catch (error) {
            throw new InternalServerErrorException()
        }
     }
   @Put('edit') 
   async editData(@Req() req:ICustomRequset,@Res() res:Response) {
    try {
        console.log(req.body)
        const data = await  this._adminService.editUser(req.body)
        res.status(HttpStatus.OK).json(data)
     } catch (error) {
         throw new InternalServerErrorException()
     }
   } 
}
