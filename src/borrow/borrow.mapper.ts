import { Book, Borrow } from '@prisma/client';
import { BorrowDto } from './dto/borrow.dto';

export const mapBorrowToDto = (entity: Borrow & { book: Book }): BorrowDto => {
  return {
    id: entity.id,
    borrowedOn: entity.borrowedOn,
    dueDate: entity.dueDate,
    returnedAt: entity.returnedAt,
    book: {
      id: entity.book.id,
      ISBN: entity.book.ISBN,
      location: entity.book.location,
      quantity: entity.book.quantity,
      title: entity.book.title,
    },
  };
};

export const mapBorrowsToDto = (
  list: (Borrow & { book: Book })[],
): BorrowDto[] => {
  return list.map(mapBorrowToDto);
};
