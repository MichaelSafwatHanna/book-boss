import { Author, Book, Borrow } from '@prisma/client';
import { BookAvailabilityDto, BookWithAuthorDto } from './dto/book.dto';

export const mapBookToDto = (
  entity: Book & { author: Author },
): BookWithAuthorDto => {
  return {
    id: entity.id,
    ISBN: entity.ISBN,
    location: entity.location,
    quantity: entity.quantity,
    title: entity.title,
    author: { id: entity.author.id, name: entity.author.name },
  };
};

export const mapBooksToAvailabilityDto = (
  list: (Book & { author: Author; borrows: Borrow[] })[],
): BookAvailabilityDto[] => {
  return list.map((b) => ({
    ...mapBookToDto(b),
    availableQuantity: b.quantity - b.borrows.length,
  }));
};
