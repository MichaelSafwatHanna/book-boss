import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/infrastructure';
import { BookDto } from './dto/book.dto';
import { mapBookToDto, mapBooksToDto } from './books.mapper';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto): Promise<BookDto> {
    return await this.prisma.book
      .create({
        data: { ...createBookDto },
        include: {
          author: true,
        },
      })
      .then(mapBookToDto);
  }

  async findAll() {
    return await this.prisma.book
      .findMany({
        include: {
          author: true,
        },
      })
      .then(mapBooksToDto);
  }

  async findOne(id: string) {
    return await this.prisma.book
      .findFirstOrThrow({
        include: {
          author: true,
        },
        where: { id },
      })
      .then(mapBookToDto);
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return await this.prisma.book
      .update({
        where: { id },
        data: { ...updateBookDto },
      })
      .then(mapBookToDto);
  }

  async remove(id: string) {
    const result = await this.prisma.book.delete({
      where: { id },
      select: { id: true },
    });

    return result.id;
  }
}
