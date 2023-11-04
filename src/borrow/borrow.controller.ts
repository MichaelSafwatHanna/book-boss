import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  Put,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { AuthGuard, Request } from 'src/auth/auth.guard';
import { setExcelFileStreamHeaders } from 'src/infrastructure/file-stream-helper';
import type { Response } from 'express';

@Controller()
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('books/:bookId/borrow')
  @UseGuards(AuthGuard)
  create(
    @Param('bookId') bookId: string,
    @Body() createBorrowDto: CreateBorrowDto,
    @Req() { user: principal }: Request,
  ) {
    return this.borrowService.create(createBorrowDto, bookId, principal);
  }

  @Get('borrows')
  @UseGuards(AuthGuard)
  findAll(@Req() { user: principal }: Request) {
    return this.borrowService.findAll(principal);
  }

  @Get('report/borrows/checked-out')
  @UseGuards(AuthGuard)
  findAllBorrowers() {
    return this.borrowService.findAllBorrowers();
  }

  @Put('borrows/:id/return')
  @UseGuards(AuthGuard)
  return(@Param('id') id: string, @Req() { user: principal }: Request) {
    return this.borrowService.return(id, principal);
  }

  @UseGuards(AuthGuard)
  @Get('admin/borrows/overdue/export')
  async export(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const buffer = await this.borrowService.findLastMonthOverdue();
    setExcelFileStreamHeaders(res, `overdue_last_month_${Date.now()}`);
    return new StreamableFile(buffer);
  }
}
