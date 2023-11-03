import { Author, Book } from '@prisma/client';
import { AuthorDto } from './dto/author.dto';

export const mapAuthorToDto = (entity: Author): AuthorDto => {
  return {
    id: entity.id,
    name: entity.name,
  };
};

export const mapAuthorsToDto = (list: Author[]): AuthorDto[] => {
  return list.map(mapAuthorToDto);
};
