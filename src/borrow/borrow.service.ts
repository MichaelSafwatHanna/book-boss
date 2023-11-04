import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { Principal } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/infrastructure';
import { mapBorrowToDto, mapBorrowsToDto } from './borrow.mapper';

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
