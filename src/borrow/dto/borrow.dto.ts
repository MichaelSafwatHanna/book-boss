import { BookDto } from 'src/books/dto/book.dto';

export interface BorrowDto {
  id: string;
  book: BookDto;
  borrowedOn: Date;
  dueDate: Date;
  returnedAt?: Date;
}
