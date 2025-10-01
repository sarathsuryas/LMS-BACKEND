import { BadRequestException, Body, Controller, Get, HttpStatus, Inject, InternalServerErrorException, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ICustomRequset } from 'src/common/interfaces/ICustomRequest';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { IBookService } from '../interface/IBookService';

@Controller('book')
export class UserBookController {
    constructor(@Inject('IBookService') private readonly _bookService: IBookService) { }
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Get('all')
    async getAllBooks(@Req() req: ICustomRequset, @Res() res: Response) {
        try {
            const limit = parseInt(req.query.limit as string)
            const page = parseInt(req.query.page as string)
            const filter = req.query.filter as string
            const data = await this._bookService.getAllBooksUser(limit, page, filter)
            res.status(HttpStatus.OK).json({ message: "success", data: data.data, count: data.count })
        } catch (error) {
            if (error instanceof BadRequestException) {
                res.status(error.getStatus()).json({ message: error.message })
            }
            throw new InternalServerErrorException()
        }
    }
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Patch('book-transaction')
    async bookTransaction(@Req() req: ICustomRequset, @Res() res: Response) {
        try {
            const { bookId, adminId, returnDate, currentDate } = req.body
            const userId = req.decodedData.userId
            const docs = await this._bookService.bookHistory(userId)
            let count = 0
            for (const element of docs) {
                if (element.status === true) {
                    count++
                }
                console.log(count)
            }
            if (count >= 5) {
                return res.status(403).json({ message: 'your borrowing limit exceeded' })
            }
            const dto = {
                bookId, adminId, userId, returnDate, currentDate
            }
            const data = await this._bookService.bookTransaction(dto)
            res.status(HttpStatus.CREATED).json({ message: "transaction done" })
        } catch (error) {
            if (error instanceof BadRequestException) {
                res.status(error.getStatus()).json({ message: error.message })
            }
            throw new InternalServerErrorException()
        }
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Get('book-history')
    async bookHistory(@Req() req: ICustomRequset, @Res() res: Response) {
        try {
            const userId = req.decodedData.userId
            const data = await this._bookService.bookHistory(userId)
            res.status(HttpStatus.OK).json(data)
        } catch (error) {
            if (error instanceof BadRequestException) {
                res.status(error.getStatus()).json({ message: error.message })
            }
            throw new InternalServerErrorException()
        }
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Patch('return')
    async returnBook(@Req() req: ICustomRequset, @Res() res: Response) {
        try {
            const { bookId, historyId } = req.body
            const data = await this._bookService.return(bookId, historyId)
            res.status(HttpStatus.OK).json(data)
        } catch (error) {
            if (error instanceof BadRequestException) {
                res.status(error.getStatus()).json({ message: error.message })
            }
            throw new InternalServerErrorException()
        }
    }

}
