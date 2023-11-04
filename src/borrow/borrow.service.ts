import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { Principal } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/infrastructure';
import {
  mapBorrowToDto,
  mapBorrowToExport,
  mapBorrowsToDto,
} from './borrow.mapper';
import * as XLSX from 'xlsx';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  async create(
    createBorrowDto: CreateBorrowDto,
    bookId: string,
    principal: Principal,
  ) {
    const book = await this.prisma.book.findFirstOrThrow({
      where: { id: bookId },
    });

    const checkedOutQuantity = await this.prisma.borrow.count({
      where: { bookId, AND: { returnedAt: null } },
    });

    if (book.quantity === checkedOutQuantity) {
      throw new BadRequestException('Book is out of stock');
    }

    return await this.prisma.borrow
      .create({
        data: {
          ...createBorrowDto,
          bookId: bookId,
          userId: principal.userId,
        },
        include: { book: true },
      })
      .then(mapBorrowToDto);
  }

  async findAll(principal: Principal) {
    return await this.prisma.borrow
      .findMany({
        include: { book: true },
        where: { userId: principal.userId, returnedAt: null },
      })
      .then(mapBorrowsToDto);
  }

  async findAllBorrowers() {
    return await this.prisma.borrow.findMany({
      where: { returnedAt: null },
      select: {
        dueDate: true,
        id: true,
        book: { select: { id: true, title: true } },
        borrowedBy: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findLastMonthOverdue() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;
    if (previousMonth < 0) {
      previousMonth = 11;
      previousYear -= 1;
    }
    const previousMonthDate = new Date(previousYear, previousMonth, 1);

    const data = await this.prisma.borrow
      .findMany({
        where: {
          returnedAt: null,
          dueDate: { lte: now, gte: previousMonthDate },
        },
        select: {
          dueDate: true,
          id: true,
          book: { select: { id: true, title: true } },
          borrowedBy: { select: { id: true, name: true, email: true } },
        },
      })
      .then((x) => x.map(mapBorrowToExport));

    var workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: [],
    });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    return await XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }

  async return(id: string, principal: Principal) {
    await this.prisma.borrow.update({
      data: {
        returnedAt: new Date(),
      },
      where: {
        id,
        AND: { userId: principal.userId },
      },
    });
  }
}
