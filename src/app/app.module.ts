import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorsModule } from 'src/authors/authors.module';
import { BooksModule } from 'src/books/books.module';
import { BorrowModule } from 'src/borrow/borrow.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV !== 'production' ? ['.env.development'] : ['.env'],
    }),
    BooksModule,
    AuthorsModule,
    UsersModule,
    AuthModule,
    BorrowModule
  ],
})
export class AppModule {}
