import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorsModule } from 'src/authors/authors.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV !== 'production' ? ['.env.development'] : ['.env'],
    }),
    BooksModule,
    AuthorsModule,
  ],
})
export class AppModule {}
