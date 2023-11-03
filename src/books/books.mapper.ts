import { Author, Book } from '@prisma/client';
import { BookDto } from './dto/book.dto';

export const mapBookToDto = (entity: Book & { author: Author }): BookDto => {
  return {
    id: entity.id,
    ISBN: entity.ISBN,
    location: entity.location,
    quantity: entity.quantity,
    title: entity.title,
    author: { id: entity.author.id, name: entity.author.name },
  };
};

export const mapBooksToDto = (
  list: (Book & { author: Author })[],
): BookDto[] => {
  return list.map(mapBookToDto);
};
