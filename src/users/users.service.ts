import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { SignUpDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/infrastructure';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirstOrThrow({ where: { email: email } });
  }

  async create(dto: SignUpDto): Promise<User> {
    return this.prisma.user.create({
      data: { email: dto.email, name: dto.name, password: dto.password },
    });
  }
}
