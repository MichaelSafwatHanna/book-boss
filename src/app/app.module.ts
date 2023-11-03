import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorsModule } from 'src/authors/authors.module';
import { BooksModule } from 'src/books/books.module';
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
  ],
})
export class AppModule {}
