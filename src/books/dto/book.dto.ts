import { AuthorDto } from 'src/authors/dto/author.dto';
import { CreateBookDto } from './create-book.dto';

export interface BookDto extends Omit<CreateBookDto, 'authorId'> {
  id: string;
  author: AuthorDto;
}
