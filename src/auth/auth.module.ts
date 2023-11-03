import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { jwtSecret } from './auth.secrets';
import { PrismaService } from 'src/infrastructure';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
