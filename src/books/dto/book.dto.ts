import { AuthorDto } from 'src/authors/dto/author.dto';
import { CreateBookDto } from './create-book.dto';

export interface BookDto extends Omit<CreateBookDto, 'authorId'> {
  id: string;
}

export interface BookWithAuthorDto extends BookDto {
  author: AuthorDto;
}

export interface BookAvailabilityDto extends BookDto {
  availableQuantity: number;
}
