import { Book, Borrow } from '@prisma/client';
import { BorrowDto } from './dto/borrow.dto';
import { format } from 'date-fns';

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

export const mapBorrowToExport = (borrow: {
  id: string;
  dueDate: Date;
  book: { id: string; title: string };
  borrowedBy: { id: string; email: string; name: string };
}) => {
  return {
    Id: borrow.id,
    'Due Date': format(borrow.dueDate, 'dd-MM-yyyy HH:mm'),
    'Book id': borrow.book.id,
    'Book title': borrow.book.title,
    Borrower: borrow.borrowedBy.name,
    'Borrower email': borrow.borrowedBy.email,
  };
};
