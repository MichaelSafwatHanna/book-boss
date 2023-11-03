import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(loginDto.email);
    const isMatch = await compare(loginDto.password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const { id } = user;
    const payload = { sub: user.id, userId: id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await hash(signUpDto.password, 10);
    const user = await this.usersService.create({
      ...signUpDto,
      password: hashedPassword,
    });

    const { id, name } = user;
    const payload = { sub: user.id, userId: id, name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
