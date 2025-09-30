import { BadRequestException, Body, ConflictException, Controller, Get, HttpException, HttpStatus, Inject, InternalServerErrorException, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import e, { Request, Response } from 'express';
import { BookService } from './book.service';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ICustomRequset } from '../interfaces/ICustomRequest';
import { RoleGuard } from 'src/guards/role/role.guard';
import { CreateBookDto } from './dto/createBook.dto';
import { EditBookDto } from './dto/editBook.dto';
import { IBookService } from 'src/user/interface/IBookService';

@Controller('/admin/book')
export class BookController {
  constructor(@Inject('IBookService') private readonly _bookService: IBookService) {}
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @Post('create')
    async create(@Body() body: CreateBookDto, @Req() req: ICustomRequset, @Res() res: Response) {
        try {
            const obj: CreateBookDto = {
                title: body.title,
                genre: body.genre,
                pages: body.pages,
                adminId: req.decodedData.adminId
            }
            const exist = await this._bookService.existBook(obj.title)
            if(exist) {
                return res.status(HttpStatus.OK).json({message:"book already exist" ,status:200})
            }
            const book = await this._bookService.create(obj)
            res.status(HttpStatus.CREATED).json({ message: "book added succussfully", status: 201 })

        } catch (error) {
            if (error instanceof ConflictException) {
                res.status(error.getStatus())
                    .json({ status: error.getStatus(), message: error.message })
            } else if (error instanceof InternalServerErrorException) {
                res.status(error.getStatus())
                    .json({ status: error.getStatus(), message: error.message })
            }
        }
    }
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @Get('get-books')
    async getAllBooks(
        @Req() req: ICustomRequset,
        @Res() res: Response) {
        try {
            const pagenum = parseInt(req.query.page as string)
            const offset = parseInt(req.query.size as string)

            const books = await this._bookService.getAllBooks({ page: pagenum, limit: offset, adminId: req.decodedData.adminId });

            return res.status(HttpStatus.OK).json({
                message: 'Books retrieved successfully',
                data: books.data,
                totalCount: books.meta.totalCount
            });
        } catch (error) {
            console.error('Error retrieving books:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An unexpected error occurred',
            });
        }
    }
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @Put('edit')
    async updateBook(
        @Body() updateBookDto: EditBookDto,
        @Res() res: Response
    ) {
        try {
            const data = await this._bookService.update(updateBookDto)
            console.log(data)
            res.status(HttpStatus.OK).json({ message: "update success", status: true })

        } catch (error) {
            if (error instanceof BadRequestException) {
                res.status(error.getStatus()).json({ success: false, message: error.message })
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @Get('transaction')
    async BookTransaction(@Req() req: ICustomRequset, @Res() res: Response) {
        try {
            const { adminId } = req.decodedData
            console.log('///////////////')
            const data = await this._bookService.bookBorrowings(adminId)
            res.status(HttpStatus.OK).json(data)
        } catch (error) {
            if (error instanceof BadRequestException) {
                res.status(error.getStatus()).json({ success: false, message: error.message })
            } else {
                throw new InternalServerErrorException()
            }
        }
    }


}
