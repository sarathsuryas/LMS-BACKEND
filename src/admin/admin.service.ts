import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IAdminRepository } from 'src/user/interface/IAdminRepository';
import { IAdminService } from 'src/user/interface/IAdminService';

@Injectable()
export class AdminService implements IAdminService {
    constructor(
        @Inject('IAdminRepository') private readonly adminRepository: IAdminRepository,
    ) { }

    async getUserData(adminId: string) {
        try {
            return await this.adminRepository.findOneWithProjection(
                { _id: new Types.ObjectId(adminId) },
                { email: 1, role: 1, username: 1 }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async editUser(dto) {
        try {
            return await this.adminRepository.findOneAndUpdate(
                { email: dto.email },
                { username: dto.username, role: dto.role }
            );
        } catch (error) {
            console.error(error);
        }
    }
}
