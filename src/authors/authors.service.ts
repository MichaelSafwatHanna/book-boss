import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure';
import { mapAuthorToDto, mapAuthorsToDto } from './authors.mapper';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return await this.prisma.author
      .create({
        data: { ...createAuthorDto },
      })
      .then(mapAuthorToDto);
  }

  async findAll() {
    return await this.prisma.author.findMany().then(mapAuthorsToDto);
  }

  async findOne(id: string) {
    return await this.prisma.author
      .findFirstOrThrow({
        where: { id },
      })
      .then(mapAuthorToDto);
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return await this.prisma.author
      .update({
        where: { id },
        data: { ...updateAuthorDto },
      })
      .then(mapAuthorToDto);
  }

  async remove(id: string) {
    const result = await this.prisma.author.delete({
      where: { id },
      select: { id: true },
    });

    return result.id;
  }
}
